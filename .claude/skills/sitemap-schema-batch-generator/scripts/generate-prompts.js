const fs = require('fs');
const path = require('path');

async function fetchSitemap(sitemapUrl) {
  const axios = require('axios');
  const response = await axios.get(sitemapUrl);
  return response.data;
}

function parseSitemapUrls(xml) {
  const urlRegex = /<loc>([^<]+)</loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function generatePrompt(url, outputPath, template) {
  return template
    .replace('{{PAGE_URL}}', url)
    .replace('{{OUTPUT_FILE}}', outputPath);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log('Usage: node generate-prompts.js <sitemap_url> [output_dir]');
    console.log('Example: node generate-prompts.js https://example.com/sitemap.xml ./prompts');
    process.exit(1);
  }

  const sitemapUrl = args[0];
  const outputDir = args[1] || './prompts';

  if (!sitemapUrl.includes('sitemap.xml')) {
    console.error('Error: URL should point to sitemap.xml');
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`Fetching sitemap: ${sitemapUrl}`);
  
  const xml = await fetchSitemap(sitemapUrl);
  const urls = parseSitemapUrls(xml);

  console.log(`Found ${urls.length} URLs in sitemap`);

  const templatePath = path.join(__dirname, '..', 'references', 'subagent-prompt-template.md');
  let template;
  try {
    template = fs.readFileSync(templatePath, 'utf-8');
  } catch (e) {
    console.error(`Error: Could not read template file at ${templatePath}`);
    console.error('Make sure the skill is properly installed with all reference files.');
    process.exit(1);
  }

  const urlListPath = path.join(outputDir, 'url-list.json');
  const urlList = urls.map((url, index) => {
    const promptFileName = `url-${index}.txt`;
    const schemaFileName = `url-${index}.json`;
    
    const promptPath = path.join(outputDir, promptFileName);
    const schemaPath = path.join(outputDir.replace('/prompts', '/schemas'), schemaFileName);
    
    const prompt = generatePrompt(url, schemaPath, template);
    fs.writeFileSync(promptPath, prompt);

    return {
      index,
      url,
      promptFile: promptPath,
      schemaFile: schemaPath
    };
  });

  fs.writeFileSync(urlListPath, JSON.stringify(urlList, null, 2));

  console.log(`Generated ${urls.length} prompt files in ${outputDir}`);
  console.log(`URL list saved to ${urlListPath}`);
}

main().catch(console.error);