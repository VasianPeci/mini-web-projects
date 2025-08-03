const input = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let str = input.value;

  // Headings: These use the multiline flag (m) so that ^ matches the start of each line.
  const h1regex = /^# (.+)$/gm;
  const h2regex = /^## (.+)$/gm;
  const h3regex = /^### (.+)$/gm;

  // Inline formatting: No starting anchor so they work anywhere in the text.
  // Bold: Matches **text** or __text__
  const boldregex = /\*\*(.+?)\*\*|__(.+?)__/g;
  // Italic: Matches *text* or _text_
  const italicregex = /\*(.+?)\*|_(.+?)_/g;
  // Images: Matches ![alt-text](image-source)
  const imgregex = /!\[([^\]]+)\]\(([^)]+)\)/g;
  // Links: Matches [link-text](link-url)
  const linkregex = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Blockquotes: Again, only at the start of a line.
  const quoteregex = /^> (.+)$/gm;

  // Process in a deliberate order:
  // 1. Headings (h3, h2, h1) so that only lines starting with # become headings.
  // 2. Inline formatting (bold, italic, images, links).
  // 3. Finally, blockquotes wrap the already-formatted content.
  const regexArr = [
    h3regex,
    h2regex,
    h1regex,
    boldregex,
    italicregex,
    imgregex,
    linkregex,
    quoteregex,
  ];
  const htmlArr = [
    "<h3>$1</h3>",
    "<h2>$1</h2>",
    "<h1>$1</h1>",
    // For bold and italic, one of $1 or $2 will be defined depending on which alternative matched.
    "<strong>$1$2</strong>",
    "<em>$1$2</em>",
    '<img alt="$1" src="$2">',
    '<a href="$2">$1</a>',
    "<blockquote>$1</blockquote>",
  ];

  regexArr.forEach((regex, index) => {
    str = str.replace(regex, htmlArr[index]);
  });
  return str;
}

input.addEventListener("input", () => {
  const converted = convertMarkdown();
  // Requirement 7 & 12: The HTML-output element shows the converted result as text.
  htmlOutput.textContent = converted;
  // Requirement 8 & 13: The preview element shows the converted result as actual HTML.
  preview.innerHTML = converted;
});
