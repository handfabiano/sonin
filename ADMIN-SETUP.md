# 👨‍💼 Guia de Configuração do Painel Administrativo

Este guia te ajudará a configurar o painel administrativo completo da Sonin.

## 🎯 Recursos do Painel Admin

- ✅ **Autenticação Segura** (Supabase Auth)
- ✅ **Gerenciamento de Produtos** (CRUD completo)
- ✅ **Gerenciamento de Pedidos** (visualizar, atualizar status)
- ✅ **Configuração de Frete** (regras personalizadas)
- ✅ **Upload de Imagens** (Supabase Storage)
- ✅ **Dashboard com Estatísticas**
- ✅ **Logs de Atividades**
- ✅ **Proteção de Rotas** (middleware)

---

## 🚀 PASSO 1: Atualizar Banco de Dados

### 1.1 Executar Script SQL

1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor**
3. Clique em **"+ New query"**
4. Copie TODO o conteúdo de `supabase/admin-schema.sql`
5. Cole no editor
6. Clique em **"Run"**
7. Aguarde: "Success. No rows returned"

Isso criará:
- Tabela `admin_users` - Usuários administradores
- Tabela `shipping_config` - Configurações de frete
- Tabela `store_config` - Configurações gerais
- Tabela `admin_logs` - Logs de ações
- Políticas RLS atualizadas
- Funções helpers

---

## 🔑 PASSO 2: Criar Primeiro Admin

### 2.1 Criar Usuário no Supabase Auth

1. No Supabase, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   ```
   Email: seu-email@admin.com
   Password: sua-senha-forte-aqui
   Auto Confirm User: ✅ (marque)
   ```
4. Clique em **"Create user"**
5. **COPIE O UUID** do usuário (aparece na lista)

### 2.2 Adicionar como Admin no Banco

1. Ainda no Supabase, vá em **SQL Editor**
2. Execute este comando (substitua os valores):

```sql
INSERT INTO admin_users (id, email, name, role, active)
VALUES (
  'cole-o-uuid-do-usuario-aqui',
  'seu-email@admin.com',
  'Seu Nome',
  'super_admin',
  true
);
```

**Exemplo:**
```sql
INSERT INTO admin_users (id, email, name, role, active)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'fabiano@sonin.com',
  'Fabiano',
  'super_admin',
  true
);
```

3. Clique em **"Run"**

---

## 🔐 PASSO 3: Configurar Variável de Ambiente

### 3.1 Obter Service Role Key

1. No Supabase, vá em **Settings** → **API**
2. Role até **"Project API keys"**
3. Copie a **"service_role key"** (começa com `eyJ...`)

⚠️ **ATENÇÃO:** Essa chave é SUPER SECRETA! Nunca exponha no frontend!

### 3.2 Adicionar na Vercel

1. Vá no dashboard da Vercel
2. Selecione seu projeto
3. **Settings** → **Environment Variables**
4. Adicione:

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbG... (cole a service role key aqui)
Environments: ✅ Production, ✅ Preview
```

5. Clique em **"Save"**
6. Faça um **Redeploy** do projeto

### 3.3 Configurar Localmente (Opcional)

Se quiser testar localmente, adicione no `.env.local`:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...sua_service_role_key
```

---

## 🎨 PASSO 4: Acessar Painel Admin

### 4.1 Fazer Login

1. Acesse: `https://seu-site.vercel.app/admin/login`
2. Entre com:
   ```
   E-mail: seu-email@admin.com
   Senha: (a senha que você criou)
   ```
3. Clique em **"Entrar"**
4. Você será redirecionado para o dashboard! 🎉

### 4.2 Local (Desenvolvimento)

```bash
npm run dev
```

Acesse: http://localhost:3000/admin/login

---

## 📋 PASSO 5: Configurações Iniciais

### 5.1 Configurar Frete

1. No painel admin, vá em **"Configurações"** → **"Frete"**
2. Você verá 2 regras padrão:
   - **Frete Padrão:** R$ 15,00 para todas as compras
   - **Frete Grátis:** Grátis acima de R$ 150,00

3. Você pode:
   - Editar os valores
   - Adicionar novas regras
   - Desativar regras
   - Definir prioridades

**Tipos de Frete Disponíveis:**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **fixed** | Valor fixo | R$ 15,00 para todos |
| **free** | Grátis acima de X | Grátis acima de R$ 150 |
| **value** | Baseado no valor | R$ 10 para R$ 0-100, R$ 5 para R$ 100-200 |
| **weight** | Baseado no peso | R$ 15 até 1kg, R$ 25 acima de 1kg |

### 5.2 Configurações Gerais

Você pode editar:
- Nome da loja
- E-mail de contato
- Telefone
- Valor mínimo do pedido
- Limite para frete grátis
- Permitir retirada na loja

---

## 🛠️ Recursos do Painel

### Dashboard
- Visão geral de vendas
- Pedidos recentes
- Produtos mais vendidos
- Gráficos e estatísticas

### Produtos
- ➕ Adicionar novos produtos
- ✏️ Editar produtos existentes
- 🗑️ Remover produtos
- 📸 Upload de imagens
- 📦 Controle de estoque
- 💰 Gerenciar preços

