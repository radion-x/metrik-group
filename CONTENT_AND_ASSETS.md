# Content And Asset Setup

This template now separates global client settings from page content.

## What Goes Where

```txt
config/client.json        global brand, colours, logos, services, chat UI, contact details
config/system_prompt.txt  chatbot knowledge, tone, FAQs, lead capture rules
public/**/*.html          visible page copy, SEO metadata, page-specific images
public/images/client/     client logos and image assets
```

## HTML Page Content

For each client, update the static HTML pages that are part of that client's site:

```txt
public/index.html
public/about/index.html
public/contact/index.html
public/service/*/index.html
public/spaces/*/index.html
public/offers/index.html
```

Change:

```txt
page title
meta description
hero heading
hero body copy
calls to action
service descriptions
FAQs
footer copy
image paths
alt text
schema/structured data
```

## Logo Assets

Place client logos here:

```txt
public/images/client/logo-dark.png
public/images/client/logo-light.png
```

Then set:

```json
"assets": {
  "logoDark": "/images/client/logo-dark.png",
  "logoLight": "/images/client/logo-light.png"
}
```

The template automatically swaps:

```txt
.nav-logo   -> assets.logoDark
.ia-ft-logo -> assets.logoLight
```

## Image Placeholders

Use these when building a new client before final imagery is ready:

```txt
public/images/placeholders/hero.svg
public/images/placeholders/image.svg
```

Example:

```html
<img src="/images/placeholders/hero.svg" alt="Client project image placeholder">
```

When final images arrive, place them in:

```txt
public/images/client/
```

Then update the relevant HTML image paths.

## Colour Portability

Global colours are configured in `config/client.json`:

```json
"design": {
  "colors": {
    "primary": "#111111",
    "accent": "#9B8060",
    "body": "#FAFAFA",
    "surface": "#ffffff",
    "textMain": "#1A1A1A",
    "textSecondary": "#727272",
    "textInverse": "#F5F5F5"
  }
}
```

These become CSS variables such as:

```txt
--color-primary
--color-accent
--color-bg-body
--color-text-main
```

Prefer CSS variables in new HTML:

```html
style="color: var(--color-accent); background: var(--color-primary);"
```

Avoid new hardcoded colours like:

```html
style="color: #9B8060"
```

Existing pages still contain some hardcoded inline colours. They are safe, but replacing them with CSS variables over time will make the template more portable.
