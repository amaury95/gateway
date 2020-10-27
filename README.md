# Welcome to Gateway

Gateway is an **example project** of an application using various **Javascript Frameworks** and their utilities.

For the programming **TypeScript** was used as it is recommended for large scale JavaScript projects due to it's strongly typed and a great advantage for detecting bugs in compilation _(transpilation in the case of Typescript)_ time.

## Build

For example purposes the project is configured totally using [**Docker**](https://www.docker.com/). Other technologies as [**Azure Functions**](https://azure.microsoft.com/en-us/services/functions/) requires server configurations not included in the basic deployment. However, explanations of those technologies will be contained in the modules description.

### Requirements

- **Docker**
- **Docker Compose**

### Deploy

```sh
docker-compose up -d mongodb # So mongo setup finishes before the app try to connect.
docker-compose up -d client
```

[Open browser](http://localhost:9000)

### Local deploy

To run the solution in a host environment follow the instructions:

- execute `mongodb` (_or run_ `docker-compose up -d mongodb`) in your host.
- go to `/server` location and run:

```sh
npm install
npm run build
npm test
```

- if tests passes then you can proceed to run the service:

```sh
npm start
```

- go to the location `/gatwway-api` and run:

```sh
npm install
npm run build
npm start
```

- go to the location `/client` and run:

```sh
npm install
npm start
```

### Testing manually the rest api

For testing manually the rest api you shoudl install the [Visual Studio Code](https://code.visualstudio.com/download) and its extension [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Then open the file `/serversrc/router/router.rest` in the VSCode.

Modify as you whish.

Open [Graphql Playground](http://localhost:4000) for testing the grapql api as well as the websocket subscriptions.

### Future work and errors

- The subscriptions running in docker environment doesnt work. The page must be refreshed in order to watch the changes.
