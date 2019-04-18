const Joi = require("joi");

const { db } = require("./helpers/db");
var ObjectID = require('mongodb').ObjectID;

// schema for validating user object when adding new user
const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(5)
    .max(30)
    .required(),
  lastName: Joi.string()
    .min(5)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required()
});

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

// dummy route to check status of service
async function ping() {
  return new Promise(async resolve => {
    try {
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: "Service is up and running."
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}

// get all users
async function getUsers() {
  return new Promise(async resolve => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // get all users
      const users = await dbo
        .collection("users")
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return users
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          users,
          success: true
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: e
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// get global
async function getGlobal() {
  return new Promise(async resolve => {
    try {
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
        statusCode: 200,
        body: JSON.stringify({
          companies,
          cities,
          technologies,
          success: true
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// update Global
async function updateGlobal(event) {
  return new Promise(async resolve => {
    try {
      // parse body
      let body;
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        body = {};
      }

      // validate body
      const result = body;

      // return errors if any error
      if (result.error) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({
            message: result.error.details.map(a => a.message)
          }),
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          }
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      console.log(body);

      // insert new resources
      if(body.companies.length) {
        await dbo.collection("companies").insert(body.companies);
      }

      if(body.cities.length) {
        await dbo.collection("cities").insert(body.cities);
      }

      if(body.technologies.length) {
        await dbo.collection("technologies").insert(body.technologies);
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
        statusCode: 200,
        body: JSON.stringify({
          companies,
          cities,
          technologies
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// add dream job
async function createUser(event) {
  return new Promise(async resolve => {
    try {
      // parse body
      let body;
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        body = {};
      }

      // validate body
      const result = Joi.validate(body, userSchema, { abortEarly: false });

      // return errors if any error
      if (result.error) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({
            message: result.error.details.map(a => a.message)
          }),
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          }
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // insert new user
      await dbo.collection("users").insert(body);

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: "User created"
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

async function addJob(event) {
  return new Promise(async resolve => {
    try {
      // parse body
      let body;
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        body = {};
      }

      // validate body
      const result = Joi.validate(body, jobSchema, { abortEarly: false });

      // return errors if any error
      if (result.error) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({
            message: result.error.details.map(a => a.message)
          }),
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          }
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      // insert new user
      await dbo.collection("jobs").insert(body);

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
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// update a single job
async function updateJob(event) {
  return new Promise(async resolve => {
    try {
      // parse body
      let body;
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        body = {};
      }

      // validate body
      const result = Joi.validate(body, jobSchema, { abortEarly: false });

      // return errors if any error
      if (result.error) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({
            message: result.error.details.map(a => a.message)
          }),
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          }
        });
      }

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
        .findOneAndUpdate({ _id: ObjectID(id) }, {$set: jobToUpdate});

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
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// get all jobs
async function getJobs() {
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

      // return users
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs,
          success: true
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

// delete job
// get all jobs
async function deleteJob(event) {
  return new Promise(async resolve => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db("dream-job");

      const id = await event.pathParameters.id.toString();
      await dbo
        .collection("jobs")
        .findOneAndDelete({ _id: ObjectID(id) });

      // get all jobs
      const jobs = await dbo
        .collection("jobs")
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return jobs
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs,
          success: true
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

module.exports = {
  ping,
  getUsers,
  createUser,
  addJob,
  updateJob,
  deleteJob,
  getJobs,
  getGlobal,
  updateGlobal
};
