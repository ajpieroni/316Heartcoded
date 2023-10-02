# FROM node:16.17.0-bullseye-slim
# RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
# RUN npm install -g npm@9.7.2
# ENV NODE_ENV production
# #COPY package.json /usr/src/app/
# #COPY .npmrc /usr/src/app/
# COPY . /usr/src/app/
# WORKDIR /usr/src/app
# COPY --chown=node:node . .
# RUN npm ci --only=production
# USER node
# EXPOSE 8080
# CMD [ "npm", "start" ]
# #CMD ["dumb-init", "node", "server.js"]

FROM node:14
WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
CMD ["npm", "start"]