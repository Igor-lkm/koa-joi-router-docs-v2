const { SwaggerAPI } = require('../')
const Router = require('koa-joi-router')
const Joi = Router.Joi

/**
 * Define routes
 */
const router = Router()

// Get /signup
router.get('/signup', {
  meta: {
    swagger: {
      summary: 'User Signup',
      description: 'Signup with username and password.',
      tags: ['users']
    }
  },
  validate: {
    type: 'json',
    body: {
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().alphanum().min(6).max(30).required()
    },
    output: {
      200: {
        body: {
          userId: Joi.string().description('Newly created user id')
        }
      }
    }
  },
  handler: async ctx => {
    ctx.body = {
      userId: 'signup'
    }
  }
})

// Get /user/:_id
router.get('/user/:_id', {
  meta: {
    swagger: {
      summary: 'Get User Info',
      description: `Note: \nSensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.`,
      tags: ['users']
    }
  },
  validate: {
    path: Joi.object().keys({
      _id: Joi.string().alphanum().max(24).description('User id').required()
    }),
    output: {
      '200-299': {
        body: Joi.object({
          userId: Joi.string().description('User id'),
          username: Joi.string().description('User name')
        }).options({
          allowUnknown: true
        }).description('User object')
      }
    }
  },
  handler: async ctx => {
    console.log('getUser...')
    ctx.body = {
      userId: ctx.params._id,
      username: ctx.params._id
    }
  }
})

/**
 * Generate Swagger json from the router object
 */
const generator = new SwaggerAPI()
generator.addJoiRouter(router)

const spec = generator.generateSpec({
  info: {
    title: 'Example API',
    description: 'API for creating and editing examples.',
    version: '1.1'
  },
  basePath: '/api',
  tags: [{
    name: 'users',
    description: `A User represents a person who can login 
      and take actions subject to their granted permissions.`
  }],
})

/**
 * return Swagger json
 */
router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ')
})

/**
 * return API html
 */
router.get('/apiDocs', async ctx => {
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example API</title>
  </head>
  <body>
    <redoc spec-url='/_api.json' lazy-rendering></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
  </html>
  `
})

module.exports = router