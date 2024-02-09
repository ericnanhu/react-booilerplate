"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

type CodeBlockProps = {
  children: React.ReactNode;
  language: string;
};

export default function CodeBlock({ children, language }: CodeBlockProps) {
  console.log(children);
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        borderRadius: "10px",
        fontSize: "0.85rem",
      }}
      showLineNumbers>
      {Array.isArray(children) ? children : [children]}
    </SyntaxHighlighter>
  );
}
