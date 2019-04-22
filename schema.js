const schema = `
type Mutation {


    # Create user info is available in dynamo integration
    updateUserInfo(
        location: String!,
        description: String!,
        name: String!,
        followers_count: Int!,
        friends_count: Int!,
        favourites_count: Int!,
        following: [String!]!
    ): User!
}

type Query {

    getJobs(): Job!

}

type Job {
    title: String
    cities: [String]
    technoologies: [String]
    companies: [String]
    fromDate: String
    toDate: String
    expectedSalary: Int
    index: Int
    _id: String
}

schema {
    query: Query
    mutation: Mutation
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
