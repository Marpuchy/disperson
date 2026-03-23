# Frontend en Vercel + backend Symfony en Render

Esta configuración separa la entrada pública y el backend sin reescribir la aplicación a Node:

- `frontend/` se despliega en Vercel
- la raíz del repo se despliega en Render
- la base de datos vive en Supabase PostgreSQL

## Qué sirve cada parte

Frontend Next.js en Vercel:

- `/`
- `/about`
- `/contact`

Backend Symfony mediante rewrites:

- `/login`
- `/logout`
- `/register`
- `/profile`
- `/quiz/*`
- `/admin/*`
- `/css/*`
- `/js/*`
- `/resources/*`
- `/bundles/*`

Las rewrites viven en `frontend/next.config.mjs`.

## Variables de entorno del backend

El proyecto ya incluye un `.env` base sin secretos y una plantilla en `.env.example`.

Variables mínimas:

```dotenv
APP_ENV=prod
APP_DEBUG=0
APP_SECRET=<valor-seguro>
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@[region].pooler.supabase.com:5432/postgres?serverVersion=15&charset=utf8"
MAILER_DSN=null://null
MESSENGER_TRANSPORT_DSN=sync://
```

Notas:

- usa el session pooler de Supabase en `:5432`
- no uses el transaction pooler en `:6543` con Doctrine
- en Render, el valor de `DATABASE_URL` se pega sin comillas
- no dejes placeholders como `[password]` o `[project-ref]`
- si la contraseña tiene caracteres especiales como `@`, `:`, `/`, `?`, `#`, `[`, `]` o `%`, hay que URL-encodearla
- en local puedes seguir usando SQLite con:

```dotenv
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
```

## Variables de entorno del frontend

En `frontend/.env.local`:

```dotenv
BACKEND_URL=http://127.0.0.1:8000
```

En Vercel:

```dotenv
BACKEND_URL=https://tu-backend.onrender.com
```

## Desarrollo local

### Backend Symfony

Si trabajas sin Docker:

```bash
composer install
cp .env.example .env.local
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console app:seed-demo-data
php -S 127.0.0.1:8000 -t public public/router.php
```

Si trabajas con el contenedor PHP ya montado:

```bash
docker exec disperson-dev php bin/console doctrine:migrations:migrate --no-interaction
docker exec disperson-dev php bin/console app:seed-demo-data
```

### Frontend Next.js

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Deploy del backend en Render

1. Crea el proyecto PostgreSQL en Supabase.
2. Copia la cadena del session pooler.
3. Crea un Web Service en Render apuntando a la raíz del repo.
4. Usa `render.yaml` y `Dockerfile`.
5. Configura estas variables:

```dotenv
APP_ENV=prod
APP_DEBUG=0
APP_SECRET=<valor seguro>
DATABASE_URL=<Supabase session pooler>
MAILER_DSN=null://null
MESSENGER_TRANSPORT_DSN=sync://
AUTO_MIGRATE=1
```

6. Despliega.
7. Guarda la URL pública de Render, por ejemplo:

```dotenv
https://disperson-api.onrender.com
```

## Deploy del frontend en Vercel

1. Crea un proyecto nuevo en Vercel con este repo.
2. Usa `frontend` como Root Directory.
3. Mantén los comandos por defecto de Next:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

4. Configura:

```dotenv
BACKEND_URL=https://disperson-api.onrender.com
```

5. Despliega.

## Comportamiento esperado

- la home pública y las páginas informativas salen desde Vercel
- login, registro, quiz, perfil y admin siguen siendo Symfony
- el navegador siempre ve la URL del frontend, pero Vercel hace proxy al backend
- no hay backend Node: Node solo sirve la capa pública y el proxy

## Caveat técnico

Esta solución es profesional y desplegable, pero no convierte Symfony en una app serverless.  
Vercel actúa como frontend y gateway; Render sigue siendo el runtime real del backend.
