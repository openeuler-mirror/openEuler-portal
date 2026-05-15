const fs = require('fs');
const path = require('path');

function extractPathFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname || '/';
  } catch {
    return url;
  }
}

function mergeMetaTags(metaTagsDir, outputFile) {
  const files = fs.readdirSync(metaTagsDir)
    .filter(f => f.endsWith('.json') && f.startsWith('url-'));

  const merged = {};

  for (const file of files) {
    const filePath = path.join(metaTagsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    let jsonData;
    try {
      jsonData = JSON.parse(content);
    } catch {
      console.warn(`Warning: ${file} is not valid JSON, skipping`);
      continue;
    }

    if (!jsonData.title || !jsonData.description) {
      console.warn(`Warning: ${file} missing title or description, skipping`);
      continue;
    }

    const urlMatch = file.match(/url-(\d+)/);
    if (!urlMatch) continue;

    const urlListPath = path.join(metaTagsDir.replace('/meta-tags', '/prompts'), 'url-list.json');
    if (fs.existsSync(urlListPath)) {
      const urlList = JSON.parse(fs.readFileSync(urlListPath, 'utf-8'));
      const entry = urlList.find(e => e.index === parseInt(urlMatch[1]));
      if (entry) {
        const pagePath = extractPathFromUrl(entry.url);
        merged[pagePath] = {
          title: jsonData.title,
          description: jsonData.description
        };
      }
    } else {
      merged[`/${file.replace('.json', '')}`] = {
        title: jsonData.title,
        description: jsonData.description
      };
    }
  }

  const tsContent = `export const metaTags: Record<string, { title: string; description: string }> = ${JSON.stringify(merged, null, 2)};\n`;
  fs.writeFileSync(outputFile, tsContent);
  console.log(`Merged ${files.length} meta tags into ${outputFile}`);

  return merged;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node merge-meta-tags.js <meta_tags_dir> <output_file.ts>');
    console.log('Example: node merge-meta-tags.js ./meta-tags ./meta-tags-merged.ts');
    process.exit(1);
  }

  const metaTagsDir = args[0];
  const outputFile = args[1];

  if (!fs.existsSync(metaTagsDir)) {
    console.error(`Error: Directory ${metaTagsDir} does not exist`);
    process.exit(1);
  }

  mergeMetaTags(metaTagsDir, outputFile);
}

main();