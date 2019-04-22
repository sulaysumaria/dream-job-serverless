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

      console.log(jobs);

      // return users
      return resolve(jobs);
    });
  },

  // get global
  getResources() {
    return new Promise(async resolve => {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // get all companies
      const companies = await dbo
        .collection("companies")
        .find()
        .toArray();

      const cities = await dbo
        .collection("cities")
        .find()
        .toArray();

      // get all technologies
      const technologies = await dbo
        .collection("technologies")
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return companies
      return resolve({
        cities: cities,
        technologies: technologies,
        companies: companies
      });
    });
  },

  // update a single job
  updateJob(event) {
    console.log(event);
    return new Promise(async resolve => {
      // validate body
      const result = Joi.validate(event.job, jobSchema, { abortEarly: false });
      // console.log(result)
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // insert new user

      var jobToUpdate = {};
      jobToUpdate = Object.assign(jobToUpdate, result.value);
      delete jobToUpdate._id;
      const id = await result.value._id.toString();
      await dbo
        .collection("jobs")
        .findOneAndUpdate({ _id: ObjectID(id) }, { $set: jobToUpdate });

      let jobs = [];
      await dbo
        .collection("jobs")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          jobs = result;
        });
      // close connection
      await dbConn.close();

      // return response
      return resolve(jobs);
      // }
    });
  },
  addJob(event) {
    return new Promise(async resolve => {
      // validate body
      const result = Joi.validate(event.job, jobSchema, { abortEarly: false });

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // insert new user
      await dbo.collection("jobs").insert(result.value);

      let jobs = [];
      await dbo
        .collection("jobs")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          jobs = result;
        });
      // close connection
      await dbConn.close();

      // return response
      return resolve(jobs);
    });
  },

  // delete job
  deleteJob(event) {
    return new Promise(async resolve => {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      const id = await event.jobId.toString();
      await dbo.collection("jobs").findOneAndDelete({ _id: ObjectID(id) });

      // get all jobs
      const jobs = await dbo
        .collection("jobs")
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return jobs
      return resolve(jobs);
    });
  },

  // update Global
  updateGlobal(event) {
    return new Promise(async resolve => {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      console.log(event.resources);

      // insert new resources
      if (event.resources.companies.length) {
        await dbo.collection("companies").insert(event.resources.companies);
      }

      if (event.resources.cities.length) {
        await dbo.collection("cities").insert(event.resources.cities);
      }

      if (event.resources.technologies.length) {
        await dbo.collection("technologies").insert(event.resources.technologies);
      }

      let companies = [];
      let cities = [];
      let technologies = [];

      await dbo
        .collection("companies")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          companies = result;
        });

      await dbo
        .collection("cities")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          cities = result;
        });

      await dbo
        .collection("technologies")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          technologies = result;
        });

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        cities: cities,
        technologies: technologies,
        companies: companies
      });
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getJobs: () => data.getJobs(),
    getResources: () => data.getResources()
  },
  RootMutation: {
    addJob: (root, job) => data.addJob(job),
    updateJob: (root, job) => data.updateJob(job),
    deleteJob: (root, jobId) => data.deleteJob(jobId),
    updateGlobal: (root, resources) => data.updateGlobal(resources)
  }
  // User: {
  //   tweets: (obj, args) => data.getPaginatedTweets(obj.handle, args)
  // }
};
