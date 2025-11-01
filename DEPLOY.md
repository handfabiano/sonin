# 🚀 Guia de Deploy - Vercel + Supabase

Este guia irá ajudá-lo a fazer o deploy da loja Sonin na Vercel com banco de dados Supabase.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Supabase](https://supabase.com)
- Git instalado
- Node.js instalado

## 🗄️ Passo 1: Configurar o Supabase

### 1.1 Criar o Banco de Dados

1. Acesse [supabase.com](https://supabase.com)
2. Faça login e clique em "New Project"
3. Escolha um nome para o projeto (ex: "sonin-db")
4. Escolha uma senha forte
5. Selecione a região mais próxima
6. Aguarde a criação do projeto (2-3 minutos)

### 1.2 Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor** (ícone de documento na barra lateral)
2. Clique em **+ New query**
3. Copie todo o conteúdo do arquivo `supabase/schema.sql` deste projeto
4. Cole no editor SQL
5. Clique em **Run** (ou pressione Ctrl+Enter)
6. Aguarde a confirmação "Success. No rows returned"

Isso irá:
- ✅ Criar as tabelas: `products`, `orders`, `order_items`, `newsletter_subscribers`
- ✅ Inserir 8 produtos iniciais (4 velas + 4 óleos)
- ✅ Configurar Row Level Security (RLS) para segurança
- ✅ Criar índices para performance

### 1.3 Obter as Credenciais

1. No painel do Supabase, vá em **Project Settings** (ícone de engrenagem)
2. Clique em **API** na barra lateral
3. Você verá duas informações importantes:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **GUARDE ESSAS INFORMAÇÕES** - você precisará delas no próximo passo

## 🌐 Passo 2: Deploy na Vercel

### 2.1 Preparar o Repositório

1. Certifique-se de que o código está commitado:
```bash
git add .
git commit -m "Preparar para deploy"
git push
```

### 2.2 Importar Projeto na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Add New** → **Project**
3. Importe seu repositório do GitHub
4. Configure o projeto:

**Framework Preset:** Next.js
**Root Directory:** ./
**Build Command:** `npm run build` (padrão)
**Output Directory:** `.next` (padrão)

### 2.3 Configurar Variáveis de Ambiente

Na seção **Environment Variables**, adicione:

```
Nome: NEXT_PUBLIC_SUPABASE_URL
Valor: [cole o Project URL do Supabase]

Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: [cole o anon key do Supabase]
```

**IMPORTANTE:** Marque todas as opções: Production, Preview e Development

### 2.4 Fazer o Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-4 minutos)
3. ✅ Seu site estará no ar!

## 🎉 Passo 3: Verificar o Deploy

Após o deploy, você receberá um link tipo: `https://sonin-xxx.vercel.app`

Acesse e verifique:
- ✅ Página inicial carrega
- ✅ Produtos aparecem no catálogo
- ✅ É possível ver detalhes dos produtos
- ✅ Carrinho funciona
- ✅ Navegação funciona

## 🔧 Desenvolvimento Local

Para rodar localmente com o Supabase:

1. Crie um arquivo `.env.local` na raiz do projeto:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse: `http://localhost:3000`

## 🎨 Customizar o Site

### Adicionar/Editar Produtos

1. Acesse o Supabase
2. Vá em **Table Editor** → **products**
3. Clique em **Insert row** ou edite produtos existentes
4. As mudanças aparecerão imediatamente no site!

### Adicionar Suas Próprias Imagens

1. Faça upload das imagens em um serviço como:
   - [Cloudinary](https://cloudinary.com)
   - [Imgur](https://imgur.com)
   - [ImageKit](https://imagekit.io)

2. Copie a URL da imagem
3. Atualize o campo `image` no Supabase

### Mudar Cores e Estilos

Edite o arquivo `tailwind.config.ts` para personalizar as cores:

```typescript
colors: {
  primary: {
    // Suas cores aqui
  },
  accent: {
    // Suas cores aqui
  },
}
```

## 🔒 Segurança

As configurações de RLS (Row Level Security) garantem que:
- ✅ Todos podem **ler** produtos
- ✅ Todos podem **criar** pedidos
- ❌ Ninguém pode **editar ou deletar** dados sem permissão

Para gerenciar produtos através de um admin panel, você precisará:
1. Criar autenticação de administrador
2. Adicionar políticas RLS para admins
3. Criar páginas de administração

## 📊 Monitoramento

### Vercel Analytics
- Acesse o dashboard da Vercel para ver métricas de performance
- Ative o Vercel Analytics para insights de usuários

### Supabase Logs
- Acesse **Logs** no Supabase para ver queries executados
- Monitore o uso no **Database** → **Usage**

## 🆘 Problemas Comuns

### Erro: "supabaseUrl is required"
- Verifique se as variáveis de ambiente estão configuradas corretamente na Vercel
- Certifique-se de ter feito redeploy após adicionar as variáveis

### Produtos não aparecem
- Verifique se executou o schema.sql no Supabase
- Confira no Table Editor se os produtos estão lá
- Veja os logs no navegador (F12 → Console)

### Build falhou na Vercel
- Verifique os logs de build
- Certifique-se de que o `package.json` está correto
- Tente fazer build localmente: `npm run build`

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs na Vercel
2. Verifique os logs no Supabase
3. Consulte a documentação:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

## 🎯 Próximos Passos

Após o deploy básico, considere adicionar:
- 🔐 Sistema de autenticação para área administrativa
- 💳 Integração com gateway de pagamento (Stripe, Mercado Pago)
- 📧 Envio automático de emails de confirmação
- 📱 App mobile com React Native
- 🔍 SEO melhorado com metadata dinâmica
- 📊 Dashboard de administração para gerenciar pedidos
- 🎨 Upload de imagens direto para o Supabase Storage

---

**🎉 Parabéns! Sua loja está no ar!**
