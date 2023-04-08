# Backups
Backups must currently be done in order to set up a D1 database locally due to issues with the --local flag.

1. Create a backup of the current staging database
```
npx wrangler d1 backup create staging
```

2. Download the backup made
```
npx wrangler d1 backup download staging {BACKUP_ID}
```

3. Replace the database
Move the created staging.{BACKUP_ID}.sqlite3 file to .wrangler/state/d1/DATABASE.sqlite3 
