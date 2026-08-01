# Instituto Prevencionista — Guia de Configuração

Este guia explica, passo a passo e sem termos técnicos, como deixar o site 100% funcional.
Você não precisa programar nada — só criar algumas planilhas e contas gratuitas.

## 1. Planilha dos catálogos (Materiais, Treinamentos, Agentes)

Crie **uma planilha do Google** com 3 abas: `Materiais`, `Treinamentos` e `Agentes`.

### Aba "Materiais" (Biblioteca Gratuita)
Colunas na primeira linha, exatamente assim:

`titulo | descricao | categoria | imagem | linkDrive | slug`

- `linkDrive`: o link do Google Drive do material (pode deixar o arquivo como "qualquer pessoa com o link pode visualizar").
- `slug`: pode deixar em branco — o site gera automaticamente a partir do título.

### Aba "Treinamentos" (Biblioteca Premium)
`titulo | descricao | categoria | imagem | slug`

- A Biblioteca Premium é vendida como **assinatura única** (não por treinamento individual). Essa aba só alimenta a vitrine "O que está incluso" na página — o preço e o link de assinatura ficam configurados à parte (veja item 6).

### Aba "Agentes" (Agentes de IA)
`nome | descricao | categoria | imagem | link | slug`

- `link`: o link de acesso ao agente.

### Publicando cada aba como CSV
Para o site conseguir ler cada aba automaticamente:

1. Abra a planilha, selecione a aba (ex: `Materiais`).
2. Menu **Arquivo → Compartilhar → Publicar na web**.
3. Em "Link", escolha a aba específica (ex: `Materiais`) e o formato **Valores separados por vírgula (.csv)**.
4. Clique em **Publicar** e copie o link gerado.
5. Repita para as abas `Treinamentos` e `Agentes`.

Você vai ter 3 links — um para cada aba. Eles vão nas variáveis de ambiente:

```
SHEETS_MATERIAIS_CSV_URL=<link da aba Materiais>
SHEETS_TREINAMENTOS_CSV_URL=<link da aba Treinamentos>
SHEETS_AGENTES_CSV_URL=<link da aba Agentes>
```

**Para adicionar ou editar itens no futuro:** basta abrir essa planilha e editar a linha — o site atualiza sozinho em até alguns minutos, sem precisar mexer em nada mais.

## 2. Planilha de Leads (formulários)

Crie **outra planilha do Google**, só para receber os contatos enviados nos formulários (Biblioteca, Consultoria e Presencial).

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague o conteúdo padrão e cole o código do arquivo [`google-apps-script/leads-webapp.gs`](./google-apps-script/leads-webapp.gs) deste projeto.
3. Clique em **Implantar → Nova implantação**.
4. Tipo: **App da Web**.
5. Em "Quem pode acessar", escolha **Qualquer pessoa**.
6. Clique em **Implantar** e autorize o acesso quando solicitado.
7. Copie a **URL do app da Web** gerada — essa é a variável:

```
LEADS_WEBHOOK_URL=<url gerada>
```

Toda vez que alguém preencher um formulário no site, uma linha nova aparece automaticamente nessa planilha, na aba "Leads".

> Sempre que você editar o código do Apps Script, é preciso fazer **Implantar → Gerenciar implantações → Editar → Nova versão** para a mudança valer.

## 3. E-mail automático (Resend)

Usado para enviar o link do material gratuito por e-mail assim que alguém preenche o formulário da Biblioteca.

Seu domínio é `institutoprevencionista.com.br`, registrado no Registro.br. Para o Resend enviar
e-mails como `contato@institutoprevencionista.com.br`, você precisa "provar" pra ele que é dono
desse domínio, adicionando alguns registros no painel do Registro.br.

