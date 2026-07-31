export type LeadPayload = {
  formulario: "biblioteca" | "consultoria" | "presencial";
  nome: string;
  email: string;
  whatsapp: string;
  cidade?: string;
  detalhes: Record<string, string>;
};

export async function saveLead(payload: LeadPayload): Promise<void> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(
      "LEADS_WEBHOOK_URL não configurada — lead não foi salvo na planilha:",
      payload
    );
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, dataHora: new Date().toISOString() }),
  });

  if (!response.ok) {
    throw new Error(`Falha ao salvar lead na planilha (${response.status})`);
  }
}

export async function sendMaterialEmail(params: {
  toEmail: string;
  nome: string;
  materialTitulo: string;
  linkDrive: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.warn(
      "RESEND_API_KEY ou RESEND_FROM_EMAIL não configurados — e-mail de material não enviado."
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: fromEmail,
    to: params.toEmail,
    subject: `Seu material: ${params.materialTitulo}`,
    html: `
      <p>Olá, ${params.nome}!</p>
      <p>Obrigado pelo interesse. Segue o link para acessar o material <strong>${params.materialTitulo}</strong>:</p>
      <p><a href="${params.linkDrive}">${params.linkDrive}</a></p>
      <p>Instituto Prevencionista</p>
    `,
  });
}
