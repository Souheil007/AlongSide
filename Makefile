# =============================================================================
# Alongside (ParentPath) — Monorepo Makefile
# =============================================================================
# Usage:
#   make help          Show available targets
#   make dev           Start both frontend and backend concurrently
#   make dev-frontend  Start Next.js frontend only (http://localhost:3000)
#   make dev-backend   Start Fastify API backend only (http://localhost:4000)
# =============================================================================

.DEFAULT_GOAL := help
.PHONY: help dev dev-all dev-frontend dev-backend frontend backend web api \
        install build test lint typecheck clean \
        db-up db-down db-logs db-generate db-validate db-studio

# -----------------------------------------------------------------------------
# Configuration & Binary Detection
# -----------------------------------------------------------------------------
NODE ?= node
NPM  ?= npm
NPX  ?= npx

# -----------------------------------------------------------------------------
# Help
# -----------------------------------------------------------------------------
help: ## Display available make targets
	@echo "Alongside (ParentPath) — Available Make Targets:"
	@echo ""
	@echo "  Development:"
	@echo "    make dev            Start both Frontend (Web) and Backend (API) concurrently"
	@echo "    make dev-frontend   Start Next.js 15 Web frontend (port 3000)"
	@echo "    make dev-backend    Start Fastify LTS 22 API backend (port 4000)"
	@echo "    make frontend       Alias for dev-frontend"
	@echo "    make backend        Alias for dev-backend"
	@echo ""
	@echo "  Database (Docker & Prisma):"
	@echo "    make db-up          Start PostgreSQL 16 + pgvector container"
	@echo "    make db-down        Stop PostgreSQL container"
	@echo "    make db-logs        Follow PostgreSQL container logs"
	@echo "    make db-generate    Generate Prisma Client (@alongside/database)"
	@echo "    make db-validate    Validate Prisma Schema"
	@echo "    make db-studio      Open Prisma Studio database browser"
	@echo ""
	@echo "  Quality & CI Verification:"
	@echo "    make test           Run Vitest unit and integration test suites"
	@echo "    make typecheck      Run TypeScript typechecks across all workspaces"
	@echo "    make lint           Run ESLint linters across all workspaces"
	@echo "    make build          Build all production artifacts"
	@echo ""
	@echo "  Maintenance:"
	@echo "    make install        Install all monorepo dependencies"
	@echo "    make clean          Clean build artifacts (.next, dist, cache)"
	@echo ""

# -----------------------------------------------------------------------------
# Development Targets
# -----------------------------------------------------------------------------
dev: ## Start both Frontend and Backend concurrently
	@$(NODE) ./scripts/dev.mjs

dev-all: dev ## Alias for dev

dev-frontend: ## Start Next.js 15 Web frontend on port 3000
	@$(NPM) run dev --workspace=@alongside/web

frontend: dev-frontend ## Alias for dev-frontend
web: dev-frontend      ## Alias for dev-frontend

dev-backend: ## Start Fastify LTS 22 API backend on port 4000
	@$(NPX) tsx watch apps/api/src/index.ts

backend: dev-backend ## Alias for dev-backend
api: dev-backend     ## Alias for dev-backend

# -----------------------------------------------------------------------------
# Database Targets
# -----------------------------------------------------------------------------
db-up: ## Start PostgreSQL 16 + pgvector container
	docker compose up -d

db-down: ## Stop PostgreSQL container
	docker compose down

db-logs: ## Follow PostgreSQL container logs
	docker compose logs -f postgres

db-generate: ## Generate Prisma Client
	@$(NPM) run db:generate

db-validate: ## Validate Prisma Schema
	@$(NPM) run db:validate

db-studio: ## Open Prisma Studio
	@$(NPX) prisma studio --schema packages/database/prisma/schema.prisma

# -----------------------------------------------------------------------------
# Quality & Build Targets
# -----------------------------------------------------------------------------
install: ## Install dependencies across all workspaces
	@$(NPM) install

build: ## Build all workspaces
	@$(NPM) run build

test: ## Run all automated test suites
	@$(NPM) run test

typecheck: ## Run TypeScript type checks across all workspaces
	@$(NPM) run typecheck

lint: ## Run ESLint across all workspaces
	@$(NPM) run lint

clean: ## Clean build artifacts and caches
	@$(NODE) -e "['apps/web/.next', 'apps/web/out', 'apps/api/dist', 'packages/shared/dist', 'packages/database/dist'].forEach(p => { try { require('node:fs').rmSync(p, { recursive: true, force: true }); } catch {} })"
