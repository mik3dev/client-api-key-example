# Client API Key Management

A NestJS application for managing client applications and their API keys.

## Description

This project provides a robust API for managing client applications and their associated API keys. It allows you to register new clients, list existing clients, update client information, and regenerate API keys when needed.

## Features

- **Client Management**: Create, read, update, and delete client records
- **API Key Generation**: Automatic generation of unique API keys for clients
- **API Key Authentication**: Secure routes with API key validation
- **API Documentation**: Swagger UI for easy API exploration and testing
- **MongoDB Integration**: Persistent storage of client data
- **Validation**: Input validation for all API endpoints

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Swagger](https://swagger.io/) - API documentation
- [class-validator](https://github.com/typestack/class-validator) - Validation library

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or remote instance)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd client-api-key
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/client-api-key
PORT=3000
API_PREFIX=api/v1
SWAGGER_PREFIX=docs/v1
SWAGGER_ENABLED=true
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Documentation

When `SWAGGER_ENABLED` is set to `true`, Swagger documentation is available at:

```
http://localhost:3000/docs/v1
```

## API Endpoints

| Method | Endpoint                               | Description                     |
| ------ | -------------------------------------- | ------------------------------- |
| POST   | /api/v1/clients                        | Create a new client             |
| GET    | /api/v1/clients                        | Get all clients                 |
| GET    | /api/v1/clients/:id                    | Get a client by ID              |
| GET    | /api/v1/clients/api-key/:apiKey        | Get a client by API key         |
| PATCH  | /api/v1/clients/:id                    | Update a client                 |
| DELETE | /api/v1/clients/:id                    | Delete a client                 |
| POST   | /api/v1/clients/:id/regenerate-api-key | Regenerate API key for a client |
| GET    | /api/v1/protected                      | Example protected route         |

## Client Schema

Each client has the following properties:

- **name**: The name of the client application
- **apiKey**: A unique API key for the client
- **description**: A description of the client application
- **responsibleName**: The name of the person responsible for the client
- **responsibleEmail**: The email of the person responsible for the client
- **url**: The URL of the client application

## API Key Authentication

The application includes an API key authentication system that can be used to protect routes. API keys can be provided in three ways:

1. **Bearer Token**: Include the API key in the Authorization header as a Bearer token
   ```
   Authorization: Bearer your-api-key
   ```

2. **Custom Header**: Include the API key in the X-API-Key header
   ```
   X-API-Key: your-api-key
   ```

3. **Query Parameter**: Include the API key as a query parameter
   ```
   /api/v1/protected?apiKey=your-api-key
   ```

### Using API Key Authentication in Controllers

To protect a route with API key authentication, use the `@ApiKeyAuth()` decorator:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiKeyAuth } from '../common/decorators/api-key-auth.decorator';
import { GetClient } from '../common/decorators/get-client.decorator';
import { Client } from '../clients/schemas/client.schema';

@Controller('example')
export class ExampleController {
  @Get()
  @ApiKeyAuth()
  getProtectedResource(@GetClient() client: Client) {
    return `Hello ${client.name}!`;
  }
}
```

The `@GetClient()` decorator provides access to the authenticated client in your controller methods.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
