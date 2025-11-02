# 🧱 Trading Microservices Application

This project demonstrates how to build, containerize, and deploy a microservices-based trading application using Docker and Kubernetes (Minikube). It contains two services — **Trade Creation Service** and **Trade View Service** — both connected to a shared MongoDB database.

---

## 🚀 Steps to Create and Deploy Docker Images on Kubernetes (Minikube)

### **Prerequisites**
Before starting, ensure that the following are installed on your local machine:
- Docker
- Minikube
- Git

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/naidu9678/trading_microservices_app.git
cd trading_microservices_app

Step 2: Build and Run Trade Creation Service
cd trade_creation_service
docker build -t trade_creation_service .
docker network create trading-net
docker run -d --name cnr-mongo --network trading-net -p 27017:27017 mongo:7
docker run -d --name cnr-trade_creation_service --network trading-net -p 4000:4000 -e MONGO_URI="mongodb://cnr-mongo:27017/tradingdb" trade_creation_service

To test the Trade Creation Service, open a new CMD prompt and run:
curl -X POST http://localhost:4000/api/trades -H "Content-Type: application/json" -d "{\"symbol\":\"AAPL\",\"type\":\"BUY\",\"quantity\":100,\"price\":180,\"trader\":\"Alice\"}"

Step 3: Build and Run Trade View Service

cd ../trade_view_service
docker build -t trade_view_service .
docker run -d --name cnr-trade_view_service --network trading-net -p 5000:5000 -e MONGO_URI="mongodb://cnr-mongo:27017/tradingdb" trade_view_service

Test the Trade View Service in your browser:
http://localhost:5000/api/trades

Step 4: Deploy Services on Kubernetes (Minikube)
Open PowerShell (not CMD) and start Minikube:
minikube start
Configure the Docker environment for Minikube:
minikube -p minikube docker-env | Invoke-Expression
Load the Docker images into Minikube:
minikube image load mongo:7
minikube image load trade_creation_service:latest
minikube image load trade_view_service:latest
Apply the Persistent Volume and Deployment configurations:
kubectl apply -f pvc.yml
kubectl apply -f kube-deployment.yml
Launch the Kubernetes Dashboard:
minikube dashboard
In a new CMD prompt, start the Minikube tunnel:
minikube tunnel
Access the Kubernetes Dashboard at:
http://127.0.0.1:56268/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/workloads?namespace=default










