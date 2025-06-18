create table "public"."details_operator" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "id_operator" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default auth.uid(),
    "is_favorite" boolean default false,
    "notes" text not null,
    "start" bigint not null default '0'::bigint
);


alter table "public"."details_operator" enable row level security;

CREATE UNIQUE INDEX details_operator_pkey ON public.details_operator USING btree (id);

alter table "public"."details_operator" add constraint "details_operator_pkey" PRIMARY KEY using index "details_operator_pkey";

alter table "public"."details_operator" add constraint "details_operator_id_operator_fkey" FOREIGN KEY (id_operator) REFERENCES operator(id) ON DELETE CASCADE not valid;

alter table "public"."details_operator" validate constraint "details_operator_id_operator_fkey";

alter table "public"."details_operator" add constraint "details_operator_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."details_operator" validate constraint "details_operator_user_id_fkey";

grant delete on table "public"."details_operator" to "anon";

grant insert on table "public"."details_operator" to "anon";

grant references on table "public"."details_operator" to "anon";

grant select on table "public"."details_operator" to "anon";

grant trigger on table "public"."details_operator" to "anon";

grant truncate on table "public"."details_operator" to "anon";

grant update on table "public"."details_operator" to "anon";

grant delete on table "public"."details_operator" to "authenticated";

grant insert on table "public"."details_operator" to "authenticated";

grant references on table "public"."details_operator" to "authenticated";

grant select on table "public"."details_operator" to "authenticated";

grant trigger on table "public"."details_operator" to "authenticated";

grant truncate on table "public"."details_operator" to "authenticated";

grant update on table "public"."details_operator" to "authenticated";

grant delete on table "public"."details_operator" to "service_role";

grant insert on table "public"."details_operator" to "service_role";

grant references on table "public"."details_operator" to "service_role";

grant select on table "public"."details_operator" to "service_role";

grant trigger on table "public"."details_operator" to "service_role";

grant truncate on table "public"."details_operator" to "service_role";

grant update on table "public"."details_operator" to "service_role";

create policy "activity rules"
on "public"."activity"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "details"
on "public"."details_operator"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "activity"
on "public"."type_activity"
as permissive
for all
to authenticated
using (true)
with check (true);



