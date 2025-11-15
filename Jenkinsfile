pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/AT190452-trung/demo-devsecops.git',
                    credentialsId: '41553a75-244a-4934-8c8c-e6a88ebf332d'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    cd /var/lib/jenkins/demo-devsecops
                    npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    cd /var/lib/jenkins/demo-devsecops
                    npm test
                '''
            }
        }

        stage('Security Scan - npm audit') {
            steps {
                sh '''
                    cd /var/lib/jenkins/demo-devsecops
                    echo '🔍 Scanning vulnerabilities with npm audit...'
                    npm audit || true
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    cd /var/lib/jenkins/demo-devsecops
                    echo '🐳 Building Docker image...'
                    docker build -t demo-devsecops .
                '''
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                sh '''
                    cd /var/lib/jenkins/demo-devsecops
                    if command -v trivy &> /dev/null; then
                        echo '🧫 Scanning Docker image with Trivy...'
                        trivy image --severity HIGH,CRITICAL --no-progress demo-devsecops:latest || true
                    else
                        echo '⚠️ Trivy not found on system!'
                    fi
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    echo "🚀 Deploying new container..."
                    sudo docker stop demo-devsecops || true
                    sudo docker rm demo-devsecops || true
                    sudo docker run -d --name demo-devsecops -p 3000:3000 demo-devsecops
                    echo "✅ Deployment completed successfully!"
                '''
            }
        }
    }

    post {
        always {
            echo "🏁 Pipeline completed!"
        }
    }
}
