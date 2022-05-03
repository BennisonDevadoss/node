const verifyOtpSchema = {
  schema: {
    body: {
      body: {
        type: "object",
        required: ["user"],
        properties: {
          user: {
            type: "object",
            required: ["otp", "email"],
            properties: {
              otp: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
    response: {
      headers: {
        description: "response header",
        type: "object",
        properties: {
          Authorzation: { type: "string" },
        },
      },
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "number" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          created_at: { type: "string" },
          updated_at: { type: "string" },
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

export { verifyOtpSchema };
