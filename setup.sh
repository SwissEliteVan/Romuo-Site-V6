#!/bin/bash

# ROMUO VTC - Setup Script
# This script helps you set up the project for the first time

set -e

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Header
echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║      ROMUO VTC - Project Setup         ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js installation
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo -e "${YELLOW}Please install Node.js 18 or higher from https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}✗ Node.js version $NODE_VERSION is too old${NC}"
    echo -e "${YELLOW}Please upgrade to Node.js 18 or higher${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"
echo -e "${GREEN}✓ npm $(npm -v) detected${NC}"

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠ Git is not installed (optional but recommended)${NC}"
else
    echo -e "${GREEN}✓ Git $(git --version | cut -d' ' -f3) detected${NC}"
fi

echo ""

# Make scripts executable
echo -e "${BLUE}Making scripts executable...${NC}"
chmod +x client/scripts/*.sh 2>/dev/null || true
echo -e "${GREEN}✓ Scripts are executable${NC}"

# Setup environment file
echo ""
echo -e "${BLUE}Setting up environment variables...${NC}"

if [ -f "client/.env" ]; then
    echo -e "${YELLOW}⚠ .env file already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Skipping .env creation${NC}"
    else
        cp client/.env.example client/.env
        echo -e "${GREEN}✓ .env file created${NC}"
    fi
else
    cp client/.env.example client/.env
    echo -e "${GREEN}✓ .env file created${NC}"
fi

# Ask for TomTom API key
echo ""
echo -e "${BLUE}Configure API Keys${NC}"
echo -e "${YELLOW}You need a TomTom API key for the route calculator${NC}"
echo -e "${YELLOW}Get one at: https://developer.tomtom.com/${NC}"
echo ""
read -p "Enter your TomTom API key (or press Enter to skip): " TOMTOM_KEY

if [ ! -z "$TOMTOM_KEY" ]; then
    # Update .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/your_tomtom_api_key_here/$TOMTOM_KEY/" client/.env
    else
        # Linux
        sed -i "s/your_tomtom_api_key_here/$TOMTOM_KEY/" client/.env
    fi
    echo -e "${GREEN}✓ TomTom API key configured${NC}"
else
    echo -e "${YELLOW}⚠ Skipped TomTom API key (you can add it later in client/.env)${NC}"
fi

# Ask for GA4 (optional)
echo ""
read -p "Do you want to configure Google Analytics 4? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GA4 Measurement ID (G-XXXXXXXXXX): " GA4_ID
    if [ ! -z "$GA4_ID" ]; then
        echo "VITE_GA4_MEASUREMENT_ID=$GA4_ID" >> client/.env
        echo -e "${GREEN}✓ GA4 configured${NC}"
    fi
fi

# Install dependencies
echo ""
echo -e "${BLUE}Installing dependencies...${NC}"
read -p "Install npm dependencies now? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    cd client
    npm install
    cd ..
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Skipped dependency installation${NC}"
    echo -e "${YELLOW}Run 'cd client && npm install' manually${NC}"
fi

# Create logs directory
echo ""
echo -e "${BLUE}Creating directories...${NC}"
mkdir -p logs/nginx
echo -e "${GREEN}✓ Logs directory created${NC}"

# Git setup
echo ""
if command -v git &> /dev/null && [ -d ".git" ]; then
    echo -e "${BLUE}Git Configuration${NC}"

    # Check if git user is configured
    if ! git config user.name &> /dev/null; then
        echo -e "${YELLOW}Git user not configured${NC}"
        read -p "Enter your name for Git commits: " GIT_NAME
        read -p "Enter your email for Git commits: " GIT_EMAIL
        git config user.name "$GIT_NAME"
        git config user.email "$GIT_EMAIL"
        echo -e "${GREEN}✓ Git user configured${NC}"
    else
        echo -e "${GREEN}✓ Git already configured${NC}"
    fi
fi

# Optional: Generate SSL certificates for local development
echo ""
read -p "Generate self-signed SSL certificates for local HTTPS? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v openssl &> /dev/null; then
        mkdir -p nginx/ssl
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout nginx/ssl/key.pem \
            -out nginx/ssl/cert.pem \
            -subj "/C=CH/ST=Geneva/L=Geneva/O=ROMUO VTC/CN=localhost" \
            2>/dev/null
        echo -e "${GREEN}✓ SSL certificates generated${NC}"
    else
        echo -e "${RED}✗ OpenSSL not found${NC}"
    fi
fi

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          Setup Complete! 🎉            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo -e "  ${GREEN}1.${NC} Start development server:"
echo -e "     ${YELLOW}make dev${NC} or ${YELLOW}cd client && npm run dev${NC}"
echo ""
echo -e "  ${GREEN}2.${NC} Build for production:"
echo -e "     ${YELLOW}make build${NC} or ${YELLOW}cd client && npm run build${NC}"
echo ""
echo -e "  ${GREEN}3.${NC} View all available commands:"
echo -e "     ${YELLOW}make help${NC}"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo -e "  • README: ${YELLOW}client/README.md${NC}"
echo -e "  • Deployment: ${YELLOW}client/DEPLOYMENT.md${NC}"
echo -e "  • Contributing: ${YELLOW}CONTRIBUTING.md${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
