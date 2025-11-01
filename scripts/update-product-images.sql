-- =====================================================
-- SCRIPT PARA ATUALIZAR IMAGENS DOS PRODUTOS
-- =====================================================
-- Use este script para atualizar as URLs das imagens
-- após fazer upload no Supabase Storage ou pasta public
-- =====================================================

-- IMPORTANTE: Substitua 'SEU_PROJETO_URL' pela URL real do seu projeto Supabase
-- Exemplo: https://abcdefghijk.supabase.co

-- =====================================================
-- OPÇÃO 1: Usando Supabase Storage (Produção)
-- =====================================================

-- Velas Aromáticas
UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/candles/vela-lavanda.jpg'
WHERE name = 'Vela Lavanda Serenidade';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/candles/vela-amber-baunilha.jpg'
WHERE name = 'Vela Âmbar & Baunilha';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/candles/vela-eucalipto-menta.jpg'
WHERE name = 'Vela Eucalipto & Menta';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/candles/vela-flor-cerejeira.jpg'
WHERE name = 'Vela Flor de Cerejeira';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/candles/vela-sandalo-patchouli.jpg'
WHERE name = 'Vela Sândalo & Patchouli';

-- Óleos Essenciais
UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/oils/oleo-lavanda.jpg'
WHERE name = 'Óleo Essencial Lavanda';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/oils/oleo-eucalipto.jpg'
WHERE name = 'Óleo Essencial Eucalipto';

UPDATE products
SET image = 'https://SEU_PROJETO_URL.supabase.co/storage/v1/object/public/product-images/products/oils/oleo-tea-tree.jpg'
WHERE name = 'Óleo Essencial Tea Tree';

-- =====================================================
-- OPÇÃO 2: Usando Pasta Public (Desenvolvimento Local)
-- =====================================================

/*
-- Descomente as linhas abaixo se estiver usando pasta public

-- Velas Aromáticas
UPDATE products SET image = '/images/products/vela-lavanda.jpg' WHERE name = 'Vela Lavanda Serenidade';
UPDATE products SET image = '/images/products/vela-amber-baunilha.jpg' WHERE name = 'Vela Âmbar & Baunilha';
UPDATE products SET image = '/images/products/vela-eucalipto-menta.jpg' WHERE name = 'Vela Eucalipto & Menta';
UPDATE products SET image = '/images/products/vela-flor-cerejeira.jpg' WHERE name = 'Vela Flor de Cerejeira';
UPDATE products SET image = '/images/products/vela-sandalo-patchouli.jpg' WHERE name = 'Vela Sândalo & Patchouli';

-- Óleos Essenciais
UPDATE products SET image = '/images/products/oleo-lavanda.jpg' WHERE name = 'Óleo Essencial Lavanda';
UPDATE products SET image = '/images/products/oleo-eucalipto.jpg' WHERE name = 'Óleo Essencial Eucalipto';
UPDATE products SET image = '/images/products/oleo-tea-tree.jpg' WHERE name = 'Óleo Essencial Tea Tree';
*/

-- =====================================================
-- Verificar se as atualizações funcionaram
-- =====================================================

SELECT id, name, image
FROM products
ORDER BY category, name;
