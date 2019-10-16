FROM node

WORKDIR /usr/src/app
COPY . .

RUN npm config set registry https://repo.adeo.no/repository/npm-public/
RUN npm install express path mustache-express promise prom-client dotenv jsdom request

EXPOSE 8080

CMD ["npm", "start"]

#FROM navikt/node-express:12.2.0-alpine
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#ENV TZ="Europe/Oslo"
#
#WORKDIR /app
#
#COPY node_modules/ node_modules/
#COPY dist/server/ dist/server/
#COPY dist/client/ dist/client/
#
#EXPOSE 3000
#
#ENTRYPOINT [ "/entrypoint.sh", "node /app/dist/server/server.js" ]

#FROM navikt/node-express:12.2.0-alpine
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#ENV TZ="Europe/Oslo"
#
#WORKDIR /app
#
#COPY node_modules/ node_modules/
#COPY dist/server/ dist/server/
#COPY dist/client/ dist/client/
#
#EXPOSE 8080
#
#ENTRYPOINT [ "/entrypoint.sh", "node /app/dist/server/server.js" ]
