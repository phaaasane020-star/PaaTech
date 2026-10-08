# Paa Asane Technologies website

Run locally:  npm install  then  npm run dev  (http://localhost:3000)
Admin: /admin/login
Deploy: push to GitHub, import in Netlify, add the two NEXT_PUBLIC_SUPABASE_* variables from .env.local.example.

Optional env var: NEXT_PUBLIC_SITE_URL=https://your-domain.com (used for the sitemap and sharing previews; Netlify sets URL automatically).
Run supabase_*.sql files once in Supabase SQL Editor (setup, migrations, hardening, final fixes).
