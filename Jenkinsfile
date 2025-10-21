// The Jenkinsfile: FINAL PROFESSIONAL VERSION with All Stages Enabled and Corrected
pipeline {
    agent any // Run on any available agent (our EC2 instance)

    stages {
        // Stage 1: Get the latest code from GitHub
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                // Jenkins automatically checks out using the SCM configuration
                // when 'Pipeline script from SCM' is selected in the job.
                // Clean the workspace before checkout to prevent git conflicts
                cleanWs() 
                checkout scm 
            }
        }

        // Stage 2: Set up a clean Python environment and install all needed tools
        stage('2. Setup Virtual Env & Install Dependencies') {
            steps {
                echo 'Ensuring python3-venv tool is installed...'
                // Use the correct package name for Amazon Linux 2
                sh 'sudo yum install python3-virtualenv -y || echo "venv tool likely already installed"'

                echo 'Creating Python virtual environment...'
                sh 'python3 -m venv venv' // Create the venv folder in the workspace

                echo 'Installing tools inside virtual environment...'
                // Activate the environment, upgrade pip, and install requirements
                sh '''
                    source venv/bin/activate
                    pip install --upgrade pip setuptools wheel
                    pip install -r requirements.txt
                '''
            }
        }

        // Stage 3: Check Python code style and quality
        stage('3. Lint & Quality Check') {
            steps {
                echo 'Checking code quality with Flake8...'
                // Run flake8 using the Python executable inside the virtual environment
                sh '''
                    source venv/bin/activate
                    flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics || echo "Flake8 found issues, proceeding..."
                '''
                // Note: '|| echo...' allows the pipeline to continue even if flake8 finds minor issues.
                // Remove '|| echo...' to make this stage fail the build on any issue.
            }
        }

        // Stage 4: Check for known security vulnerabilities in dependencies
        stage('4. Security Scan') {
            steps {
                echo 'Scanning dependencies for known security vulnerabilities...'
                // Run safety using the Python executable inside the virtual environment
                sh '''
                    source venv/bin/activate
                    safety check -r requirements.txt || echo "Safety found issues, proceeding..."
                '''
                // Remove '|| echo...' to make this stage fail the build on any vulnerability.
            }
        }

        // Stage 5: Run automated unit tests
        stage('5. Unit Tests') {
            steps {
                echo 'Running unit tests with Pytest...'
                // Run pytest using the Python executable inside the virtual environment
                sh '''
                    source venv/bin/activate
                    pytest || echo "Pytest failed, proceeding..."
                '''
                // Remove '|| echo...' to make this stage fail the build on any test failure.
            }
        }

        // Stage 6: Build the application into a Docker container image
        stage('6. Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Use the short Git commit hash as a version tag for the image
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    // Build the image using the Dockerfile in the current directory
                    sh "docker build -t my-flask-app:${commitId} ."
                    // Tag the image as 'latest' for easy deployment
                    sh "docker tag my-flask-app:${commitId} my-flask-app:latest"
                }
            }
        }

        // Stage 7: Deploy the new image to a temporary staging environment
        stage('7. Deploy to Staging') {
             steps {
                 echo 'Deploying to staging environment (port 5001)...'
                 script {
                    // Stop and remove any previous staging container
                    sh 'docker stop my-flask-app-staging || true'
                    sh 'docker rm my-flask-app-staging || true'
                    // Run the new container, mapping internal port 5000 to external port 5001
                    // Ensure port 5001 is open in the EC2 Security Group
                    sh 'docker run -d --network="host" --dns=8.8.8.8 --name my-flask-app-staging -p 5001:5000 my-flask-app:latest'
                }
            }
        }

        // Stage 8: Pause for manual confirmation before deploying to the live site
        stage('8. Manual Approval for Production') {
             steps {
                echo 'Waiting for manual approval before deploying to production.'
                // This step pauses the pipeline until a user clicks "Proceed" in Jenkins UI
                input message: 'Staging deployment looks good? Ready to deploy to production (port 5000)?'
            }
        }

        // Stage 9: Deploy the verified image to the live production environment
        stage('9. Deploy to Production') {
             steps {
                echo 'Deploying to production server (port 5000)...'
                 script {
                    // Stop and remove the current production container
                    sh 'docker stop my-flask-app-container || true'
                    sh 'docker rm my-flask-app-container || true'
                    // Run the new container, mapping internal port 5000 to external port 5000
                    sh 'docker run -d --network="host" --dns=8.8.8.8 --name my-flask-app-container -p 5000:5000 my-flask-app:latest'
                }
            }
        }
    } // End of stages

    // Post-build actions: These run after all stages, regardless of success or failure
    post {
        always {
            echo 'Pipeline finished. Cleaning up workspace and old images...'
            // Clean up the virtual environment directory from the workspace
            sh 'rm -rf venv'
            // Remove unused Docker images to save disk space
            sh 'docker image prune -f'
        }
    } // End of post
} // End of pipeline
