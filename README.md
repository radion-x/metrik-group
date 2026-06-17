# Reusable Website Template with AI Chat, Leads, Email & Dashboard

A configurable website template for rolling out client sites across different verticals while retaining the same core functionality: AI chat, lead capture, transcript/download offers, booking/callback capture, Mailgun emails, Postgres storage, and the admin dashboard.

## ✨ Features

- Email contact forms with admin notification and user auto-reply
- AI chat widget powered by OpenRouter
- Chat transcript/download lead capture
- Callback and booking lead capture
- Postgres-backed lead dashboard
- Per-client config for brand, colours, chat copy, services, offers, and emails
- Coolify-friendly environment variable overrides

## 📂 Project Structure

```
website-template/
├── config/
│   ├── client.json         # Client brand, design, offers, services, chat config
│   ├── client.example.json # Example client configuration
│   └── system_prompt.txt   # AI system prompt
├── lib/
│   └── clientConfig.js     # Config loader and env override layer
├── db/
│   └── schema.sql          # Postgres lead/search schema
├── public/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All styling
│   └── js/
│       ├── formHandler.js  # Contact form logic
│       ├── aiChat.js       # AI chat widget logic
│       └── main.js         # General site functionality
├── routes/
│   ├── email.js            # Email sending API endpoint
│   ├── ai.js               # AI chat, tools, transcript lead endpoint
│   └── callbacks.js        # Admin dashboard API endpoint
├── server.js               # Express server
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Clone or Copy This Template

```bash
# Copy this entire folder to your new project
cp -r website-template my-new-website
cd my-new-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your actual credentials
nano .env  # or use your preferred editor
```

**Required Configuration:**

- **Mailgun**: Get API key from [mailgun.com](https://www.mailgun.com)
- **OpenRouter**: Get API key from [openrouter.ai](https://openrouter.ai/keys)

### 4. Customize Client Configuration

Edit `config/client.json` for business and design settings:

```json
{
  "siteName": "Client Business",
  "vertical": "dentistry",
  "bookingUrl": "https://calendly.com/client",
  "chat": {
    "welcome": "Hi, welcome to Client Business. How can I help today?",
    "suggestedQuestions": [
      "How much does it cost?",
      "Can I book a consultation?"
    ]
  },
  "design": {
    "colors": {
      "primary": "#111111",
      "accent": "#9B8060"
    }
  }
}
```

Use `.env` or Coolify environment variables for secrets and deployment values like `DATABASE_URL`, `MAILGUN_API_KEY`, `OPENROUTER_API_KEY`, `RECIPIENT_EMAIL`, `SITE_URL`, and `ADMIN_DASHBOARD_PASSWORD`.

### 5. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Visit: `http://localhost:3000`

## 🎨 Customization Guide

### Config Split

Use this rule when preparing a new client:

- `.env` / Coolify: secrets, database URLs, API keys, domain, recipient email, feature flags
- `config/client.json`: site name, vertical, colours, services, offers, chat copy, public contact details
- `config/system_prompt.txt`: long AI instructions and vertical-specific behaviour
- HTML pages: client-specific page content and assets

### Change Colors & Branding

Edit `config/client.json`:

```json
{
  "design": {
    "colors": {
      "primary": "#111111",
      "primaryLight": "#1a1a1a",
      "accent": "#9B8060",
      "accentHover": "#7A6248",
      "body": "#FAFAFA",
      "surface": "#ffffff",
      "textMain": "#1A1A1A",
      "textSecondary": "#727272",
      "textInverse": "#F5F5F5"
    }
  }
}
```

The frontend applies these values as CSS variables, so the existing design system updates without rewriting CSS.

### Customize AI Chat Prompt

**Recommended Method (Especially for Coolify/Deployment):**

Edit the file `config/system_prompt.txt`. This file is automatically loaded by the server and supports multi-line prompts without escaping issues.

