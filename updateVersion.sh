#!/bin/bash

# Load generic functions
. utils.sh

function updatePackageJsonVersion() {
  local version=${1}
  local clientDirectory=${2}

  cd ${clientDirectory}
  sed -i "s/\(.*\)\(version\)\(.*\)\"\(.*\)\"\(.*\)/\1\2\3\"${version}\"\5/" package.json
  cd -
}

function updatePomVersion() {
  local version=${1}
  local serverDirectory=${2}

  cd ${serverDirectory}
  mvn versions:set -DnewVersion=${version} -DgenerateBackupPoms=false
  cd -
}

function updateVersion() {
  local version=${1}
  local clientDirectory="ez-client"
  local serverDirectory="ez-server"

  updatePackageJsonVersion "${version}" "${clientDirectory}"
  updatePomVersion "${version}" "${serverDirectory}"
}

function usage() {
  echo -e "${BWhi}updateVersion${RCol} <${BGre}VERSION${RCol}>"
  echo -e "  ${BGre}VERSION${RCol}: anything you want, usually semver pattern."
  echo
  echo "This script will update package.json and pom(s) with the given version."
  echo
}

if [[ "${1}" == "" ]]; then
  error "*** No version specified ***"
  usage
  exit 1
fi

updateVersion ${@}
