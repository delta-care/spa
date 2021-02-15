def LABEL_ID="deltacare-${UUID.randomUUID().toString()}"

podTemplate(
    name: 'deltacare',
    label: LABEL_ID,
    namespace: 'ops',
    cloud: 'kubernetes',
    containers: [
        containerTemplate(name: 'docker',image: 'docker',command: '/bin/sh -c',args: 'cat',ttyEnabled: true,workingDir: '/home/jenkins/agent'),
        containerTemplate(name: 'helm',image: 'dtzar/helm-kubectl:3.4.1',command: '/bin/sh -c',args: 'cat',ttyEnabled: true,workingDir: '/home/jenkins/agent')
    ],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock',mountPath: '/var/run/docker.sock')
    ]
)
{
    
    def APP_NAME='spa'
    def APP_VERSION
    def URL_REPO_GIT="https://github.com/delta-care/${APP_NAME}.git"
    def URL_REPO_CHART="http://deltacare-chartmuseum:8080"
    def URL_REPO_HPUSH="https://github.com/chartmuseum/helm-push.git"
    def IMAGE_NAME_DOCKER="deltacare/${APP_NAME}"
    def IMAGE_NAME_CHART="deltacare/${APP_NAME}"
    def K8S_NAMESPACE='dev'
    def OBJ_REPO_GIT
    def ENV='DEV'
    
    node(LABEL_ID) {

        stage('Checkout') {
            OBJ_REPO_GIT = git branch: 'main', credentialsId: 'github', url: URL_REPO_GIT
            def props = readJSON file: 'package.json'
            APP_VERSION = props.version
        }
        
        APP_VERSION = APP_VERSION + '-rc'
        
        stage('Release Candidate') {
            container('docker') {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_HUB_PASS', usernameVariable: 'DOCKER_HUB_USER')]) {
                    sh "docker build -t ${IMAGE_NAME_DOCKER}:${APP_VERSION} ."
                    sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASS}"
                    sh "docker push ${IMAGE_NAME_DOCKER}:${APP_VERSION}"
                }
            }
        }
        
        stage('Deploy DEV') {
            container('helm') {
                sh "sed -i 's/^appVersion:.*\$/appVersion: ${APP_VERSION}/' ./helm/Chart.yaml"
                sh "helm uninstall ${APP_NAME} --namespace ${K8S_NAMESPACE}"
                //sh "helm install ${APP_NAME} ./helm --namespace ${K8S_NAMESPACE} --set image.tag=${APP_VERSION} --set k8s.namespace=${K8S_NAMESPACE} --set ops.env=${ENV}"
                sh "helm upgrade ${APP_NAME} ./helm --install --namespace ${K8S_NAMESPACE} --set ops.env=${ENV} --set image.tag=${APP_VERSION} --set k8s.namespace=${K8S_NAMESPACE}"
                sh "helm repo add deltacare ${URL_REPO_CHART}"
                sh "helm plugin install ${URL_REPO_HPUSH}"
                sh "helm push helm/ deltacare"
                sh "helm repo update"
            }
        }
    }
  
    timeout(time: 20, unit: 'MINUTES') {
        input message: 'Efetuar o deploy em produção?', ok: 'Sim'
    }
 
    node(LABEL_ID) {
        
        APP_VERSION = APP_VERSION.replace("-rc", "")
        
        stage('Release') {
            OBJ_REPO_GIT = git branch: 'main', credentialsId: 'github', url: URL_REPO_GIT
            def props = readJSON file: 'package.json'
            APP_VERSION = props.version
            
            container('docker') {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_HUB_PASS', usernameVariable: 'DOCKER_HUB_USER')]) {
                    sh "docker build -t ${IMAGE_NAME_DOCKER}:${APP_VERSION} ."
                    sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASS}"
                    sh "docker push ${IMAGE_NAME_DOCKER}:${APP_VERSION}"
                }
            }
        }
        
        ENV='PRD'
        K8S_NAMESPACE='prd'
        
        stage('Deploy PRD') {
            container('helm') {
                sh "sed -i 's/^appVersion:.*\$/appVersion: ${APP_VERSION}/' ./helm/Chart.yaml"
                //sh "helm uninstall ${APP_NAME} --namespace ${K8S_NAMESPACE}"
                sh "helm upgrade ${APP_NAME} ./helm --install --namespace ${K8S_NAMESPACE} --set ops.env=${ENV} --set image.tag=${APP_VERSION} --set k8s.namespace=${K8S_NAMESPACE}"
                sh "helm repo add deltacare ${URL_REPO_CHART}"
                sh "helm plugin install ${URL_REPO_HPUSH}"
                sh "helm push helm/ deltacare"
                sh "helm repo update"
            }
        }
    }
}
