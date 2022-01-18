\echo 'Delete and recreate housebnb db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE housebnb;
CREATE DATABASE housebnb;
\connect housebnb

\i housebnb-schema.sql
\i housebnb-seed.sql

\echo 'Delete and recreate housebnb_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE housebnb_test;
CREATE DATABASE housebnb_test;
\connect housebnb_test

\i housebnb-schema.sql