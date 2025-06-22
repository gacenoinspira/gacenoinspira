drop policy "operator" on "public"."operator";

create policy "category"
on "public"."category"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "delete"
on "public"."details_operator"
as permissive
for delete
to authenticated
using (true);


create policy "get"
on "public"."details_operator"
as permissive
for select
to public
using (true);


create policy "insert"
on "public"."details_operator"
as permissive
for insert
to authenticated
with check (true);


create policy "update"
on "public"."details_operator"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "delete"
on "public"."operator"
as permissive
for delete
to authenticated
using (true);


create policy "get"
on "public"."operator"
as permissive
for select
to public
using (true);


create policy "insert"
on "public"."operator"
as permissive
for insert
to authenticated
with check (true);


create policy "update"
on "public"."operator"
as permissive
for update
to authenticated
using (true)
with check (true);



