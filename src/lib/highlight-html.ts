import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function highlightHtml(html: string): string {
  return html.replace(
    /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_, attrs: string, encodedCode: string) => {
      const langMatch = attrs.match(/class="language-([^"]+)"/);
      const lang = langMatch?.[1];
      const code = decodeHtmlEntities(encodedCode);

      let highlighted: string;
      let detectedLang = lang ?? "";
      try {
        if (lang && hljs.getLanguage(lang)) {
          const result = hljs.highlight(code, { language: lang });
          highlighted = result.value;
        } else {
          const result = hljs.highlightAuto(code);
          highlighted = result.value;
          detectedLang = result.language ?? "";
        }
      } catch {
        const result = hljs.highlightAuto(code);
        highlighted = result.value;
        detectedLang = result.language ?? "";
      }

      return `<pre><code class="hljs language-${detectedLang}">${highlighted}</code></pre>`;
    }
  );
}
