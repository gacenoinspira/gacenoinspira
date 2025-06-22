drop policy "activity rules" on "public"."activity";

drop policy "category" on "public"."category";

drop policy "zone" on "public"."zone";

create policy "delete"
on "public"."activity"
as permissive
for delete
to public
using (true);


create policy "get"
on "public"."activity"
as permissive
for select
to public
using (true);


create policy "insert"
on "public"."activity"
as permissive
for insert
to authenticated
with check (true);


create policy "update"
on "public"."activity"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "delete"
on "public"."category"
as permissive
for delete
to authenticated
using (true);


create policy "get"
on "public"."category"
as permissive
for select
to public
using (true);


create policy "insert"
on "public"."category"
as permissive
for insert
to authenticated
with check (true);


create policy "update"
on "public"."category"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "delete"
on "public"."zone"
as permissive
for delete
to authenticated
using (true);


create policy "get"
on "public"."zone"
as permissive
for select
to public
using (true);


create policy "insert"
on "public"."zone"
as permissive
for insert
to authenticated
with check (true);


create policy "update"
on "public"."zone"
as permissive
for update
to authenticated
using (true)
with check (true);



