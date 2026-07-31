// Cole este código em Extensions > Apps Script na sua planilha de LEADS.
// Depois publique como Web App (veja o passo a passo em README-PT.md).

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
    sheet.appendRow([
      "Data/Hora",
      "Formulário",
      "Nome",
      "E-mail",
      "WhatsApp",
      "Cidade",
      "Detalhes",
    ]);
  }

  var payload = JSON.parse(e.postData.contents);

  sheet.appendRow([
    payload.dataHora || new Date().toISOString(),
    payload.formulario || "",
    payload.nome || "",
    payload.email || "",
    payload.whatsapp || "",
    payload.cidade || "",
    JSON.stringify(payload.detalhes || {}),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
