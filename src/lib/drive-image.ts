const DRIVE_FILE_ID_PATTERNS = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /[?&]id=([a-zA-Z0-9_-]+)/];

export function resolveImagemUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.includes("drive.google.com")) return trimmed;

  for (const pattern of DRIVE_FILE_ID_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }

  return trimmed;
}
