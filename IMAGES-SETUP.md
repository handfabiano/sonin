# 📸 Guia Completo de Upload e Gerenciamento de Imagens

Este guia mostra como adicionar suas próprias imagens ao site Sonin.

## 🎯 Escolha seu Método

### 📦 Método 1: Pasta Public (Mais Simples)
**Ideal para:** Desenvolvimento local, poucos produtos, começar rápido

### ☁️ Método 2: Supabase Storage (Recomendado para Produção)
**Ideal para:** Produção, muitos produtos, CDN automático, otimização

---

## 📦 MÉTODO 1: Pasta Public (Desenvolvimento)

### Passo 1: Prepare suas Imagens

**Tamanhos Recomendados:**
- Banner Hero: 1920x600px
- Produtos: 800x800px
- Logo: 500x500px

**Ferramentas Online Gratuitas para Redimensionar:**
- https://imageresizer.com
- https://www.iloveimg.com/resize-image
- https://squoosh.app (também comprime)

### Passo 2: Organize as Imagens

Copie suas imagens para as pastas corretas:

```
public/images/
├── banners/
│   └── hero-main.jpg          # Seu banner principal
├── products/
│   ├── vela-lavanda.jpg       # Foto da vela de lavanda
│   ├── vela-amber.jpg         # Foto da vela âmbar
│   ├── oleo-lavanda.jpg       # Foto do óleo de lavanda
│   └── ...
└── logos/
    └── logo.png               # Seu logo
```

### Passo 3: Atualizar Referências no Código

No Supabase, atualize a tabela `products`:

```sql
-- Vá em SQL Editor e execute:
UPDATE products
SET image = '/images/products/vela-lavanda.jpg'
WHERE name = 'Vela Lavanda Serenidade';

UPDATE products
SET image = '/images/products/vela-amber.jpg'
WHERE name = 'Vela Âmbar & Baunilha';

-- Repita para cada produto...
```

Ou use o **Table Editor**:
1. Vá em Table Editor → products
2. Clique na célula da coluna `image`
3. Cole: `/images/products/nome-da-imagem.jpg`

### Passo 4: Atualizar Banner Hero

Edite o arquivo `app/page.tsx` e altere a linha 19:

```typescript
// DE:
src="https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=1920&q=80"

// PARA:
src="/images/banners/hero-main.jpg"
```

---

## ☁️ MÉTODO 2: Supabase Storage (Produção - Recomendado)

### Por que usar Supabase Storage?
- ✅ CDN global automático (carregamento rápido mundial)
- ✅ Otimização automática de imagens
- ✅ Não precisa fazer commit de imagens grandes
- ✅ Fácil de gerenciar e trocar imagens
- ✅ Transformações de imagem on-the-fly

### Passo 1: Criar Bucket no Supabase

1. Acesse seu projeto no Supabase
2. Clique em **Storage** no menu lateral
3. Clique em **"New bucket"**
4. Configure:
   - **Name:** `product-images`
   - **Public bucket:** ✅ (marque como público)
5. Clique em **"Create bucket"**

### Passo 2: Configurar Políticas de Acesso

1. Clique no bucket `product-images`
2. Vá na aba **Policies**
3. Clique em **"New policy"**
4. Selecione **"For full customization"**
5. Configure:

**Policy name:** Public read access
**Allowed operations:** SELECT
**Target roles:** public

**SQL:**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

6. Clique em **"Review"** → **"Save policy"**

### Passo 3: Upload de Imagens

1. No bucket `product-images`, clique em **"Upload file"**
2. Crie pastas:
   - `banners/`
   - `products/`
   - `logos/`
3. Faça upload das suas imagens nas pastas corretas

### Passo 4: Obter URLs

Após fazer upload, clique em cada imagem e copie a **Public URL**.

Exemplo de URL:
```
https://xxxxx.supabase.co/storage/v1/object/public/product-images/products/vela-lavanda.jpg
```

### Passo 5: Atualizar no Banco de Dados

Vá em **Table Editor** → **products** e cole as URLs do Supabase Storage na coluna `image`.

Ou use SQL:
```sql
UPDATE products
SET image = 'https://xxxxx.supabase.co/storage/v1/object/public/product-images/products/vela-lavanda.jpg'
WHERE name = 'Vela Lavanda Serenidade';
```

