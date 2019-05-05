const Joi = require("joi");
const ObjectID = require("mongodb").ObjectID;

const { db } = require("./helpers/db");

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

const data = {
  getJobs() {
    return new Promise(async resolve => {
      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      const jobs = await dbo
        .collection("jobs")
        .find()
        .toArray();

      await dbConn.close();

      return resolve(jobs);
    });
  },
  getResources() {
    return new Promise(async resolve => {
      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      const [companies, cities, technologies] = await Promise.all([
        dbo
          .collection("companies")
          .find()
          .toArray(),
        dbo
          .collection("cities")
          .find()
          .toArray(),
        dbo
          .collection("technologies")
          .find()
          .toArray()
      ]);

      await dbConn.close();

      return resolve({
        cities: cities,
        technologies: technologies,
        companies: companies
      });
    });
  },
  updateJob(event) {
    return new Promise(async resolve => {
      const result = Joi.validate(event.job, jobSchema, { abortEarly: false });

      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      const jobToUpdate = Object.assign(jobToUpdate, result.value);
      delete jobToUpdate._id;
      const id = await result.value._id.toString();

      await dbo
        .collection("jobs")
        .findOneAndUpdate({ _id: ObjectID(id) }, { $set: jobToUpdate });

      const jobs = await dbo
        .collection("jobs")
        .find({})
        .toArray();

      await dbConn.close();

      return resolve(jobs);
    });
  },
  addJob(event) {
    return new Promise(async resolve => {
      const result = Joi.validate(event.job, jobSchema, { abortEarly: false });

      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      await dbo.collection("jobs").insert(result.value);

      const jobs = await dbo
        .collection("jobs")
        .find({})
        .toArray();

      await dbConn.close();

      return resolve(jobs);
    });
  },
  deleteJob(event) {
    return new Promise(async resolve => {
      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      const id = await event.jobId.toString();

      await dbo.collection("jobs").findOneAndDelete({ _id: ObjectID(id) });

      const jobs = await dbo
        .collection("jobs")
        .find()
        .toArray();

      await dbConn.close();

      return resolve(jobs);
    });
  },
  updateGlobal(event) {
    return new Promise(async resolve => {
      const dbConn = await db();
      const dbo = dbConn.db("dream-job");

      if (event.resources.companies.length) {
        await dbo.collection("companies").insert(event.resources.companies);
      }

      if (event.resources.cities.length) {
        await dbo.collection("cities").insert(event.resources.cities);
      }

      if (event.resources.technologies.length) {
        await dbo
          .collection("technologies")
          .insert(event.resources.technologies);
      }

      const [companies, cities, technologies] = await Promise.all([
        dbo
          .collection("companies")
          .find()
          .toArray(),
        dbo
          .collection("cities")
          .find()
          .toArray(),
        dbo
          .collection("technologies")
          .find()
          .toArray()
      ]);

      await dbConn.close();

      return resolve({
        cities: cities,
        technologies: technologies,
        companies: companies
      });
    });
  }
};

exports.resolvers = {
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
};
