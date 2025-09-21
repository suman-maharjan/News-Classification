DOCKER_COMPOSE = docker-compose
REDIS_HOST = redis_queue
BACKEND_SERVICE = node-backend
FRONTEND_SERVICE = react-frontend
NODE_WORKER_SERVICE = node-worker
CELERY_SERVICE = celery-worker

create-network:
	docker network create shared-networks

# Development Commands
dev: # Start all services in development mode
	${DOCKER_COMPOSE} up -d

prod: # Start all services in production mode -f docker-compose.prod.yml
	${DOCKER_COMPOSE} -f docker-compose.yml up -d

build: # Build all Docker images
	${DOCKER_COMPOSE} build

rebuild: # Rebuild all images without cache and restart
	${DOCKER_COMPOSE} build --no-cache
	${DOCKER_COMPOSE} up -d --force-recreate

# Service Management
up: # Start all services
	${DOCKER_COMPOSE} up -d

down: # Stop and remove all container
	${DOCKER_COMPOSE} down

stop: # Stop all services
	${DOCKER_COMPOSE} stop

start: # Start all services
	${DOCKER_COMPOSE} start

# Individual Service command
backend-up: # Start only Backend service
	${DOCKER_COMPOSE} up -d ${BACKEND_SERVICE}
	
node-worker-up: # Start only Backend Worker service
	${DOCKER_COMPOSE} up -d ${NODE_WORKER_SERVICE}

frontend-up: # Start only Frontend service
	${DOCKER_COMPOSE} up -d ${FRONTEND_SERVICE}

celery-up: # Start only Celery service
	${DOCKER_COMPOSE} up -d ${CELERY_SERVICE}

# Rebuild Service command
backend-rebuild: # Start only Backend service
	${DOCKER_COMPOSE} rebuild -d ${BACKEND_SERVICE}
	
node-worker-rebuild: # Start only Backend Worker service
	${DOCKER_COMPOSE} rebuild -d ${NODE_WORKER_SERVICE}

frontend-rebuild: # Start only Frontend service
	${DOCKER_COMPOSE} rebuild -d ${FRONTEND_SERVICE}

celery-rebuild: # Start only Celery service
	${DOCKER_COMPOSE} rebuild -d ${CELERY_SERVICE}

# Logs and Monitoring
logs: # Show logs for all services
	${DOCKER_COMPOSE} logs -f

logs-backend: # Show backend logs
	${DOCKER_COMPOSE} logs -f ${BACKEND_SERVICE}
	
logs-node-worker: # Show node-worker logs
	${DOCKER_COMPOSE} logs -f ${NODE_WORKER_SERVICE}

logs-frontend: # Show frontend logs
	${DOCKER_COMPOSE} logs -f ${FRONTEND_SERVICE}

logs-celery: # Show celery worker logs
	${DOCKER_COMPOSE} logs -f ${CELERY_SERVICE}

status: # Show status of all containers
	${DOCKER_COMPOSE} ps

# Testing and Development
test-connections: # Test connections between services
	@echo "Testing Redis connection from backend..."
	docker exec $$(docker-compose ps -q ${BACKEND_SERVICE}) ping -c 3 ${REDIS_HOST} || echo "Backend -> Redis failed"
	@echo "Testing Redis connection from node worker..."
	docker exec $$(docker-compose ps -q ${NODE_WORKER_SERVICE}) ping -c 3 ${REDIS_HOST} || echo "Backend -> Redis failed"
	@echo "Testing Redis connection from celery..."
	docker exec $$(docker-compose ps -q ${CELERY_SERVICE}) ping -c 3 ${REDIS_HOST} || echo "Celery -> Redis failed"
	@echo "Testing backend connection from frontend..."
	docker exec $$(docker-compose ps -q ${FRONTEND_SERVICE}) ping -c 3 ${BACKEND_SERVICE} || echo "Frontend -> Backend failed"

shell-backend: # Shell into backend container
	echo "Container ID:" ``$$(docker-compose ps -q ${BACKEND_SERVICE})
	docker exec -it (docker-compose ps -q ${BACKEND_SERVICE}) /bin/sh

shell-node-worker: # Shell into backend container
	docker exec -it $$(docker-compose ps -q ${NODE_WORKER_SERVICE}) /bin/bash

shell-celery: # Shell into celery container
	docker exec -it $$(docker-compose ps -q  ${CELERY_SERVICE}) /bin/bash

shell-frontend: # Shell into frontend container
	docker exec -it $$(docker-compose ps -q ${FRONTEND_SERVICE}) /bin/sh

# Cleanup Commands
clean: # Remove all containers, images, and volumes
	${DOCKER_COMPOSE} down -v --rmi all

clean-containers: # Remove all stopped containers
	docker container prune -f

clean-images: # Remove unused images
	docker image prune -f

clean-volumes: # Remove unused volumes
	docker volume prune -f

clean-networks: # Remove unused networks
	docker network prune -f

clean-all: # Complete cleanup (containers, images, volumes, networks)
	docker-compose down -v --rmi all
	docker container prune -f
	docker image prune -a -f
	docker volume prune -f
	docker network prune -f


# Quick Development Workflows
fresh-start: # Complete fresh start (clean + build + up)
	make clean
	make build
	make up

update-env: # Restart services after .env changes
	docker-compose up -d --force-recreate

inspect: # Inspect all services
	docker-compose config
