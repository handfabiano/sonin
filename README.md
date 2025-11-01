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
- **Next/Image** - Otimização automática de imagens

## 🚀 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo de desenvolvimento:**
```bash
npm run dev
```

3. **Abrir no navegador:**
```
http://localhost:3000
```

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
│   ├── products.ts         # Dados dos produtos
│   └── store.ts            # Estado global (Zustand)
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
