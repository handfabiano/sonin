-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('candle', 'oil')),
  scent TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Inserir produtos iniciais
INSERT INTO products (name, description, price, image, category, scent, in_stock) VALUES
('Vela Lavanda Serenidade', 'Vela artesanal de lavanda, perfeita para momentos de relaxamento e meditação. Cera 100% natural de soja.', 89.90, 'https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=800&q=80', 'candle', 'Lavanda', true),
('Vela Âmbar & Baunilha', 'Uma combinação sofisticada de âmbar e baunilha que cria uma atmosfera acolhedora e luxuosa.', 95.90, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80', 'candle', 'Âmbar & Baunilha', true),
('Vela Eucalipto & Menta', 'Refrescante e revigorante, ideal para purificar o ambiente e estimular a concentração.', 87.90, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', 'candle', 'Eucalipto & Menta', true),
('Vela Flor de Cerejeira', 'Delicada e floral, traz a suavidade das flores de cerejeira para seu espaço.', 92.90, 'https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=800&q=80', 'candle', 'Flor de Cerejeira', true),
('Vela Sândalo & Patchouli', 'Uma fragrância terrosa e amadeirada que promove equilíbrio e conexão interior.', 98.90, 'https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=800&q=80', 'candle', 'Sândalo & Patchouli', true),
('Óleo Essencial Lavanda', 'Óleo essencial puro de lavanda francesa. Propriedades calmantes e relaxantes. 10ml.', 54.90, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', 'oil', 'Lavanda', true),
('Óleo Essencial Eucalipto', 'Óleo essencial puro de eucalipto. Refrescante e purificante. 10ml.', 49.90, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', 'oil', 'Eucalipto', true),
('Óleo Essencial Tea Tree', 'Óleo essencial puro de tea tree. Propriedades purificantes e revitalizantes. 10ml.', 52.90, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', 'oil', 'Tea Tree', true);

-- Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para produtos (leitura pública)
CREATE POLICY "Produtos são visíveis para todos" ON products
  FOR SELECT USING (true);

-- Políticas de acesso para pedidos (apenas criar)
CREATE POLICY "Qualquer um pode criar pedidos" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Qualquer um pode criar itens de pedido" ON order_items
  FOR INSERT WITH CHECK (true);

-- Políticas de acesso para newsletter (apenas inserir)
CREATE POLICY "Qualquer um pode se inscrever na newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
