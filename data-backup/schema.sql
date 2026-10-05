


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."resources_search_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.search_vector :=
    to_tsvector('english',
      coalesce(new.name,'') || ' ' || coalesce(new.description,''));
  return new;
end
$$;


ALTER FUNCTION "public"."resources_search_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at := now();
  return new;
end
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."resources" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "resource_url" "text" NOT NULL,
    "canonical_url" "text",
    "section" "text" NOT NULL,
    "stack" "text" NOT NULL,
    "technologies" "text"[],
    "frameworks" "text"[],
    "tools" "text"[],
    "resource_type" "text" NOT NULL,
    "difficulty" "text",
    "github_url" "text",
    "maintainer" "text",
    "access_model" "text",
    "openness_license" "text",
    "official" boolean DEFAULT false,
    "verified" boolean DEFAULT false,
    "last_verified" "date",
    "verification_status" "text" DEFAULT 'pending'::"text",
    "search_vector" "tsvector",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."resources" OWNER TO "postgres";


ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_resources_frameworks" ON "public"."resources" USING "gin" ("frameworks");



CREATE INDEX "idx_resources_search_vector" ON "public"."resources" USING "gin" ("search_vector");



CREATE INDEX "idx_resources_section" ON "public"."resources" USING "btree" ("section");



CREATE INDEX "idx_resources_stack" ON "public"."resources" USING "btree" ("stack");



CREATE INDEX "idx_resources_technologies" ON "public"."resources" USING "gin" ("technologies");



CREATE INDEX "idx_resources_tools" ON "public"."resources" USING "gin" ("tools");



CREATE INDEX "idx_resources_type" ON "public"."resources" USING "btree" ("resource_type");



CREATE UNIQUE INDEX "idx_resources_url_lower" ON "public"."resources" USING "btree" ("lower"("resource_url"));



CREATE INDEX "idx_resources_verified" ON "public"."resources" USING "btree" ("verified");



CREATE OR REPLACE TRIGGER "trg_resources_search" BEFORE INSERT OR UPDATE ON "public"."resources" FOR EACH ROW EXECUTE FUNCTION "public"."resources_search_update"();



CREATE OR REPLACE TRIGGER "trg_resources_updated_at" BEFORE UPDATE ON "public"."resources" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE POLICY "public read resources" ON "public"."resources" FOR SELECT TO "authenticated", "anon" USING (true);



ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."resources_search_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."resources_search_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."resources_search_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."resources" TO "anon";
GRANT ALL ON TABLE "public"."resources" TO "authenticated";
GRANT ALL ON TABLE "public"."resources" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































