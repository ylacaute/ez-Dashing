#!/bin/bash

CURRENT_DIR="$(pwd)"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
SERVER_ASSETS_DIR="$BACK_DIR/src/main/resources"
DOCKER_DEP="$PROJECT_DIR/ez-os"
DOCKER_OS_IMG="ez-dashing:os"
DOCKER_IMG="ez-dashing:latest"

echo "Current directory: $CURRENT_DIR"
echo "Project directory: $PROJECT_DIR"
echo "Server assets directory: $SERVER_ASSETS_DIR"

function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

# TODO : test it
function createDockerImageDependency {
  banner "ez-Dashing docker dependency: Debian + JDK + Maven + NPM"
  cd "$DOCKER_DEP"
  sudo docker build --tag="$DOCKER_OS_IMG"
}

# TODO : dont works
function createDockerImage {
  banner "ez-Dashing docker image"
  sudo docker build --tag="${DOCKER_IMG}" .
}

function createDemoContainer {
  banner "Creating demo container from ez-Dashing image"
  sudo docker run -p 2222:2222 -p 8080:8080 --name ez-dashing-demo -t ${DOCKER_IMG} bash ez.sh demo
}

function startDemo {
  banner "STARTING EZ-DASHING FOR DEMO"
  echo "Starting the mock API, please wait..."
  npm run start-mock-api &
  echo "Starting the front app, please wait..."
  npm run start-dev
}

# TODO
function startProduction {
  echo "Building front for production, please wait..."
  npm run build
  echo "Deploy front assets to the Spring Boot server"
  npm run deploy "$SERVER_ASSETS_DIR"
  echo "Starting Spring Boot server, please wait..."
  echo "TODO : Start Spring Boot"
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
      createDockerImageDependency
      ;;
    docker-image)
      createDockerImage
      ;;
    *)
      startProduction
      ;;
  esac
}

cd $FRONT_DIR
main $@
cd $CURRENT_DIR



