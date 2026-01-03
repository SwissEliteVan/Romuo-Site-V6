.PHONY: help install dev build clean test lint format docker-dev docker-prod docker-stop deploy-netlify deploy-vercel setup

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)ROMUO VTC - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

setup: ## Initial project setup
	@echo "$(BLUE)Setting up ROMUO VTC project...$(NC)"
	@chmod +x client/scripts/*.sh
	@cp -n client/.env.example client/.env || true
	@echo "$(GREEN)✓ Scripts are now executable$(NC)"
	@echo "$(GREEN)✓ .env file created (edit with your API keys)$(NC)"
	@echo "$(YELLOW)Next: cd client && npm install$(NC)"

install: ## Install dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	cd client && npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

dev: ## Start development server
	@echo "$(BLUE)Starting development server...$(NC)"
	cd client && npm run dev

build: ## Build for production
	@echo "$(BLUE)Building for production...$(NC)"
	cd client && npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

preview: ## Preview production build
	@echo "$(BLUE)Previewing production build...$(NC)"
	cd client && npm run preview

clean: ## Clean build artifacts and dependencies
	@echo "$(BLUE)Cleaning project...$(NC)"
	cd client && npm run clean
	@echo "$(GREEN)✓ Project cleaned$(NC)"

clean-install: clean install ## Clean and reinstall dependencies
	@echo "$(GREEN)✓ Clean install complete$(NC)"

test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	cd client && npm test

lint: ## Run linter
	@echo "$(BLUE)Running linter...$(NC)"
	cd client && npm run lint

lint-fix: ## Fix linting issues
	@echo "$(BLUE)Fixing linting issues...$(NC)"
	cd client && npm run lint:fix

format: ## Format code with Prettier
	@echo "$(BLUE)Formatting code...$(NC)"
	cd client && npm run format

format-check: ## Check code formatting
	@echo "$(BLUE)Checking code formatting...$(NC)"
	cd client && npm run format:check

validate: ## Run all validations (type-check, lint, format)
	@echo "$(BLUE)Running all validations...$(NC)"
	cd client && npm run validate
	@echo "$(GREEN)✓ All validations passed$(NC)"

audit: ## Run security audit
	@echo "$(BLUE)Running security audit...$(NC)"
	cd client && npm audit --production

docker-dev: ## Start Docker development environment
	@echo "$(BLUE)Starting Docker development environment...$(NC)"
	docker compose up

docker-dev-build: ## Build and start Docker development
	@echo "$(BLUE)Building Docker development environment...$(NC)"
	docker compose up --build

docker-dev-bg: ## Start Docker development in background
	@echo "$(BLUE)Starting Docker in background...$(NC)"
	docker compose up -d
	@echo "$(GREEN)✓ Development server running at http://localhost:5173$(NC)"

docker-prod: ## Start Docker production environment
	@echo "$(BLUE)Starting Docker production environment...$(NC)"
	docker compose -f docker-compose.prod.yml up

docker-prod-build: ## Build and start Docker production
	@echo "$(BLUE)Building Docker production environment...$(NC)"
	docker compose -f docker-compose.prod.yml up --build

docker-prod-bg: ## Start Docker production in background
	@echo "$(BLUE)Starting production in background...$(NC)"
	docker compose -f docker-compose.prod.yml up -d
	@echo "$(GREEN)✓ Production server running at http://localhost$(NC)"

docker-stop: ## Stop all Docker containers
	@echo "$(BLUE)Stopping Docker containers...$(NC)"
	docker compose down
	docker compose -f docker-compose.prod.yml down
	@echo "$(GREEN)✓ Containers stopped$(NC)"

docker-logs: ## View Docker logs
	docker compose logs -f

docker-clean: ## Clean Docker images and volumes
	@echo "$(BLUE)Cleaning Docker resources...$(NC)"
	docker compose down -v
	docker compose -f docker-compose.prod.yml down -v
	@echo "$(GREEN)✓ Docker cleaned$(NC)"

generate-icons: ## Generate PWA icons
	@echo "$(BLUE)Generating PWA icons...$(NC)"
	cd client && ./scripts/generate-icons.sh

ssl-dev: ## Generate development SSL certificates
	@echo "$(BLUE)Generating development SSL certificates...$(NC)"
	mkdir -p nginx/ssl
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout nginx/ssl/key.pem \
		-out nginx/ssl/cert.pem \
		-subj "/C=CH/ST=Geneva/L=Geneva/O=ROMUO VTC/CN=localhost"
	@echo "$(GREEN)✓ SSL certificates generated$(NC)"

deploy-netlify: validate build ## Deploy to Netlify
	@echo "$(BLUE)Deploying to Netlify...$(NC)"
	cd client && npm run deploy:netlify

deploy-vercel: validate build ## Deploy to Vercel
	@echo "$(BLUE)Deploying to Vercel...$(NC)"
	cd client && npm run deploy:vercel

deploy: ## Run deployment script
	@echo "$(BLUE)Running deployment...$(NC)"
	cd client && ./scripts/deploy.sh

pre-commit: ## Run pre-commit checks
	@echo "$(BLUE)Running pre-commit checks...$(NC)"
	cd client && ./scripts/pre-commit.sh

status: ## Show project status
	@echo "$(BLUE)Project Status:$(NC)"
	@echo "Node version: $$(node --version)"
	@echo "npm version: $$(npm --version)"
	@echo "Git branch: $$(git branch --show-current)"
	@echo "Git status: $$(git status --short | wc -l) file(s) changed"

logs-nginx: ## View nginx logs
	@tail -f logs/nginx/access.log logs/nginx/error.log

init: setup install ## Complete initial setup
	@echo "$(GREEN)✓ Project initialized!$(NC)"
	@echo "$(YELLOW)Run 'make dev' to start development$(NC)"
