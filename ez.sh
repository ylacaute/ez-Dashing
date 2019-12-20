#!/bin/bash

# Load generic functions
. utils.sh

PREVIOUS_DIR="$(pwd)"

PROJECT_DIR="$(getScriptDirectory)"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
FRONT_BUILD_DIR="$FRONT_DIR/dist"

DOCKER_IMG_DEMO_TAG="ylacaute/ez-dashing:demo"
DOCKER_IMG_LATEST_TAG="ylacaute/ez-dashing:latest"

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
  docker tag ${DOCKER_IMG_DEMO_TAG} ${DOCKER_IMG_DEMO_TAG}
  docker login
  docker push ${DOCKER_IMG_DEMO_TAG}
}

# --------------------------------------------------------------------------- #
# DOCKER LATEST
# --------------------------------------------------------------------------- #
function createDockerLatest {
  banner "CREATING EZ-DASHING LATEST DOCKER IMAGE (PROD)"
  echo "WARN: Please prefer Jenkins to build images"
  echo
  warn "Be sure to have started a build-prod before !"
  echo
  cd ${PROJECT_DIR}
  sudo docker build -t ${DOCKER_IMG_LATEST_TAG} -f docker/official/Dockerfile .
}
function pushDockerLatest {
  banner "PUSHING EZ-DASHING DEMO DOCKER IMAGE"
  echo "WARN: Please prefer Jenkins to build images"
  docker tag ${DOCKER_IMG_LATEST_TAG} ${DOCKER_IMG_LATEST_TAG}
  docker login
  docker push ${DOCKER_IMG_LATEST_TAG}
}

# --------------------------------------------------------------------------- #
# BUILD PROD
# --------------------------------------------------------------------------- #
function buildProduction {
  banner "PRODUCTION BUILD"
  echo "WARN: Please prefer Jenkins to build for production"
  mvn clean package -P prod
}

# --------------------------------------------------------------------------- #
# START PROD
# --------------------------------------------------------------------------- #
function startProduction {
  banner "STARTING EZ-DASHING FOR PRODUCTION"
  warn "DEPRECATED: You should have no reason to use this."
  cd ${PROJECT_DIR}
  for arg in $@; do
    echo "* Argument: $arg"
  done
  echo "No more argument"
  local configPath=${1}
  shift
  if [[ "$configPath" == "" ]]; then
    echo "Config directory missing !"
    usage
    exit 1
  else
    echo "Config directory set to ${configPath}"
  fi

  java -jar ./ez-server/target/ez-server-CURRENT-SNAPSHOT.jar \
    -Dspring.config.additional-location=${configPath} $@
}


function usage {
  echo
  echo "USAGE: ez.sh COMMAND"
  echo
  echo "DEPRECATED: all this script is DEPRECATED. You should never use it, unless you are a developer and you know what you are doing !"
  echo
  echo "Commands:"
  echo
  echo "  build-prod             build all for production"
  echo "  start-prod <dir>       start the server in production mode"
  echo "    <dir> must be your config directory which:"
  echo "    * must have 'server.properties' and 'dashboard.json' inside"
  echo "    * must be in absolute when using Docker"
  echo "  build-docker-demo      Build the demo docker image"
  echo "  build-docker-latest    Build the prod docker image"
  echo "  push-docker-demo       Push demo image to Docker Hub"
  echo "  push-docker-latest     Push latest image to Docker Hub"
  echo
}

function main {
  local command=${1}
  shift
  case ${command} in

    # BUILD APP
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

info "Project directory: ${PROJECT_DIR}"

main $@

cd ${PREVIOUS_DIR}



