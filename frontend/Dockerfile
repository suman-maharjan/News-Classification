# Start your image with a node base image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

RUN npm install
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]

