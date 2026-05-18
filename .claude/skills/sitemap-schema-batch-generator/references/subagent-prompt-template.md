# SubAgent Prompt Template for Schema Generation

## Task

Generate JSON-LD schema markup for a single webpage and save it to a local file.

**IMPORTANT: You MUST use the `schema-markup-generator` skill to generate the JSON-LD.**

## Input

- Page URL: `{{PAGE_URL}}`
- Output file path: `{{OUTPUT_FILE}}`

## Instructions

### Step 1: Load Schema Markup Generator Skill

```
Load skill: schema-markup-generator
```

Use this skill's workflow for content type identification and schema generation.

### Step 2: Fetch Page Content

- Use WebFetch to retrieve the page HTML
- If the page appears to be a SPA (empty/minimal content in HTML), use browser-mode crawl:
  - The project has `scripts/crawl.js` which supports `--mode=browser` for JS-rendered pages
  - Run: `node scripts/crawl.js {{PAGE_URL}} --mode=browser --format=html --out=temp-page`
  - Then read the generated HTML file
- Extract ALL visible content: title, headings, paragraphs, lists, tables, metadata

### Step 3: Generate JSON-LD Using Schema Markup Generator Skill

Following the skill's 3-step workflow:

1. **Identify Content Type** — Use the skill's content-to-schema mapping
2. **Generate Schema Markup** — Use the skill's templates and property requirements
3. **Validate** — Ensure all required properties are present

**CRITICAL CONSTRAINT: Content Fidelity**

The generated JSON-LD MUST:
- Contain ONLY data that actually exists on the page
- NOT invent or fabricate any information (names, dates, descriptions, prices, etc.)
- NOT include properties for which there is no visible content
- Use exact text from the page for names, titles, descriptions
- Use actual dates found on the page (if none found, omit date properties)

**Example violations to avoid:**
- Adding `author: "John Doe"` when no author is shown on page
- Adding `datePublished` when no publication date is visible
- Adding `price: "$99"` when no price information exists
- Adding organization details not mentioned on page

### Step 4: Save Output

- Write ONLY the JSON-LD content (no `<script>` wrapper, no HTML, no comments)
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
- [ ] Used schema-markup-generator skill workflow
- [ ] Schema type matches page content type
- [ ] **ALL data in schema comes from visible page content**
- [ ] **NO invented/fabricated information**
- [ ] All required properties present for the chosen schema type
- [ ] URLs match the actual page URL
- [ ] Dates are in ISO format only if found on page

## Content Extraction Guidelines

What to extract and include in schema:
- **Include**: Title, headings, visible text, actual dates, actual prices, actual author names, actual organization names mentioned
- **Exclude**:猜测的信息、不存在的内容、推测的属性值

If a required property has no corresponding content on the page, either:
1. Use a different schema type that doesn't require that property
2. Skip that page and report it cannot be properly schema'd