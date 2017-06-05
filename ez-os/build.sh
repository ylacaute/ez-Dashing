#!/bin/bash

DOCKER_OS_IMG_TAG="ez-dashing:os"

function banner {
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
  echo "* $1"
  echo "* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *"
}

banner "ez-Dashing docker dependency: Debian + JDK + Maven + NPM"

sudo docker build --tag=${DOCKER_OS_IMG_TAG} .
