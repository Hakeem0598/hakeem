run-dev:
	docker-compose -f docker-compose-dev.yml up -d

stop-dev:
	docker-compose -f docker-compose-dev.yml down --rmi all

build-local:
	CADDYFILE=Caddyfile.local REACT_APP_API_URL=http://localhost:8000/api/v1 docker-compose -f docker-compose-prod.yml up -d

build-prod:
	CADDYFILE=Caddyfile.prod REACT_APP_API_URL=https://carts2.club/api/v1  docker-compose -f docker-compose-prod.yml up -d

stop-build:
	docker-compose -f docker-compose-prod.yml down --rmi all