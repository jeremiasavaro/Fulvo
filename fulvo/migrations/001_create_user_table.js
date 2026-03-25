export const shorthands = undefined;

export async function up(pgm) {
  pgm.createTable(
    "user",
    {
      id: {
        type: "bigserial",
        primaryKey: true,
      },
      username: {
        type: "text",
        notNull: true,
        unique: true,
      },
      password: {
        type: "text",
        notNull: true,
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("now()"),
      },
    },
    { ifNotExists: true },
  );
}

export async function down(pgm) {
  pgm.dropTable("user", { ifExists: true });
}