### Passo 6: Atualizar Next.js Config

Para usar imagens do Supabase, atualize `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Adicione esta linha
      },
    ],
  },
};

export default nextConfig;
```

---

## 🎨 Otimizando suas Imagens

### Antes de fazer Upload

Use estas ferramentas para otimizar (reduzir tamanho sem perder qualidade):

1. **Squoosh** (Recomendado)
   - https://squoosh.app
   - Arraste sua imagem
   - Escolha WebP ou JPEG
   - Ajuste a qualidade para 75-85%
   - Baixe e faça upload

2. **TinyPNG/TinyJPG**
   - https://tinypng.com
   - Upload até 20 imagens por vez
   - Compressão automática

3. **ImageOptim** (Mac)
   - https://imageoptim.com

### Converter para WebP

WebP é mais leve que JPEG/PNG (30-50% menor):

**Online:**
- https://cloudconvert.com/jpg-to-webp
- https://convertio.co/jpg-webp/

**Linha de comando (se tiver instalado):**
```bash
# Instalar
npm install -g webp-converter-cli

# Converter uma imagem
webp-converter vela-lavanda.jpg -o vela-lavanda.webp
```

---

## 📐 Guia de Fotografia de Produtos

### Dicas para Fotos Perfeitas

1. **Iluminação Natural**
   - Fotografe perto de uma janela
   - Evite luz direta do sol
   - Use horários com luz suave (manhã/tarde)

2. **Fundo Neutro**
   - Branco ou bege claro
   - Pode usar papel cartão
   - Sem objetos distraindo

3. **Ângulos**
   - Frontal (principal)
   - 45° (mostra profundidade)
   - Superior (para velas em potes)

4. **Múltiplas Fotos**
   - Principal: produto sozinho
   - Contexto: produto em uso
   - Detalhe: textura, chama acesa

### Exemplo de Setup Caseiro

```
┌─────────────┐
│   Janela    │  ← Luz natural
└─────────────┘
      │
      ▼
┌──────────┐
│ Refletor │  ← Papel branco para rebater luz
│  (papel) │
└──────────┘
      │
    Produto
      │
   Câmera/Celular
```

---

## 📊 Checklist de Imagens Necessárias

### Essenciais (Mínimo)
- [ ] Banner Hero principal (1920x600px)
- [ ] Logo Sonin (500x500px)
- [ ] 8 fotos de produtos (800x800px cada)

### Opcionais (Recomendado)
- [ ] Banner página Sobre (1920x600px)
- [ ] Fotos lifestyle (produtos em uso)
- [ ] Fotos detalhes (chama, textura)
- [ ] Banner promoções
- [ ] Favicon (32x32px)

---

## 🔧 Resolução de Problemas

### Imagem não aparece

1. **Verifique o caminho:**
   ```typescript
   // Correto:
   src="/images/products/vela.jpg"

   // Errado:
   src="images/products/vela.jpg"  // falta a barra inicial
   src="/public/images/vela.jpg"   // não use /public no caminho
   ```

2. **Verifique se fez upload da imagem**

3. **Limpe o cache:**
   ```bash
   # No terminal do projeto
   rm -rf .next
   npm run dev
   ```

### Imagem do Supabase não carrega

1. Verifique se o bucket é público
2. Verifique se a política de leitura está ativa
3. Verifique se adicionou o domínio no `next.config.mjs`

### Imagem muito pesada (demora para carregar)

1. Comprima usando Squoosh ou TinyPNG
2. Converta para WebP
3. Tamanho ideal:
   - Banner: 200-500KB
   - Produto: 100-200KB

---

## 🎯 Próximos Passos

1. ✅ Prepare suas imagens (tire fotos ou colete)
2. ✅ Redimensione para os tamanhos corretos
3. ✅ Otimize (comprima)
4. ✅ Escolha o método (Public ou Supabase Storage)
5. ✅ Faça upload
6. ✅ Atualize as referências
7. ✅ Teste localmente
8. ✅ Faça deploy

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre:
- Como tirar fotos dos produtos
- Qual tamanho usar
- Como fazer upload
- Qualquer outra coisa

**Me avise!** Estou aqui para ajudar! 😊
