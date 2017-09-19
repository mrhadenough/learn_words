pipeline {
  agent any
  stages {
    stage('lint') {
      steps {
        sh 'make lint_python'
      }
    }
    stage('build static') {
      steps {
        sh 'make build_static'
      }
    }
  }
}