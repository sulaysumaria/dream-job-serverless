const Joi = require('joi');
const {ObjectID} = require('mongodb');

const {db} = require('./helpers/db');

const jobSchema = Joi.object().keys({
  title: Joi.string().required(),
  companies: Joi.array(),
  cities: Joi.array(),
  technologies: Joi.array(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
  expectedSalary: Joi.number().required(),
  index: Joi.number(),
  _id: Joi.string(),
});

function getJobs() {
  return new Promise(async (resolve) => {
    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    const jobs = await dbo
        .collection('jobs')
        .find()
        .toArray();

    await dbConn.close();

    return resolve(jobs);
  });
}

function addJob(root, event) {
  return new Promise(async (resolve) => {
    const result = Joi.validate(event.job, jobSchema, {abortEarly: false});

    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    await dbo.collection('jobs').insert(result.value);

    const jobs = await dbo
        .collection('jobs')
        .find({})
        .toArray();

    await dbConn.close();

    return resolve(jobs);
  });
}

function updateJob(root, event) {
  return new Promise(async (resolve) => {
    const result = Joi.validate(event.job, jobSchema, {abortEarly: false});

    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    const jobToUpdate = Object.assign({}, result.value);
    delete jobToUpdate._id;

    await dbo
        .collection('jobs')
        .findOneAndUpdate(
            {_id: new ObjectID(result.value._id)},
            {$set: jobToUpdate}
        );

    const jobs = await dbo
        .collection('jobs')
        .find({})
        .toArray();

    await dbConn.close();

    return resolve(jobs);
  });
}

function deleteJob(root, event) {
  return new Promise(async (resolve) => {
    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    await dbo
        .collection('jobs')
        .findOneAndDelete({_id: new ObjectID(event.jobId)});

    const jobs = await dbo
        .collection('jobs')
        .find()
        .toArray();

    await dbConn.close();

    return resolve(jobs);
  });
}

function getResources() {
  return new Promise(async (resolve) => {
    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    const [companies, cities, technologies] = await Promise.all([
      dbo
          .collection('companies')
          .find()
          .toArray(),
      dbo
          .collection('cities')
          .find()
          .toArray(),
      dbo
          .collection('technologies')
          .find()
          .toArray(),
    ]);

    await dbConn.close();

    return resolve({
      cities: cities,
      technologies: technologies,
      companies: companies,
    });
  });
}

function updateGlobal(root, event) {
  return new Promise(async (resolve) => {
    const dbConn = await db();
    const dbo = dbConn.db('dream-job');

    if (event.resources.companies.length) {
      await dbo.collection('companies').insert(event.resources.companies);
    }

    if (event.resources.cities.length) {
      await dbo.collection('cities').insert(event.resources.cities);
    }

    if (event.resources.technologies.length) {
      await dbo.collection('technologies').insert(event.resources.technologies);
    }

    const [companies, cities, technologies] = await Promise.all([
      dbo
          .collection('companies')
          .find()
          .toArray(),
      dbo
          .collection('cities')
          .find()
          .toArray(),
      dbo
          .collection('technologies')
          .find()
          .toArray(),
    ]);

    await dbConn.close();

    return resolve({
      cities: cities,
      technologies: technologies,
      companies: companies,
    });
  });
}

exports.resolvers = {
  Query: {
    getJobs,
    getResources,
  },
  RootMutation: {
    addJob,
    updateJob,
    deleteJob,
    updateGlobal,
  },
};
