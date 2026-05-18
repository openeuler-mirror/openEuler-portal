# SubAgent Prompt Template for Meta Tags Generation

## Task

Generate optimized title and meta description tags for a single webpage and save it to a local file.

**IMPORTANT: You MUST use the `meta-tags-optimizer` skill to generate the meta tags.**

## Input

- Page URL: `{{PAGE_URL}}`
- Output file path: `{{OUTPUT_FILE}}`

## Instructions

### Step 1: Load Meta Tags Optimizer Skill

```
Load skill: meta-tags-optimizer
```

Use this skill's workflow for title and description optimization.

### Step 2: Fetch Page Content

- Use WebFetch to retrieve the page HTML
- If the page appears to be a SPA (empty/minimal content in HTML), use browser-mode crawl:
  - The project has `scripts/crawl.js` which supports `--mode=browser` for JS-rendered pages
  - Run: `node scripts/crawl.js {{PAGE_URL}} --mode=browser --format=both --out=temp-meta-url`
  - Then read the generated text file for content extraction
- Extract key information: page title, main heading (H1), main content, page type, key topics

### Step 3: Generate Meta Tags Using Meta Tags Optimizer Skill

Following the skill's workflow:

1. **Gather Page Information** — page type, main topic, key keywords from content
2. **Create Optimized Title Tag** — 50-60 characters, primary keyword front-loaded
3. **Write Meta Description** — 150-160 characters, includes CTA, reflects page content

**CRITICAL CONSTRAINT: Content Fidelity**

The generated meta tags MUST:
- Be based on ACTUAL content visible on the page
- NOT invent or fabricate topics not covered on the page
- Reflect the actual page purpose and content
- Use keywords that appear in the page content

**Example violations to avoid:**
- Creating a title about "pricing" when no pricing info is on the page
- Writing description mentioning features not described on page
- Using keywords that don't appear in page content

### Step 4: Save Output

Write JSON with ONLY title and description:

```json
{
  "title": "Optimized Title Tag | Brand",
  "description": "Compelling meta description that reflects page content..."
}
```

- Save to the specified output file path
- Do NOT include any explanatory text, markdown, or prose
- The file must contain pure JSON that is parseable

### Step 5: Return Result

Return ONLY this JSON object (no other text):

```json
{"url": "{{PAGE_URL}}", "file": "{{OUTPUT_FILE}}"}
```

If the page could not be properly fetched or has no meaningful content:

```json
{"url": "{{PAGE_URL}}", "error": "could not extract page content", "reason": "SPA with empty initial HTML"}
```

## Quality Checklist

Before saving, verify:
- [ ] JSON is valid (parseable)
- [ ] Used meta-tags-optimizer skill workflow
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] **Title and description reflect actual page content**
- [ ] **No invented/fabricated topics or keywords**
- [ ] Title front-loads primary keyword/topic
- [ ] Description includes CTA where appropriate

## Content Extraction Guidelines

What to extract for meta tag creation:
- **Page title/heading** - Use as basis for optimized title
- **Main content topics** - Key subjects covered on page
- **Page type** - Homepage, article, product, documentation, etc.
- **Key keywords** - Terms that appear prominently in content

**Include in meta tags:**
- Main topic of the page
- Key benefits or features described
- CTA if page has a clear action (download, learn more, etc.)

**Exclude from meta tags:**
- Topics not covered on the page
- Keywords not appearing in content
- Fabricated claims or features