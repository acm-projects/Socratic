import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Socratic AI Tutor API',
      version: '1.0.0',
      description: 'API for accessing Socratic AI Tutor chat history stored in PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/pages/api/**/*.ts'], 
};

export const spec = swaggerJsdoc(options);
