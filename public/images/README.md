# Estrutura de Imagens

Esta pasta contém todas as imagens do site.

## 📁 Organização

```
public/images/
├── banners/          # Banners do hero e promoções
│   ├── hero-main.jpg
│   └── hero-about.jpg
├── products/         # Fotos dos produtos
│   ├── vela-lavanda.jpg
│   ├── vela-amber-baunilha.jpg
│   └── ...
└── logos/           # Logos e ícones
    └── logo-sonin.png
```

## 📐 Tamanhos Recomendados

### Banners Hero
- **Tamanho:** 1920x600px
- **Formato:** JPG ou WebP
- **Qualidade:** Alta (80-90%)
- **Uso:** Página inicial, página sobre

### Produtos
- **Tamanho:** 800x800px (quadrado)
- **Formato:** JPG ou WebP
- **Fundo:** Branco ou transparente (PNG)
- **Qualidade:** Média-Alta (70-80%)

### Logos
- **Tamanho:** 500x500px
- **Formato:** PNG (com transparência)
- **Uso:** Header, footer, favicon

## 🎯 Nomenclatura

Use nomes descritivos e sem espaços:
- ✅ `vela-lavanda-serenidade.jpg`
- ✅ `oleo-essencial-eucalipto.jpg`
- ✅ `banner-hero-principal.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `foto produto.jpg`

## 🚀 Como Adicionar Imagens

### Opção 1: Pasta Public (Desenvolvimento)

1. Copie suas imagens para as pastas apropriadas
2. Referencie no código: `/images/products/nome-produto.jpg`

### Opção 2: Supabase Storage (Produção)

Veja o arquivo `IMAGES-SETUP.md` para instruções completas.

## 📝 Placeholder

Enquanto não tiver as imagens finais, o site usa imagens do Unsplash como placeholder.
