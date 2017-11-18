// DOCKER PIPELINE DOC: https://jenkins.io/doc/book/pipeline/syntax/#agent

pipeline {
  agent any
  parameters {
//    string(
//        name: 'PERSON',
//        defaultValue: 'Mr Jenkins',
//        description: 'Who should I say hello to?')
//    choice(
//        name: 'RUN_SERVER_TESTS',
//        choices: 'NO\nYES',
//        description: 'For faster pipeline, servers can be disabled')
    booleanParam(
        name: 'RUN_CLIENT_TESTS',
        defaultValue: false,
        description: 'For faster pipeline, client tests can be disabled')
    booleanParam(
            name: 'RUN_SERVER_TESTS',
            defaultValue: false,
            description: 'For faster pipeline, server tests can be disabled')
  }

  stages {

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // DEBUG STAGE: DISPLAY PIPELINE INFO
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('DEBUG') {
      steps {
        sh 'printenv'
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // CLIENTS TESTS: NPM INSTALL && NPM TESTS
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('CLIENTS TESTS') {
      when {
        expression { return params.RUN_CLIENT_TESTS }
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
          banner 'NPM INSTALL'
          displayEnv(["whoami", "pwd", "uname -a", "node --version"])
          sh 'cd ez-client && npm install'
          banner 'NPM TEST'
          sh 'cd ez-client && npm test'
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // SERVER TESTS: MVN CLEAN VERIFY
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('SERVER TESTS') {
      when {
        expression { return params.RUN_SERVER_TESTS }
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
          banner 'MVN VERIFY'
          displayEnv(["whoami", "pwd", "uname -a", "mvn --version"])
          sh 'cd ez-server && mvn clean package -U'
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // DOCKER: IMAGE BUILD
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('DOCKER BUILD') {
      steps {
        ansiColor('xterm') {
          echo "BUILD DEMO IMAGE"
          script {
            def ezDemoImage = docker.build("ylacaute/ez-dashing:demo", "-f docker/demo/Dockerfile .")
            ezDemoImage.push


            //sh 'git rev-parse HEAD > .rev'
            //rev = readFile('.rev').trim()

            //docker.tag
            //docker.login
            //image.push("${env.BUILD_NUMBER}")

            //image.push 'latest'

            //echo 'publish ok'
//            app.inside {
//              sh 'echo "Tests passed"'
//            }
            //withDockerRegistry([credentialsId: 'dockerHubCredentialsId', url: "https://<my-docker-registry>/"]) {
              // we give the image the same version as the .war package

//              image.push()
  //          }

            echo 'test ok'
          }
        }
      }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // PUBLISH
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    stage('PUBLISH') {
      steps {
        ansiColor('xterm') {
          echo "TODO: PUBLISH"
        }
      }
    }
  }
  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
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


// MEMO
// Dockerfile options: additionalBuildArgs, args, customWorkspace, dir, filename, label, registryCredentialsId, registryUrl, reuseNode