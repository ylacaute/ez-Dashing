// Project: ez-Dashing
// Version: CURRENT-SNAPSHOT (no release yet)
// Author: Yannick Lacaute

pipeline {
  agent any
  parameters {
    booleanParam(
        name: 'RUN_CLIENT',
        defaultValue: true,
        description: 'Enable or not client tests and packaging')
    booleanParam(
        name: 'RUN_SERVER',
        defaultValue: true,
        description: 'Enable or not server tests and packaging')
    booleanParam(
        name: 'RUN_DOCKER_DEMO',
        defaultValue: true,
        description: 'Enable or not the build + push of the Docker demo image')
    booleanParam(
        name: 'RUN_DOCKER_OFFICIAL',
        defaultValue: true,
        description: 'Enable or not the build + push of the Docker official ez-Dashing image')
    booleanParam(
        name: 'RELEASE',
        defaultValue: false,
        description: 'Check to build a release, version will be tagged')
    string(
        name: 'VERSION',
        defaultValue: '',
        description: 'Version of the release build (semver pattern). Example: 1.0.0')
    string(
        name: 'CHANGELOG',
        defaultValue: '',
        description: 'ChangeLog describe the git tag of the release. Must no be empty when you build a release')
    string(
        name: 'DOCKER_REGISTRY_URL',
        defaultValue: 'https://index.docker.io/v1/',
        description: 'Registry where images have to be pushed (Default: Docker Hub)')
    string(
        name: 'DOCKER_CREDENTIALS',
        defaultValue: 'dockerHubCredentialsId',
        description: 'Credentials ID defined in Jenkins to connect to the Docker Registry')
    string(
        name: 'GITHUB_CREDENTIALS',
        defaultValue: 'githubCredentialsId',
        description: 'Credentials ID defined in Jenkins to connect to GitHub')
  }
  environment {
    STATIC_DIR = "ez-server/target/classes/static"
  }

  stages {

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // INIT
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('INIT') {
      steps {
        script {
          beginStage "INIT"
          if (params.RELEASE) {
            if (params.VERSION.equals("")) {
              error "Unable to build a release without specifying a Version"
            } else if (params.CHANGELOG.equals("")) {
              error "Unable to build a release without specifying a ChangeLog message"
            }
          }
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // CLIENT: NPM INSTALL, TESTS, PACKAGE, DEPLOY TO SERVER
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('CLIENT') {
      when {
        expression { return params.RUN_CLIENT }
      }
      agent {
        dockerfile {
          filename 'docker/jenkins/Dockerfile-npm'
          additionalBuildArgs '--build-arg uid=$(id -u jenkins) --build-arg gid=$(id -g jenkins)'
          reuseNode true
        }
      }
      steps {
        ansiColor('xterm') {
          beginStage "CLIENT"
          displayEnv(["whoami", "pwd", "uname -a", "node --version"])

          banner 'INSTALL'
          sh 'cd ez-client && npm install'
          banner 'TEST'
          sh 'cd ez-client && npm run test'
          banner 'PACKAGE'
          sh 'cd ez-client && npm run package'
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // SERVER: MVN CLEAN PACKAGE
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('SERVER') {
      when {
        expression { return params.RUN_SERVER }
      }
      agent {
        dockerfile {
          filename 'docker/jenkins/Dockerfile-maven'
          additionalBuildArgs '--build-arg uid=$(id -u jenkins) --build-arg gid=$(id -g jenkins)'
          reuseNode true
        }
      }
      steps {
        ansiColor('xterm') {
          beginStage "SERVER"
          displayEnv(["whoami", "pwd", "uname -a", "mvn --version"])

          sh 'cd ez-server && mvn clean'
          sh "mkdir -p ${STATIC_DIR} && cp -R ez-client/dist/* ${STATIC_DIR}"

          banner 'PACKAGE'
          sh 'cd ez-server && mvn package -U'
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // DOCKER DEMO IMAGE: BUILD AND PUSH LATEST
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('DOCKER DEMO IMAGE') {
      when {
        expression { return params.RUN_CLIENT && params.RUN_DOCKER_DEMO }
      }
      steps {
        ansiColor('xterm') {
          script {
            beginStage "DOCKER DEMO IMAGE"

            docker.withRegistry(params.DOCKER_REGISTRY_URL, params.DOCKER_CREDENTIALS) {
              def ezDemoImage = docker.build("ylacaute/ez-dashing:demo", "-f docker/demo/Dockerfile .")
              ezDemoImage.inside {
                sh 'ls -lh'
              }
              ezDemoImage.push "demo"
            }
          }
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // DOCKER DEMO IMAGE: BUILD AND PUSH LATEST
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('DOCKER OFFICIAL IMAGE') {
      when {
        expression { return params.RUN_CLIENT && params.RUN_SERVER && params.RUN_DOCKER_OFFICIAL }
      }
      steps {
        ansiColor('xterm') {
          script {
            beginStage "DOCKER OFFICIAL IMAGE"

            docker.withRegistry(params.DOCKER_REGISTRY_URL, params.DOCKER_CREDENTIALS) {
              def ezDemoImage = docker.build("ylacaute/ez-dashing:latest", "-f docker/latest/Dockerfile .")
              ezDemoImage.inside {
                sh 'ls -lh'
              }
              ezDemoImage.push "latest"
              if (params.RELEASE) {
                ezDemoImage.push "${VERSION}"
              }
            }
          }
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // RELEASE TAG
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('RELEASE TAG') {
      when {
        expression { return params.RELEASE }
      }
      steps {
        ansiColor('xterm') {
          script {
            beginStage "RELEASE TAG"

            withCredentials([[
                 $class: 'UsernamePasswordMultiBinding',
                 credentialsId: params.GITHUB_CREDENTIALS,
                 usernameVariable: 'GIT_USER',
                 passwordVariable: 'GIT_PWD']]) {

              def origin = "https://${GIT_USER}:${GIT_PWD}@github.com/ylacaute/ez-Dashing.git"
              // cmd "git tag -d ${params.VERSION} || true" // In case of push error
              sh "git tag -a ${params.VERSION} -m '${params.CHANGELOG}'"
              sh "git push ${origin} --tags"
            }
          }
        }
      }
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // POST PIPELINE EXECUTION
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  post {
    always {
      echo 'Cleaning Pipeline'
      // Clean all stopped containers, unused networks, dangling images and cache
      sh "docker system prune -f"
    }
    success {
      sh "cowsay -f /usr/share/cowsay/cows/gnu.cow Niiiice !"
    }
    failure {
      sh "cowsay -f /usr/share/cowsay/cows/dragon-and-cow.cow BUILD FAILED !"
    }
    unstable {
      sh "cowsay -f /usr/share/cowsay/cows/dragon.cow That is NOT stable !"
    }
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PIPELINE UTILS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def displayEnv(commands) {
  def output = "\nENV:\n"
  for (cmdToExec in commands) {
    cmdResult = cmd(cmdToExec)
    output = output + "- ${cmdToExec} : ${cmdResult}\n"
  }
  println "${output}\n"
}

def cmd(command) {
  return sh(returnStdout: true, script: "${command}").trim()
}

def banner(message) {
  sh "cowsay '${message}'"
}

def beginStage(message) {
  sh "cowsay -f /usr/share/cowsay/cows/stegosaurus.cow 'STAGE: ${message}'"
}

// DOCKER PIPELINE DOC: https://jenkins.io/doc/book/pipeline/syntax/#agent
// MEMO
// Dockerfile options: additionalBuildArgs, args, customWorkspace, dir, filename, label, registryCredentialsId, registryUrl, reuseNode