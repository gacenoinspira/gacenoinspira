alter table "public"."details_operator" add constraint "details_operator_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE not valid;

alter table "public"."details_operator" validate constraint "details_operator_user_id_fkey1";

alter table "public"."user" add constraint "user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user" validate constraint "user_user_id_fkey";


