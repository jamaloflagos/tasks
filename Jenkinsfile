pipeline {
  agent any
  stages {
    stage('Pull code') {
      steps {
        git(url: 'https://github.com/jamaloflagos/tasks.git', branch: 'main')
      }
    }

    stage('Move to frontend') {
      steps {
        sh 'cd frontend && ls'
      }
    }

  }
}