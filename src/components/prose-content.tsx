"use client";

import { useEffect, useRef } from "react";
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

interface ProseContentProps {
  html: string;
  className?: string;
}

export const ProseContent = ({ html, className }: ProseContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Syntax highlight every code block
    container.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });

    // Inject copy buttons
    container.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");

      btn.addEventListener("click", async () => {
        const text =
          pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
