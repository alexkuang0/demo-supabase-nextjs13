create table
  public.todos (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    is_completed boolean null default false,
    owner uuid null,
    content text not null,
    constraint todos_pkey primary key (id),
    constraint todos_owner_fkey foreign key (owner) references auth.users (id) on delete cascade
  ) tablespace pg_default;

ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow users to read their own todos" ON "public"."todos"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = owner);

CREATE POLICY "allow users to write their own todos" ON "public"."todos"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = owner);

CREATE POLICY "allow users to modify their own todos" ON "public"."todos"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = owner);
