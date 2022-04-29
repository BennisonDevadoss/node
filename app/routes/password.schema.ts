const sendOtpSchema = {
  schema: {
    body: {
      type: "object",
      required: ["user"],
      properties: {
        user: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string" },
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
        description: "Validation errors",
        type: "object",
        properties: {
          errors: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

const resetPasswordSchema = {
  schema: {
    body: {
      type: "object",
      required: ["user"],
      properties: {
        user: {
          type: "object",
          required: ["password_token", "password", "password_confirmation"],
          properties: {
            password_token: { type: "string" },
            password: { type: "string" },
            password_confirmation: { type: "string" },
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
        description: "Validation Error",
        type: "object",
        properties: {
          errors: { type: "string", items: { type: "string" } },
        },
      },
    },
  },
};

export { sendOtpSchema, resetPasswordSchema };
