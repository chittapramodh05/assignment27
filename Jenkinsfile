pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "assignment30"
        DOCKER_COMPOSE = '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe"'
        DOCKER = '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe"'
    }

    stages {
        stage('Clean Environment') {
            steps {
                echo 'Stopping and removing existing containers...'
                bat "${DOCKER_COMPOSE} down"
            }
        }

        stage('Build Containers') {
            steps {
                echo 'Building Docker images...'
                bat "${DOCKER_COMPOSE} build"
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application with Docker Compose...'
                bat "${DOCKER_COMPOSE} up -d"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying running containers...'
                bat "${DOCKER} ps"
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
