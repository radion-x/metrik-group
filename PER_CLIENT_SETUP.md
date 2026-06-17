# Per-Client Setup Guide

Use this guide each time you roll out the template for a new client.

For each client, you mainly edit three areas:

```txt
config/client.json        # brand, colours, contact details, chat UI, services
config/system_prompt.txt  # chatbot knowledge and behaviour
public/**/*.html          # visible website page content
```

For page imagery and replacement rules, also see `CONTENT_AND_ASSETS.md`.

Use `.env` locally and Coolify environment variables in production for secrets and deployment settings.

## 1. Duplicate The Template

Create a new client project from the template:

```bash
cp -r template_ateliser client-name-site
cd client-name-site
npm install
```

## 2. Configure The Client

Edit:

```txt
config/client.json
```

Change these first:

```json
{
  "siteName": "Client Business",
  "legalName": "Client Business Pty Ltd",
  "vertical": "dentistry",
  "tagline": "Premium care for local patients.",
  "siteUrl": "https://clientdomain.com",
  "bookingUrl": "https://calendly.com/client",
  "address": "123 Example Street, Sydney NSW 2000",
  "phone": "(02) 0000 0000",
  "publicEmail": "hello@clientdomain.com",
  "adminEmail": "admin@clientdomain.com",
  "responseTime": "within one business day"
}
```

Use `client.json` for:

```txt
site name
business name
vertical
public contact details
booking link
chat title
chat welcome message
suggested chat questions
services list
email subject wording
brand colours
fonts
border radius
feature flags
```

## 3. Configure The Chat UI

Still inside `config/client.json`, update:

```json
"chat": {
  "title": "Chat with Client Business",
  "welcome": "Hi, welcome to Client Business. How can I help today?",
  "inputPlaceholder": "Ask a question...",
  "suggestedQuestions": [
    "How much does it cost?",
    "Can I book a consultation?",
    "Do you offer payment plans?"
  ]
}
```

These values control the visible chatbot widget.

## 4. Configure Lead Features

In `config/client.json`:

```json
"features": {
  "callbacks": true,
  "downloadLeads": true,
  "bookings": true,
  "webSearch": false
}
```

Meaning:

```txt
callbacks      chatbot can capture callback/consultation requests
downloadLeads  users can email themselves the chat transcript
bookings       booking link can be shown in emails/chat flows
webSearch      chatbot can use Brave Search if enabled
```

Leave most of these `true` unless the client does not want that feature.

## 5. Configure Services

In `config/client.json`:

```json
"services": [
  "Invisalign",
  "Teeth Whitening",
  "Dental Implants",
  "General Dentistry"
]
```

Example service lists:

```txt
Dentist: Invisalign, Teeth Whitening, Dental Implants
Builder: Renovations, New Builds, Extensions
Lawyer: Family Law, Conveyancing, Wills
Trade: Emergency Repairs, Installations, Maintenance
```

These services help classify leads and make the template reusable across verticals.

## 6. Configure Colours

In `config/client.json`:

```json
"design": {
  "colors": {
    "primary": "#111111",
    "primaryLight": "#1a1a1a",
    "accent": "#9B8060",
    "accentHover": "#7A6248",
    "copper": "#B8A080",
    "body": "#FAFAFA",
    "surface": "#ffffff",
    "textMain": "#1A1A1A",
    "textSecondary": "#727272",
    "textInverse": "#F5F5F5"
  }
}
```

Use this for brand colour changes without editing CSS.

## 7. Configure The Chatbot Brain

Edit:

```txt
config/system_prompt.txt
```

This controls what the chatbot knows and how it behaves.

Include:

```txt
business name
what the business does
services
service areas
opening hours
pricing guidance
booking rules
lead capture rules
tone of voice
FAQs
what the bot should not say
when to suggest a callback
when to offer a booking
when to offer a download/transcript
```

Example structure:

```txt
You are the AI assistant for Northside Dental.

Business:
- Name: Northside Dental
- Location: Neutral Bay, Sydney
- Services: Invisalign, whitening, implants, general dentistry
- Booking URL: https://calendly.com/northside-dental

Tone:
- Warm, clear, professional
- Use Australian English
- Keep answers concise

Lead Capture:
- If a user asks about pricing, treatment suitability, availability, or booking, offer to arrange a consultation.
- Collect name and either phone or email before requesting a callback.
- Never claim a diagnosis. Encourage a consultation for clinical advice.

Pricing:
- Invisalign starts from $X
- Whitening starts from $Y
- Final pricing requires consultation

Do Not:
- Give medical diagnosis
- Promise guaranteed results
- Discuss competitors negatively
```

## 8. Configure Environment Variables

Use `.env` locally and Coolify environment variables in production.

Use env vars for secrets and deployment-specific values only:

```env
DATABASE_URL=postgresql://...
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=mg.clientdomain.com
MAILGUN_REGION=us
OPENROUTER_API_KEY=...
RECIPIENT_EMAIL=admin@clientdomain.com
EMAIL_FROM="Client Business <noreply@mg.clientdomain.com>"
REPLY_TO_EMAIL=hello@clientdomain.com
SITE_URL=https://clientdomain.com
ADMIN_DASHBOARD_PASSWORD=strong-password
```

Do not put long page content, long prompts, HTML email templates, or service lists in Coolify env vars.

## 9. Update Page Content

Edit the static pages in `public/`.

Main files:

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
SEO title
meta description
hero heading
hero text
service sections
about copy
contact details
footer content
images
navigation labels
offer content
```

The homepage is usually the main one:

```txt
public/index.html
```

## 10. Test Locally

Run:

```bash
npm run dev
```

Check:

```txt
http://localhost:3000
http://localhost:3000/api/client-config
http://localhost:3000/api/chat/config
http://localhost:3000/admin/callbacks.html
```

Test:

```txt
contact form submits
chatbot responds correctly
chatbot captures callback leads
chat transcript email works
admin dashboard shows leads
admin/user emails are received
colours match the client brand
```

## 11. Deploy In Coolify

For each client deployment:

```txt
1. Create new Coolify app
2. Connect repo/branch
3. Add Postgres database
4. Add required env vars
5. Deploy
6. Open /health
7. Open /admin/callbacks.html
8. Submit a test lead
9. Confirm email + dashboard record
```

Health check:

```txt
https://clientdomain.com/health
```

Admin dashboard:

```txt
https://clientdomain.com/admin/callbacks.html
```

## Quick Rule

```txt
Brand, colours, services, public contact info:
config/client.json

Chatbot knowledge and behaviour:
config/system_prompt.txt

Visible website page copy and images:
public/**/*.html

Secrets and deployment settings:
.env / Coolify env vars

Core functionality:
leave routes/, db/, server.js, public/js/ alone unless improving the template
```
