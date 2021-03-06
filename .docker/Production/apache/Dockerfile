# Dockerfile to create a development apache container
FROM httpd:alpine

## Development settings, flow requirements
RUN mkdir -p /var/www/html
RUN cd /usr/local/apache2/conf \
    # Enable some extra modules
    && sed -i 's/^\#\(LoadModule rewrite_module.*\)$/\1/g' httpd.conf \
    && sed -i 's/^\#\(LoadModule proxy_module.*\)$/\1/g' httpd.conf \
    && sed -i 's/^\#\(LoadModule proxy_fcgi_module.*\)$/\1/g' httpd.conf \
    # change document root
    && sed -i 's/\/usr\/local\/apache2\/htdocs/\/var\/www\/html\/Web/' httpd.conf \
    && sed -i '1,/AllowOverride None/s/AllowOverride None/AllowOverride All/' httpd.conf \
    # add vhost
    && echo 'Include conf/extra/app.conf' >> httpd.conf
COPY .docker/Production/apache/http.conf /usr/local/apache2/conf/extra/app.conf

# Set workdir
WORKDIR /var/www/html

## Copy sources
COPY Configuration /var/www/html/Configuration
COPY Packages /var/www/html/Packages
COPY Web /var/www/html/Web