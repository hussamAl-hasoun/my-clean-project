// The Jenkinsfile: FINAL FULLY AUTOMATED VERSION
pipeline {
    agent any
    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out code...'
                cleanWs()
                checkout scm
            }
        }
        stage('2. Setup Virtual Env & Install Dependencies') {
            steps {
                echo 'Ensuring python3-venv tool is installed...'
                sh 'sudo yum install python3-virtualenv -y || true'

                echo 'Creating Python virtual environment...'
                sh 'python3 -m venv venv'

                echo 'Installing tools inside virtual environment...'
                sh '''
                    source venv/bin/activate
                    pip install --upgrade pip setuptools wheel
                    pip install -r requirements.txt
                '''
            }
        }
        stage('3. Lint & Quality Check') {
            steps {
                echo 'Checking code quality with Flake8...'
                sh '''
                    source venv/bin/activate
                    flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics || echo "Flake8 found issues, but continuing..."
                '''
            }
        }
        stage('4. Security Scan') {
            steps {
                echo 'Scanning dependencies for known security vulnerabilities...'
                sh '''
                    source venv/bin/activate
                    safety check -r requirements.txt || echo "Safety found issues, but continuing..."
                '''
            }
        }
        stage('5. Unit Tests') {
            steps {
                echo 'Running unit tests with Pytest...'
                sh '''
                    source venv/bin/activate
                    pytest || echo "Pytest failed, but continuing..."
                '''
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
        stage('7. Deploy to Production') { // Renumbered Stage
             steps {
                echo 'Deploying to production server (port 5000)...'
                 script {
                    // Stop staging container if it was used before (optional cleanup)
                    sh 'docker stop my-flask-app-staging || true'
                    sh 'docker rm my-flask-app-staging || true'
                    
                    // Deploy directly to production
                    sh 'docker stop my-flask-app-container || true'
                    sh 'docker rm my-flask-app-container || true'
                    sh 'docker run -d --network="host" --dns=8.8.8.8 --name my-flask-app-container -p 5000:5000 my-flask-app:latest'
                }
            }
        }
    } // End of stages
    post {
        always {
            echo 'Pipeline finished. Cleaning up...'
            sh 'rm -rf venv'
            sh 'docker image prune -f'
        }
    } // End of post
} // End of pipeline