# Stage 1: Build
FROM node:22.12 AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev && \
    npm install -g @nestjs/cli

# Copy application files
COPY . .

# Generate Prisma client before building
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Stage 2: Production Image
FROM node:22.12-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=production

# Ensure Prisma client exists before starting
CMD npx prisma generate && npx prisma migrate deploy && node dist/src/main
