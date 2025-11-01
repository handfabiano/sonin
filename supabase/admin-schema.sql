-- =====================================================
-- ATUALIZAÇÃO DO SCHEMA PARA PAINEL ADMINISTRATIVO
-- Execute este script DEPOIS do schema.sql principal
-- =====================================================

-- Tabela de configurações de frete
CREATE TABLE IF NOT EXISTS shipping_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('fixed', 'weight', 'value', 'free')),
  min_value DECIMAL(10, 2) DEFAULT 0,
  max_value DECIMAL(10, 2),
  min_weight DECIMAL(10, 2) DEFAULT 0,
  max_weight DECIMAL(10, 2),
  price DECIMAL(10, 2) NOT NULL,
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações gerais da loja
CREATE TABLE IF NOT EXISTS store_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json')),
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de ações administrativas
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- POLÍTICAS RLS
-- =====================================================

-- Shipping Config
ALTER TABLE shipping_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem visualizar configurações de frete ativas"
ON shipping_config FOR SELECT
USING (active = true);

CREATE POLICY "Apenas admins podem gerenciar frete"
ON shipping_config FOR ALL
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

-- Admin Users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins podem ver outros admins"
ON admin_users FOR SELECT
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

CREATE POLICY "Apenas super admins podem gerenciar admins"
ON admin_users FOR ALL
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE role = 'super_admin' AND active = true)
);

-- Store Config
ALTER TABLE store_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem visualizar configurações da loja"
ON store_config FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem gerenciar configurações"
ON store_config FOR ALL
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

-- Admin Logs
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins podem visualizar logs"
ON admin_logs FOR SELECT
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

-- =====================================================
-- ATUALIZAR POLÍTICAS DE PRODUCTS
-- =====================================================

-- Remover política antiga se existir
DROP POLICY IF EXISTS "Produtos são visíveis para todos" ON products;

-- Nova política de leitura
CREATE POLICY "Todos podem visualizar produtos"
ON products FOR SELECT
USING (true);

-- Política de gerenciamento para admins
CREATE POLICY "Apenas admins podem gerenciar produtos"
ON products FOR ALL
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

-- =====================================================
-- ATUALIZAR POLÍTICAS DE ORDERS
-- =====================================================

DROP POLICY IF EXISTS "Qualquer um pode criar pedidos" ON orders;

CREATE POLICY "Criar pedidos via API"
ON orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins podem visualizar todos os pedidos"
ON orders FOR SELECT
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

CREATE POLICY "Admins podem atualizar pedidos"
ON orders FOR UPDATE
USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE active = true)
);

-- =====================================================
-- FUNÇÕES HELPER
-- =====================================================

-- Função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid() AND active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para calcular frete
CREATE OR REPLACE FUNCTION calculate_shipping(
  cart_total DECIMAL,
  cart_weight DECIMAL DEFAULT 0
)
RETURNS TABLE(
  shipping_id UUID,
  shipping_name TEXT,
  shipping_price DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sc.id,
    sc.name,
    sc.price
  FROM shipping_config sc
  WHERE sc.active = true
    AND (
      (sc.type = 'free' AND cart_total >= sc.min_value) OR
      (sc.type = 'fixed') OR
      (sc.type = 'value' AND cart_total >= sc.min_value AND (sc.max_value IS NULL OR cart_total <= sc.max_value)) OR
      (sc.type = 'weight' AND cart_weight >= sc.min_weight AND (sc.max_weight IS NULL OR cart_weight <= sc.max_weight))
    )
  ORDER BY sc.priority DESC, sc.price ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CONFIGURAÇÕES INICIAIS
-- =====================================================

-- Inserir configurações padrão de frete
INSERT INTO shipping_config (name, description, type, min_value, price, priority) VALUES
('Frete Padrão', 'Frete padrão para todo o Brasil', 'fixed', 0, 15.00, 1),
('Frete Grátis', 'Frete grátis para compras acima de R$ 150', 'free', 150.00, 0.00, 10)
ON CONFLICT DO NOTHING;

-- Inserir configurações gerais da loja
INSERT INTO store_config (key, value, type, description) VALUES
('store_name', 'Sonin', 'string', 'Nome da loja'),
('store_email', 'contato@sonin.com.br', 'string', 'E-mail da loja'),
('store_phone', '(11) 98765-4321', 'string', 'Telefone da loja'),
('min_order_value', '0', 'number', 'Valor mínimo do pedido'),
('free_shipping_threshold', '150', 'number', 'Valor para frete grátis'),
('allow_pickup', 'false', 'boolean', 'Permitir retirada na loja')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- CRIAR PRIMEIRO ADMIN (ALTERE O E-MAIL!)
-- =====================================================

-- IMPORTANTE: Após criar um usuário no Supabase Auth,
-- execute este comando substituindo o UUID e e-mail:

/*
INSERT INTO admin_users (id, email, name, role, active)
VALUES (
  'cole-uuid-do-usuario-aqui',
  'seu-email@admin.com',
  'Seu Nome',
  'super_admin',
  true
);
*/

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_shipping_config_active ON shipping_config(active);
CREATE INDEX IF NOT EXISTS idx_shipping_config_type ON shipping_config(type);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(active);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_store_config_key ON store_config(key);
