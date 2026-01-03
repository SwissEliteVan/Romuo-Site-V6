# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build application
ARG VITE_TOMTOM_API_KEY
ARG VITE_GA4_MEASUREMENT_ID
ENV VITE_TOMTOM_API_KEY=$VITE_TOMTOM_API_KEY
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID

RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy nginx configuration
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Expose port
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
