pipeline {
  agent {
    docker {
      image '3.6.2-alpine3.6'
    }
    
  }
  stages {
    stage('lint') {
      steps {
        sh '''python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
prospector'''
      }
    }
    stage('build static') {
      steps {
        sh 'make build_static'
      }
    }
  }
}