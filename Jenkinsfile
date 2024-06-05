pipeline {
    agent { label "slave-social" }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID of Docker Hub credentials in Jenkins
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        CLIENT_DIR = "client"
        SERVER_DIR = "api"
        DOCKERFILE_NAME = "Dockerfile.prod" // Specify the name of your Dockerfile
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
                        sudo docker build -t ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG} -f ${env.CLIENT_DIR}/${DOCKERFILE_NAME} ${env.CLIENT_DIR}
                        sudo docker build -t ${DOCKERHUB_USERNAME}/social-api:${env.DOCKER_IMAGE_TAG} -f ${env.SERVER_DIR}/${DOCKERFILE_NAME} ${env.SERVER_DIR}
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
                        sh "docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                        
                        // Push Docker images to Docker Hub
                        sh """
                        sudo docker push ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG}
                        sudo docker push ${DOCKERHUB_USERNAME}/social-api:${env.DOCKER_IMAGE_TAG}
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
