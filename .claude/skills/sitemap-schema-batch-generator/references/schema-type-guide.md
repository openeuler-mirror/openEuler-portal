# Schema Type Selection Guide

Quick reference for choosing appropriate Schema.org types based on page content.

## Page Type → Schema Type Mapping

| Page Type | Primary Schema | Secondary Schema | Required Properties |
|-----------|---------------|------------------|---------------------|
| Homepage | WebSite | Organization | url, name, publisher |
| Blog Article | Article / BlogPosting | — | headline, author, datePublished, url |
| News Article | NewsArticle | — | headline, author, datePublished, url |
| Product Page | Product | — | name, offers (price, availability) |
| FAQ Page | FAQPage | — | mainEntity (Question + Answer pairs) |
| How-To Guide | HowTo | — | name, step (HowToStep) |
| Event Page | Event | — | name, startDate, location |
| Local Business | LocalBusiness | Organization | name, address, telephone |
| Category/List | ItemList / CollectionPage | — | itemListElement |
| Documentation | TechArticle | — | headline, author, audience |
| Landing Page | WebPage | — | name, url, description |
| Video Page | VideoObject | — | name, thumbnailUrl, duration |
| Course Page | Course | — | name, provider, description |
| Review Page | Review | — | itemReviewed, reviewRating |
| Recipe Page | Recipe | — | name, ingredients, instructions |
| Job Listing | JobPosting | — | title, hiringOrganization, location |

## Homepage Schema Pattern

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "{url}/#website",
      "url": "{url}",
      "name": "{site_name}",
      "publisher": { "@id": "{url}/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "{url}/#organization",
      "name": "{org_name}",
      "url": "{url}"
    }
  ]
}
```

## Article Schema Pattern

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "author": {
    "@type": "Person",
    "name": "{author_name}"
  },
  "datePublished": "{YYYY-MM-DD}",
  "dateModified": "{YYYY-MM-DD}",
  "url": "{article_url}",
  "publisher": {
    "@type": "Organization",
    "name": "{site_name}"
  }
}
```

## Product Schema Pattern

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{product_name}",
  "description": "{description}",
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "{currency}",
    "availability": "https://schema.org/InStock"
  }
}
```

## FAQ Schema Pattern

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{answer}"
      }
    }
  ]
}
```

## Detection Heuristics

- **Homepage**: URL is root `/` or `/index.html`, contains site name, navigation
- **Article**: Contains author info, publication date, article body, comments
- **Product**: Contains price, buy button, product specs, reviews
- **FAQ**: Contains multiple Q&A pairs, often marked with "FAQ" heading
- **HowTo**: Contains numbered steps, instructions, materials list
- **Event**: Contains date, time, location, registration info
- **LocalBusiness**: Contains address, phone, hours, map, business name
- **Video**: Contains video player, duration, thumbnail, play button

## Important Notes

1. Use `@graph` for multiple schema types on one page
2. `@id` is a URI identifier, not related to HTML element IDs
3. All URLs should be absolute (full URL including domain)
4. Dates in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
5. Required properties must be present; optional properties enhance rich results