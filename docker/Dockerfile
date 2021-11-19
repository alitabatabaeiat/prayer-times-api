FROM node:16.13-alpine

RUN npm install -g npm
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app

USER node
ENV NODE_ENV production

COPY --chown=node:node package.json .
RUN npm install --production
COPY --chown=node:node . .

EXPOSE 8080

CMD npm start