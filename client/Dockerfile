FROM node:alpine

# Config Env Vars for running create-react-app in Docker
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]