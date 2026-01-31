const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./payload-db.sqlite');

console.log('--- Verifying Sites ---');
db.all("SELECT id, name, domain FROM sites", [], (err, rows) => {
    if (err) {
        console.error('Error fetching sites:', err);
        return;
    }
    console.log('Sites found:', rows);
});

console.log('--- Verifying Posts ---');
db.all("SELECT id, title, slug FROM posts LIMIT 5", [], (err, rows) => {
    if (err) {
        console.error('Error fetching posts:', err);
        return;
    }
    console.log('Posts found:', rows);
});

console.log('--- Verifying Home Pages ---');
db.all("SELECT id, site_id FROM home_pages", [], (err, rows) => {
    if (err) {
        // Table name might be home-pages (slug) but sqlite uses underscores
        // Let's list tables if it fails
        db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err2, tables) => {
            console.log('Tables in DB:', tables.map(t => t.name));
        });
        return;
    }
    console.log('Home Pages found:', rows);
});

setTimeout(() => db.close(), 2000);
