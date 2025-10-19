// The Jenkinsfile: Professional Multi-Stage Pipeline
pipeline {
    agent any
    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out code...'
            }
        }
        stage('2. Install Dependencies') {
            steps {
                echo 'Installing Python tools...'
                sh 'pip3 install -r requirements.txt'
            }
        }
        stage('3. Lint & Quality Check') {
            steps {
                echo 'Checking code quality with Flake8...'
                sh 'flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics'
            }
        }
        stage('4. Security Scan') {
            steps {
                echo 'Scanning for known security vulnerabilities...'
                sh 'safety check -r requirements.txt'
            }
        }
        stage('5. Unit Tests') {
            steps {
                echo 'Running unit tests with Pytest...'
                sh 'pytest'
            }
        }
        stage('6. Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh "docker build -t my-flask-app:${commitId} ."
                    sh "docker tag my-flask-app:${commitId} my-flask-app:latest"
                }
            }
        }
        stage('7. Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment (port 5001)...'
                script {
                    sh 'docker stop my-flask-app-staging || true'
                    sh 'docker rm my-flask-app-staging || true'
                    sh 'docker run -d --network="host" --name my-flask-app-staging -p 5001:5000 my-flask-app:latest'
                }
            }
        }
        stage('8. Manual Approval for Production') {
            steps {
                echo 'Waiting for manual approval to deploy to production.'
                input message: 'Ready to deploy to production (port 5000)?'
            }
        }
        stage('9. Deploy to Production') {
            steps {
                echo 'Deploying to production server (port 5000)...'
                script {
                    sh 'docker stop my-flask-app-container || true'
                    sh 'docker rm my-flask-app-container || true'
                    sh 'docker run -d --network="host" --name my-flask-app-container -p 5000:5000 my-flask-app:latest'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished. Cleaning up...'
            sh 'docker image prune -f'
        }
    }
}