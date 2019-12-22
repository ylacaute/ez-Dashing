#!/bin/bash

# Load generic functions
. utils.sh

PREVIOUS_DIR="$(pwd)"

PROJECT_DIR="$(getScriptDirectory)"
FRONT_DIR="$PROJECT_DIR/ez-client"
BACK_DIR="$PROJECT_DIR/ez-server"
FRONT_BUILD_DIR="$FRONT_DIR/dist"

DOCKER_BASE_TAG="ylacaute/ez-dashing"

VERSION=CURRENT-SNAPSHOT


function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

function buildProduction {
  local version=${1}
  local revision=""

  warn "Please prefer Jenkins to build for production"
  echo

  if [[ -z ${version} ]]; then
    version="latest"
  else
    revision="-Drevision=${version}"
  fi
  banner "Build the application with version ${version}"
  cd ${BACK_DIR}
  mvn ${revision} clean package -P prod
}

function createDockerImage {
  local version=${1}
  local dockerfilePath=docker/official/Dockerfile

  warn "Please prefer Jenkins to build images and make sure to have build the app before this step"
  echo

  if [[ ${version} = "demo" ]]; then
    dockerfilePath=docker/demo/Dockerfile
  elif [[ -z ${version} ]]; then
    version="latest"
  fi

  banner "Creating ez-Dashing ${version} docker image"
  cd ${PROJECT_DIR}
  sudo docker build --build-arg VERSION=${version} -t ${DOCKER_BASE_TAG}:${version} -f ${dockerfilePath} .
}

function pushDockerImage {
  local version=$1

  if [[ -z ${version} ]]; then
    version="latest"
  fi
  banner "Pushing ez-Dashing ${version} docker image"
  echo
  # docker tag ${DOCKER_BASE_TAG}${version} ${DOCKER_BASE_TAG}${version}
  cd ${PROJECT_DIR}
  docker login
  docker push ${DOCKER_BASE_TAG}:${version}
}

function release {
  local version=$1

  set -e
  buildProduction ${version}
  createDockerImage ${version}
  pushDockerImage ${version}
  set +e
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

usageTitle() {
  echo -e "\n${Red}${1}${RCol}"
}
usageSubTitle() {
  local main=${1}
  local args=${2}

  echo -en "${Cya}${1}${RCol} "
  echo -e "${Gre}${2}${RCol}"
}
function usage {
  local cmd=$1
  usageTitle "USAGE: ${cmd} COMMAND"
  echo
  warn "Do not use this script unless you are a developer and you know what you are doing !"

  usageTitle "COMMANDS"
  usageSubTitle "  build-prod" "[version]"
  echo "    build all for production with the given version."
  echo "    When no version is specified, use latest."
  usageSubTitle "  start-prod" "<dir>"
  echo "    start the server in production mode <dir> must be your config directory"
  echo "    and must contains 'dashboard.json' inside"
  usageSubTitle "  create-docker-image" "[version]"
  echo "    Build a image with the specified version. A build must have been done"
  echo "    with this version before."
  echo "    When no version is specified, use latest."
  usageSubTitle "  push-docker-image" "[version]"
  echo "    Push the image with the given version to Docker Hub."
  echo "    When no version is specified, use latest."
  usageSubTitle "  release" "[version]"
  echo "    Build, create and push the docker image with the given version."
  echo "    When no version is specified, use latest."
  echo
  usageTitle "SAMPLES"
  usageSubTitle "  Build and push the ez-Dashing latest image:"
  echo "    ez.sh build-prod"
  echo "    ez.sh create-docker-image"
  echo "    ez.sh push-docker-image"
  usageSubTitle "  Build and push the ez-Dashing demo image:"
  echo "    ez.sh create-docker-image demo"
  echo "    ez.sh push-docker-image demo"
  usageSubTitle "  Build and push the ez-Dashing 1.2.3 image:"
  echo "    ez.sh build-prod 1.2.3"
  echo "    ez.sh create-docker-image 1.2.3"
  echo "    ez.sh push-docker-image 1.2.3"
}

function main {
  local command=${1}
  shift
  case ${command} in
    build-prod)
      buildProduction $@;;
    start-prod)
      startProduction $@;;
    create-docker-image)
      createDockerImage $@;;
    push-docker-image)
      pushDockerImage $@;;
    release)
      release $@;;
    *)
      usage ${0}
  esac
}

info "Project directory: ${PROJECT_DIR}"

main $@

cd ${PREVIOUS_DIR}



