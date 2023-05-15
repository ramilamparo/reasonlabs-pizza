#!/usr/bin/env bash

set -e

db_pass=
db_name=
frontend_port=
backend_port=
api_url=

while [[ -n "$1" ]]; do
    case "$1" in
    --db-pass)
        shift
        db_pass="$1"
        ;;
    --db-name)
        shift
        db_name="$1"
        ;;
    --frontend-port)
        shift
        frontend_port="$1"
        ;;
    --backend-port)
        shift
        backend_port="$1"
        ;;
    --api-url)
        shift
        api_url="$1"
        ;;
    esac
    shift
done

all_args=(
    "$db_pass"
    "$db_name"
    "$frontend_port"
    "$backend_port"
    "$api_url"
)

for arg in "${all_args[@]}"; do
    if [[ -z "$arg" ]]; then
        echo "Invalid options..." 1>&2
        exit 1
    fi
done

export FRONTEND_PORT="$frontend_port"
export BACKEND_PORT="$backend_port"

export MYSQL_ROOT_PASSWORD="$db_pass"
export MYSQL_DATABASE="$db_name"

export DATABASE_PASS="$db_pass"
export DATABASE_NAME="$db_name"
export DATABASE_USER="root"
export NODE_ENV="production"

export VITE_APP_API_URL="$api_url"

docker compose build
docker compose up -d