# Stage 1: Build bunbles
FROM node:22.12 AS build

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:naRBpy6Lp77w@10.10.50.10:5432/bruba?schema=public"

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Stage 2: Serve the API with a smaller image
FROM node:22.12-alpine

COPY --from=build /app/dist /dist
COPY package*.json ./

# Expose the port on which the app will run
EXPOSE 3000


# Start the server using the production build
CMD ["npm", "run", "start:prod"]
