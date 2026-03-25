# Fulvo

Proyecto Next.js minimo con backend basico para registro de usuarios.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- PostgreSQL

## Configuracion

1. Copiar `.env.example` a `.env.local`
2. Ajustar `DATABASE_URL`
3. Ejecutar migraciones

## Comandos

```bash
npm install
npm run migrate:up
npm run dev
```

## Docker Compose

Levanta app + db con un solo comando:

```bash
docker compose up --build
```

Detiene todo:

```bash
docker compose down
```

La app queda en `http://localhost:3000`.

## Endpoint inicial

- `POST /api/register`
- body JSON esperado:

```json
{
	"username": "demo",
	"password": "12345678",
	"password_confirmation": "12345678"
}
```

## Base de datos

- Tabla: `user`
- Columnas iniciales: `username`, `password` (hash), `created_at`
