// add to handler.js
const Joi = require("joi");

const { db } = require("./helpers/db");
var ObjectID = require("mongodb").ObjectID;

// schema for validating user object when adding new user
const jobSchema = Joi.object().keys({
  title: Joi.string().required(),
  companies: Joi.array(),
  cities: Joi.array(),
  technologies: Joi.array(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
  expectedSalary: Joi.number().required(),
  index: Joi.number(),
  _id: Joi.string()
});

// add to handler.js
const promisify = foo =>
  new Promise((resolve, reject) => {
    foo((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const data = {
  // get all jobs
  getJobs() {
    return new Promise(async resolve => {
        // get connection to mongodb
        const dbConn = await db();

        // get database instance
        const dbo = dbConn.db("dream-job");

        // get all users
        const jobs = await dbo
          .collection("jobs")
          .find()
          .toArray();

        // close db connection
        await dbConn.close();

        console.log(jobs)

        // return users
        return resolve(jobs);
    });
  },

  getCompanies() {
    return new Promise(async resolve => {
        // get connection to mongodb
        const dbConn = await db();

        // get database instance
        const dbo = dbConn.db("dream-job");

        // get all users
        const companies = await dbo
          .collection("companies")
          .find()
          .toArray();

        // close db connection
        await dbConn.close();

        console.log(companies)

        // return users
        return resolve(companies);
    });
  },

  getCities() {
    return new Promise(async resolve => {
        // get connection to mongodb
        const dbConn = await db();

        // get database instance
        const dbo = dbConn.db("dream-job");

        // get all users
        const cities = await dbo
          .collection("cities")
          .find()
          .toArray();

        // close db connection
        await dbConn.close();

        console.log(cities)

        // return users
        return resolve(cities);
    });
  },

  getTechnologies() {
    return new Promise(async resolve => {
        // get connection to mongodb
        const dbConn = await db();

        // get database instance
        const dbo = dbConn.db("dream-job");

        // get all users
        const technologies = await dbo
          .collection("technologies")
          .find()
          .toArray();

        // close db connection
        await dbConn.close();

        console.log(technologies)

        // return users
        return resolve(technologies);
    });
  },
};
// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getJobs: () => data.getJobs(),
    getCompanies: () => data.getCompanies(),
    getTechnologies: () => data.getTechnologies(),
    getCities: () => data.getCities()
  },
  // User: {
  //   tweets: (obj, args) => data.getPaginatedTweets(obj.handle, args)
  // }
};
