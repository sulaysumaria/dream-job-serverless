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

// eslint-disable-next-line import/prefer-default-export
export { schema };

// type Mutation {


//     # Create user info is available in dynamo integration
//     // updateUserInfo(
//     //     location: String!,
//     //     description: String!,
//     //     name: String!,
//     //     followers_count: Int!,
//     //     friends_count: Int!,
//     //     favourites_count: Int!,
//     //     following: [String!]!
//     // ): User!
// }

