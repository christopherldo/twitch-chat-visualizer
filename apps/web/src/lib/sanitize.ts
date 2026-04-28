export function sanitizeHTML(str: string | undefined | null): string {
  if (!str) return '';
  
  // Use DOMParser to safely extract inner text
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  let escapedStr = doc.body.innerHTML;

  // Restaura apenas as tags <img> de emotes geradas pelo backend, escapando atributos maliciosos
  escapedStr = escapedStr.replace(
    /&lt;img src=(?:"|&quot;)(https:\/\/(static-cdn\.jtvnw\.net|cdn\.betterttv\.net|cdn\.frankerfacez\.com)[^"&<>]+)(?:"|&quot;)(?: alt=(?:"|&quot;)([^"&<>]+)(?:"|&quot;))? ?\/?&gt;/gi,
    (_match, url, _domain, alt) => {
      const safeAlt = alt ? ` alt="${alt}"` : '';
      return `<img src="${url}"${safeAlt}>`;
    }
  );

  return escapedStr;
}