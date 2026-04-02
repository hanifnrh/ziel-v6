// Helper to decode HTML entities and replace mis‑encoded characters
export function cleanText(text: string): string {
  let result = text.normalize('NFC');
  const replacements: [RegExp, string][] = [
    [/â€œ/g, '“'],      // left double quote
    [/â€/g, '”'],       // right double quote
    [/â€˜/g, '‘'],      // left single quote
    [/â€™/g, '’'],      // right single quote
    [/â€”/g, '—'],      // em dash
    [/â€“/g, '–'],      // en dash
    [/Â/g, ' '],        // non‑breaking space (Â)
    [/â/g, ' '],       // another non‑breaking space variant
    [/&nbsp;/g, ' '],
    [/\u00A0/g, ' '],
    [/&amp;/g, '&'],
    [/&lt;/g, '<'],
    [/&gt;/g, '>'],
    [/&quot;/g, '"'],
    [/&#39;/g, "'"],
    [/&rsquo;/g, "'"],
    [/&mdash;/g, '—'],
    [/&ndash;/g, '–'],
    [/&hellip;/g, '…'],
    [/&ldquo;/g, '“'],
    [/&rdquo;/g, '”'],
    [/&lsquo;/g, '‘'],
    [/&rsquo;/g, '’'],
  ];
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function renderRichText(node: any, renderers: any = {}): string {
  if (!node) return "";
  if (typeof node === "string") return node;

  // Text node with formatting
  if (node.text !== undefined) {
    let text = cleanText(node.text);
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<del>${text}</del>`;
    return text;
  }

  const children = (node.children || [])
    .map((child: any) => renderRichText(child, renderers))
    .join("");

  const type = node.type;
  if (renderers[type]) {
    return renderers[type]({ children, ...node });
  }

  switch (type) {
    case "paragraph":
      return `<p class="text-base sm:text-lg text-neutral-800 text-justify outfit-light tracking-normal leading-6">${children}</p>`;
    case "heading-two":
      return `<h2 class="inline-flex items-center gap-2 text-xl sm:text-4xl outfit-medium text-neutral-900 mt-6">${children}</h2>`;
    case "heading-three":
      return `<h3 class="flex items-center gap-2 text-lg sm:text-2xl outfit-medium text-neutral-900 mt-6"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <circle cx="9" cy="9" r="9" fill="url(#paint0_radial_411_32)"/>
  <circle cx="9" cy="9" r="9" fill="url(#paint1_radial_411_32)"/>
  <defs>
    <radialGradient id="paint0_radial_411_32" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.5 2.5) rotate(70.4633) scale(16.4469)">
      <stop stop-color="#A6E1F6"/>
      <stop offset="1" stop-color="#0044C2"/>
    </radialGradient>
    <radialGradient id="paint1_radial_411_32" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5 12.5) rotate(143.746) scale(9.30054)">
      <stop stop-color="#00BCFF"/>
      <stop offset="1" stop-color="#00BCFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>${children}</h3>`;
    case "heading-four":
      return `<h4 class="text-base sm:text-xl outfit-medium text-neutral-800 mt-6">${children}</h4>`;
    case "bulleted-list":
      return `<ul class="flex flex-col p-4 gap-3 list-disc pl-5">${children}</ul>`;
    case "numbered-list":
      return `<ol class="flex flex-col p-4 gap-3 list-decimal pl-5">${children}</ol>`;
    case "list-item":
      return `<li class="text-base sm:text-lg text-neutral-800 text-justify outfit-light tracking-normal leading-6">${children}</li>`;
    case "code":
      return `<code class="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono">${children}</code>`;
    case "code-block":
      return `<pre class="w-full block bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>${children}</code></pre>`;
    case "link":
    case "a":
      return `<a href="${node.href}" target="_blank" rel="noopener noreferrer" class="outfit-regular text-blue-600 hover:underline">${children}</a>`;
    case "image":
      return `<div class="w-full flex items-center justify-center"><img src="${node.src}" alt="${node.title || "Image"}" class="w-full object-cover rounded-xl my-6" /></div>`;
    default:
      return children;
  }
}