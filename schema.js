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
    getCompanies: [Company!]!
    getTechnologies: [Technology!]!
    getCities: [City!]!

}

schema {
    query: Query
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
