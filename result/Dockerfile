FROM node:5.11.0-slim

WORKDIR /app

RUN npm install -g nodemon
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN npm run build

ADD /dist /app
ADD /tools/distServer.js /app

ENV PORT 80
EXPOSE 80

CMD ["node", "distServer.js"]
