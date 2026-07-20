# Volcengine ECS Production Deployment

The production site is a static Next.js export served by Nginx on the Volcengine ECS instance. `www.vikingagm.com` is the canonical host.

## Production architecture

```text
GitHub main push
  -> build and verify static export
  -> upload to a versioned release directory
  -> validate required files
  -> atomically switch /var/www/hubei-viking-agm-current
  -> reload Nginx
  -> verify homepage, Chinese homepage, sitemap and API health
```

GitHub Pages is a manual backup preview only. It does not run for every `main` push.

## Required GitHub secrets

- `VOLCENGINE_HOST`
- `VOLCENGINE_USER`
- `VOLCENGINE_SSH_KEY`
- `VOLCENGINE_KNOWN_HOSTS`

Use the host fingerprint verification process in `docs/inquiry-api-deployment.md`.

## One-time atomic deployment migration

Before the first release-directory deployment, create a compatibility symlink:

```bash
ln -sfn /var/www/hubei-viking-agm /var/www/hubei-viking-agm-current
```

The first workflow run will use the existing site as a hard-link base, upload the new build into:

```text
/var/www/hubei-viking-agm-releases/<git-sha>/
```

It then switches:

```text
/var/www/hubei-viking-agm-current
```

to the validated release. The five newest releases are retained.

## Canonical Nginx configuration

After the API files have been deployed to `/opt/viking-agm-inquiry`, install the complete site template:

```bash
cp /etc/nginx/sites-available/hubei-viking-agm \
  /etc/nginx/sites-available/hubei-viking-agm.backup-$(date +%Y%m%d-%H%M%S)

cp /opt/viking-agm-inquiry/nginx/hubei-viking-agm.conf.example \
  /etc/nginx/sites-available/hubei-viking-agm

nginx -t
systemctl reload nginx
```

This configuration:

- redirects all HTTP requests to `https://www.vikingagm.com$request_uri`;
- redirects HTTPS apex-domain requests to the same path and query on `www`;
- serves only `www.vikingagm.com` from the current release symlink;
- keeps `/api/inquiry` and `/admin` behind the Express service;
- applies security headers and static cache rules.

Verify canonical redirects:

```bash
curl -sSI http://vikingagm.com/test/path?source=http | grep -E "HTTP/|Location:"
curl -sSI https://vikingagm.com/test/path?source=https | grep -E "HTTP/|Location:"
```

Both must return `301` and preserve `/test/path?source=...` on `https://www.vikingagm.com`.

## Automatic static deployment

`.github/workflows/deploy-volcengine.yml` remains the only automatic production website workflow on `main`.

The deployment fails before activation if any of these are missing:

- English homepage;
- Chinese homepage;
- sitemap;
- API health.

Because activation is a symlink switch, visitors should not see a partially uploaded site.

## Local verification

```bash
npm ci
npm run build:volcengine
npm audit --omit=dev
npm audit --omit=dev --prefix server
```

The static build checks:

- content/route/SEO/sitemap consistency;
- referenced public assets;
- English and Chinese `lang` values;
- required pages and public files;
- canonical and sitemap metadata.

## Cache policy

The Nginx cache snippet uses:

- `/_next/static/`: 30 days, immutable;
- images: 7 days;
- videos: 7 days;
- PDF downloads: 7 days;
- HTML: no forced long cache.

Check a deployed asset:

```bash
curl -sSI https://www.vikingagm.com/videos/viking-agm-promo-480p.mp4 | \
  grep -E "Cache-Control|Expires"
```

## Production verification

```bash
npm run verify:prod
```

Manual URLs:

```text
https://www.vikingagm.com/
https://www.vikingagm.com/zh/
https://www.vikingagm.com/request-agm-separator-sample/
https://www.vikingagm.com/zh/request-agm-separator-sample/
https://www.vikingagm.com/downloads/viking-agm-technical-capability.pdf
https://www.vikingagm.com/sitemap.xml
https://www.vikingagm.com/admin
```

After adding or materially updating public pages, resubmit:

```text
https://www.vikingagm.com/sitemap.xml
```

to Google Search Console, Bing Webmaster Tools and Baidu Search Resource Platform.
