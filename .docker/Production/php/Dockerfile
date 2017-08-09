# Dockerfile to create a development php container
FROM php:7.1-fpm-alpine

## Development settings, flow requirements
ADD https://raw.githubusercontent.com/php/php-src/PHP-7.1/php.ini-production /usr/local/etc/php/php.ini
RUN cd /usr/local/etc/php \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable opcache

## Install runtime dependencies
RUN set -xe \
    && adduser -u 83 -D -S -G www-data cli-user \
    && apk add --no-cache \
        bash \
        sudo

## Install additional extensions
RUN set -xe \
	&& apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS \
	&& pecl install igbinary \
	&& docker-php-ext-enable igbinary \
	&& apk del .phpize-deps

### Configure xdebug
COPY .docker/Production/php/apc.ini .docker/Production/php/igbinary.ini .docker/Production/php/opcache.ini /usr/local/etc/php/conf.d/

## Set environment variables for runtime
ENV FLOW_CONTEXT=Production
ENV FLOW_BIN=/var/www/html/flow

## Copy sources
COPY flow /var/www/html/
COPY Configuration /var/www/html/Configuration
COPY Packages /var/www/html/Packages
COPY Web /var/www/html/Web

## Define volumes
VOLUME ["/var/www/html/Data/Logs"]
VOLUME ["/var/www/html/Data/Persistent"]

## Execution
COPY .docker/Production/php/run .docker/Production/php/setup.php /usr/local/bin/

CMD ["/usr/local/bin/run"]