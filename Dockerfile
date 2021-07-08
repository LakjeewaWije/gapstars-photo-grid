FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

# Build frontend
WORKDIR /usr/src/app/image-grid-frontend
RUN yarn && yarn build

# Build backend 
WORKDIR /usr/src/app/image-grid-backend
RUN yarn && yarn build

# Indicate port 80 should be exposed
EXPOSE 80/tcp

# Run
CMD [ "yarn", "start:prod" ]
