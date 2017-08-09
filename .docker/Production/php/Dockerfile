# Dockerfile to create a development php container
FROM php:7.1-fpm-alpine

## Development settings, flow requirements
ADD https://raw.githubusercontent.com/php/php-src/PHP-7.1/php.ini-production /usr/local/etc/php/php.ini
RUN cd /usr/local/etc/php \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable opcache

## Install additional extensions
RUN set -xe \
	&& apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS \
	&& pecl install igbinary \
	&& docker-php-ext-enable igbinary \
	&& apk del .phpize-deps

### Configure xdebug
COPY apc.ini igbinary.ini opcache.ini /usr/local/etc/php/conf.d/

## Set environment variables for runtime
ENV FLOW_CONTEXT=Production

## Define volumes
VOLUME ["/var/www/htl/Data/Logs"]
VOLUME ["/var/www/htl/Data/Persistent"]

## Execution
COPY run setup.php /usr/local/bin/

CMD ["/usr/local/bin/run"]