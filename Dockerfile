FROM composer:2 AS vendor

WORKDIR /app

# Symfony framework-bundle and security-bundle require ext-xml during composer install.
RUN docker-php-ext-install xml

COPY composer.json composer.lock symfony.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --no-scripts

COPY . .
RUN composer dump-autoload --optimize --classmap-authoritative --no-dev

FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install intl pdo_pgsql opcache xml zip \
    && a2enmod rewrite headers expires \
    && rm -rf /var/lib/apt/lists/*

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY docker/entrypoint.sh /usr/local/bin/disperson-entrypoint

RUN chmod +x /usr/local/bin/disperson-entrypoint \
    && chown -R www-data:www-data var

ENV APP_ENV=prod
ENV APP_DEBUG=0

ENTRYPOINT ["disperson-entrypoint"]
CMD ["apache2-foreground"]
