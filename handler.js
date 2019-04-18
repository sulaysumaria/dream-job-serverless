const Joi = require('joi');

const { db } = require('./helpers/db');

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
    .required(),
});

// schema for validating user object when adding new user
const jobSchema = Joi.object().keys({
  title: Joi.string()
    .required(),
  companies: Joi.array(),
  cities: Joi.array(),
  technologies: Joi.array(),
  fromDate: Joi.date()
    .required(),
  toDate: Joi.date()
    .required(),
  expectedSalary: Joi.number()
    .required(),
  index: Joi.number(),
  _id: Joi.string()
});

// dummy route to check status of service
async function ping() {
  return new Promise(async (resolve) => {
    try {
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: 'Service is up and running.',
        }),
      });
    } catch (e) {
      console.log(e);
    }
  });
}

// get all users
async function getUsers() {
  return new Promise(async (resolve) => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // get all users
      const users = await dbo
        .collection('users')
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return users
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          users,
          success: true,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}


// get all companies
async function getCompanies() {
  return new Promise(async (resolve) => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // get all companies
      const companies = await dbo
        .collection('companies')
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return companies
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          companies,
          success: true,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}


// get all cities
async function getCities() {
  return new Promise(async (resolve) => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // get all cities
      const cities = await dbo
        .collection('cities')
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return cities
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          cities,
          success: true,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}


// get all technologies
async function getTechnologies() {
  return new Promise(async (resolve) => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // get all technologies
      const technologies = await dbo
        .collection('technologies')
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return technologies
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          technologies,
          success: true,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}


// add companies
async function addCompanies(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new technologies
      await dbo.collection('companies').insert(body);

      let companies = [];
      await dbo.collection("companies").find({}).toArray(function(err, result) {
        if (err) throw err;
        companies = result
      });

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          companies
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}


// add cities
async function addCities(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new user
      await dbo.collection('cities').insert(body);

      let cities = [];
      await dbo.collection("cities").find({}).toArray(function(err, result) {
        if (err) throw err;
        cities = result
      });

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          cities
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}

// add technologies
async function addTechnologies(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new user
      await dbo.collection('technologies').insert(body);

      let technologies = [];
      await dbo.collection("technologies").find({}).toArray(function(err, result) {
        if (err) throw err;
        jobs = result
      });

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          technologies
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}



// add dream job
async function createUser(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new user
      await dbo.collection('users').insert(body);

      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: 'User created',
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}

async function addJob(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new user
      await dbo.collection('jobs').insert(body);

      let jobs = [];
      await dbo.collection("jobs").find({}).toArray(function(err, result) {
        if (err) throw err;
        jobs = result
      });
      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}

// update a single job
async function updateJob(event) {
  return new Promise(async (resolve) => {
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
            message: result.error.details.map((a) => a.message),
          }),
        });
      }

      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // insert new user
      console.log(result.value._id)
      const id = await result.value._id.toString()
      const a = await dbo.collection('jobs').findOneAndReplace({_id: id}, result.value, {returnNewDocument: true});
      console.log(a)

      let jobs = [];
      await dbo.collection("jobs").find({}).toArray(function(err, result) {
        if (err) throw err;
        jobs = result
      });
      // close connection
      await dbConn.close();

      // return response
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
      });
    }
  });
}

// get all jobs
async function getJobs() {
  return new Promise(async (resolve) => {
    try {
      // get connection to mongodb
      const dbConn = await db();

      // get database instance
      const dbo = dbConn.db('dream-job');

      // get all users
      const jobs = await dbo
        .collection('jobs')
        .find()
        .toArray();

      // close db connection
      await dbConn.close();

      // return users
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          jobs,
          success: true,
        }),
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Some error occurred. Please try again later.',
        }),
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
  getJobs
};
