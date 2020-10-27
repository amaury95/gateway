# Gateway graphql middleware

This module was intended to be an optimization for the given restful api. It is not strictly necesary for the project but it have great approaches to consider once restful projects grows.

- **Project Structure:** Graphql is really good for relational projects as it were conceibed to treat business logic as a graph.
- **Network Latency Improvement**: As Graphql can request on demand each field of the resource in each query, frontend developers can adjust and optimize the data they are getting from the server without adding extra endpoints.
- **Speed up relational quieries**: To fetch some object's relations in REST clients must perform at least two api calls _(Following RESTful specification)_. As you can create flexibles queries with Graphql, we can set a resolver to retrieve the data serverside and the client will only perform one request to the server.
- **Realtime events**: With graphql subscriptions, developers can create websockets channels to share data events in a simple way and you dont have to add extra endpoints to your REST api.
- **Data Caching**: Apollo project _(our grapqh server provider)_ comes with prebuilt datasources that performs `In-Memory-Cache` for queries that fills the server.
- **Serverless**: Nowdays serverless applications have being becoming a must have in systems architectures. Apollo provides several tools to deploy your app into serverless providers as [apollo-server-azure-functions](https://www.npmjs.com/package/apollo-server-azure-functions).

## Dependencies

This application depends on the following programs:

- nodejs

## Configuration

Create a `.env` file <i>(if not created)</i> with the following configuration:

```sh
SERVER_ADDRESS=http://localhost:8000/api
```

## Setup

To run the server follow the instructions:

- run mongodb in your machine
- inside of the project folder execute the following commands:
  - `npm install`
  - `npm build`
  - `npm start`
