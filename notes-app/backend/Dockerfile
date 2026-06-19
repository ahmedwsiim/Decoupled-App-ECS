# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app
# Copy only production dependencies and source code
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 80
CMD ["npm", "start"]