### Pedidos
- 📋 Listar todos os pedidos
- 🔍 Filtrar por status
- 📝 Ver detalhes completos
- ✅ Atualizar status (pendente, processando, enviado, entregue)
- 📧 Dados do cliente

### Frete
- ➕ Criar regras de frete
- ✏️ Editar regras existentes
- 🔄 Ativar/desativar regras
- 🎯 Definir prioridades
- 📊 Diferentes tipos de cálculo

### Configurações
- 🏪 Dados da loja
- 📧 E-mail e telefone
- 💵 Políticas de venda
- 🚚 Configurações de frete

---

## 🔒 Segurança

### O Que Está Protegido

✅ **Rotas Admin:** Middleware verifica autenticação
✅ **API Routes:** Verificam se usuário é admin
✅ **Banco de Dados:** RLS (Row Level Security) ativo
✅ **Actions:** Todas as ações são logadas
✅ **Service Key:** Nunca exposta no frontend

### Níveis de Acesso

**Super Admin:**
- Todas as permissões
- Pode adicionar/remover outros admins
- Acesso a logs completos

**Admin:**
- Gerenciar produtos
- Gerenciar pedidos
- Configurar frete
- Ver estatísticas

### Adicionar Mais Admins

1. Crie usuário no Supabase Auth (Passo 2.1)
2. Execute SQL:

```sql
INSERT INTO admin_users (id, email, name, role, active)
VALUES (
  'uuid-do-novo-usuario',
  'novo-admin@sonin.com',
  'Nome do Admin',
  'admin', -- ou 'super_admin'
  true
);
```

---

## 📊 Gerenciamento de Frete

### Criar Regra de Frete

**Exemplo 1: Frete Fixo Regional**
```sql
INSERT INTO shipping_config (name, description, type, price, active, priority)
VALUES (
  'Frete São Paulo',
  'Frete para região de São Paulo',
  'fixed',
  10.00,
  true,
  5
);
```

**Exemplo 2: Frete por Valor**
```sql
INSERT INTO shipping_config (name, description, type, min_value, max_value, price, active, priority)
VALUES (
  'Frete Econômico',
  'Para compras entre R$ 50 e R$ 100',
  'value',
  50.00,
  100.00,
  12.00,
  true,
  3
);
```

**Exemplo 3: Frete Grátis**
```sql
INSERT INTO shipping_config (name, description, type, min_value, price, active, priority)
VALUES (
  'Frete Grátis Black Friday',
  'Frete grátis acima de R$ 99',
  'free',
  99.00,
  0.00,
  true,
  10 -- Prioridade alta
);
```

### Prioridade do Frete

- **Número MAIOR = Maior prioridade**
- Se múltiplas regras se aplicam, a de maior prioridade vence
- Se prioridades iguais, o mais barato vence

---

## 🐛 Troubleshooting

### Não consigo fazer login

**Possíveis causas:**
1. Usuário não foi adicionado na tabela `admin_users`
2. Campo `active = false`
3. E-mail ou senha incorretos

**Solução:**
```sql
-- Verificar se admin existe
SELECT * FROM admin_users WHERE email = 'seu-email@admin.com';

-- Ativar admin
UPDATE admin_users
SET active = true
WHERE email = 'seu-email@admin.com';
```

### Erro "Service role key not configured"

**Solução:**
- Adicione `SUPABASE_SERVICE_ROLE_KEY` nas variáveis de ambiente da Vercel
- Faça redeploy

### Erro 403 ao acessar /admin

**Solução:**
- Verifique se o middleware está funcionando
- Limpe cookies e tente fazer login novamente
- Verifique se fez deploy da branch correta

### Produtos não aparecem no painel

**Solução:**
```sql
-- Verificar se produtos existem
SELECT * FROM products LIMIT 5;

-- Se não existirem, execute o schema.sql principal primeiro
```

---

## 📈 Próximos Passos

Após configurar o painel admin:

1. ✅ Faça login no painel
2. ✅ Configure as regras de frete
3. ✅ Adicione/edite produtos
4. ✅ Faça um pedido de teste
5. ✅ Verifique se pedido aparece no painel
6. ✅ Atualize status do pedido
7. ✅ Personalize configurações da loja
8. ✅ Adicione outros administradores se necessário

---

## 📞 Precisa de Ajuda?

**Problemas com:**
- Login do admin
- Permissões
- Configuração de frete
- Qualquer outro recurso

**Me avise!** Estou aqui para ajudar! 😊

---

## ✅ Checklist de Configuração

- [ ] Executei `supabase/admin-schema.sql`
- [ ] Criei usuário no Supabase Auth
- [ ] Adicionei usuário na tabela `admin_users`
- [ ] Configurei `SUPABASE_SERVICE_ROLE_KEY` na Vercel
- [ ] Fiz redeploy do projeto
- [ ] Consegui fazer login em `/admin/login`
- [ ] Acesso ao dashboard funcionando
- [ ] Configurei regras de frete
- [ ] Testei CRUD de produtos
- [ ] Testei visualização de pedidos

**Tudo pronto! 🎉**
