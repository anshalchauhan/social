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

        stage('Build docker images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Build Docker images for frontend + nginx, and backend
                        sh """
                        sudo docker build --platform linux/amd64 -t ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG} -f ${env.CLIENT_DIR}/${DOCKERFILE_NAME} ${env.CLIENT_DIR} --load
                        sudo docker build --platform linux/amd64 -t ${DOCKERHUB_USERNAME}/social-api:${env.DOCKER_IMAGE_TAG} -f ${env.SERVER_DIR}/${DOCKERFILE_NAME} ${env.SERVER_DIR} --load
                        """
                    }
                }
            }
        }


        stage('Push docker images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Log in to Docker Hub
                        sh "sudo echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                        
                        // Push Docker images to Docker Hub
                        sh """
                        sudo docker push ${DOCKERHUB_USERNAME}/social-client:${env.DOCKER_IMAGE_TAG}
                        sudo docker push ${DOCKERHUB_USERNAME}/social-api:${env.DOCKER_IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage('Create kubernetes secrets and start kubernetes pods') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'mongo_password-credentials', usernameVariable: 'MONGO_PASSWORD_USERNAME',
                        passwordVariable: 'MONGO_PASSWORD_PASSWORD'),
                        usernamePassword(credentialsId: 'jwt_secret-credentials', usernameVariable: 'JWT_SECRET_USERNAME',
                        passwordVariable: 'JWT_SECRET_PASSWORD'),
                        usernamePassword(credentialsId: 'app_password-credentials', usernameVariable: 'APP_PASSWORD_USERNAME',
                        passwordVariable: 'APP_PASSWORD_PASSWORD'),
                        usernamePassword(credentialsId: 'aws_access_key_id-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID_USERNAME',
                        passwordVariable: 'AWS_ACCESS_KEY_ID_PASSWORD'),
                        usernamePassword(credentialsId: 'aws_secret_access_key-credentials', usernameVariable: 'AWS_SECRET_ACCESS_KEY_USERNAME',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY_PASSWORD'),
                    ]) {
                        // Save the secret to a temporary file
                        writeFile file: 'secret.yml', text: """
                        apiVersion: v1
                        kind: Secret
                        metadata:
                            name: social-secret
                        type: Opaque
                        data:
                            ${MONGO_PASSWORD_USERNAME}: ${MONGO_PASSWORD_PASSWORD.bytes.encodeBase64().toString()}
                            ${JWT_SECRET_USERNAME}: ${JWT_SECRET_PASSWORD.bytes.encodeBase64().toString()}
                            ${APP_PASSWORD_USERNAME}: ${APP_PASSWORD_PASSWORD.bytes.encodeBase64().toString()}
                            ${AWS_ACCESS_KEY_ID_USERNAME}: ${AWS_ACCESS_KEY_ID_PASSWORD.bytes.encodeBase64().toString()}
                            ${AWS_SECRET_ACCESS_KEY_USERNAME}: ${AWS_SECRET_ACCESS_KEY_PASSWORD.bytes.encodeBase64().toString()}
                        """

                        // Apply the secret    
                        sh "kubectl apply -f secret.yml"

                        // Apply the deployment-services.yml and create the kubernetes pods
                        sh "kubectl apply -f deployment-services.yml"
                    }
                }
            }
        }
    }

    post {
        always {
            // Post actions such as cleanup or notifications
            echo 'Pipeline completed.'

            emailext(
                subject: "Pipeline Status: ${BUILD_NUMBER}",
                body: '''<html>
                            <body>
                                <p>Build Status: ${BUILD_STATUS}</p>
                                <p>Build Number: ${BUILD_NUMBER}</p>
                                <p>Check the <a href="${BUILD_URL}">console output</a>.</p>
                            </body>
                        </html>''',
                to: 'projectgochat@gmail.com',
                from: 'jenkins@13.127.142.220',
                replyTo: 'jenkins@13.127.142.220',
                mimeType: 'text/html'
            )

            // Clean up the kubernetes secret file after use
            sh 'rm -f secret.yml'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
