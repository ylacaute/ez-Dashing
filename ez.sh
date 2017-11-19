#!/bin/bash

PREVIOUS_DIR="$(pwd)"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
FRONT_BUILD_DIR="$FRONT_DIR/dist"
SERVER_ASSETS_DIR="$BACK_DIR/target/classes/static"

DOCKER_IMG_DEMO_TAG="ez-dashing:demo"
DOCKER_IMG_LATEST_TAG="ez-dashing:latest"
DOCKER_IMG_SOURCES_TAG="ez-dashing:sources"
DOCKER_IMG_SOURCES_OS_TAG="ez-dashing:os"

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
  echo
  echo "/!\ Be sure to have started a build-prod before ! /!\ "
  echo
  cd ${PROJECT_DIR}
  sudo docker build -t ${DOCKER_IMG_LATEST_TAG} -f docker/latest/Dockerfile .
}
function pushDockerLatest {
  banner "PUSHING EZ-DASHING DEMO DOCKER IMAGE"
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
  npm run package

  echo "Deploy front assets to the Spring Boot server"
  mkdir -p ${SERVER_ASSETS_DIR}
  #npm run deploy "$SERVER_ASSETS_DIR"
  cp -R ${FRONT_BUILD_DIR}/* ${SERVER_ASSETS_DIR}

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
  #java -jar ez-dashing-0.0.1-SNAPSHOT.jar --spring.config.location=file:/home/epi/prog/ez-Dashing/ez-config/server.properties
}

# --------------------------------------------------------------------------- #
# START DEMO (FROM SOURCES)
# --------------------------------------------------------------------------- #
function startDemo {
  banner "STARTING EZ-DASHING FOR DEMO"
  cd ${FRONT_DIR}
  echo "Starting the mock API, please wait..."
  npm run api &
  echo "Starting the front app, please wait..."
  npm run dev
}

function usage {
  echo
  echo "USAGE: ez.sh COMMAND"
  echo
  echo "Commands:"
  echo
  echo "  start-demo             start the demo (front with mocked api)"
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
    build-docker-sources)
      createDockerSources;;
    build-docker-image-dep)
      createDockerOsImage;;

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



