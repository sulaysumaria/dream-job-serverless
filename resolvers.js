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
      try {
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
        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            jobs,
            success: true
          }),
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
          }
        });
      } catch (e) {
        console.log(e);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({
            message: "Some error occurred. Please try again later."
          }),
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
          }
        });
      }
    });
  },
};
// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getJobs: () => data.getJobs()
  },
  User: {
    tweets: (obj, args) => data.getPaginatedTweets(obj.handle, args)
  }
};
