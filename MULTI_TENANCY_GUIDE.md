# Multi-Tenancy Admin Guide

## Overview

Your application now supports **multi-tenancy**, allowing you to manage multiple independent sites from a single admin dashboard. Each site can have its own:
- Custom theme (colors, fonts)
- Unique content (posts, authors, categories)
- Site-specific pages (Home, About, Contact)
- Logo and branding

---

## Getting Started

### 1. Access the Admin Dashboard

Navigate to: `http://localhost:3000/admin`

Log in with your admin credentials.

---

## Managing Sites

### Creating a New Site

1. Go to **Collections** → **Sites**
2. Click **Create New**
3. Fill in the required fields:
   - **Name**: Display name for the site (e.g., "Tech Blog")
   - **Domain**: The domain/subdomain for this site (e.g., `techblog.localhost` or `techblog.com`)
   - **Theme**: Select a theme from the dropdown
   - **Logo**: Upload a logo image (optional)
   - **Tagline**: A short description (optional)
4. Click **Save**

> **Note**: For local development, use domains like `site1.localhost:3000`. In production, use actual domains.

### Viewing All Sites

1. Go to **Collections** → **Sites**
2. You'll see a list of all sites with their:
   - Name
   - Domain
   - Assigned theme

---

## Managing Themes

### Creating a Theme

1. Go to **Collections** → **Themes**
2. Click **Create New**
3. Configure the theme:
   - **Name**: Theme name (e.g., "Dark Mode", "Ocean Blue")
   - **Primary Color**: Main brand color (hex code, e.g., `#3B82F6`)
   - **Secondary Color**: Accent color (hex code, e.g., `#10B981`)
   - **Font Family**: Choose from Inter, Roboto, or Outfit
4. Click **Save**

### Assigning a Theme to a Site

1. Go to **Collections** → **Sites**
2. Select the site you want to edit
3. In the **Theme** dropdown, select your desired theme
4. Click **Save**

The theme will be applied automatically when users visit that site.

---

## Managing Site Content

### Posts

1. Go to **Collections** → **Posts**
2. Click **Create New**
3. Fill in post details (title, content, etc.)
4. **Important**: In the sidebar, select the **Site** this post belongs to
5. Click **Save**

> **Note**: Posts will only appear on the site they're assigned to.

### Authors

1. Go to **Collections** → **Authors**
2. Click **Create New**
3. Add author information
4. Select the **Site** in the sidebar
5. Click **Save**

### Categories

1. Go to **Collections** → **Categories**
2. Click **Create New**
3. Enter category name and slug
4. Select the **Site** in the sidebar
5. Click **Save**

### Media

When uploading images:
1. Go to **Collections** → **Media**
2. Upload your file
3. Select the **Site** this media belongs to
4. Click **Save**

---

## Managing Page Content

Each site can have custom content for its main pages.

### Home Page

1. Go to **Collections** → **Home Pages**
2. Click **Create New**
3. Select the **Site** (each site can have only one home page)
4. Configure:
   - Hero slider items
   - Trending posts
   - Featured categories
   - Newsletter CTA
5. Click **Save**

### About Page

1. Go to **Collections** → **About Pages**
2. Click **Create New**
3. Select the **Site**
4. Configure:
   - Hero section
   - About images
   - Team information
   - Values
5. Click **Save**

### Contact Page

1. Go to **Collections** → **Contact Pages**
2. Click **Create New**
3. Select the **Site**
4. Configure:
   - Hero section
   - FAQ section
   - Newsletter CTA
5. Click **Save**

---

## Testing Your Multi-Tenant Setup

### Local Development

To test multiple sites locally, you'll need to configure your hosts file:

**Windows**: `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux**: `/etc/hosts`

Add entries like:
```
127.0.0.1 site1.localhost
127.0.0.1 site2.localhost
```

Then access:
- `http://site1.localhost:3000` → Shows Site 1 content
- `http://site2.localhost:3000` → Shows Site 2 content

### Production

In production, configure your DNS to point different domains/subdomains to your application:
- `blog1.yourdomain.com`
- `blog2.yourdomain.com`

Each will automatically load the correct site based on the domain in the **Sites** collection.

---

## Best Practices

1. **Always assign content to a site**: Every post, author, category, and media item must be assigned to a site.

2. **Use descriptive site names**: Make it easy to identify sites in the admin panel.

3. **Test theme changes**: Preview your site after changing themes to ensure colors work well together.

4. **Unique domains**: Each site must have a unique domain value.

5. **Content isolation**: Content from one site will never appear on another site automatically.

---

## Troubleshooting

### "Site not found" error

- Ensure you have at least one site created in the **Sites** collection
- Check that the domain matches exactly (including port for local dev)
- For local testing, use `localhost:3000` as a fallback domain

### Content not showing up

- Verify the content is assigned to the correct site
- Check that the site relationship is set in the sidebar when creating/editing content

### Theme not applying

- Ensure the site has a theme assigned
- Clear your browser cache and refresh
- Check that the theme has valid color values (hex codes)

---

## Summary

Your multi-tenant system is now fully operational! You can:
- ✅ Create and manage multiple sites
- ✅ Assign custom themes to each site
- ✅ Isolate content per site
- ✅ Customize page content for each site
- ✅ Upload site-specific media

All from a single admin dashboard at `/admin`.
