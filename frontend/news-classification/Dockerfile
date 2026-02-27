# Install Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

# Create and set the working directory
WORKDIR /app

COPY package.json package-lock.json* ./
RUN \
    if [ -f package-lock.json ]; then npm ci;\
    else echo "Lockfile not found." && exit 1;\
    fi

# Rebuild Souce Code
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all files and run
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "4173"]

