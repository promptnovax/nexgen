# Performance Optimization Guide

## Issues Fixed

### 1. Multiple Database Queries Per Request

**Problem**: The `getTenant()` function was being called multiple times per page load:
- Once in the root layout
- Once in each page component (Home, Blog, About, Contact)

This resulted in 2-5 database queries per request, significantly slowing down page loads.

**Solution**: Implemented React's `cache()` wrapper around `getTenant()`:

```typescript
import { cache } from 'react'

export const getTenant = cache(async () => {
  // ... tenant detection logic
})
```

This ensures that `getTenant()` is only executed once per request, with subsequent calls returning the cached result.

### 2. Deep Query Nesting

**Problem**: Queries were using `depth: 2`, which fetches nested relationships recursively, increasing query time and data transfer.

**Solution**: Reduced depth to `1` since we only need the theme data, not deeply nested relationships:

```typescript
const sites = await payload.find({
  collection: 'sites',
  where: { domain: { equals: domain } },
  depth: 1, // Only need theme data
  limit: 1,
})
```

### 3. Missing Query Limits

**Problem**: Some queries didn't have explicit limits, potentially fetching more data than needed.

**Solution**: Added `limit: 1` to all site queries since we only need one result.

---

## Performance Improvements

After these optimizations:
- ✅ **Reduced database queries**: From 2-5 queries to 1 query per request
- ✅ **Faster data fetching**: Reduced query depth means less data to fetch
- ✅ **Better caching**: React cache ensures efficient request-level caching
- ✅ **Optimized queries**: All queries now have explicit limits

---

## Testing Performance

### 1. Check Dev Server Startup

The dev server should start within 5-10 seconds:

```bash
npm run dev
```

Look for:
```
✓ Ready in Xs
○ Compiling / ...
✓ Compiled / in Xs
```

### 2. Test Page Load Times

Navigate to `http://localhost:3000`:
- **First load**: May take 2-5 seconds (Next.js compilation)
- **Subsequent loads**: Should be under 1 second

### 3. Monitor Console

Open browser DevTools → Network tab:
- Check for slow API calls
- Verify no duplicate requests to Payload API

---

## Common Performance Issues

### Slow First Load

**Cause**: Next.js compiles pages on first request in development.

**Solution**: This is normal. Subsequent loads will be much faster.

### Still Slow After Optimization

**Possible causes**:
1. **Large database**: If you have thousands of records, queries may be slow
   - **Fix**: Add database indexes to the `domain` field in Sites collection
   
2. **No sites created**: The fallback query searches all sites
   - **Fix**: Create at least one site in the admin

3. **Development mode overhead**: Next.js dev mode is slower than production
   - **Fix**: Build and run in production mode for testing:
     ```bash
     npm run build
     npm run start
     ```

### Database Locked Errors

**Cause**: SQLite database is being accessed by multiple processes.

**Solution**: 
1. Stop all dev servers
2. Delete `payload-db.sqlite-wal` and `payload-db.sqlite-shm` if they exist
3. Restart dev server

---

## Production Optimization Tips

For production deployment:

1. **Use PostgreSQL or MongoDB** instead of SQLite for better concurrent access
2. **Enable caching** at the infrastructure level (Redis, CDN)
3. **Optimize images** using Next.js Image component
4. **Enable static generation** for pages that don't change often
5. **Add database indexes** on frequently queried fields:
   - `sites.domain`
   - `posts.site`
   - `authors.site`
   - `categories.site`

---

## Monitoring

To monitor performance in production:

1. Use Next.js Analytics
2. Add logging to `getTenant()`:
   ```typescript
   console.time('getTenant')
   const result = await getTenant()
   console.timeEnd('getTenant')
   ```
3. Monitor database query times
4. Use APM tools like New Relic or Datadog

---

## Summary

The main performance bottleneck was multiple database queries per request. By implementing React cache and optimizing query depth, page load times should now be significantly faster.

If you're still experiencing slow performance after these changes, check the troubleshooting section above.
