create table "public"."operator" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text not null,
    "phone" bigint not null,
    "lat" double precision not null,
    "lng" double precision not null
);


alter table "public"."operator" enable row level security;

CREATE UNIQUE INDEX operator_pkey ON public.operator USING btree (id);

alter table "public"."operator" add constraint "operator_pkey" PRIMARY KEY using index "operator_pkey";

grant delete on table "public"."operator" to "anon";

grant insert on table "public"."operator" to "anon";

grant references on table "public"."operator" to "anon";

grant select on table "public"."operator" to "anon";

grant trigger on table "public"."operator" to "anon";

grant truncate on table "public"."operator" to "anon";

grant update on table "public"."operator" to "anon";

grant delete on table "public"."operator" to "authenticated";

grant insert on table "public"."operator" to "authenticated";

grant references on table "public"."operator" to "authenticated";

grant select on table "public"."operator" to "authenticated";

grant trigger on table "public"."operator" to "authenticated";

grant truncate on table "public"."operator" to "authenticated";

grant update on table "public"."operator" to "authenticated";

grant delete on table "public"."operator" to "service_role";

grant insert on table "public"."operator" to "service_role";

grant references on table "public"."operator" to "service_role";

grant select on table "public"."operator" to "service_role";

grant trigger on table "public"."operator" to "service_role";

grant truncate on table "public"."operator" to "service_role";

grant update on table "public"."operator" to "service_role";

create policy "operator"
on "public"."operator"
as permissive
for all
to authenticated
using (true)
with check (true);



