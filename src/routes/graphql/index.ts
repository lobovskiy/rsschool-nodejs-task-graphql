import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { DataLoaders } from './data-loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { prisma } = fastify;
      const dataLoaders = new DataLoaders(prisma);
      const validationErrors = validate(schema, parse(req.body.query), [depthLimit(5)]);

      if (validationErrors.length) {
        return { errors: validationErrors };
      }

      return await graphql({
        schema: schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma, dataLoaders },
      });
    },
  });
};

export default plugin;
