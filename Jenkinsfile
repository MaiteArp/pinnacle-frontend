pipeline {
  agent {
    kubernetes {
      yamlFile 'kubes-pod.yaml'
      defaultContainer 'ubuntu'
      activeDeadlineSeconds 3600
      idleMinutes 15
    }
  }
  stages {
    
    stage('Build') {
      steps {
        sh '''
          yarn install
        '''
      }
    }
  }
  post('Analysis') {
    always {
      recordIssues(
          enabledForFailure: true, aggregatingResults: true,
          tools: [pyLint()])
    }
  }
}