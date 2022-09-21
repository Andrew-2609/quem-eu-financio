#!/bin/sh
echo "### REBUILDING THE APPLICATION"
docker-compose up --force-recreate --build -d