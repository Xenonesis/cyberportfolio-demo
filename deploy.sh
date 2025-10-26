#!/bin/bash

# Cybersecurity Portfolio Deployment Script
# This script handles automated deployment for the cybersecurity portfolio website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="cybersecurity-portfolio"
DEPLOY_ENV=${1:-"production"}
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Pre-deployment checks
pre_deployment_checks() {
    log_info "Running pre-deployment checks..."

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18.17+"
        exit 1
    fi

    # Check Node.js version
    NODE_VERSION=$(node -v | sed 's/v//')
    REQUIRED_VERSION="18.17.0"
    if ! [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
        log_error "Node.js version $NODE_VERSION is not supported. Please upgrade to 18.17+"
        exit 1
    fi

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi

    # Check if git is available and repository is clean
    if command -v git &> /dev/null; then
        if [ -n "$(git status --porcelain)" ]; then
            log_warning "Repository has uncommitted changes"
        fi
    fi

    # Check environment file
    if [ ! -f ".env.local" ]; then
        log_warning ".env.local file not found. Please create it with required environment variables"
    fi

    log_success "Pre-deployment checks completed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."

    if [ -f "yarn.lock" ]; then
        yarn install --frozen-lockfile
    else
        npm ci
    fi

    log_success "Dependencies installed"
}

# Run tests
run_tests() {
    log_info "Running tests..."

    if [ -f "package.json" ]; then
        if npm run test --silent 2>/dev/null; then
            log_success "Tests passed"
        else
            log_error "Tests failed"
            exit 1
        fi
    else
        log_warning "No package.json found, skipping tests"
    fi
}

# Build application
build_application() {
    log_info "Building application for $DEPLOY_ENV..."

    export NODE_ENV=$DEPLOY_ENV

    if npm run build; then
        log_success "Application built successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Run security audit
security_audit() {
    log_info "Running security audit..."

    if npm audit --audit-level high; then
        log_success "Security audit passed"
    else
        log_warning "Security vulnerabilities found. Please review and fix"
    fi
}

# Create backup
create_backup() {
    log_info "Creating backup..."

    mkdir -p "$BACKUP_DIR"

    # Backup environment file
    if [ -f ".env.local" ]; then
        cp .env.local "$BACKUP_DIR/.env.local.$TIMESTAMP.bak"
    fi

    # Backup database if exists
    if [ -n "$DATABASE_URL" ]; then
        log_info "Backing up database..."
        # Add database backup logic here
    fi

    log_success "Backup created: $BACKUP_DIR/*.$TIMESTAMP.bak"
}

# Deploy to Vercel
deploy_vercel() {
    log_info "Deploying to Vercel..."

    if ! command -v vercel &> /dev/null; then
        log_error "Vercel CLI is not installed"
        exit 1
    fi

    if vercel --prod; then
        log_success "Deployed to Vercel successfully"
    else
        log_error "Vercel deployment failed"
        exit 1
    fi
}

# Deploy to Netlify
deploy_netlify() {
    log_info "Deploying to Netlify..."

    if ! command -v netlify &> /dev/null; then
        log_error "Netlify CLI is not installed"
        exit 1
    fi

    if netlify deploy --prod --dir=.next; then
        log_success "Deployed to Netlify successfully"
    else
        log_error "Netlify deployment failed"
        exit 1
    fi
}

# Deploy with Docker
deploy_docker() {
    log_info "Deploying with Docker..."

    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi

    # Build Docker image
    docker build -t $PROJECT_NAME:$TIMESTAMP .

    # Stop existing container
    docker stop $PROJECT_NAME 2>/dev/null || true
    docker rm $PROJECT_NAME 2>/dev/null || true

    # Run new container
    docker run -d \
        --name $PROJECT_NAME \
        -p 3000:3000 \
        --env-file .env.local \
        --restart unless-stopped \
        $PROJECT_NAME:$TIMESTAMP

    log_success "Deployed with Docker successfully"
}

# Post-deployment verification
post_deployment_verification() {
    log_info "Running post-deployment verification..."

    # Wait for application to start
    sleep 10

    # Check if application is responding
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
        log_success "Application is responding"
    else
        log_error "Application is not responding"
        exit 1
    fi

    # Run Lighthouse check if available
    if command -v lighthouse &> /dev/null; then
        log_info "Running Lighthouse performance check..."
        lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --quiet
        log_success "Lighthouse check completed"
    fi
}

# Rollback function
rollback() {
    log_error "Deployment failed. Starting rollback..."

    # Restore backup
    if [ -f "$BACKUP_DIR/.env.local.$TIMESTAMP.bak" ]; then
        cp "$BACKUP_DIR/.env.local.$TIMESTAMP.bak" .env.local
        log_info "Environment file restored from backup"
    fi

    # Additional rollback logic here
    log_info "Rollback completed"
}

# Main deployment function
main() {
    log_info "Starting deployment of $PROJECT_NAME to $DEPLOY_ENV environment"

    # Trap errors for rollback
    trap rollback ERR

    pre_deployment_checks
    create_backup
    install_dependencies
    security_audit
    run_tests
    build_application

    # Choose deployment method based on environment or flags
    case $DEPLOY_ENV in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "docker")
            deploy_docker
            ;;
        *)
            log_info "Local deployment completed. Use --vercel, --netlify, or --docker for cloud deployment"
            ;;
    esac

    post_deployment_verification

    log_success "Deployment completed successfully! 🎉"
    log_info "Application is running at: http://localhost:3000"
}

# Health check function
health_check() {
    log_info "Running health check..."

    # Check application health
    if curl -f -s http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "Health check passed"
    else
        log_error "Health check failed"
        exit 1
    fi
}

# Show usage
usage() {
    echo "Usage: $0 [environment] [options]"
    echo ""
    echo "Environments:"
    echo "  production    Deploy to production (default)"
    echo "  staging       Deploy to staging"
    echo "  development   Deploy to development"
    echo ""
    echo "Options:"
    echo "  --vercel      Deploy to Vercel"
    echo "  --netlify     Deploy to Netlify"
    echo "  --docker      Deploy with Docker"
    echo "  --health      Run health check only"
    echo "  --help        Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 production"
    echo "  $0 --vercel"
    echo "  $0 --health"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --vercel)
            DEPLOY_ENV="vercel"
            shift
            ;;
        --netlify)
            DEPLOY_ENV="netlify"
            shift
            ;;
        --docker)
            DEPLOY_ENV="docker"
            shift
            ;;
        --health)
            health_check
            exit 0
            ;;
        --help)
            usage
            exit 0
            ;;
        *)
            DEPLOY_ENV=$1
            shift
            ;;
    esac
done

# Run main function
main