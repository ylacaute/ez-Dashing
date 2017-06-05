#!/bin/bash

PREVIOUS_DIR="$(pwd)"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
SERVER_ASSETS_DIR="$BACK_DIR/target/classes/static"
DOCKER_DEP_DIR="$PROJECT_DIR/ez-os"

DOCKER_IMG_OS_TAG="ez-dashing:os"
DOCKER_IMG_TAG="ez-dashing:latest"

function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

function createDockerOsImage {
  cd ${DOCKER_DEP_DIR}
  bash build.sh
}

# No tested yet
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

# No tested yet
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
  banner "STARTING EZ-DASHING FOR DEMO"
  cd ${FRONT_DIR}
  echo "Starting the mock API, please wait..."
  npm run start-mock-api &
  echo "Starting the front app, please wait..."
  npm run start-dev
}

function cleanAll {
  cd ${FRONT_DIR}
  npm run clean
  cd ${BACK_DIR}
  mvn clean
}

function startProduction {
  banner "STARTING EZ-DASHING FOR PRODUCTION"
  cleanAll
  cd ${FRONT_DIR}
  echo "Building front for production, please wait..."
  if [[ "$1" == "debug" ]]; then
    banner "DEBUG ON : NO MINIFY / UGLIFY"
    npm run build-dev
  else
    echo "Building front for production, please wait..."
    npm run build
  fi
  echo "Deploy front assets to the Spring Boot server"
  mkdir -p ${SERVER_ASSETS_DIR}
  npm run deploy "$SERVER_ASSETS_DIR"
  cd ${BACK_DIR}
  echo "Starting Spring Boot server, please wait..."
  mvn spring-boot:run
}

function pushOnDockerHub {
  echo "dd"
  docker login
  docker push ylacaute/ez-dashing:os
}

function displayUsage {
  echo
  echo "USAGE: ez.sh [OPTIONS]"
  echo
  echo "Options"
  echo
  echo "  demo : start the demo (front with mocked api)"
  echo "  prod : start the real app"
  echo "  prod debug : start the real app but without front optimization"
  echo "  run-docker-demo : start the demo from the docker image (from Docker Hub)"
  echo "  build-docker-image-dep : build the docker image dependency (OS)"
  echo "  build-docker-image : build the docker image"
  echo
}

function main {
  case "$1" in
    demo)
      startDemo;;
    prod)
      shift
      startProduction $@;;
    run-docker-demo)
      createDemoContainer;;
    build-docker-image-dep)
      createDockerOsImage;;
    build-docker-image)
      createDockerImage;;
    *)
      displayUsage
  esac
}

main $@

cd ${PREVIOUS_DIR}



