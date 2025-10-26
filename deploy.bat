@echo off
REM Cybersecurity Portfolio Deployment Script for Windows
REM This script handles automated deployment for the cybersecurity portfolio website

setlocal enabledelayedexpansion

REM Colors for output (Windows CMD)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Configuration
set "PROJECT_NAME=cybersecurity-portfolio"
set "DEPLOY_ENV=%1"
if "%DEPLOY_ENV%"=="" set "DEPLOY_ENV=production"
set "BACKUP_DIR=.\backups"
set "TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "TIMESTAMP=%TIMESTAMP: =0%"

REM Logging functions
:log_info
echo %BLUE%[INFO]%NC% %~1
goto :eof

:log_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:log_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:log_error
echo %RED%[ERROR]%NC% %~1
goto :eof

REM Pre-deployment checks
:pre_deployment_checks
call :log_info "Running pre-deployment checks..."

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    call :log_error "Node.js is not installed. Please install Node.js 18.17+"
    exit /b 1
)

REM Check Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
set "NODE_VERSION=%NODE_VERSION:v=%"
set "REQUIRED_VERSION=18.17.0"

REM Simple version comparison (basic check)
echo %NODE_VERSION%| findstr /r /c:"^1[8-9]\." >nul
if %errorlevel% neq 0 (
    call :log_error "Node.js version %NODE_VERSION% is not supported. Please upgrade to 18.17+"
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    call :log_error "npm is not installed"
    exit /b 1
)

REM Check environment file
if not exist ".env.local" (
    call :log_warning ".env.local file not found. Please create it with required environment variables"
)

call :log_success "Pre-deployment checks completed"
goto :eof

REM Install dependencies
:install_dependencies
call :log_info "Installing dependencies..."

if exist "yarn.lock" (
    yarn install --frozen-lockfile
) else (
    npm ci
)

if %errorlevel% neq 0 (
    call :log_error "Failed to install dependencies"
    exit /b 1
)

call :log_success "Dependencies installed"
goto :eof

REM Build application
:build_application
call :log_info "Building application for %DEPLOY_ENV%..."

set "NODE_ENV=%DEPLOY_ENV%"
npm run build

if %errorlevel% neq 0 (
    call :log_error "Build failed"
    exit /b 1
)

call :log_success "Application built successfully"
goto :eof

REM Run security audit
:security_audit
call :log_info "Running security audit..."

npm audit --audit-level high
if %errorlevel% neq 0 (
    call :log_warning "Security vulnerabilities found. Please review and fix"
) else (
    call :log_success "Security audit passed"
)
goto :eof

REM Create backup
:create_backup
call :log_info "Creating backup..."

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Backup environment file
if exist ".env.local" (
    copy ".env.local" "%BACKUP_DIR%\.env.local.%TIMESTAMP%.bak" >nul
)

call :log_success "Backup created: %BACKUP_DIR%\*.%TIMESTAMP%.bak"
goto :eof

REM Deploy to Vercel
:deploy_vercel
call :log_info "Deploying to Vercel..."

where vercel >nul 2>nul
if %errorlevel% neq 0 (
    call :log_error "Vercel CLI is not installed"
    exit /b 1
)

vercel --prod
if %errorlevel% neq 0 (
    call :log_error "Vercel deployment failed"
    exit /b 1
)

call :log_success "Deployed to Vercel successfully"
goto :eof

REM Deploy to Netlify
:deploy_netlify
call :log_info "Deploying to Netlify..."

where netlify >nul 2>nul
if %errorlevel% neq 0 (
    call :log_error "Netlify CLI is not installed"
    exit /b 1
)

netlify deploy --prod --dir=.next
if %errorlevel% neq 0 (
    call :log_error "Netlify deployment failed"
    exit /b 1
)

call :log_success "Deployed to Netlify successfully"
goto :eof

REM Post-deployment verification
:post_deployment_verification
call :log_info "Running post-deployment verification..."

REM Wait for application to start
timeout /t 10 /nobreak >nul

REM Check if application is responding
curl -f -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    call :log_error "Application is not responding"
    exit /b 1
)

call :log_success "Application is responding"
goto :eof

REM Main deployment function
:main
call :log_info "Starting deployment of %PROJECT_NAME% to %DEPLOY_ENV% environment"

call :pre_deployment_checks
if %errorlevel% neq 0 exit /b 1

call :create_backup
if %errorlevel% neq 0 exit /b 1

call :install_dependencies
if %errorlevel% neq 0 exit /b 1

call :security_audit

call :build_application
if %errorlevel% neq 0 exit /b 1

REM Choose deployment method
if "%DEPLOY_ENV%"=="vercel" (
    call :deploy_vercel
) else if "%DEPLOY_ENV%"=="netlify" (
    call :deploy_netlify
) else (
    call :log_info "Local deployment completed. Use --vercel or --netlify for cloud deployment"
)

call :post_deployment_verification
if %errorlevel% neq 0 exit /b 1

call :log_success "Deployment completed successfully!"
call :log_info "Application is running at: http://localhost:3000"
goto :eof

REM Show usage
:usage
echo Usage: %0 [environment] [options]
echo.
echo Environments:
echo   production    Deploy to production (default)
echo   staging       Deploy to staging
echo   development   Deploy to development
echo.
echo Options:
echo   --vercel      Deploy to Vercel
echo   --netlify     Deploy to Netlify
echo   --help        Show this help
echo.
echo Examples:
echo   %0 production
echo   %0 --vercel
goto :eof

REM Parse command line arguments
set "P1=%1"
set "P2=%2"

if "%P1%"=="--vercel" (
    set "DEPLOY_ENV=vercel"
) else if "%P1%"=="--netlify" (
    set "DEPLOY_ENV=netlify"
) else if "%P1%"=="--help" (
    call :usage
    exit /b 0
) else if defined P1 (
    set "DEPLOY_ENV=%P1%"
)

REM Run main function
call :main