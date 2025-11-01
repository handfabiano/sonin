# 💳 Guia Completo de Configuração do Stripe

Este guia te ajudará a configurar pagamentos com Stripe na sua loja Sonin.

## 🎯 O que é o Stripe?

O Stripe é a plataforma de pagamentos mais confiável do mundo, usada por milhões de empresas. Com ele você pode:

- ✅ Aceitar cartões de crédito e débito
- ✅ Pagamentos seguros (PCI compliant)
- ✅ Checkout otimizado e responsivo
- ✅ Suporte a múltiplas moedas
- ✅ Proteção contra fraudes
- ✅ Dashboard completo de vendas

## 📋 Pré-requisitos

- Conta no Stripe (gratuita)
- Site já deployado na Vercel
- Supabase configurado

---

## 🚀 PASSO 1: Criar Conta no Stripe

### 1.1 Cadastro

1. Acesse: https://stripe.com/br
2. Clique em **"Começar agora"**
3. Preencha seus dados:
   - E-mail
   - Nome completo
   - Senha
4. Confirme seu e-mail

### 1.2 Ativar Conta

1. Faça login no Stripe Dashboard
2. Vá em **"Ativar conta"** no topo
3. Preencha as informações da sua empresa:
   - CNPJ (se tiver) ou CPF
   - Endereço
   - Dados bancários (para receber os pagamentos)

**IMPORTANTE:**
- Para **testar**, você não precisa ativar a conta!
- Só ative quando for colocar em produção

---

## 🔑 PASSO 2: Obter as Chaves da API

### 2.1 Chaves de Teste (Desenvolvimento)

1. No Stripe Dashboard, clique em **"Developers"** no menu superior
2. Clique em **"API keys"** na barra lateral
3. Você verá duas chaves no modo **TEST**:

```
Publishable key (Chave Pública)
pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Secret key (Chave Secreta)
sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

4. Clique em **"Reveal test key"** para ver a chave secreta
5. Copie ambas as chaves

### 2.2 Adicionar no Projeto

Edite o arquivo `.env.local` na raiz do projeto:

```bash
# STRIPE - Modo Teste
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica_aqui
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
```

**ATENÇÃO:**
- ✅ A chave pública (`pk_test_`) pode ser exposta no frontend
- ❌ A chave secreta (`sk_test_`) NUNCA deve ser compartilhada ou commitada

### 2.3 Testar Localmente

```bash
npm run dev
```

Acesse http://localhost:3000, adicione produtos ao carrinho e teste o checkout!

**Cartões de Teste do Stripe:**
```
Sucesso:
Número: 4242 4242 4242 4242
CVC: Qualquer 3 dígitos
Data: Qualquer data futura

Pagamento requer autenticação 3D Secure:
Número: 4000 0027 6000 3184

Cartão recusado:
Número: 4000 0000 0000 0002
```

Mais cartões: https://stripe.com/docs/testing

---

## 🔔 PASSO 3: Configurar Webhooks (Produção)

Os webhooks permitem que o Stripe avise seu site quando um pagamento é confirmado.

### 3.1 Criar Webhook

1. No Stripe Dashboard, vá em **"Developers"** → **"Webhooks"**
2. Clique em **"Add endpoint"**
3. Configure:

```
Endpoint URL: https://seu-site.vercel.app/api/webhooks/stripe

Events to send:
✅ checkout.session.completed
✅ payment_intent.succeeded
✅ payment_intent.payment_failed
```

4. Clique em **"Add endpoint"**

### 3.2 Obter Signing Secret

1. Após criar o webhook, clique nele
2. Na seção **"Signing secret"**, clique em **"Reveal"**
3. Copie o secret (começa com `whsec_`)

### 3.3 Adicionar na Vercel

1. Vá no dashboard da Vercel
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione:

```
Nome: STRIPE_WEBHOOK_SECRET
Valor: whsec_seu_secret_aqui
Environments: ✅ Production, ✅ Preview
```

5. Clique em **"Save"**
6. Faça um novo deploy (ou aguarde o próximo)

---

## 🎯 PASSO 4: Ativar Modo Produção

Quando estiver pronto para aceitar pagamentos reais:

### 4.1 Ativar Conta

1. Complete o processo de ativação no Stripe
2. Forneça todos os documentos solicitados
3. Aguarde aprovação (geralmente 1-2 dias úteis)

### 4.2 Trocar para Chaves de Produção

1. No Stripe Dashboard, **desative o modo Test** (toggle no topo)
2. Vá em **"Developers"** → **"API keys"**
3. Copie as chaves de **LIVE** (production):

```
pk_live_...
sk_live_...
```

4. Atualize as variáveis de ambiente na Vercel:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_sua_chave
STRIPE_SECRET_KEY=sk_live_sua_chave
```

5. **ATENÇÃO:** Certifique-se de marcar **Production** ao salvar!

### 4.3 Criar Webhook de Produção

1. Com o modo Test desativado, vá em **"Webhooks"**
2. Crie um novo endpoint (igual ao passo 3.1)
3. Copie o novo signing secret
4. Atualize `STRIPE_WEBHOOK_SECRET` na Vercel

---

## 💰 PASSO 5: Receber Pagamentos

### Como Funciona

```
Cliente → Adiciona produtos → Carrinho → Preenche nome/email
→ Clica "Pagar" → Redirecionado para Stripe Checkout
→ Preenche dados do cartão e endereço → Pagamento processado
→ Stripe confirma → Cliente volta para página de sucesso
→ Webhook notifica seu site → Pedido salvo no banco
```