1. Crie uma conta gratuita em [resend.com](https://resend.com).
2. No painel do Resend, vá em **Domains → Add Domain** e digite `institutoprevencionista.com.br`.
3. O Resend vai mostrar uma lista de registros (geralmente do tipo `TXT` e `CNAME`) com nome e valor.
4. Entre no [Registro.br](https://registro.br), na área do seu domínio, procure por **"Editar Zona"**
   ou **"DNS"**.
5. Adicione, um por um, exatamente os registros que o Resend mostrou (mesmo nome, mesmo tipo,
   mesmo valor).
6. Volte ao Resend e clique em **Verify** — pode levar de alguns minutos a algumas horas para
   confirmar (propagação de DNS).
7. Depois de verificado, vá em **API Keys → Create API Key** e copie o valor gerado:

```
RESEND_API_KEY=<sua api key>
RESEND_FROM_EMAIL=contato@institutoprevencionista.com.br
```

> Enquanto o domínio não estiver verificado no Resend, o site continua funcionando normalmente —
> só não envia o e-mail automático (o link também aparece na tela na hora, então ninguém fica sem
> acesso).

## 4. Login da área de Agentes Inteligentes (Supabase)

Para evitar que os links dos Agentes Inteligentes sejam repassados por WhatsApp ou e-mail, essa
página exige login. O login é feito só com e-mail (sem senha): a pessoa digita o e-mail, recebe
um link por e-mail e clica para entrar. Só entra quem você convidar antes.

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e um novo projeto (não pede
   cartão de crédito).
2. No painel do projeto, vá em **Authentication → Sign In / Providers → Email** e **desmarque**
   a opção "Allow new users to sign up". Assim, só quem for convidado consegue entrar.
3. Vá em **Settings → API** e copie o **Project URL** e a **anon public key**. Essas são as
   variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<Project URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
   ```
4. **Para liberar o acesso de alguém à área:** vá em **Authentication → Users → Invite user**,
   digite o e-mail da pessoa e confirme. Ela recebe um e-mail automático com o link de acesso.
   Isso só libera o *login* — o item 5 explica como liberar quais agentes essa pessoa pode ver.
5. **Para revogar o acesso de alguém:** na mesma tela, encontre o usuário e exclua o cadastro.

## 5. Liberar o plano de cada pessoa (página /admin/acessos)

Entrar no site não é suficiente para ver os agentes — cada pessoa só vê os agentes do plano
(tier) que ela comprou, ou os agentes avulsos que comprou individualmente. Isso é controlado numa
página interna, separada do Supabase.

1. Vá em **Settings → API** no painel do Supabase e copie a chave **service_role** (é diferente da
   anon public key do item 4 — essa aqui é secreta, nunca compartilhe). Cadastre a variável:
   ```
   SUPABASE_SERVICE_ROLE_KEY=<service_role key>
   ADMIN_EMAIL=institutoprevencionista@gmail.com
   ```
2. No Supabase, vá em **SQL Editor → New query**, cole e rode o SQL abaixo uma única vez (cria a
   tabela que guarda o plano de cada pessoa):
   ```sql
   create table public.user_access (
     user_id uuid primary key references auth.users(id) on delete cascade,
     tier text check (tier in ('essencial','profissional','premium','empresa')),
     agent_slugs text[] not null default '{}',
     updated_at timestamptz not null default now()
   );

   alter table public.user_access enable row level security;

   create policy "Users can read own access"
     on public.user_access for select
     using (auth.uid() = user_id);
   ```
3. **Depois de convidar alguém (item 4) e ela receber uma venda na Hotmart:** entre logado como
   `ADMIN_EMAIL` em `institutoprevencionista.com.br/admin/acessos`, encontre o e-mail da pessoa,
   escolha o plano (Essencial/Profissional/Premium/Empresa) — ou, se ela comprou só um agente
   avulso, marque só aquele agente na lista — e clique em **Salvar**.

> Sem plano e sem agente avulso marcado, a pessoa fica logada mas não vê nenhum agente liberado —
> é o comportamento esperado enquanto você não configura o acesso dela.

## 6. Assinatura da Biblioteca Premium (Hotmart)

A Biblioteca Premium é uma assinatura anual única (não é vendida treinamento por treinamento).

1. Configure o produto de assinatura na Hotmart (preço, cupom de lançamento, etc).
2. Pegue o **link de checkout** do produto (Links de divulgação → Página de Vendas).
3. Cadastre a variável:
   ```
   NEXT_PUBLIC_BIBLIOTECA_PREMIUM_CHECKOUT_URL=<link de checkout>
   ```

> Enquanto essa variável não estiver configurada, o site mostra o botão "Em breve" na página da
> Biblioteca Premium.

## 7. Conectando o domínio ao site (Vercel)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com) e importe este projeto (via GitHub,
   ou enviando a pasta).
2. No projeto, vá em **Settings → Domains → Add** e digite `institutoprevencionista.com.br`
   (e, se quiser, `www.institutoprevencionista.com.br` também).
3. A Vercel vai mostrar um ou dois registros para adicionar (geralmente um `A` para o domínio
   principal e um `CNAME` para o `www`).
4. Volte ao **Registro.br**, na mesma área de **"Editar Zona"/DNS** onde você mexeu para o Resend,
   e adicione esses registros também.
5. Aguarde a propagação (a Vercel avisa automaticamente quando o domínio fica ativo — pode levar
   de minutos a algumas horas).

## 8. Variáveis de ambiente e deploy

Em **Settings → Environment Variables** no projeto da Vercel, cadastre todas as variáveis
descritas nos itens 1, 2, 3, 4, 5 e 6 deste guia, além de:

```
NEXT_PUBLIC_SITE_URL=https://institutoprevencionista.com.br
```

Depois clique em **Deploy** (ou **Redeploy**, se o site já tinha sido publicado antes de você
cadastrar as variáveis).

## 9. Rotina do dia a dia

- **Adicionar um material, treinamento ou agente novo:** edite a planilha de catálogos (item 1). Não precisa mexer em código.
- **Trocar o link de um agente:** edite a célula correspondente na planilha.
- **Trocar o link de checkout ou o preço da Biblioteca Premium:** ajuste direto na Hotmart e, se o link mudar, atualize `NEXT_PUBLIC_BIBLIOTECA_PREMIUM_CHECKOUT_URL` (item 6).
- **Convidar alguém pra fazer login nos Agentes Inteligentes:** painel do Supabase → Authentication → Users → Invite user (item 4).
- **Liberar o plano/agentes de alguém depois de uma venda na Hotmart:** `institutoprevencionista.com.br/admin/acessos` (item 5).
- **Ver os leads recebidos:** abra a planilha de Leads (item 2), aba "Leads".
- **Trocar a logo:** substitua o arquivo `public/logo.png` por uma nova imagem com o mesmo nome.
