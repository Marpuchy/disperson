# Disperson

Disperson es una aplicación Symfony 6.1 centrada en un test Big Five / OCEAN con registro de usuario, resultados persistidos y un perfil visual con personajes asociados.

## Arquitectura actual

- `src/Domain/Personality`: enum y metadatos del dominio Big Five.
- `src/Service/Quiz`: cálculo y persistencia del scoring del cuestionario.
- `src/Service/Profile`: composición del perfil y lookup de personajes.
- `src/Controller`: controladores finos por flujo.
- `src/Controller/Admin`: panel EasyAdmin para preguntas y personajes.
- `templates/_partials` y `templates/_components`: layout y bloques reutilizables.
- `public/css` y `public/js`: assets organizados por página/feature.

## Variables de entorno

Base mínimas:

```dotenv
APP_ENV=dev
APP_SECRET=change-me
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
MESSENGER_TRANSPORT_DSN=sync://
```

Supabase recomendado para producción:

```dotenv
APP_ENV=prod
APP_DEBUG=0
APP_SECRET=your-random-secret
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:PASSWORD@aws-0-[REGION].pooler.supabase.com:5432/postgres?serverVersion=15&charset=utf8&sslmode=require"
MESSENGER_TRANSPORT_DSN=sync://
AUTO_MIGRATE=1
```

Notas:

- Usa el pooler de sesión de Supabase en `5432` para despliegues persistentes sobre IPv4.
- La conexión directa `db.[PROJECT-REF].supabase.co:5432` es válida si tu runtime soporta IPv6.
- El pooler transaccional en `6543` no es buena opción con Doctrine porque rompe prepared statements.

## Ejecutar en local con PHP

1. Instala dependencias:

```bash
composer install
```

2. Crea el esquema:

```bash
php bin/console doctrine:migrations:migrate --no-interaction
```

3. Carga datos demo:

```bash
php bin/console app:seed-demo-data
```

4. Arranca el servidor:

```bash
php -S 127.0.0.1:8000 -t public public/router.php
```

5. Abre `http://127.0.0.1:8000`.

Usuario demo:

- Email: `prueba@prueba.com`
- Contraseña: `prueba`

## Ejecutar en local con Docker

```bash
docker build -t disperson .
docker run --rm -p 8000:80 \
  -e APP_ENV=dev \
  -e APP_DEBUG=1 \
  -e APP_SECRET=change-me \
  -e DATABASE_URL=sqlite:////var/www/html/var/data.db \
  -e AUTO_MIGRATE=1 \
  -e APP_SEED_DEMO=1 \
  disperson
```

## Modo local rÃ¡pido

En este workspace, el contenedor de desarrollo sobre volumen de Windows puede dar TTFB de varios segundos y hacer que la navegaciÃ³n se sienta torpe aunque el frontend ya estÃ© optimizado.

Para navegar y revisar la UX en condiciones reales, usa el script:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-local-fast.ps1
```

Este flujo:

- detiene el contenedor lento si estÃ¡ ocupando `8000`
- reconstruye la imagen local
- levanta Symfony en `APP_ENV=prod`
- expone la app rÃ¡pida en `http://127.0.0.1:8000`

Notas:

- es la opciÃ³n recomendada para validar transiciones, tiempos de carga y sensaciÃ³n de navegaciÃ³n
- si cambias cÃ³digo PHP/Twig/CSS/JS, vuelve a ejecutar el script para reconstruir la imagen local
- el entorno rÃ¡pido usa SQLite local dentro del contenedor y siembra datos demo automÃ¡ticamente

## Gestión de contenido

Promociona un usuario a admin:

```bash
php bin/console app:user:promote-admin prueba@prueba.com
```

Luego entra en `/admin` para gestionar:

- Preguntas
- Personajes

## Despliegue recomendado

### Opción recomendada: Render + Supabase

El repo incluye:

- `Dockerfile`
- `render.yaml`

Pasos:

1. Crea una base de datos Supabase y copia el connection string PostgreSQL del pooler de sesión.
2. Sube este repo a GitHub.
3. En Render, crea un nuevo servicio web desde el repo.
4. Render detectará `render.yaml` y usará el `Dockerfile`.
5. Define `DATABASE_URL` en Render con la URL de Supabase.
6. Asegúrate de tener:
   - `APP_ENV=prod`
   - `APP_DEBUG=0`
   - `APP_SECRET=<valor seguro>`
   - `AUTO_MIGRATE=1`
7. Despliega. El entrypoint ejecutará migraciones automáticamente.

## Caveat técnico sobre Vercel

Symfony completo con login por sesión, Doctrine ORM y panel admin no es un encaje ideal para Vercel Functions:

- PHP en Vercel depende de un runtime comunitario, no del stack principal del framework.
- El filesystem es efímero/readonly salvo `/tmp`.
- La app usa autenticación con sesión, por lo que encaja mucho mejor en un despliegue persistente tipo Docker web service.

Conclusión:

- Vercel puede servir para frontend estático o piezas separadas.
- Para esta app Symfony completa, la opción profesional y estable es Docker + Render/Railway/Fly + Supabase.
