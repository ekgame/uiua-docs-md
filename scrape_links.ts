import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const browser = await puppeteer.launch();
const root = 'https://www.uiua.org';
let visitedUrls = new Set<string>();
let unvisitedUrls = new Set<string>([root]);
const allLinks = new Set<string>();

const VISITED_FILE = 'visited_urls.json';
const UNVISITED_FILE = 'unvisited_urls.json';
const LINKS_FILE = 'all_links.json';

async function loadState() {
  try {
    const visitedText = await Deno.readTextFile(VISITED_FILE);
    visitedUrls = new Set(JSON.parse(visitedText));
    console.log(`Loaded ${visitedUrls.size} visited URLs`);

    const unvisitedText = await Deno.readTextFile(UNVISITED_FILE);
    unvisitedUrls = new Set(JSON.parse(unvisitedText));
    console.log(`Loaded ${unvisitedUrls.size} unvisited URLs`);

    const linksText = await Deno.readTextFile(LINKS_FILE);
    const loadedLinks = new Set(JSON.parse(linksText));
    loadedLinks.forEach(link => allLinks.add(link as string));
    console.log(`Loaded ${allLinks.size} total links`);
  } catch (error) {
    console.log("No previous state found or error loading state. Starting fresh.");
  }
}

async function saveState() {
  await Deno.writeTextFile(VISITED_FILE, JSON.stringify([...visitedUrls]));
  await Deno.writeTextFile(UNVISITED_FILE, JSON.stringify([...unvisitedUrls]));
  await Deno.writeTextFile(LINKS_FILE, JSON.stringify([...allLinks]));
  console.log("Progress saved.");
}

async function getLinksInPage(url: string): Promise<string[]> {
  console.log(`Visiting: ${url}`);
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('main');
  const href = await page.$$eval('a', as => as.map(a => a.href));
  await page.close();
  const filtered = href
    .filter(h => h.startsWith(root))
    .map(h => h.split('#')[0]);
  return Array.from(new Set(filtered));
}

async function crawl() {
  while (unvisitedUrls.size > 0) {
    const url = unvisitedUrls.values().next().value;
    unvisitedUrls.delete(url);
    
    if (!visitedUrls.has(url)) {
      visitedUrls.add(url);
      try {
        const links = await getLinksInPage(url);
        links.forEach(link => {
          allLinks.add(link);
          if (!visitedUrls.has(link)) {
            unvisitedUrls.add(link);
          }
        });
      } catch (error) {
        console.error(`Error crawling ${url}:`, error);
        unvisitedUrls.add(url); // Add back to unvisited for retry
      }

      // Save state every 10 visited URLs
      if (visitedUrls.size % 10 === 0) {
        await saveState();
      }
    }
  }
}

try {
  await loadState();
  await crawl();
  console.log('Crawling complete');
  console.log(`Total unique links found: ${allLinks.size}`);
  await saveState();
} catch (error) {
  console.error('An error occurred:', error);
} finally {
  await browser.close();
}