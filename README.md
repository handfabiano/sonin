# 🕯️ Sonin - Loja Virtual de Velas Aromáticas & Óleos Essenciais

Uma loja virtual elegante e moderna para velas aromáticas artesanais e óleos essenciais premium.

## ✨ Características

- **Design Elegante e Moderno**: Interface limpa com paleta de cores sofisticada em tons terrosos
- **Totalmente Responsivo**: Funciona perfeitamente em dispositivos móveis, tablets e desktops
- **Gerenciamento de Carrinho**: Sistema completo de carrinho de compras com gerenciamento de estado
- **Catálogo de Produtos**: Filtros por categoria (velas e óleos essenciais)
- **Páginas de Detalhes**: Visualização completa de cada produto
- **Experiência do Usuário**: Navegação intuitiva e animações suaves

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety e melhor experiência de desenvolvimento
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Zustand** - Gerenciamento de estado simples e eficiente
- **Supabase** - Banco de dados PostgreSQL com API REST automática
- **Stripe** - Processamento seguro de pagamentos
- **Next/Image** - Otimização automática de imagens

## 🚀 Como Executar Localmente

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**

Crie um arquivo `.env.local` na raiz do projeto:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

Veja `.env.example` para referência completa.

3. **Executar em modo de desenvolvimento:**
```bash
npm run dev
```

4. **Abrir no navegador:**
```
http://localhost:3000
```

## 🚀 Deploy na Vercel

Para fazer o deploy completo com banco de dados Supabase, siga o guia completo em:

📘 **[DEPLOY.md](./DEPLOY.md)** - Guia passo a passo de deploy

Resumo rápido:
1. Criar projeto no Supabase e executar `supabase/schema.sql`
2. Importar projeto na Vercel
3. Configurar variáveis de ambiente
4. Deploy! 🎉

## 📸 Adicionar Suas Imagens

Para personalizar o site com suas próprias fotos:

🖼️ **[QUICK-START-IMAGES.md](./QUICK-START-IMAGES.md)** - Adicione suas imagens em 5 minutos (RECOMENDADO)

📚 **[IMAGES-SETUP.md](./IMAGES-SETUP.md)** - Guia completo de imagens e Supabase Storage

**Onde colocar as imagens:**
- Banner hero: `public/images/banners/hero-main.jpg`
- Produtos: `public/images/products/nome-produto.jpg`
- Logo: `public/images/logos/logo.png`

## 💳 Configurar Pagamentos (Stripe)

Para aceitar pagamentos com cartão de crédito:

💰 **[STRIPE-SETUP.md](./STRIPE-SETUP.md)** - Guia completo de configuração do Stripe

**Resumo rápido:**
1. Criar conta no Stripe (gratuita)
2. Copiar chaves da API (teste e produção)
3. Adicionar nas variáveis de ambiente
4. Configurar webhooks
5. Pronto para vender! 🚀

## 👨‍💼 Painel Administrativo

Para gerenciar produtos, pedidos e configurações da loja:

🔐 **[ADMIN-SETUP.md](./ADMIN-SETUP.md)** - Guia completo do painel administrativo

**Funcionalidades:**
- Gerenciamento completo de produtos (CRUD)
- Visualização e gestão de pedidos
- Configuração de regras de frete
- Upload de imagens
- Dashboard com estatísticas
- Logs de atividades

**Acesso:** `/admin/login`

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
sonin/
├── app/                      # App Router do Next.js
│   ├── carrinho/            # Página do carrinho
│   ├── contato/             # Página de contato
│   ├── produtos/            # Catálogo e detalhes de produtos
│   ├── sobre/               # Página sobre a empresa
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/              # Componentes reutilizáveis
│   ├── Footer.tsx          # Rodapé
│   ├── Header.tsx          # Cabeçalho e navegação
│   └── ProductCard.tsx     # Card de produto
├── lib/                     # Utilitários e configurações
│   ├── products.ts         # Dados dos produtos (fallback)
│   ├── store.ts            # Estado global (Zustand)
│   └── supabase.ts         # Cliente Supabase
├── supabase/                # Configuração do banco de dados
│   └── schema.sql          # Schema do banco
└── public/                  # Arquivos estáticos
```

## 🎨 Paleta de Cores

- **Primary**: Tons terrosos e neutros (#927253 - #47362b)
- **Accent**: Tons de âmbar (#c27a43 - #633625)
- **Background**: Bege claro (#f5f3f0)

## 📱 Páginas Disponíveis

- `/` - Página inicial com hero banner e produtos em destaque
- `/produtos` - Catálogo completo com filtros
- `/produtos/[id]` - Detalhes do produto
- `/carrinho` - Carrinho de compras
- `/sobre` - História e valores da empresa
- `/contato` - Formulário de contato e informações

## 🛒 Funcionalidades do Carrinho

- Adicionar produtos ao carrinho
- Ajustar quantidades
- Remover produtos
- Cálculo automático de subtotal e frete
- Persistência de estado durante a navegação

## 📝 Notas

Este projeto foi desenvolvido com foco em:
- Performance e otimização
- Experiência do usuário
- Design responsivo
- Código limpo e manutenível
- Type safety com TypeScript

## 📞 Contato

Instagram: [@soninbv](https://www.instagram.com/soninbv)

---

Desenvolvido com ❤️ para proporcionar bem-estar através de fragrâncias artesanais.
