#!/bin/sh
set -eu

if [ ! -f .env ]; then
  cat > .env <<EOF
APP_ENV=${APP_ENV:-prod}
APP_DEBUG=${APP_DEBUG:-0}
APP_SECRET="${APP_SECRET:-change-me-in-production}"
DATABASE_URL="${DATABASE_URL:-sqlite:///%kernel.project_dir%/var/data.db}"
MAILER_DSN="${MAILER_DSN:-null://null}"
MESSENGER_TRANSPORT_DSN="${MESSENGER_TRANSPORT_DSN:-sync://}"
AUTO_MIGRATE=${AUTO_MIGRATE:-0}
EOF
fi

mkdir -p var/cache var/log

if [ "${AUTO_MIGRATE:-0}" = "1" ]; then
  php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
fi

if [ "${APP_SEED_DEMO:-0}" = "1" ]; then
  php bin/console app:seed-demo-data
fi

if [ "${APP_ENV:-prod}" = "prod" ]; then
  php bin/console cache:clear --no-warmup
  php bin/console cache:warmup
fi

exec "$@"
