pipeline {
  agent {
    kubernetes {
      defaultContainer 'ubuntu'
      activeDeadlineSeconds 3600
    }
  }
  stages {
    
    stage('Build') {
      steps {
        withEnv(['REACT_APP_BACKEND_URL=/app']) {
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
