#!/bin/sh

JSON_STRING='window.configs = { \
  "VUE_APP_EMPRESA_API":"'"${VUE_APP_EMPRESA_API}"'", \
  "VUE_APP_USUARIO_API":"'"${VUE_APP_USUARIO_API}"'" \
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html

exec "$@"