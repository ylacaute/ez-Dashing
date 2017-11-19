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
    string(
        name: 'DOCKER_REGISTRY_URL',
        defaultValue: 'https://index.docker.io/v1/',
        description: 'Registry where images have to be pushed')
    string(
        name: 'DOCKER_CREDENTIALS',
        defaultValue: 'dockerHubCredentialsId',
        description: 'Credentials ID defined in Jenkins to connect to the Docker Registry')
  }

  stages {

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // CLIENTS TESTS: NPM INSTALL && NPM RUN TESTS
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('CLIENTS TESTS') {
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
          displayEnv(["whoami", "pwd", "uname -a", "node --version"])

          banner 'INSTALL'
          sh 'cd ez-client && npm install'
          banner 'TEST'
          sh 'cd ez-client && npm run test'
          banner 'PACKAGE'
          sh 'cd ez-client && npm run package'
          banner 'DEPLOY'
          sh 'cd ez-client && npm run deploy'
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // SERVER TESTS: MVN CLEAN VERIFY
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('SERVER TESTS') {
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
          displayEnv(["whoami", "pwd", "uname -a", "mvn --version"])

          banner 'PACKAGE'
          sh 'cd ez-server && mvn clean package -U'
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
            docker.withRegistry(params.DOCKER_REGISTRY_URL, params.DOCKER_CREDENTIALS) {
              def ezDemoImage = docker.build("ylacaute/ez-dashing:demo", "-f docker/demo/Dockerfile .")
              ezDemoImage.inside {
                sh 'echo "Tests passed"'
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
            docker.withRegistry(params.DOCKER_REGISTRY_URL, params.DOCKER_CREDENTIALS) {
              def ezDemoImage = docker.build("ylacaute/ez-dashing:latest", "-f docker/latest/Dockerfile .")
              ezDemoImage.inside {
                sh 'echo "Tests passed"'
              }
              ezDemoImage.push "latest"
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
    }
    success {
      echo 'Good job bro !! Everything is ok :)'
    }
    failure {
      echo 'Holy crap...'
    }
    unstable {
      echo 'Unstable crap...'
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
  sh "banner '${message}'"
}


// DOCKER PIPELINE DOC: https://jenkins.io/doc/book/pipeline/syntax/#agent
// MEMO
// Dockerfile options: additionalBuildArgs, args, customWorkspace, dir, filename, label, registryCredentialsId, registryUrl, reuseNode