# Koa-Joi-Router Docs Generator V2

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Igor-lkm/koa-joi-router-docs-v2/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Igor-lkm/koa-joi-router-docs-v2/tree/master)

## Why v2?

This project is based on https://github.com/chuyik/koa-joi-router-docs which does not support latest Joi version.

1) This project uses latest `koa-joi-router` package. Also this package uses `joi-to-swagger`.

2) Also we can rename keys, like `nullable` to be `x-nullable`. For [example for redoc](https://redocly.com/docs/api-reference-docs/specification-extensions/x-nullable/#usage)

Example:

```js
    const spec = generator.generateSpec({
      info: {
        title: 'Example API',
        version: '1.1'
      },
      basePath: '/'
    }, undefined, { 'nullable': 'x-nullable' });
```

### Migration from koa-joi-router-docs

No additional action required, it should be possible just to replace older package.

## About the package

A node module for generating [Swagger 2.0](http://swagger.io/) JSON
definitions from existing [koa-joi-router](https://github.com/koajs/joi-router)
routes.

## Preview
<img width="860" alt="code_to_docs" src="http://storage.360buyimg.com/mtd/home/intro-2x_m1495439865552.png">

## Install
```bash
# use npm
npm install koa-joi-router-docs-v2 --save
# use yarn
yarn add koa-joi-router-docs-v2
```

## Example
Visit [example/](./example) folder to see the full example.

## API

### new SwaggerAPI()

Creates a new SwaggerAPI instance.

### swaggerAPI.addJoiRouter(router, options)

Add a joi-router instance to the API. The router should already have all its
routes set up before calling this method (which pulls the route definitions
from the router's `.routes` property).

Options:
- prefix: Prefix to add to Swagger path (use prefix from JoiRouter if not set)

### swaggerAPI.generateSpec(baseSpec, options, renameKeys)

Create a Swagger specification for this API. A base specification should be
provided with an `info` object (containing at least the `title` and `version`
strings) and any other global descriptions.

`baseSpec` example:
```js
{
  info: {
    title: 'Example API',
    version: '1.1'
  },
  basePath: '/'
}
```

`options` example:
- defaultResponses: Custom default responses
```js
  {
    200: {
      description: 'Success'
    }
  }
```

`renameKeys` example:
```js
  { 'nullable': 'x-nullable' }
```