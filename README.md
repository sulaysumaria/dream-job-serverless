# usermanagementapi

## Getting started

```bash
$ git clone
$ cd api
$ npm i
$ cp config-example.js config.js
# set mongodb url string in config.js
$ npm start
```

## Deploy

```bash
$ npm run deploy
```

## Endpoints

| Verb | Path     | Params |
| ---- | -------- | ------ |
| GET  | /graphql |        |
| POST | /graphql |        |

## GraphQL

### Types

```
type Job {
    title: String!
    cities: [String]
    technoologies: [String]
    companies: [String]
    fromDate: String
    toDate: String
    expectedSalary: Int
    index: Int
    _id: ID
}

type Resources {
    cities: [City!]
    technologies: [Technology!]
    companies: [Company!]
}

type Company {
    _id: ID!
    name: String!
}

type City {
    _id: ID!
    name: String!
}

type Technology {
    _id: ID!
    name: String!
}
```

### Inputs

```
input JobEventArgs {
    title: String!
    cities: [String]
    technologies: [String]
    companies: [String]
    fromDate: String
    toDate: String
    expectedSalary: Int
    index: Int
    _id: ID
}

input Name {
    name: String
}

input ResourcesInputArgs {
    cities: [Name]
    technologies: [Name]
    companies: [Name]
}
```

### Queries

```
type Query {
    getJobs: [Job!]!
    getResources: Resources
}
```

### Mutations

```
type RootMutation {
    addJob(job: JobEventArgs): [Job!]!
    updateJob(job: JobEventArgs): [Job!]!
    deleteJob(jobId: String): [Job!]!
    updateGlobal(resources: ResourcesInputArgs): Resources
}
```
