import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API documentation for your Node.js application",
    },
  },
  apis: ["./src/routes/*.ts", "./src/modules/auth/auth.route.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };
