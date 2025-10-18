// The Jenkinsfile: FINAL WORKING VERSION
pipeline {
    agent any
    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out the latest code from GitHub...'
            }
        }
        stage('2. Build Docker Image') {
            steps {
                echo 'Building the application into a Docker image...'
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh "docker build -t my-flask-app:${commitId} ."
                    sh "docker tag my-flask-app:${commitId} my-flask-app:latest"
                }
            }
        }
        stage('3. Run Tests (Placeholder)') {
            steps {
                echo 'Running automated tests...'
            }
        }
        stage('4. Deploy to Production') {
            steps {
                echo 'Deploying the new container to the server...'
                script {
                    sh 'docker stop my-flask-app-container || true'
                    sh 'docker rm my-flask-app-container || true'

                    // THIS IS THE FINAL, CORRECTED COMMAND
                    sh 'docker run -d --network="host" --name my-flask-app-container my-flask-app:latest'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished. Cleaning up old Docker images...'
            sh 'docker image prune -f'
        }
    }
}