source .env.local
supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > lib/database.types.ts
