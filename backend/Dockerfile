# Start your image with a node base image
FROM node:18-alpine as build

# The /app directory should act as the main application directory
WORKDIR /app

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

RUN npm install
RUN npm run build
EXPOSE 3000

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["node", "dist/index.js"]
