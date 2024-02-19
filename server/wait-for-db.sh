#!/bin/sh

# Wait until MySQL is ready to accept connections
until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  # Wait for 5 seconds before retrying
  sleep 5
done

echo "Database is ready, proceeding with npm install..."
