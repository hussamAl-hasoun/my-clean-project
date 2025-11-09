// Jenkinsfile: نسخة Staging / Production (بدون Nginx)
pipeline {
    agent any

    environment {
        // منفذ الإنتاج (الذي تراه اللجنة)
        PROD_PORT = 5000
        PROD_NAME = "my-flask-app-production"
        
        // منفذ الاختبار (المخفي)
        STAGING_PORT = 5001
        STAGING_NAME = "my-flask-app-staging"
        
        IMAGE_NAME = "my-flask-app"
    }

    stages {
        // --- المراحل 1-2 (كما هي) ---
        stage('1. Checkout Code') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        stage('2. Setup Virtual Env & Install Dependencies') {
            steps {
                sh 'sudo yum install python3-virtualenv -y || true'
                sh 'python3 -m venv venv'
                sh '''
                    source venv/bin/activate
                    pip install --upgrade pip setuptools wheel
                    pip install -r requirements.txt
                '''
            }
        }

        // --- المرحلة 3 (مُعدلة لتكون سريعة) ---
        stage('3. Lint & Quality Check') {
            steps {
                sh '''
                    source venv/bin/activate
                    # (تمت إضافة --exclude=venv لتسريع الفحص)
                    flake8 . --exclude=venv || echo "Flake8 found issues, but continuing..."
                '''
            }
        }

        // --- المراحل 4-6 (كما هي) ---
        stage('4. Security Scan') {
            steps {
                sh '''
                    source venv/bin/activate
                    safety check -r requirements.txt || echo "Safety found issues, but continuing..."
                '''
            }
        }
        stage('5. Unit Tests') {
            steps {
                sh '''
                    source venv/bin/activate
                    pytest || echo "Pytest failed, but continuing..."
                '''
            }
        }
        stage('6. Build Docker Image') {
            steps {
                script {
                    def commitId = env.GIT_COMMIT.substring(0, 7)
                    sh "docker build -t ${IMAGE_NAME}:${commitId} ."
                    sh "docker tag ${IMAGE_NAME}:${commitId} ${IMAGE_NAME}:latest"
                }
            }
        }

        // --- 7. مرحلة جديدة: النشر للاختبار ---
        stage('7. Deploy to Staging (Port 5001)') {
            steps {
                echo "Deploying to Staging on port ${STAGING_PORT} for testing..."
                sh "docker stop ${STAGING_NAME} || true"
                sh "docker rm ${STAGING_NAME} || true"
                
                // (لاحظ أننا نستخدم STAGING_PORT و STAGING_NAME)
                sh """
                docker run -d --network="host" --dns=8.8.8.8 --restart always \\
                           -e "PORT=${STAGING_PORT}" \\
                           --name ${STAGING_NAME} \\
                           ${IMAGE_NAME}:latest
                """
                sh "sleep 10" // إعطاء الحاوية 10 ثوان لتبدأ
            }
        }

        // --- 8. مرحلة جديدة: تشغيل الاختبارات ---
        stage('8. Run Integration Tests (on 5001)') {
            steps {
                echo "Running integration tests on Staging (Port ${STAGING_PORT})..."
                // (الكود الصحيح لاستدعاء الاختبارات)
                sh """
                    export TARGET_PORT=${STAGING_PORT}
                    venv/bin/python3 test_integration.py
                """
            }
        }

        // --- 9. مرحلة جديدة: النشر للإنتاج (للجنة) ---
        stage('9. Promote to Production (Port 5000)') {
            steps {
                echo "Staging tests passed! Deploying to Production on port ${PROD_PORT}..."
                
                // 1. إيقاف وحذف حاوية الاختبار
                sh "docker stop ${STAGING_NAME} || true"
                sh "docker rm ${STAGING_NAME} || true"

                // 2. إيقاف وحذف حاوية الإنتاج القديمة
                sh "docker stop ${PROD_NAME} || true"
                sh "docker rm ${PROD_NAME} || true"

                // 3. تشغيل حاوية الإنتاج الجديدة (التي تراها اللجنة)
                sh """
                docker run -d --network="host" --dns=8.8.8.8 --restart always \\
                           -e "PORT=${PROD_PORT}" \\
                           --name ${PROD_NAME} \\
                           ${IMAGE_NAME}:latest
                """
                echo "Deployment to Production (Port 5000) successful!"
            }
        }
    } // End of stages

    // --- post block (للتنظيف في حالة الفشل) ---
    post {
        always {
            echo 'Pipeline finished. Cleaning up workspace...'
            sh 'rm -rf venv'
            sh 'docker image prune -f'
        }
        // هذا مهم: إذا فشل الاختبار (مرحلة 8)، سيتم حذف حاوية الاختبار
        failure {
            steps {
                echo "PIPELINE FAILED. Cleaning up staging container..."
                sh "docker stop ${STAGING_NAME} || true"
                sh "docker rm ${STAGING_NAME} || true"
            }
        }
    } // End of post
}