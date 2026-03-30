# RSVP Backend

API mínima en Express que persiste confirmaciones de asistencia (RSVP) en MongoDB. Pensada para el formulario de invitación del evento (nombre del niño/a, email y teléfono del apoderado, y si asiste o declina).

## Requisitos

- **Node.js** 20+
- **Docker** (para MongoDB) o una instancia de MongoDB accesible

## Configuración

### 1. Variables de entorno

Copia el ejemplo y ajusta si hace falta:

```bash
cp .env.example .env
```

| Variable      | Descripción                                      | Por defecto (local)              |
|---------------|--------------------------------------------------|----------------------------------|
| `MONGODB_URI` | URI de conexión a MongoDB                        | `mongodb://localhost:27017/rsvp` |
| `CORS_ORIGIN` | Origen permitido para CORS (frontend)            | `http://localhost:3000`         |
| `PORT`        | Puerto en el que escucha el servidor             | `3001`                           |

En producción, usa un origen concreto en `CORS_ORIGIN` (no `*`).

### 2. MongoDB

Con Docker, desde la carpeta `_backend`:

```bash
docker compose up -d
```

MongoDB queda en `localhost:27017` con base de datos `rsvp`. Los datos se guardan en `./appdata/mongodb`.

Si usas MongoDB en otro host, define `MONGODB_URI` en `.env` con la URI correspondiente.

## Cómo correr

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Desarrollo (recarga al cambiar código)
npm run dev

# Producción (compilar y ejecutar)
npm run build
npm start
```

Por defecto el servidor escucha en `http://localhost:3001`.

## API

### Health check

- **GET** `/health`  
  - Respuesta: `200` con `{ "status": "ok" }`

### Registrar RSVP

- **POST** `/api/rsvp`  
  - **Body (JSON):**
    - `guestName` (string, obligatorio): nombre del niño/a que asiste (máx. 200 caracteres).
    - `guardianEmail` (string, obligatorio): email del apoderado/acompañante (formato email válido).
    - `guardianPhone` (string): teléfono del apoderado. **Obligatorio** si la asistencia es confirmada; opcional si se declina. Máx. 30 caracteres; en confirmación solo dígitos y símbolos habituales (`+`, espacios, `-`, `()`, `.`).
    - `status` (string, opcional): `confirmed` o `declined` (sin distinguir mayúsculas). Si se omite o va vacío, se interpreta como **confirmed**.
  - **Éxito:** `201` con `{ "id": "<ObjectId>", "message": "RSVP registrado correctamente" }`.
  - **Error de validación:** `400` con `{ "errors": ["..."] }`.
  - **Duplicado:** `409` si ya existe un documento con el mismo `guestName` y `guardianEmail`.
  - **Rate limit:** `429` con `{ "error": "Demasiadas solicitudes. Intenta más tarde." }` (límite: 10 peticiones por minuto por IP).

Ejemplos con `curl`:

```bash
# Confirmación de asistencia
curl -X POST http://localhost:3001/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"guestName":"María","guardianEmail":"padre@ejemplo.com","guardianPhone":"912345678","status":"confirmed"}'

# No podrá asistir
curl -X POST http://localhost:3001/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"guestName":"María","guardianEmail":"padre@ejemplo.com","guardianPhone":"N/A","status":"declined"}'
```

## Integración con el frontend

El frontend Next.js debe tener definida la variable de entorno:

```bash
NEXT_PUBLIC_RSVP_API_URL=http://localhost:3001
```

En producción, usa la URL pública del backend (ej. `https://api.tudominio.com`). Si esta variable no está definida, el formulario solo usará EmailJS y no guardará en MongoDB.

## Seguridad

- **Helmet** para cabeceras HTTP seguras.
- **CORS** restringido al origen configurado en `CORS_ORIGIN`.
- **Rate limiting** en `/api/rsvp` (10 req/min por IP).
- Validación y sanitización del body (trim, longitud, formato de email, teléfono y estado de asistencia).
- Secretos en `.env`; no versionar `.env` (sí `.env.example`).

## Estructura del proyecto

```
_backend/
  src/
    index.ts          # App Express, CORS, rate limit, rutas
    db.ts             # Conexión a MongoDB
    routes/rsvp.ts    # POST /api/rsvp
    middleware/
      validate.ts     # Validación del body
  docker-compose.yml # MongoDB 7
  .env.example
  package.json
  tsconfig.json
```

Los documentos se guardan en la colección `rsvps` con: `guestName`, `guardianEmail`, `guardianPhone`, `status` (`confirmed` | `declined`), `createdAt`.
