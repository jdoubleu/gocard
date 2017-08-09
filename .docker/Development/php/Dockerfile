# Dockerfile to create a development php container
FROM php:7.1-fpm-alpine

## Development settings, flow requirements
ADD https://raw.githubusercontent.com/php/php-src/PHP-7.1/php.ini-development /usr/local/etc/php/php.ini
RUN cd /usr/local/etc/php \
    && sed -i 's/memory_limit\ =.*/memory_limit\ =\ 250M/g' php.ini \
    && sed -i 's/max_execution_time\ =.*/max_execution_time\ =\ 60/g' php.ini \
    && sed -i 's/error_reporting\ =.*/error_reporting\ =\ -1/g' php.ini \
    # install mysql pdo driver
    && docker-php-ext-install pdo_mysql

RUN cd /usr/local/etc/php-fpm.d \
    #&& sed -i '/error_log\ =.*/aphp_admin_value[error_log]\ =\ \/proc\/self\/fd\/2/g' docker.conf
    && echo 'php_admin_value[error_log] = /proc/self/fd/2' >> docker.conf

## Install development tools
RUN set -xe \
	&& apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS \
	&& pecl install xdebug \
	&& docker-php-ext-enable xdebug \
	&& apk del .phpize-deps

### Configure xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/