const schema = `
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

type Resources {
    cities: [City!]
    technologies: [Technology!]
    companies: [Company!]
}

input Name {
    name: String
}

input ResourcesInputArgs {
    cities: [Name]
    technologies: [Name]
    companies: [Name]
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

type Query {
    getJobs: [Job!]!
    getResources: Resources
}

type RootMutation {
    addJob(job: JobEventArgs): [Job!]!
    updateJob(job: JobEventArgs): [Job!]!
    deleteJob(jobId: String): [Job!]!
    updateGlobal(resources: ResourcesInputArgs): Resources
}

schema {
    query: Query,
    mutation: RootMutation
}`;

module.exports = { schema };
