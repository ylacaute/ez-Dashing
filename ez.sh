#!/bin/bash

PREVIOUS_DIR="$(pwd)"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
SERVER_ASSETS_DIR="$BACK_DIR/src/main/resources"
DOCKER_DEP_DIR="$PROJECT_DIR/ez-os"

DOCKER_IMG_OS_TAG="ez-dashing:os"
DOCKER_IMG_TAG="ez-dashing:latest"

echo "Current directory: $PREVIOUS_DIR"
echo "Project directory: $PROJECT_DIR"
echo "Server assets directory: $SERVER_ASSETS_DIR"

function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

function createDockerOsImage {
  cd ${DOCKER_DEP_DIR}
  bash build.sh
}

function pushDockerOsImage {
  banner "Push ez-Dashing docker image os to Docker Hub"
  docker tag ${DOCKER_IMG_OS_TAG} ylacaute/${DOCKER_IMG_OS_TAG}
  docker login
  docker push ylacaute/${DOCKER_IMG_OS_TAG}
}

function createDockerImage {
  banner "ez-Dashing docker image"
  cd ${PROJECT_DIR}
  sudo docker build --tag=${DOCKER_IMG_TAG} .
}

function pushDockerImage {
  banner "Push ez-Dashing docker image to Docker Hub"
  docker tag ${DOCKER_IMG_TAG} ylacaute/${DOCKER_IMG_TAG}
  docker login
  docker push ylacaute/${DOCKER_IMG_TAG}
}

function createDemoContainer {
  cd ${PROJECT_DIR}
  banner "Creating demo container from ez-Dashing image"
  sudo docker run -p 2222:2222 -p 8080:8080 --name ez-dashing-demo -t ${DOCKER_IMG_TAG} bash ez.sh demo
}

function startDemo {
  cd ${FRONT_DIR}
  banner "STARTING EZ-DASHING FOR DEMO"
  echo "Starting the mock API, please wait..."
  npm run start-mock-api &
  echo "Starting the front app, please wait..."
  npm run start-dev
}

# TODO
function startProduction {
  cd ${FRONT_DIR}
  echo "Building front for production, please wait..."
  npm run build
  echo "Deploy front assets to the Spring Boot server"
  npm run deploy "$SERVER_ASSETS_DIR"
  echo "Starting Spring Boot server, please wait..."
  echo "TODO : Start Spring Boot"
}

function pushOnDockerHub {
  echo "dd"
  docker login
  docker push ylacaute/ez-dashing:os
}

function displayUsage {
  echo "TODO"
}

function main {
  case "$1" in
    demo)
      startDemo
      ;;
    demo-docker)
      createDemoContainer
      ;;
    docker-image-dep)
      createDockerOsImage
      ;;
    docker-image)
      createDockerImage
      ;;
    help)
      echo help
      ;;
    *)
      startProduction
      ;;
  esac
}

main $@

cd ${PREVIOUS_DIR}



