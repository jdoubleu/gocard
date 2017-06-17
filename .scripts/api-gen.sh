#!/bin/bash
#
# This script will generate the api client sources based
# on the swagger api definition using the swagger-codegen bin.
# It applies a custom configuration, which is unpossible to set through the codegen-cli.
#
# @author Joshua Westerheide <dev@jdoubleu.de>

CODEGEN_BIN=$(which swagger-codegen)
if [ ! -f $CODEGEN_BIN ]; then
    echo "swagger-codegen not installed!"
    exit 1;
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")
SCHEMA_FILE="$PROJECT_ROOT/api_schema.yaml"
OUTPUT_DIR="$PROJECT_ROOT/client/api/"
CODEGEN_JAR=$(tail -n1 "$CODEGEN_BIN" | awk '{ print $4 }')

echo "Using jar: $CODEGEN_JAR"
echo "Generate $OUTPUT_DIR from $SCHEMA_FILE"

exec java -DapiDocs=false -DmodelDocs=false -jar $CODEGEN_JAR generate -i $SCHEMA_FILE --lang javascript -o $OUTPUT_DIR