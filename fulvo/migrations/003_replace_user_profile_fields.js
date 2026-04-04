export const shorthands = undefined;

export async function up(pgm) {
  // User requested a full reset of existing users before changing required columns.
  pgm.sql('TRUNCATE TABLE "user" RESTART IDENTITY;');

  pgm.dropColumn("user", "username", { ifExists: true });

  pgm.addColumns("user", {
    full_name: {
      type: "text",
      notNull: true,
    },
    dni: {
      type: "text",
      notNull: true,
      unique: true,
    },
    email: {
      type: "text",
      notNull: true,
      unique: true,
    },
    city: {
      type: "text",
      notNull: true,
    },
    birth_date: {
      type: "date",
      notNull: true,
    },
    age: {
      type: "integer",
      notNull: true,
    },
  });
}

export async function down(pgm) {
  pgm.dropColumn("user", ["full_name", "dni", "email", "city", "birth_date", "age"], {
    ifExists: true,
  });

  pgm.addColumns("user", {
    username: {
      type: "text",
      notNull: true,
      unique: true,
    },
  });
}
