# Dockerfile for building flow-debugproxy
# The first image will only build the binaries and add them to the actual image
# running alpine linux
FROM golang:alpine

ENV FDP_URL="https://github.com/dfeyer/flow-debugproxy/archive/1.0.1.tar.gz"
ENV FDP_SRC=$GOPATH/src/github.com/dfeyer/flow-debugproxy
ENV FDP_BIN_SRC=$FDP_SRC/flow-debugproxy
ENV FDP_BIN=/usr/local/bin/flow-debugproxy

## Prepare build
RUN set -xe \
    && apk add --no-cache --virtual .build-deps \
        curl \
        tar \
        git

## Get and build
RUN set -xe \
    && curl -L -o fdp.tar.gz $FDP_URL \
    && mkdir -p $FDP_SRC \
    && tar -xzf fdp.tar.gz --strip-components=1 -C $FDP_SRC \

    # build
    && cd $FDP_SRC \
    && go get \
    && go build \

    # prepare bin
    && chmod +x $FDP_BIN_SRC \
    && mv $FDP_BIN_SRC $FDP_BIN

## clean build
RUN set -xe \
    && cd $GOPATH \
    && rm -r $FDP_SRC \

    # remove build dependencies
    && apk del .build-deps


## run configuration
ENV XDEBUG_ADDR=0.0.0.0
ENV XDEBUG_PORT=9000
ENV IDE_ADDR=localhost
ENV IDE_PORT=9010
ENV FRAMEWORK=flow

EXPOSE $XDEBUG_PORT

CMD flow-debugproxy -l $XDEBUG_ADDR:$XDEBUG_PORT -I $IDE_ADDR:$IDE_PORT