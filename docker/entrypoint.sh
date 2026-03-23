#!/bin/sh
set -eu

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
