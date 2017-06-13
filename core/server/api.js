/* Copyright 2017 Apinf Oy
 This file is covered by the EUPL license.
 You may obtain a copy of the licence at
 https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor contributed packages imports
import { Restivus } from 'meteor/nimble:restivus';

const ApiV1 = new Restivus({
  apiPath: 'rest',
  version: 'v1',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  useDefaultAuth: true,
  prettyJson: true,
  enableCors: true,
});

const UserFields = {};

UserFields.params = {
  company: {
    name: 'company',
    in: 'body',
    description: 'Company name of user',
    required: true,
    type: 'string',
  },
  email: {
    name: 'email',
    in: 'body',
    description: 'Email address for user',
    required: true,
    type: 'string',
  },
  limit: {
    name: 'limit',
    in: 'query',
    description: 'Maximum number of records to return in query.',
    required: false,
    type: 'integer',
    format: 'int32',
    minimum: 0,
    maximum: 50,
  },
  optionalSearch: {
    name: 'q',
    in: 'query',
    description: 'An optional search string for looking up inventory.',
    required: false,
    type: 'string',
  },
  organizationId: {
    name: 'id',
    in: 'path',
    description: 'ID of Organization',
    required: false,
    type: 'string',
  },
  password: {
    name: 'password',
    in: 'body',
    description: 'Password for user',
    required: true,
    type: 'string',
  },
  skip: {
    name: 'skip',
    in: 'query',
    description: 'Number of records to skip for pagination.',
    required: false,
    type: 'integer',
    format: 'int32',
    minimum: 0,
  },
  since: {
    name: 'since',
    in: 'path',
    description: 'Time frame in days',
    required: true,
    type: 'integer',
    format: 'int32',
    minimum: 1,
  },
  sortBy: {
    name: 'sort_by',
    in: 'query',
    description: 'Criteria for sort ',
    required: false,
    type: 'string',
  },
  userId: {
    name: 'id',
    in: 'path',
    description: 'ID of User',
    required: true,
    type: 'string',
  },
  userName: {
    name: 'username',
    in: 'body',
    description: 'Username',
    required: true,
    type: 'string',
  },
};

// Add Restivus Swagger configuration - meta, tags, params, definitions
ApiV1.swagger = {
  meta: {
    swagger: '2.0',
    info: {
      description: 'APinf is open source API management and catalog. ',
      version: '1.0.0',
      title: 'Admin API',
    },
    paths: {
      '/users': {
        getAll: {
          description: 'Returns: For Admin: all users data. For non-admin: only own data.',
          parameters: [
            UserFields.params.optionalSearch,
            UserFields.params.organizationId,
            UserFields.params.skip,
            UserFields.params.limit,
            UserFields.params.sortBy,
          ],
          responses: {
            200: {
              description: 'success',
            },
            400: {
              description: 'Bad query parameters',
            },
          },
        },

        get: {
          description: 'Returns user data with given ID.',
          parameters: {
            name: 'id',
            in: 'path',
            description: 'ID of User',
            required: true,
            type: 'string',
          },

          responses: {
            200: {
              description: 'Data of identified user.',
            },
            403: {
              description: 'User does not have permission.',
            },
            404: {
              description: 'No user found with given UserID.',
            },
          },
        },
        post: {
          description: 'Adds a new user. On success, returns newly added object.',
          parameters: [
            UserFields.params.userId,
            UserFields.params.userName,
            UserFields.params.email,
            UserFields.params.password,
          ],
          responses: {
            201: {
              description: 'User successfully added',
            },
            400: {
              description: 'Invalid input, object invalid',
            },
            401: {
              description: 'Authentication is required',
            },
            409: {
              description: 'User already exists',
            },
          },
          security: [
            {
              userSecurityToken: [],
              userId: [],
            },
          ],
          delete: {
            description: 'Deletes the identified User.',
            parameters: [
              UserFields.params.userId,
            ],
            responses: {
              200: {
                description: 'User deleted.',
              },
              400: {
                description: 'Invalid input, invalid object',
              },
              401: {
                description: 'Authentication is required',
              },
              403: {
                description: 'User does not have permission',
              },
              404: {
                description: 'User not found',
              },
            },
            security: [
              {
                userSecurityToken: [],
                userId: [],
              },
            ],
            put: {
              description: 'Update a User',
              parameters: [
                UserFields.params.userId,
                UserFields.params.userName,
                UserFields.params.company,
                UserFields.params.password,
              ],
              responses: {
                200: {
                  description: 'User successfully updated.',
                },
                401: {
                  description: 'Authentication is required',
                },
                403: {
                  description: 'User does not have permission',
                },
                404: {
                  description: 'No user found with given UserID',
                },
              },
              security: [
                {
                  userSecurityToken: [],
                  userId: [],
                },
              ],

            },

          },
        },
      },
      '/users/updates': {
        get: {
          description: 'Returns users, who are created in given timeframe',
          parameters: [
            UserFields.params.since,
            UserFields.params.organizationId,
            UserFields.params.skip,
            UserFields.params.limit,
          ],
          responses: {
            200: {
              description: 'success',
            },
            400: {
              description: 'Bad query parameters',
            },
          },
        },

      },

    },
    securityDefinitions: {
      userSecurityToken: {
        in: 'header',
        name: 'X-Auth-Token',
        type: 'apiKey',
      },
      userId: {
        in: 'header',
        name: 'X-User-Id',
        type: 'apiKey',
      },
    },
  },
  tags: {
    api: 'APIs',
    organization: 'Organizations',
    users: 'Users',
  },
  params: {
    api: {
      name: 'api',
      in: 'body',
      description: 'Data for adding or editing API',
      schema: {
        $ref: '#/definitions/api',
      },
    },
    apiId: {
      name: 'id',
      in: 'path',
      description: 'ID of API',
      required: true,
      type: 'string',
    },
    company: {
      name: 'company',
      in: 'body',
      description: 'Company name of user',
      required: true,
      type: 'string',
    },
    email: {
      name: 'email',
      in: 'body',
      description: 'Email address for user',
      required: true,
      type: 'string',
    },
    lifecycle: {
      name: 'lifecycle',
      in: 'query',
      description: 'Limit the listing based on lifecycle status of APIs.',
      required: false,
      type: 'string',
      enum: ['design', 'development', 'testing', 'production', 'deprecated'],
    },
    limit: {
      name: 'limit',
      in: 'query',
      description: 'Maximum number of records to return in query.',
      required: false,
      type: 'integer',
      format: 'int32',
      minimum: 0,
      maximum: 50,
    },
    optionalSearch: {
      name: 'q',
      in: 'query',
      description: 'An optional search string for looking up inventory.',
      required: false,
      type: 'string',
    },
    organization: {
      name: 'organization',
      in: 'body',
      description: 'Data for adding or editing Organization',
      schema: {
        $ref: '#/definitions/organization',
      },
    },
    organizationApi: {
      name: 'organization',
      in: 'query',
      description: 'An optional organization id will limit results to the given organization.',
      required: false,
      type: 'string',
    },
    organizationId: {
      name: 'id',
      in: 'path',
      description: 'ID of Organization',
      required: true,
      type: 'string',
    },
    password: {
      name: 'password',
      in: 'body',
      description: 'Password for user',
      required: true,
      type: 'string',
    },
    since: {
      name: 'since',
      in: 'path',
      description: 'Time frame in days',
      required: true,
      type: 'integer',
      format: 'int32',
      minimum: 1,
    },
    userId: {
      name: 'id',
      in: 'path',
      description: 'ID of User',
      required: true,
      type: 'string',
    },
    userName: {
      name: 'username',
      in: 'body',
      description: 'Username',
      required: true,
      type: 'string',
    },
    skip: {
      name: 'skip',
      in: 'query',
      description: 'Number of records to skip for pagination.',
      required: false,
      type: 'integer',
      format: 'int32',
      minimum: 0,
    },
  },
  definitions: {
    // The schema defining the type used for the body parameter.
    api: {
      required: ['name', 'url'],
      properties: {
        name: {
          type: 'string',
          example: 'My REST API',
        },
        description: {
          type: 'string',
          example: 'My REST API description',
        },
        url: {
          type: 'string',
          format: 'url',
          example: 'https://my.rest.api.com/v1',
        },
        lifecycleStatus: {
          type: 'string',
          enum: ['design', 'development', 'testing', 'production', 'deprecated'],
        },
      },
    },
    organization: {
      required: ['name', 'url'],
      properties: {
        name: {
          type: 'string',
          example: 'Company',
        },
        description: {
          type: 'string',
          example: 'Description about company',
        },
        url: {
          type: 'string',
          format: 'url',
          example: 'https://organization.com',
        },
        contact_name: {
          type: 'string',
          description: 'Name of company manager',
          example: 'David Bar',
        },
        contact_phone: {
          type: 'string',
          description: 'Phone number of company manager',
          example: '+7 000 000 00 00',
        },
        contact_email: {
          type: 'string',
          format: 'email',
          description: 'E-mail address of company manager',
          example: 'company-mail@gmail.com',
        },
        facebook: {
          type: 'string',
          format: 'url',
          description: 'Link to Facebook',
          example: 'http://url.com',
        },
        twitter: {
          type: 'string',
          format: 'url',
          description: 'Link to Twitter',
          example: 'http://url.com',
        },
        instagram: {
          type: 'string',
          format: 'url',
          description: 'Link to Instagram',
          example: 'http://url.com',
        },
        linkedin: {
          type: 'string',
          format: 'url',
          description: 'Link to Linked In',
          example: 'http://url.com',
        },
      },
    },
  },


};

// Generate Swagger to route /rest/v1/swagger.json
ApiV1.addSwagger('swagger.json');

export default ApiV1;