### Taxas do Stripe (Brasil)

- **Cartão nacional:** 3,49% + R$ 0,39 por transação
- **Cartão internacional:** 4,99% + R$ 0,39 por transação
- **Sem mensalidade ou taxa de setup**

### Recebimento

- Pagamentos aprovados caem na sua conta em **2 dias úteis**
- Configure sua conta bancária em **Settings** → **Payouts**

---

## 🧪 PASSO 6: Testar o Fluxo Completo

### Checklist de Testes

- [ ] Adicionar produtos ao carrinho
- [ ] Preencher nome e e-mail
- [ ] Clicar em "Pagar com Cartão"
- [ ] Ser redirecionado para Stripe Checkout
- [ ] Preencher com cartão de teste `4242 4242 4242 4242`
- [ ] Completar o pagamento
- [ ] Ser redirecionado para página de sucesso
- [ ] Verificar se pedido foi salvo no Supabase (tabela `orders`)
- [ ] Verificar no Stripe Dashboard se o pagamento aparece

### Verificar no Stripe

1. Acesse **"Payments"** no Stripe Dashboard
2. Você verá todos os pagamentos
3. Clique em um para ver detalhes

### Verificar no Supabase

1. Acesse Supabase → **Table Editor**
2. Abra tabela **orders**
3. Verifique se o pedido foi criado
4. Abra tabela **order_items**
5. Verifique se os itens foram salvos

---

## 🎨 PASSO 7: Personalizar (Opcional)

### Logo no Checkout

1. No Stripe Dashboard, vá em **Settings** → **Branding**
2. Faça upload do logo da Sonin
3. Escolha a cor de marca
4. O logo aparecerá no Stripe Checkout automaticamente

### E-mails de Confirmação

O Stripe envia e-mails automaticamente, mas você pode:

1. Ir em **Settings** → **Emails**
2. Personalizar os e-mails
3. Adicionar sua marca

---

## 🔒 Segurança

### Boas Práticas

✅ **NUNCA** commite arquivos com chaves secretas
✅ Use `.env.local` (já está no `.gitignore`)
✅ Separe chaves de teste e produção
✅ Rotacione chaves regularmente
✅ Ative 2FA no Stripe Dashboard

### O que o Código Já Faz

- ✅ Valida produtos no backend (não confia no frontend)
- ✅ Busca preços do banco (não aceita preços do cliente)
- ✅ Verifica signature dos webhooks
- ✅ Usa HTTPS em produção
- ✅ Não expõe chaves secretas

---

## 🐛 Troubleshooting

### Erro: "Stripe is not defined"

**Causa:** Variável `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` não está configurada

**Solução:**
1. Verifique se o `.env.local` existe
2. Verifique se a variável está correta
3. Reinicie o servidor: `npm run dev`

### Erro: "Invalid API Key"

**Causa:** Chave do Stripe incorreta ou inválida

**Solução:**
1. Verifique se copiou a chave completa
2. Certifique-se de usar chave de teste (`sk_test_` ou `pk_test_`)
3. Gere novas chaves no Stripe Dashboard

### Webhook não funciona

**Causa:** Signing secret incorreto ou não configurado

**Solução:**
1. Verifique se `STRIPE_WEBHOOK_SECRET` está na Vercel
2. Certifique-se de que o endpoint está correto
3. Teste localmente com Stripe CLI

### Pedido não aparece no banco

**Causa:** Webhook não está sendo recebido

**Solução:**
1. Verifique os logs do webhook no Stripe Dashboard
2. Verifique os logs da Vercel
3. Certifique-se de que o Supabase está configurado

### Teste Localmente com Stripe CLI

```bash
# Instalar Stripe CLI
brew install stripe/stripe-brew/stripe  # Mac
# ou baixe de: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Escutar webhooks localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Em outro terminal, fazer um pagamento de teste
stripe trigger payment_intent.succeeded
```

---

## 📊 Monitoramento

### Dashboard do Stripe

- **Payments:** Ver todos os pagamentos
- **Customers:** Ver clientes
- **Reports:** Relatórios financeiros
- **Logs:** Ver eventos e erros

### Alertas

Configure alertas para:
- Pagamentos falhando acima de X%
- Disputas (chargebacks)
- Atualizações de segurança

---

## 🎓 Próximos Passos

Após configurar o Stripe:

1. ✅ Teste exaustivamente em modo test
2. ✅ Adicione seu logo e cores
3. ✅ Configure webhooks
4. ✅ Ative conta no Stripe
5. ✅ Troque para chaves de produção
6. ✅ Faça sua primeira venda real! 🎉

---

## 📞 Precisa de Ajuda?

**Stripe Support:**
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com

**Problemas com o código:**
- Verifique os logs na Vercel
- Verifique os logs no Stripe Dashboard
- Me avise! 😊

---

## ✅ Checklist Final

Antes de ir para produção:

- [ ] Conta do Stripe ativada
- [ ] Chaves de produção (`pk_live_` e `sk_live_`) configuradas
- [ ] Webhook de produção criado e secret configurado
- [ ] Testado fluxo completo com cartão de teste
- [ ] Verificado que pedidos salvam no banco
- [ ] Logo e branding configurados
- [ ] Dados bancários para recebimento configurados
- [ ] 2FA ativado no Stripe
- [ ] Backup das chaves em local seguro

**Pronto para vender! 🚀💰**
