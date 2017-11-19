#!/bin/bash

PREVIOUS_DIR="$(pwd)"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
FRONT_BUILD_DIR="$FRONT_DIR/dist"
DOCKER_IMG_DEMO_TAG="ez-dashing:demo"
DOCKER_IMG_LATEST_TAG="ez-dashing:latest"
VERSION=CURRENT-SNAPSHOT

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
  echo "WARN: Please prefer Jenkins to build images"
  cd ${PROJECT_DIR}
  docker build -t ${DOCKER_IMG_DEMO_TAG} -f docker/demo/Dockerfile .
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
  echo "WARN: Please prefer Jenkins to build images"
  echo
  echo "/!\ Be sure to have started a build-prod before ! /!\ "
  echo
  cd ${PROJECT_DIR}
  sudo docker build -t ${DOCKER_IMG_LATEST_TAG} -f docker/latest/Dockerfile .
}
function pushDockerLatest {
  banner "PUSHING EZ-DASHING DEMO DOCKER IMAGE"
  echo "WARN: Please prefer Jenkins to build images"
  docker tag ${DOCKER_IMG_LATEST_TAG} ylacaute/${DOCKER_IMG_LATEST_TAG}
  docker login
  docker push ylacaute/${DOCKER_IMG_LATEST_TAG}
}

# --------------------------------------------------------------------------- #
# BUILD PROD
# --------------------------------------------------------------------------- #
function buildProduction {
  banner "PRODUCTION BUILD"
  echo "WARN: Please prefer Jenkins to build for production"
  cd ${FRONT_DIR}
  echo "Building front for production, please wait..."
  npm run package
  echo "Deploy front assets to the Spring Boot server"
  npm run deploy
  cd ${BACK_DIR}
  echo "Packaging back for production, please wait..."
  mvn clean package
}

# --------------------------------------------------------------------------- #
# START PROD
# --------------------------------------------------------------------------- #
function startProduction {
  banner "STARTING EZ-DASHING FOR PRODUCTION"
  echo "DEPRECATED: You should have no reason to use this."
  cd ${PROJECT_DIR}
  for arg in $@; do
    echo "* Argument: $arg"
  done
  local configPath=${1}
  shift
  if [[ "$configPath" == "" ]]; then
    echo "Directory missing !"
    usage
    exit 1
  fi

  java -jar ./ez-server/target/ez-dashing-${VERSION}.jar \
    --spring.config.location=file:${configPath}/server.properties \
    --logging.file=${configPath}/ez-dashing.log  $@
}

# --------------------------------------------------------------------------- #
# START DEV
# --------------------------------------------------------------------------- #
function startDev {
  banner "STARTING EZ-DASHING FOR DEMO"
  cd ${FRONT_DIR}
  echo "Starting the mock API, please wait..."
  npm run api &
  echo "Starting the front app, please wait..."
  sleep 2
  npm run serve
}

function usage {
  echo
  echo "USAGE: ez.sh COMMAND"
  echo
  echo "DEPRECATED: all this script is DEPRECATED. You should never use it."
  echo
  echo "Commands:"
  echo
  echo "  start-dev              start the dev (serve with hot-reload plugged to a mocked api)"
  echo "  start-prod <dir>       start the server in production mode"
  echo "    <dir> must be your config directory which:"
  echo "    * must have 'server.properties' and 'dashboard.json' inside"
  echo "    * must be in absolute when using Docker"
  echo "  build-prod             build all for production"
  echo "  build-prod debug       build all for production (no minify/uglify)"
  echo "  build-docker-demo      Build the demo docker image"
  echo "  build-docker-latest    Build the prod docker image"
  echo "  build-docker-sources   experimental, don't work"
  echo "  push-docker-demo       Push demo image to Docker Hub"
  echo "  push-docker-latest     Push latest image to Docker Hub"
  echo
}

function main {
  local command=${1}
  shift
  case ${command} in

    # DEMO FROM FRONT ONLY
    start-demo)
      startDemo;;

    # PROD FROM ALL SOURCES
    build-prod)
      buildProduction;;
    start-prod)
      startProduction $@;;

    # BUILD DOCKER IMAGES
    build-docker-demo)
      createDockerDemo;;
    build-docker-latest)
      createDockerLatest;;

    # PUSH DOCKER IMAGES
    push-docker-demo)
      pushDockerDemo;;
    push-docker-latest)
      pushDockerLatest;;

    *)
      usage
  esac
}

main $@

cd ${PREVIOUS_DIR}



