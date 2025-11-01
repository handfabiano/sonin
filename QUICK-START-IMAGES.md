# 🚀 Guia Rápido: Adicione Suas Imagens em 5 Minutos

## 📸 Onde suas imagens vão aparecer?

```
┌─────────────────────────────────────────────┐
│  [LOGO]    Início  Produtos  Sobre  🛒     │  ← Header (logo aqui)
├─────────────────────────────────────────────┤
│                                             │
│        ╔═══════════════════════════╗        │
│        ║                           ║        │
│        ║   BANNER HERO PRINCIPAL   ║        │  ← Banner Principal
│        ║     (1920x600px)          ║        │
│        ║                           ║        │
│        ╚═══════════════════════════╝        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   Produtos em Destaque                      │
│                                             │
│   ┌────┐  ┌────┐  ┌────┐  ┌────┐          │
│   │ 📦 │  │ 📦 │  │ 📦 │  │ 📦 │          │  ← Fotos dos Produtos
│   └────┘  └────┘  └────┘  └────┘          │     (800x800px cada)
│                                             │
└─────────────────────────────────────────────┘
```

## 🎯 MÉTODO RÁPIDO (Para Começar Agora)

### Passo 1: Prepare Suas Imagens

Você vai precisar de:
- **1 Banner** para o hero (1920x600px ou similar)
- **8 Fotos de Produtos** (800x800px ou quadradas)
- **1 Logo** (opcional, 500x500px)

### Passo 2: Coloque as Imagens na Pasta Certa

```bash
# Estrutura de pastas (já criadas para você):
public/images/
├── banners/
│   └── hero-main.jpg          ← Cole seu banner aqui
├── products/
│   ├── vela-lavanda.jpg       ← Cole fotos dos produtos aqui
│   ├── vela-amber.jpg
│   ├── vela-eucalipto.jpg
│   ├── vela-cerejeira.jpg
│   ├── vela-sandalo.jpg
│   ├── oleo-lavanda.jpg
│   ├── oleo-eucalipto.jpg
│   └── oleo-tea-tree.jpg
└── logos/
    └── logo.png               ← Cole seu logo aqui (opcional)
```

**COMO FAZER:**
1. Abra a pasta do projeto
2. Vá em `public/images/`
3. Cole suas imagens nas subpastas corretas
4. Renomeie conforme os nomes acima

### Passo 3: Atualizar Banner Principal

Edite o arquivo `app/page.tsx`:

1. Abra `app/page.tsx` no editor
2. Procure a linha 19 (tem `hero-banner`)
3. Mude de:
   ```typescript
   src="https://images.unsplash.com/photo-1602874801007..."
   ```
   Para:
   ```typescript
   src="/images/banners/hero-main.jpg"
   ```

### Passo 4: Atualizar Produtos no Supabase

Depois de fazer deploy e criar o banco de dados:

1. Acesse Supabase → **Table Editor** → **products**
2. Clique em cada linha na coluna `image`
3. Mude para: `/images/products/nome-do-arquivo.jpg`

**Exemplo:**
```
Produto: Vela Lavanda Serenidade
Coluna image: /images/products/vela-lavanda.jpg
```

### Passo 5: Teste!

```bash
npm run dev
```

Abra http://localhost:3000 e veja suas imagens!

---

## 📐 Tamanhos de Imagem Recomendados

### Banner Hero Principal
- **Tamanho:** 1920x600px (ou proporção 3:1)
- **Formato:** JPG ou WebP
- **Peso:** Máximo 500KB (comprima se necessário)

### Produtos
- **Tamanho:** 800x800px (quadrado)
- **Formato:** JPG ou WebP
- **Peso:** Máximo 200KB cada
- **Fundo:** Branco ou transparente (PNG)

### Logo (Opcional)
- **Tamanho:** 500x500px
- **Formato:** PNG (com fundo transparente)
- **Peso:** Máximo 100KB

---

## 🎨 Não Tem as Imagens Ainda?

### Opção 1: Tire Fotos com Celular

**Setup Simples:**
1. Coloque o produto em superfície branca
2. Fotografe perto de uma janela (luz natural)
3. Use modo retrato se tiver
4. Tire várias fotos de ângulos diferentes

**Apps para Editar (Grátis):**
- **iOS:** Snapseed, VSCO
- **Android:** Snapseed, Adobe Lightroom Mobile

### Opção 2: Use Placeholders Temporários

O site já vem com imagens placeholder do Unsplash. Você pode:
- Deixar as imagens atuais enquanto prepara as suas
- Trocar depois quando tiver as fotos prontas

### Opção 3: Contratar Fotógrafo

Se quiser qualidade profissional:
- Busque fotógrafos de produto na sua cidade
- Mostre referências (tipo Pinterest "product photography")
- Peça pacote de 10-15 fotos

---

## 🛠️ Ferramentas Online Gratuitas

### Redimensionar Imagens
- **ImageResizer:** https://imageresizer.com
- **ILoveIMG:** https://www.iloveimg.com/resize-image
- **Squoosh:** https://squoosh.app (melhor para comprimir também)

### Remover Fundo
- **Remove.bg:** https://www.remove.bg
- **PhotoRoom:** https://www.photoroom.com

### Comprimir (Deixar Mais Leve)
- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app
- **Compressor.io:** https://compressor.io

### Como Usar:
1. Acesse o site
2. Arraste sua imagem
3. Baixe a versão otimizada
4. Cole na pasta `public/images/`

---

## ✅ Checklist Rápido

- [ ] Tenho 1 banner hero (1920x600px ou similar)
- [ ] Tenho 8 fotos de produtos (quadradas)
- [ ] Coloquei as imagens em `public/images/banners/` e `public/images/products/`
- [ ] Renomeei os arquivos corretamente
- [ ] Atualizei o banner em `app/page.tsx`
- [ ] Testei com `npm run dev`
- [ ] Depois do deploy, vou atualizar as URLs no Supabase

---

## 🆘 Precisa de Ajuda?

**Tenho as imagens mas não sei onde colocar:**
→ Veja a seção "Passo 2" acima

**Minhas imagens não aparecem:**
→ Verifique se os nomes dos arquivos estão corretos
→ Limpe o cache: `rm -rf .next && npm run dev`

**Imagem muito grande/pesada:**
→ Use https://squoosh.app para comprimir

**Não sei tirar boas fotos:**
→ Veja dicas na seção "Opção 1: Tire Fotos com Celular"

**Quero ajuda profissional:**
→ Me avise! Posso dar mais dicas! 😊

---

## 🎯 Próximo Passo

Depois de adicionar as imagens:
1. Teste localmente (`npm run dev`)
2. Se estiver tudo ok, faça o deploy
3. No Supabase, atualize as URLs dos produtos
4. Pronto! 🎉

**Quer usar Supabase Storage ao invés de pasta public?**
→ Veja o guia completo em `IMAGES-SETUP.md`
