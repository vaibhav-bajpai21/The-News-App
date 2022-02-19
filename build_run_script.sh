#!/bin/bash

#Removing old container
echo "Removing Old Container"
docker stop "thenewsapp_service"
docker rm "thenewsapp_service"

#Removing old image
echo "Removing Old Image"
docker rmi "thenewsapp_image"



# Image build command
echo "Building Image"
docker build -t "thenewsapp_image" -f ./DockerFile .

#conatiner run command
echo "Running Docker"
source ./.env

docker run --name "thenewsapp_service" -d --env-file .env -p $PORT:$PORT "thenewsapp_image"
docker logs --tail 50 -f "thenewsapp_service"