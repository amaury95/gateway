FROM node:12.18.2
WORKDIR /usr/src/app
ADD . .
RUN npm install
RUN npm run build
EXPOSE 4000
ENTRYPOINT npm start