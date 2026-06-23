const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config', 'client.json');

const defaults = {
    siteName: 'Client Business',
    legalName: 'Client Business',
    vertical: 'general',
    tagline: '',
    siteDescription: '',
    siteUrl: 'http://localhost:3000',
    bookingUrl: '',
    contactUrl: '/contact/',
    address: '',
    phone: '',
    publicEmail: '',
    adminEmail: '',
    bccEmail: '',
    emailFrom: '',
    replyTo: '',
    responseTime: 'within 24 hours',
    timezone: 'Australia/Sydney',
    chat: {
        title: 'Chat with us',
        welcome: 'Hi, how can I help today?',
        inputPlaceholder: 'Ask a question...',
        suggestedQuestions: []
    },
    leadTypes: ['callback', 'download', 'booking'],
    features: {
        callbacks: true,
        downloadLeads: true,
        bookings: true,
        webSearch: false
    },
    offers: {
        transcriptDownload: {
            enabled: true,
            label: 'Email me this chat',
            adminSubject: 'New Chat Transcript Download Request',
            userSubject: 'Your chat transcript'
        }
    },
    assets: {
        logoDark: '',
        logoLight: '',
        placeholderImage: '/images/placeholders/image.svg',
        placeholderHero: '/images/placeholders/hero.svg'
    },
    email: {
        adminLeadSubjectPrefix: 'New Lead',
        callbackSubjectPrefix: 'New Callback Request',
        contactSubjectPrefix: 'New Website Enquiry',
        downloadSubjectPrefix: 'New Download Lead',
        userContactSubject: 'Thank you for contacting us',
        userCallbackSubject: "We've received your request",
        brandSignoff: 'The Team'
    },
    design: {
        colors: {},
        fonts: {},
        radius: {}
    },
    services: []
};

function isPlainObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

function mergeDeep(base, override) {
    const output = { ...base };

    Object.entries(override || {}).forEach(([key, value]) => {
        if (isPlainObject(value) && isPlainObject(output[key])) {
            output[key] = mergeDeep(output[key], value);
        } else {
            output[key] = value;
        }
    });

    return output;
}

function csv(value) {
    return value
        ? value.split(',').map(item => item.trim()).filter(Boolean)
        : undefined;
}

function bool(value) {
    if (value === undefined) return undefined;
    return value === 'true' || value === '1' || value === 'yes';
}

function readClientConfig() {
    try {
        if (!fs.existsSync(configPath)) return {};
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
        console.error('Failed to load config/client.json:', error.message);
        return {};
    }
}

