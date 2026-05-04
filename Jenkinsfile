pipeline {
    agent any

    environment {
        // Defining environment variables if needed
        COMPOSE_PROJECT_NAME = "assignment30"
    }

    stages {
        stage('Clean Environment') {
            steps {
                echo 'Stopping and removing existing containers...'
                // Using bat since the environment is Windows
                bat 'docker-compose down'
            }
        }

        stage('Build Containers') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application with Docker Compose...'
                bat 'docker-compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying running containers...'
                bat 'docker ps | findstr assignment27'
            }
        }
    }

    post {
        always {
            echo 'Pipeline Execution Completed.'
        }
        success {
            echo 'Successfully built and deployed the MERN stack application!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above for details.'
        }
    }
}
