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

### Aba "Treinamentos" (Treinamentos VIP)
`titulo | descricao | categoria | imagem | preco | linkHotmart | slug`

- `linkHotmart`: o link de checkout do produto no Hotmart. Enquanto não tiver, deixe como `#` — o site mostra "EM BREVE".

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

## 4. Conectando o domínio ao site (Vercel)

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

## 5. Variáveis de ambiente e deploy

Em **Settings → Environment Variables** no projeto da Vercel, cadastre todas as variáveis
descritas nos itens 1, 2 e 3 deste guia, além de:

```
NEXT_PUBLIC_SITE_URL=https://institutoprevencionista.com.br
```

Depois clique em **Deploy** (ou **Redeploy**, se o site já tinha sido publicado antes de você
cadastrar as variáveis).

## 6. Rotina do dia a dia

- **Adicionar um material, treinamento ou agente novo:** edite a planilha de catálogos (item 1). Não precisa mexer em código.
- **Trocar o link do Hotmart ou de um agente:** edite a célula correspondente na planilha.
- **Ver os leads recebidos:** abra a planilha de Leads (item 2), aba "Leads".
- **Trocar a logo:** substitua o arquivo `public/logo.png` por uma nova imagem com o mesmo nome.
