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
          npm run build
          docker build -t docker.arpnetworking.com/capstone-frontend .
          docker push docker.arpnetworking.com/capstone-frontend
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
