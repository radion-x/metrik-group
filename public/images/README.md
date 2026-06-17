# Image Assets

Client-specific images should go in a dedicated folder:

```txt
public/images/client/
```

Recommended files:

```txt
public/images/client/logo-dark.png   # nav/header logo
public/images/client/logo-light.png  # footer/dark-background logo
public/images/client/hero.jpg        # homepage hero
public/images/client/about.jpg
public/images/client/service-main.jpg
```

Set logo paths in `config/client.json`:

```json
"assets": {
  "logoDark": "/images/client/logo-dark.png",
  "logoLight": "/images/client/logo-light.png",
  "placeholderImage": "/images/placeholders/image.svg",
  "placeholderHero": "/images/placeholders/hero.svg"
}
```

The template automatically swaps `.nav-logo` and `.ia-ft-logo` images from this config. Page-specific hero and content images are still edited directly in the relevant `public/**/*.html` file.
