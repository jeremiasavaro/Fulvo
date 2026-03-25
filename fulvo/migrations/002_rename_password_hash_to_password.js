export const shorthands = undefined;

export async function up(pgm) {
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'user'
          AND column_name = 'password_hash'
      ) THEN
        ALTER TABLE "user" RENAME COLUMN password_hash TO password;
      END IF;
    END $$;
  `);
}

export async function down(pgm) {
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'user'
          AND column_name = 'password'
      ) THEN
        ALTER TABLE "user" RENAME COLUMN password TO password_hash;
      END IF;
    END $$;
  `);
}