1. Open `config/system_prompt.txt`
2. Update the prompt to match your business persona and rules.
3. Save the file.
4. Restart the server (or redeploy) for changes to take effect.

You can still set `OPENROUTER_SYSTEM_PROMPT` in `.env`; it overrides the file-based prompt. Prefer the file for long prompts.

### Add Your Logo

Replace the text logo in `index.html`:

```html
<!-- Replace this: -->
<div class="logo">Your Business</div>

<!-- With an image: -->
<div class="logo">
    <img src="images/logo.png" alt="Your Business" height="40">
</div>
```

### Modify Form Fields

Edit the contact form in `index.html` to add/remove fields:

```html
<div class="form-group">
    <label for="newfield">New Field *</label>
    <input type="text" id="newfield" name="newfield" required>
</div>
```

## 📧 Email Configuration

### Mailgun Setup

1. Sign up at [mailgun.com](https://www.mailgun.com)
2. Add and verify your domain
3. Get your API key from Account Settings
4. Update `.env` with your credentials

### Email Templates

Most email identity and subject prefixes are now controlled by `config/client.json`:

- `email.contactSubjectPrefix`
- `email.callbackSubjectPrefix`
- `email.downloadSubjectPrefix`
- `email.userContactSubject`
- `email.userCallbackSubject`
- `email.brandSignoff`

Keep Mailgun credentials and actual recipient overrides in Coolify env vars.

## 🤖 AI Chat Configuration

### OpenRouter Setup

1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Get your API key from [openrouter.ai/keys](https://openrouter.ai/keys)
3. Choose a model (see [openrouter.ai/models](https://openrouter.ai/models))

### Available Models

**Free Options** (great for testing):
- `tngtech/deepseek-r1t2-chimera:free`
- `google/gemini-flash-1.5:free`

**Paid Options** (better quality):
- `openai/gpt-4o` - Best overall
- `openai/gpt-3.5-turbo` - Fast and cheap
- `anthropic/claude-3.5-sonnet` - Excellent quality

### Chat Customization

Edit `public/js/aiChat.js` to:
- Change welcome message
- Modify chat appearance
- Add quick reply buttons
- Customize behavior

## 🌐 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI, then:
heroku create your-app-name
heroku config:set MAILGUN_API_KEY=your-key
heroku config:set OPENROUTER_API_KEY=your-key
heroku config:set RECIPIENT_EMAIL=your-email
# ... set other env vars
git push heroku main
```

### Deploy to Vercel

```bash
# Install Vercel CLI, then:
vercel
# Follow prompts and add environment variables in dashboard
```

### Deploy to DigitalOcean/VPS

```bash
# SSH into your server
git clone your-repo
cd your-repo
npm install
pm2 start server.js --name "my-website"
```

## 🔒 Security Best Practices

1. **Never commit `.env`** - It's in `.gitignore` by default
2. **Use environment variables** for all sensitive data
3. **Enable rate limiting** in production (add express-rate-limit)
4. **Use HTTPS** in production
5. **Validate all inputs** on both client and server

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Email not sending?

- Check Mailgun API key and domain in `.env`
- Verify your domain in Mailgun dashboard
- Check server logs for errors

### AI chat not working?

- Verify OpenRouter API key in `.env`
- Check if you have credits (for paid models)
- Try a free model first
- Check browser console for errors

### Server won't start?

```bash
# Check if port 3000 is in use
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments
3. Check Mailgun and OpenRouter documentation

## 🎯 Next Steps

After setup:

1. ✅ Test the contact form
2. ✅ Test the AI chat
3. ✅ Customize colors and branding
4. ✅ Update all business information
5. ✅ Add your logo and images
6. ✅ Test on mobile devices
7. ✅ Deploy to production
8. ✅ Set up analytics (Google Analytics, etc.)

---

**Built with ❤️ for rapid website development**

Start building your next website in minutes, not days!
