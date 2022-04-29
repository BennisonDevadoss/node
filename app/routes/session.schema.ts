const signinSchema = {
  schema: {
    body: {
      type: "object",
      required: ["user"],
      properties: {
        user: {
          type: "object",
          required: ["email, password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    response: {
      200: {
        description: "Successfull response",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      422: {
        description: "validation error",
        type: "object",
        properties: {
          errors: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

const signoutSchema = {
  schema: {
    headers: {
      description: "Request header",
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properites: {
          message: { type: "string" },
        },
      },
      422: {
        description: "Validation errors",
        type: "object",
        properties: {
          erors: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

export { signinSchema, signoutSchema };
