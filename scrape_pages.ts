import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const LINKS_FILE = "all_links.json";
const OUTPUT_DIR = "html/";
const BASE_URL = "https://www.uiua.org/";

// Ensure the output directory exists
try {
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });
} catch (error) {
  if (!(error instanceof Deno.errors.AlreadyExists)) {
    console.error("Error creating output directory:", error);
    Deno.exit(1);
  }
}

// Read and parse the JSON links file
let links: string[];
try {
  const jsonContent = await Deno.readTextFile(LINKS_FILE);
  links = JSON.parse(jsonContent);
  if (!Array.isArray(links)) {
    throw new Error("The JSON file does not contain an array");
  }
} catch (error) {
  console.error("Error reading or parsing links file:", error);
  Deno.exit(1);
}

if (links.length === 0) {
  console.error("No links found in the file.");
  Deno.exit(1);
}

const browser = await puppeteer.launch();

async function scrapePageContent(url: string): Promise<string> {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const content = await page.content();
  await page.close();
  return content;
}

function getFilenameFromUrl(url: string): string {
  const path = url.replace(BASE_URL, "").replace(/\/$/, "");
  return path === "" ? "home" : path.replace(/\//g, "_");
}

async function saveContentToFile(url: string, content: string) {
  const filename = getFilenameFromUrl(url);
  const filePath = `${OUTPUT_DIR}${filename}.html`;
  const fileContent = `url: ${url}\n\n---\n\n${content}`;
  
  await Deno.writeTextFile(filePath, fileContent);
  console.log(`Saved content for ${url} to ${filePath}`);
}

async function processLinks() {
  for (const url of links) {
    try {
      console.log(`Processing: ${url}`);
      const content = await scrapePageContent(url);
      await saveContentToFile(url, content);
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
}

try {
  await processLinks();
  console.log("Scraping completed successfully.");
} catch (error) {
  console.error("An error occurred during scraping:", error);
} finally {
  await browser.close();
}