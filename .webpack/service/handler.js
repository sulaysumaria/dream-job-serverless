(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

var _apolloServerLambda = __webpack_require__(3);

var _schema = __webpack_require__(4);

var _resolvers = __webpack_require__(5);

const server = new _apolloServerLambda.ApolloServer({
  typeDefs: _schema.schema,
  resolvers: _resolvers.resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  playground: {
    endpoint: 'http://localhost:5000/graphql'
  },
  tracing: true
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*'
  }
});

// const Joi = require("joi");

// const { db } = require("./helpers/db");
// var ObjectID = require('mongodb').ObjectID;


// // schema for validating user object when adding new user
// const jobSchema = Joi.object().keys({
//   title: Joi.string().required(),
//   companies: Joi.array(),
//   cities: Joi.array(),
//   technologies: Joi.array(),
//   fromDate: Joi.date().required(),
//   toDate: Joi.date().required(),
//   expectedSalary: Joi.number().required(),
//   index: Joi.number(),
//   _id: Joi.string()
// });

// // dummy route to check status of service
// async function ping() {
//   return new Promise(async resolve => {
//     try {
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           message: "Service is up and running."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
// }

// // get all users
// async function getUsers() {
//   return new Promise(async resolve => {
//     try {
//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // get all users
//       const users = await dbo
//         .collection("users")
//         .find()
//         .toArray();

//       // close db connection
//       await dbConn.close();

//       // return users
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           users,
//           success: true
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(JSON.stringify(e));
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: e
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // get global
// async function getGlobal() {
//   return new Promise(async resolve => {
//     try {
//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // get all companies
//       const companies = await dbo
//         .collection("companies")
//         .find()
//         .toArray();

//       const cities = await dbo
//         .collection("cities")
//         .find()
//         .toArray();

//       // get all technologies
//       const technologies = await dbo
//         .collection("technologies")
//         .find()
//         .toArray();

//       // close db connection
//       await dbConn.close();

//       // return companies
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           companies,
//           cities,
//           technologies,
//           success: true
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // update Global
// async function updateGlobal(event) {
//   return new Promise(async resolve => {
//     try {
//       // parse body
//       let body;
//       try {
//         body = JSON.parse(event.body);
//       } catch (e) {
//         body = {};
//       }

//       // validate body
//       const result = body;

//       // return errors if any error
//       if (result.error) {
//         return resolve({
//           statusCode: 400,
//           body: JSON.stringify({
//             message: result.error.details.map(a => a.message)
//           }),
//           headers: {
//             'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//             'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//           }
//         });
//       }

//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       console.log(body);

//       // insert new resources
//       if(body.companies.length) {
//         await dbo.collection("companies").insert(body.companies);
//       }

//       if(body.cities.length) {
//         await dbo.collection("cities").insert(body.cities);
//       }

//       if(body.technologies.length) {
//         await dbo.collection("technologies").insert(body.technologies);
//       }


//       let companies = [];
//       let cities = [];
//       let technologies = [];

//       await dbo
//         .collection("companies")
//         .find({})
//         .toArray(function(err, result) {
//           if (err) throw err;
//           companies = result;
//         });

//       await dbo
//         .collection("cities")
//         .find({})
//         .toArray(function(err, result) {
//           if (err) throw err;
//           cities = result;
//         });

//       await dbo
//         .collection("technologies")
//         .find({})
//         .toArray(function(err, result) {
//           if (err) throw err;
//           technologies = result;
//         });

//       // close connection
//       await dbConn.close();

//       // return response
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           companies,
//           cities,
//           technologies
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // add dream job
// async function createUser(event) {
//   return new Promise(async resolve => {
//     try {
//       // parse body
//       let body;
//       try {
//         body = JSON.parse(event.body);
//       } catch (e) {
//         body = {};
//       }

//       // validate body
//       const result = Joi.validate(body, userSchema, { abortEarly: false });

//       // return errors if any error
//       if (result.error) {
//         return resolve({
//           statusCode: 400,
//           body: JSON.stringify({
//             message: result.error.details.map(a => a.message)
//           }),
//           headers: {
//             'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//             'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//           }
//         });
//       }

//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // insert new user
//       await dbo.collection("users").insert(body);

//       // close connection
//       await dbConn.close();

//       // return response
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           message: "User created"
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// async function addJob(event) {
//   return new Promise(async resolve => {
//     try {
//       // parse body
//       let body;
//       try {
//         body = JSON.parse(event.body);
//       } catch (e) {
//         body = {};
//       }