function applyEnvOverrides(config) {
    const envConfig = {
        siteName: process.env.SITE_NAME,
        legalName: process.env.LEGAL_NAME,
        vertical: process.env.CLIENT_VERTICAL || process.env.VERTICAL,
        tagline: process.env.SITE_TAGLINE,
        siteDescription: process.env.SITE_DESCRIPTION,
        siteUrl: process.env.SITE_URL,
        bookingUrl: process.env.BOOKING_URL,
        contactUrl: process.env.CONTACT_URL,
        address: process.env.BUSINESS_ADDRESS,
        phone: process.env.PUBLIC_PHONE,
        publicEmail: process.env.PUBLIC_EMAIL,
        adminEmail: process.env.RECIPIENT_EMAIL || process.env.ADMIN_EMAIL || process.env.EMAIL_TO,
        bccEmail: process.env.BCC_EMAIL,
        emailFrom: process.env.EMAIL_FROM,
        replyTo: process.env.REPLY_TO_EMAIL,
        responseTime: process.env.RESPONSE_TIME,
        timezone: process.env.TIMEZONE,
        chat: {
            title: process.env.CHAT_TITLE,
            welcome: process.env.CHAT_WELCOME,
            inputPlaceholder: process.env.CHAT_INPUT_PLACEHOLDER,
            suggestedQuestions: csv(process.env.CHAT_SUGGESTED_QUESTIONS)
        },
        leadTypes: csv(process.env.LEAD_TYPES),
        features: {
            callbacks: bool(process.env.ENABLE_CALLBACKS),
            downloadLeads: bool(process.env.ENABLE_DOWNLOAD_LEADS),
            bookings: bool(process.env.ENABLE_BOOKINGS),
            webSearch: bool(process.env.ENABLE_WEB_SEARCH)
        },
        design: {
            colors: {
                primary: process.env.COLOR_PRIMARY,
                primaryLight: process.env.COLOR_PRIMARY_LIGHT,
                accent: process.env.COLOR_ACCENT,
                accentHover: process.env.COLOR_ACCENT_HOVER,
                copper: process.env.COLOR_COPPER,
                body: process.env.COLOR_BG_BODY,
                surface: process.env.COLOR_BG_SURFACE,
                textMain: process.env.COLOR_TEXT_MAIN,
                textSecondary: process.env.COLOR_TEXT_SECONDARY,
                textInverse: process.env.COLOR_TEXT_INVERSE
            },
            fonts: {
                heading: process.env.FONT_HEADING,
                body: process.env.FONT_BODY
            }
        }
    };

    function removeUndefined(value) {
        if (Array.isArray(value)) return value;
        if (!isPlainObject(value)) return value;

        return Object.entries(value).reduce((acc, [key, child]) => {
            const cleaned = removeUndefined(child);
            const isEmptyObject = isPlainObject(cleaned) && Object.keys(cleaned).length === 0;
            if (cleaned !== undefined && !isEmptyObject) acc[key] = cleaned;
            return acc;
        }, {});
    }

    return mergeDeep(config, removeUndefined(envConfig));
}

function getClientConfig() {
    const fileConfig = readClientConfig();
    const config = applyEnvOverrides(mergeDeep(defaults, fileConfig));

    if (!config.emailFrom && process.env.MAILGUN_DOMAIN) {
        config.emailFrom = `${config.siteName} <noreply@${process.env.MAILGUN_DOMAIN}>`;
    }

    if (!config.replyTo) {
        config.replyTo = config.publicEmail || config.adminEmail || config.emailFrom;
    }

    return config;
}

function getPublicClientConfig() {
    const config = getClientConfig();
    return {
        siteName: config.siteName,
        legalName: config.legalName,
        vertical: config.vertical,
        tagline: config.tagline,
        siteDescription: config.siteDescription,
        siteUrl: config.siteUrl,
        bookingUrl: config.bookingUrl,
        contactUrl: config.contactUrl,
        address: config.address,
        phone: config.phone,
        publicEmail: config.publicEmail,
        responseTime: config.responseTime,
        timezone: config.timezone,
        chat: config.chat,
        leadTypes: config.leadTypes,
        features: config.features,
        offers: config.offers,
        assets: config.assets,
        design: config.design,
        services: config.services
    };
}

function cssVariables() {
    const design = getClientConfig().design || {};
    const colors = design.colors || {};
    const fonts = design.fonts || {};
    const radius = design.radius || {};

    const variables = {
        '--color-primary': colors.primary,
        '--color-primary-light': colors.primaryLight,
        '--color-accent': colors.accent,
        '--color-accent-hover': colors.accentHover,
        '--color-copper': colors.copper,
        '--color-bg-body': colors.body,
        '--color-bg-surface': colors.surface,
        '--color-text-main': colors.textMain,
        '--color-text-secondary': colors.textSecondary,
        '--color-text-inverse': colors.textInverse,
        '--font-heading': fonts.heading,
        '--font-body': fonts.body,
        '--radius-sm': radius.sm,
        '--radius-md': radius.md,
        '--radius-lg': radius.lg,
        '--radius-xl': radius.xl
    };

    const body = Object.entries(variables)
        .filter(([, value]) => value)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n');

    return `:root {\n${body}\n}\n`;
}

module.exports = {
    getClientConfig,
    getPublicClientConfig,
    cssVariables
};
