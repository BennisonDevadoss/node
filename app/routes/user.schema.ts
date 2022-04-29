const createUserSchema = {
  schema: {
    headers: {
      description: 'Request header',
      type: 'object',
      required: ['Authorization'],
      properties: {
        Authorization: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: ['user'],
      properties: {
        user: {
          type: 'object',
          required: ['name', 'email', 'role'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            organization_id: { type: 'string' },
          },
        },
      },
    },
    response: {
      headers: {
        description: 'Response header',
        type: 'object',
        required: ['Authorization'],
        properties: {
          Authorization: { type: 'string' },
        },
      },
      201: {
        description: 'successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' },
          organization_id: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
        },
      },
      422: {
        description: 'Validation errors',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
      500: {
        description: 'Something went to wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

const updateUserSchema = {
  schema: {
    headers: {
      description: 'Request header',
      type: 'object',
      required: ['Authorization'],
      properties: {
        Authorization: { type: 'string' },
      },
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      required: ['user'],
      properties: {
        user: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
      },
    },
    response: {
      headers: {
        description: 'Response header',
        type: 'object',
        required: ['Authorization'],
        properties: {
          Authorization: { type: 'string' },
        },
      },
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' },
          organzation_id: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
        },
      },
      422: {
        description: 'Validation errors',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
      500: {
        description: 'something went to wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

const deleteUserSchema = {
  schema: {
    headers: {
      description: 'Request header',
      type: 'object',
      required: ['Authorization'],
      properties: {
        Authorization: { type: 'string' },
      },
    },
    querystring: {
      type: 'object',
      required: ['ids'],
      properties: {
        ids: { type: 'number' },
      },
    },
    response: {
      headers: {
        description: 'Response header',
        type: 'object',
        required: ['Authorization'],
        properties: {
          Authorization: { type: 'string' },
        },
      },
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      500: {
        description: 'Something went to wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

export { createUserSchema, updateUserSchema, deleteUserSchema };
