-- =====================================================
-- CONFIGURAÇÃO DO SUPABASE STORAGE
-- Execute este script DEPOIS de executar schema.sql
-- =====================================================

-- Criar bucket para imagens de produtos (público)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política: Permitir leitura pública de todas as imagens
CREATE POLICY "Public read access for product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Política: Permitir upload de imagens (autenticado)
-- NOTA: Para produção, você vai querer restringir isto apenas a admins
-- Por enquanto, permite qualquer usuário autenticado fazer upload
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Política: Permitir atualização de imagens (autenticado)
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Política: Permitir deleção de imagens (autenticado)
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- =====================================================
-- FUNÇÃO HELPER: Obter URL pública de uma imagem
-- =====================================================

CREATE OR REPLACE FUNCTION get_product_image_url(image_path text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  base_url text;
BEGIN
  -- Obter a URL base do projeto
  SELECT
    CONCAT(
      current_setting('request.headers')::json->>'host',
      '/storage/v1/object/public/product-images/'
    )
  INTO base_url;

  RETURN CONCAT(base_url, image_path);
END;
$$;

-- =====================================================
-- ESTRUTURA DE PASTAS RECOMENDADA
-- =====================================================

/*
Organize suas imagens no bucket assim:

product-images/
├── banners/
│   ├── hero-main.jpg
│   ├── hero-main.webp
│   ├── about-banner.jpg
│   └── about-banner.webp
├── products/
│   ├── candles/
│   │   ├── vela-lavanda.jpg
│   │   ├── vela-lavanda.webp
│   │   ├── vela-amber-baunilha.jpg
│   │   └── ...
│   └── oils/
│       ├── oleo-lavanda.jpg
│       ├── oleo-lavanda.webp
│       └── ...
└── logos/
    ├── logo.png
    ├── logo.svg
    └── favicon.ico

IMPORTANTE:
- Use WebP quando possível (menor tamanho)
- Mantenha também JPG/PNG como fallback
- Use nomes descritivos sem espaços
- Organize por categoria
*/

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================

/*
1. SEGURANÇA PARA PRODUÇÃO:
   Se você quiser que APENAS administradores façam upload/edição,
   remova as políticas de INSERT/UPDATE/DELETE acima e crie
   um sistema de autenticação com roles.

2. OTIMIZAÇÃO:
   O Supabase oferece transformação de imagens on-the-fly.
   Exemplo de URL:
   https://xxx.supabase.co/storage/v1/render/image/public/product-images/products/vela.jpg?width=800&quality=80

3. CACHE:
   As imagens são automaticamente cacheadas no CDN do Supabase.

4. TAMANHO MÁXIMO:
   Por padrão, o limite é 50MB por arquivo.
   Para produtos, mantenha < 500KB por imagem.
*/
