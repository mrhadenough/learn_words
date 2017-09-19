pipeline {
  agent any
  stages {
    stage('lint') {
      steps {
        parallel(
          "install dependencies": {
            sh 'pip install -r requirements-dev.txt'
            
          },
          "lint python": {
            sh 'prospector'
            
          }
        )
      }
    }
    stage('build static') {
      steps {
        sh 'make build_static'
      }
    }
  }
}