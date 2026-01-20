# Backend Frameworks and Versions

- Node.js (Express): ^4.19.2
- TypeScript: ^4.9.5
- Prisma ORM: ^5.13.0
- Jest (Testing): ^29.7.0
- ESLint: ^9.2.0
- Prettier: ^3.2.5

# Installed Dependencies

- express, cors, dotenv, multer, @prisma/client, swagger-jsdoc, swagger-ui-express
- Dev: @types/*, ts-node, ts-node-dev, ts-jest

# Architecture Patterns

- Domain-Driven Design (DDD): domain, application, presentation, infrastructure (see ManifestoBuenasPracticas.md)
- Layered: domain models, application services, controllers, routes
- Repository pattern (recommended in good practices)

# Project Structure & Major Elements

- src/
  - domain/models: Entity and value object classes (Candidate, Education, etc.)
  - application/services: Business logic (candidateService, positionService, etc.)
  - presentation/controllers: API controllers
  - routes: Express routers (candidateRoutes, positionRoutes)
  - prisma/: schema.prisma, migrations, seed
- api-spec.yaml: OpenAPI 3.0 spec for all endpoints

# Routes & Related Components

- /candidates [POST, GET, PUT]: add, get, update candidate (see candidateController)
- /positions [GET]: list positions (see positionController)
- /positions/:id/candidates [GET]: candidates for a position
- /positions/:id/interviewflow [GET]: interview flow for a position
- /upload [POST]: file upload (multer)

# Style Guides

- ESLint + Prettier (see .eslintrc.js, package.json)
- DDD, SOLID, DRY (see ManifestoBuenasPracticas.md)

# Current Implementation Status

- Core domain models, services, and controllers implemented
- API endpoints for candidates and positions implemented
- Swagger/OpenAPI spec provided
- Data model and ERD in ModeloDatos.md
- Good practices documented in ManifestoBuenasPracticas.md

# See also
- ManifestoBuenasPracticas.md (good practices)
- ModeloDatos.md (data model)
- api-spec.yaml (API spec)
