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
          npm run test:ci
        '''
      }
    }
  }
  post('Analysis') {
    always {
      junit 'junit.xml'
      recordIssues(
          enabledForFailure: true, aggregatingResults: true,
          tools: [junitParser(pattern: 'junit.xml')])
    }
  }
}
