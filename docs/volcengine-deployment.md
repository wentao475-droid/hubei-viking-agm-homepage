# Volcengine TOS + CDN deployment

This project is a static Next.js export. Netlify can remain as a backup, but the China-facing production path should use Volcengine TOS plus Volcengine CDN after ICP filing is approved.

## Build output

Build and verify the static export:

```bash
npm run build:volcengine
```

Upload the contents of `out/` to the TOS bucket root. Do not upload the `out/` directory itself as a nested folder.

Required files after upload:

```text
/
/index.html
/zh/index.html
/404.html
/robots.txt
/sitemap.xml
/_next/static/...
/images/...
```

## Environment values

Use `.env.example` as the template.

```bash
NEXT_PUBLIC_ICP_LICENSE="鄂ICP备xxxxxxxx号"
NEXT_PUBLIC_FORM_ENDPOINT="/"
NEXT_PUBLIC_STATIC_FORM_FALLBACK="true"
NEXT_PUBLIC_INQUIRY_EMAIL="vikingsales@vikingagm.com"
```

For the Netlify backup build, keep `NEXT_PUBLIC_STATIC_FORM_FALLBACK=false` so Netlify Forms can continue to receive inquiries.

For the Volcengine static build, set `NEXT_PUBLIC_STATIC_FORM_FALLBACK=true` unless a dedicated form API has been configured. The static fallback opens the visitor's email client with the inquiry details because TOS static hosting does not process Netlify Forms submissions.

## Volcengine console setup

1. Complete ICP filing for `vikingagm.com`.
2. Create a TOS bucket in a mainland China region.
3. Upload all files from `out/` to the bucket root.
4. Enable static website hosting:
   - Home page: `index.html`
   - 404 page: `404.html`
5. Configure CDN for `www.vikingagm.com`:
   - Acceleration type: website/static content acceleration.
   - Origin: the TOS static website endpoint.
   - Origin host: the same TOS website endpoint host.
   - HTTPS: enabled with a certificate covering `www.vikingagm.com`.
   - HTTP to HTTPS: enabled.
6. In TrafficRoute DNS, point `www` to the CDN-assigned CNAME.
7. Keep the root domain redirecting to `https://www.vikingagm.com/`.

Do not keep `www.vikingagm.com` pointing to both Netlify and Volcengine at the same time. During final cutover, use only the Volcengine CDN CNAME.

## Verification

Before switching DNS:

```bash
npm run build:volcengine
```

After switching DNS:

```bash
npm run verify:prod
```

Manual checks from mainland China networks:

```text
https://www.vikingagm.com/
https://www.vikingagm.com/zh/
https://www.vikingagm.com/sitemap.xml
https://www.vikingagm.com/robots.txt
```

Also verify the footer displays the ICP license and links to `https://beian.miit.gov.cn/`.

## Nginx static caching

For the current ECS deployment, copy the cache include file and add it inside the HTTPS `server` block, alongside the existing security-header include:

```bash
cp /opt/viking-agm-inquiry/nginx/static-cache.conf /etc/nginx/snippets/viking-agm-static-cache.conf
```

```nginx
include /etc/nginx/snippets/viking-agm-static-cache.conf;
```

The configuration caches hashed Next.js assets for 30 days and images/videos for 7 days. HTML is deliberately not cached by this rule so new SEO metadata and pages remain current.

For overseas acceleration, configure a Volcengine CDN domain after confirming the origin and HTTPS certificate. Use the same cache policy: long cache for `/_next/static/`, 7 days for images/video, and a short cache or no forced cache for HTML.

## Search engine follow-up

After the CDN cutover is stable:

1. Resubmit `https://www.vikingagm.com/sitemap.xml` in Google Search Console.
2. Resubmit `https://www.vikingagm.com/sitemap.xml` in Bing Webmaster Tools.
3. Resubmit or reverify the site in Baidu Search Resource Platform if requested.
