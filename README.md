# Koa-Joi-Router Docs Generator

This project is based on [paul42/joi-router-swagger-docs](https://github.com/paul42/joi-router-swagger-docs).

A node module for generating [Swagger 2.0](http://swagger.io/) JSON
definitions from existing [koa-joi-router](https://github.com/koajs/joi-router)
routes.

Aiming to be a replacement for
[koa-resourcer-docs](https://github.com/koajs/resourcer-docs) which can
take advantage of various Swagger 2.0 tools for generating client libraries,
test suites, AWS Lambda/serverless, etc.

## Preview
![Intro](http://storage.360buyimg.com/mtd/home/intro_min1495437867684.png)

## Example
Visit [example/](./blob/master/example) folder to see the full example.

```js
const SwaggerAPI = require('joi-router-swagger-docs').SwaggerAPI
const Router = require('koa-joi-router')
const Joi = Router.Joi

// Define the routes using `koa-joi-router`
const router = Router()
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

router.get('/user/:_id', {
  meta: {
    swagger: {
      summary: 'Get User Info',
      description: `
Note: \n
Sensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.
      `,
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
        }).description('User Object')
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

// Generate Swagger JSON from the router object
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

router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ')
})

router.get('/apiDocs', async ctx => {
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example API</title>
    <style>
      api-logo {
        background: #000;
        background-image: linear-gradient(0deg, #263238 0%, #000 100%);
      }
      api-logo > img {
        padding: 20px;
        width: 80% !important;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='/_api.json' lazy-rendering></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
  </html>
  `
})
```

## API

### new SwaggerAPI()

Creates a new SwaggerAPI instance.

### swaggerAPI.addJoiRouter(router, options)

Add a joi-router instance to the API. The router should already have all its
routes set up before calling this method (which pulls the route definitions
from the router's `.routes` property).

Options:
- prefix: Prefix to add to Swagger path

### swaggerAPI.generateSpec(baseSpec)

Create a Swagger specification for this API. A base specification should be
provided with an `info` object (containing at least the `title` and `version`
strings) and any other global descriptions.

## Acknowledgements

We are grateful to the authors of existing related projects for their ideas and collaboration:

---

# Donation

If you find this project useful, you can buy us a cup of coffee:    

<a href="https://www.paypal.me/chuyik" target="blank">
<img width="200" src="https://storage.360buyimg.com/mtd/home/donate_paypal_min1495016435786.png" alt="">
</a><br>     

<img width="650" src="https://storage.360buyimg.com/mtd/home/donate_cn1495017701926.png" alt="">

## Acknowledgements
We are grateful to the authors of existing related projects for their ideas and collaboration:

- [@paul42](https://github.com/paul42/joi-router-swagger-docs)
- [@pebble](https://github.com/pebble/joi-router-swagger-docs)

## Contributors
[![chuyik](https://avatars2.githubusercontent.com/u/6262943?v=3&s=120)](https://github.com/chuyik) |
:---:|
[chuyik](https://github.com/chuyik) |