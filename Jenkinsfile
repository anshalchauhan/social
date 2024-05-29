pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID of Docker Hub credentials in Jenkins
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        CLIENT_DIR = "client"
        SERVER_DIR = "server"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the repository
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Build Docker images for frontend + nginx, and backend
                        sh """
                        docker build -t ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG} ${env.CLIENT_DIR}
                        docker build -t ${DOCKERHUB_USERNAME}/social-server:${env.DOCKER_IMAGE_TAG} ${env.SERVER_DIR}
                        """
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Log in to Docker Hub
                        sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                        
                        // Push Docker images to Docker Hub
                        sh """
                        docker push ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG}
                        docker push ${DOCKERHUB_USERNAME}/social-server:${env.DOCKER_IMAGE_TAG}
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Post actions such as cleanup or notifications
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
