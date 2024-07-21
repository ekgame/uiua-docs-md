import { DOMParser, Element, nodesFromString } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { NodeHtmlMarkdown } from "https://esm.sh/node-html-markdown@1.3.0";

const INPUT_DIR = "html/";

interface ConvertedFile {
  url: string;
  markdown: string;
}

async function convertHtmlToMarkdown(filename: string): Promise<ConvertedFile> {
  // Step 1: Load the file
  const fileContent = await Deno.readTextFile(filename);

  // Step 2: Strip the file header
  const [header, ...rest] = fileContent.split("---\n\n");
  const htmlContent = rest.join("---\n\n"); // In case there are other "---" in the content

  // Step 3: Parse the HTML to a document tree
  const document = new DOMParser().parseFromString(htmlContent, "text/html");
  if (!document) {
    throw new Error("Failed to parse HTML");
  }

  // Remove header
  document.querySelector('#header')?.remove();

  document.querySelectorAll('a[href="/blog"][aria-current="page"]').forEach(a => {
    (a as Element).remove();
  });

  document.querySelectorAll('p').forEach(p => {
    if (p.textContent.startsWith("This post is available in lightweight")) {
      (p as Element).remove();
    }
  });

  document.querySelectorAll('a').forEach(a => {
    if (a.textContent.includes("Back to Docs Home")) {
      (a as Element).remove();
    }
  });

  document.querySelectorAll('.tutorial-nav').forEach(h2 => {
    (h2 as Element).remove();
  });

  if (filename.endsWith('/docs.html')) {
    document.querySelector('#functions')?.remove();
    const searchWrapper = document.querySelector('#function-search-wrapper');
    if (searchWrapper) {
      (searchWrapper.parentNode as Element)?.querySelector('table')?.remove();
      searchWrapper.remove();
    }
  } else if (filename.includes('/docs_')) {
    const search = document.querySelector('#function-search-wrapper');
    if (search) {
      while (search.previousElementSibling) {
        search.previousElementSibling.remove();
      }
      search.remove();
    }
  }

  // Convert editor to code blocks
  document.querySelectorAll('.small-editor').forEach(e => {
    const editor = (e.parentElement?.parentElement) as Element;
    const inputText = (editor.querySelector('textarea') as Element).getAttribute('value');
    
    const diagnostics: string[] = []
    editor.querySelectorAll('.output-diagnostics .output-line').forEach(e => {
      diagnostics.push(e.textContent);
    });

    const output: string[] = [];
    editor.querySelectorAll('.output-wrapper .output-item').forEach(e => {
      output.push(e.textContent);
    });

    const outputLines = [];
    if (diagnostics.length > 0) {
      diagnostics.forEach(d => outputLines.push(d));
    }

    if (output.length > 0) {
      if (diagnostics.length > 0) {
        outputLines.push('');
      }
      output.forEach(o => outputLines.push(o));
    }

    const outputText = outputLines.join('\n');

    const container = document.createElement('div');

    const inputElementWrapper = document.createElement('pre');
    const inputElement = document.createElement('code');
    inputElement.textContent = inputText!;
    inputElement.classList.add('language-uiua');
    inputElementWrapper.appendChild(inputElement);
    container.appendChild(inputElementWrapper);

    if (outputText !== '') {
      const outputElementWrapper = document.createElement('pre');
      const outputElement = document.createElement('code');
      outputElement.textContent = outputText!;
      outputElement.classList.add('language-output');
      outputElementWrapper.appendChild(outputElement);
      container.appendChild(outputElementWrapper);
    }

    editor.replaceWith(container);
  });

  document.querySelectorAll('.code-block').forEach(e => {
    const wrapper = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = e.textContent;
    wrapper.appendChild(code);
    (e as Element).replaceWith(wrapper);
  });

  const challengesTitle = document.querySelector('#challenges');
  if (challengesTitle) {
    while (challengesTitle.nextElementSibling) {
      challengesTitle.nextElementSibling.remove();
    }
    challengesTitle.remove();
  }

  // Step 4: Convert the HTML to Markdown
  const nhm = new NodeHtmlMarkdown({
    maxConsecutiveNewlines: 2,
  });

  const html = (document.documentElement as Element).outerHTML;
  const markdown = nhm.translate(html).trim();

  const params: {[key: string]: string} = {};
  header.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (value === undefined) {
      return;
    }
    params[key] = value.join(':').trim();
  });

  return {
    url: params.url,
    markdown: markdown,
  };
}

// Usage
const filename = Deno.args[0];
if (filename) {
  const converted = await convertHtmlToMarkdown(filename);
  console.log(converted.markdown);
  Deno.exit(1);
}

// Step 5: Convert all files in the input directory
const files = Deno.readDirSync(INPUT_DIR);
const convertedFiles: ConvertedFile[] = [];
for (const file of files) {
  const filename = `${INPUT_DIR}${file.name}`;
  const converted = await convertHtmlToMarkdown(filename);
  convertedFiles.push(converted);
}

const merged = convertedFiles
  .map(f => `<page url="${f.url}">\n\n${f.markdown}\n\n</page>`)
  .join("\n\n");

const prelude = `
This file is the full documentation for the Uiua programming language.
The documentation is organized into pages marked by the <page> tag.
The url attribute of the <page> tag is the URL of the page on the Uiua website.
The content of the <page> tag is the markdown content of the page.
Links in the markdown content often link to other pages in the documentation.
`;

const mergedWithPrelude = `${prelude.trim()}\n\n${merged}`;
Deno.writeFileSync("output.md", new TextEncoder().encode(mergedWithPrelude));