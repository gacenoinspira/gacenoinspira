create policy "zone"
on "public"."zone"
as permissive
for all
to authenticated
using (true)
with check (true);



