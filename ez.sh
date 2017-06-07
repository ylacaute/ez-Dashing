#!/bin/bash

PREVIOUS_DIR="$(pwd)"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
SERVER_ASSETS_DIR="$BACK_DIR/target/classes/static"

DOCKER_IMG_DEMO_TAG="ez-dashing:demo"
DOCKER_IMG_LATEST_TAG="ez-dashing:latest"
DOCKER_IMG_SOURCES_TAG="ez-dashing:sources"
DOCKER_IMG_SOURCES_OS_TAG="ez-dashing:os"

VERSION=0.0.1-SNAPSHOT

function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

# --------------------------------------------------------------------------- #
# DOCKER DEMO
# --------------------------------------------------------------------------- #
function createDockerDemo {
  banner "CREATING EZ-DASHING DEMO DOCKER IMAGE"
  cd ${PROJECT_DIR}
  sudo docker build -t ${DOCKER_IMG_DEMO_TAG} -f docker/demo/Dockerfile .
}
function pushDockerDemo {
  banner "PUSHINING EZ-DASHING DEMO DOCKER IMAGE"
  docker tag ${DOCKER_IMG_DEMO_TAG} ylacaute/${DOCKER_IMG_DEMO_TAG}
  docker login
  docker push ylacaute/${DOCKER_IMG_DEMO_TAG}
}

# --------------------------------------------------------------------------- #
# DOCKER LATEST
# --------------------------------------------------------------------------- #
function createDockerLatest {
  banner "CREATING EZ-DASHING LATEST DOCKER IMAGE (PROD)"
  echo
  echo "/!\ Be sure to have started a build-prod before ! /!\ "
  echo
  cd ${PROJECT_DIR}
  sudo docker build -t ${DOCKER_IMG_LATEST_TAG} -f docker/latest/Dockerfile .
}
function pushDockerLatest {
  banner "PUSHINING EZ-DASHING DEMO DOCKER IMAGE"
  docker tag ${DOCKER_IMG_LATEST_TAG} ylacaute/${DOCKER_IMG_LATEST_TAG}
  docker login
  docker push ylacaute/${DOCKER_IMG_LATEST_TAG}
}


# --------------------------------------------------------------------------- #
# DOCKER SOURCE (DONT WORK, TODO)
# --------------------------------------------------------------------------- #
function createDockerOsImage {
  cd ${DOCKER_DEP_DIR}
  #bash build.sh
}
function pushDockerOsImage {
  banner "Push ez-Dashing docker image os to Docker Hub"
  #docker tag ${DOCKER_IMG_OS_TAG} ylacaute/${DOCKER_IMG_OS_TAG}
  #docker login
  #docker push ylacaute/${DOCKER_IMG_OS_TAG}
}
function createDockerSources {
  banner "CREATING EZ-DASHING SOURCES DOCKER IMAGE"
  #cd ${PROJECT_DIR}
  #sudo docker build -t ${DOCKER_IMG_SOURCES_TAG} -f docker/sources/Dockerfile .
}


# --------------------------------------------------------------------------- #
# BUILD PROD (FROM SOURCES)
# --------------------------------------------------------------------------- #
function buildProduction {
  banner "PRODUCTION BUILD"
  cd ${FRONT_DIR}
  echo "Building front for production, please wait..."
  if [[ "$1" == "debug" ]]; then
    shift
    echo "DEBUG ON (no minify/uglify)"
    npm run build-dev
  else
    echo "DEBUG OFF (minify/uglify)"
    npm run build
  fi
  echo "Deploy front assets to the Spring Boot server"
  mkdir -p ${SERVER_ASSETS_DIR}
  npm run deploy "$SERVER_ASSETS_DIR"

  cd ${BACK_DIR}
  echo "Building back for production, please wait..."
  mvn package
}


# --------------------------------------------------------------------------- #
# START PROD (FROM SOURCES)
# --------------------------------------------------------------------------- #
function startProduction {
  banner "STARTING EZ-DASHING FOR PRODUCTION"
  cd ${PROJECT_DIR}
  for arg in $@; do
    echo "* Argument: $arg"
  done
  local configPath="$1"
  if [[ "$configPath" == "" ]]; then
    echo "Usage : ./ez.sh start-prod <directory>"
    echo "You must provide your configuration directory with 'server.properties' and 'dashboard.json' inside"
    exit 1
  fi
  shift
  java -jar ./ez-server/target/ez-dashing-${VERSION}.jar --spring.config.location=file:${configPath}/server.properties $@
  #java -jar ez-dashing-0.0.1-SNAPSHOT.jar --spring.config.location=file:/home/epi/prog/ez-Dashing/ez-config/server.properties
}


# --------------------------------------------------------------------------- #
# START DEMO (FROM SOURCES)
# --------------------------------------------------------------------------- #
function startDemo {
  banner "STARTING EZ-DASHING FOR DEMO"
  cd ${FRONT_DIR}
  echo "Starting the mock API, please wait..."
  npm run start-mock-api &
  echo "Starting the front app, please wait..."
  npm run start-dev
}

function displayUsage {
  echo
  echo "USAGE: ez.sh [OPTIONS]"
  echo
  echo "Options"
  echo
  echo "  start-demo : start the demo (front with mocked api)"
  echo "  start-prod <config_dir> : start the server in production mode"
  echo "  prod debug : start the real app but without front optimization"
  echo "  run-docker-demo : start the demo from the docker image (from Docker Hub)"
  echo "  build-docker-image-dep : build the docker image dependency (OS)"
  echo "  build-docker-image : build the docker image"
  echo
}

function main {
  case "$1" in

    # DEMO FROM FRONT ONLY
    start-demo)
      startDemo;;

    # PROD FROM SOURCES
    build-prod)
      buildProduction;;
    start-prod)
      shift
      startProduction $@;;

    # BUILD IMAGES
    build-docker-demo)
      createDockerDemo;;
    build-docker-latest)
      createDockerLatest;;
    build-docker-sources)
      createDockerSources;;
    build-docker-image-dep)
      createDockerOsImage;;

    # PUSH IMAGES
    push-docker-demo)
      pushDockerDemo;;
    push-docker-latest)
      pushDockerLatest;;
    *)
      displayUsage
  esac
}

main $@

cd ${PREVIOUS_DIR}