//       // validate body
//       const result = Joi.validate(body, jobSchema, { abortEarly: false });

//       // return errors if any error
//       if (result.error) {
//         return resolve({
//           statusCode: 400,
//           body: JSON.stringify({
//             message: result.error.details.map(a => a.message)
//           }),
//           headers: {
//             'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//             'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//           }
//         });
//       }

//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // insert new user
//       await dbo.collection("jobs").insert(body);

//       let jobs = [];
//       await dbo
//         .collection("jobs")
//         .find({})
//         .toArray(function(err, result) {
//           if (err) throw err;
//           jobs = result;
//         });
//       // close connection
//       await dbConn.close();

//       // return response
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           jobs
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // update a single job
// async function updateJob(event) {
//   return new Promise(async resolve => {
//     try {
//       // parse body
//       let body;
//       try {
//         body = JSON.parse(event.body);
//       } catch (e) {
//         body = {};
//       }

//       // validate body
//       const result = Joi.validate(body, jobSchema, { abortEarly: false });

//       // return errors if any error
//       if (result.error) {
//         return resolve({
//           statusCode: 400,
//           body: JSON.stringify({
//             message: result.error.details.map(a => a.message)
//           }),
//           headers: {
//             'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//             'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//           }
//         });
//       }

//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // insert new user

//       var jobToUpdate = {};
//       jobToUpdate = Object.assign(jobToUpdate, result.value);
//       delete jobToUpdate._id;
//       const id = await result.value._id.toString();
//       await dbo
//         .collection("jobs")
//         .findOneAndUpdate({ _id: ObjectID(id) }, {$set: jobToUpdate});

//       let jobs = [];
//       await dbo
//         .collection("jobs")
//         .find({})
//         .toArray(function(err, result) {
//           if (err) throw err;
//           jobs = result;
//         });
//       // close connection
//       await dbConn.close();

//       // return response
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           jobs
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // get all jobs
// async function getJobs() {
//   return new Promise(async resolve => {
//     try {
//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       // get all users
//       const jobs = await dbo
//         .collection("jobs")
//         .find()
//         .toArray();

//       // close db connection
//       await dbConn.close();

//       // return users
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           jobs,
//           success: true
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// // delete job
// // get all jobs
// async function deleteJob(event) {
//   return new Promise(async resolve => {
//     try {
//       // get connection to mongodb
//       const dbConn = await db();

//       // get database instance
//       const dbo = dbConn.db("dream-job");

//       const id = await event.pathParameters.id.toString();
//       await dbo
//         .collection("jobs")
//         .findOneAndDelete({ _id: ObjectID(id) });

//       // get all jobs
//       const jobs = await dbo
//         .collection("jobs")
//         .find()
//         .toArray();

//       // close db connection
//       await dbConn.close();

//       // return jobs
//       return resolve({
//         statusCode: 200,
//         body: JSON.stringify({
//           jobs,
//           success: true
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       return resolve({
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Some error occurred. Please try again later."
//         }),
//         headers: {
//           'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//           'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//         }
//       });
//     }
//   });
// }

// module.exports = {
//   ping,
//   getUsers,
//   createUser,
//   addJob,
//   updateJob,
//   deleteJob,
//   getJobs,
//   getGlobal,
//   updateGlobal
// };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
exports.schema = schema;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// add to handler.js
const Joi = __webpack_require__(6);

const { db } = __webpack_require__(7);
var ObjectID = __webpack_require__(1).ObjectID;

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
const promisify = foo => new Promise((resolve, reject) => {
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
    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve) {
        try {
          // get connection to mongodb
          const dbConn = yield db();

          // get database instance
          const dbo = dbConn.db("dream-job");

          // get all users
          const jobs = yield dbo.collection("jobs").find().toArray();

          // close db connection
          yield dbConn.close();

          console.log(jobs);

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

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
  }
};
// eslint-disable-next-line import/prefer-default-export
const resolvers = exports.resolvers = {
  Query: {
    getJobs: () => data.getJobs()
  },
  User: {
    tweets: (obj, args) => data.getPaginatedTweets(obj.handle, args)
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var graphql = __webpack_require__(0);

'use strict';

const MongoClient = __webpack_require__(1).MongoClient;

module.exports.db = () => {
  return MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
};


/***/ })
/******/ ])));