# Project Structure Overview

## Root
- docker-compose.yml: Docker config for PostgreSQL
- README.md: Project instructions
- LICENSE.md, VERSION
- backend/: Backend API (Node.js, Express, Prisma, TypeScript)
- frontend/: Frontend app (React, TypeScript)
- prompts/: Copilot and documentation prompts

## Backend
- src/
  - domain/models: Entity/value classes (Candidate, Education, etc.)
  - application/services: Business logic
  - presentation/controllers: API controllers
  - routes: Express routers
  - prisma/: schema, migrations, seed
- api-spec.yaml: OpenAPI 3.0 spec
- ManifestoBuenasPracticas.md: DDD, SOLID, DRY, style guide
- ModeloDatos.md: Data model, ERD

## Frontend
- src/
  - components/: UI components (dashboard, forms, cards, columns, etc.)
  - services/: API abstraction
  - App.js: Router
  - index.tsx: Entry
- public/: Static assets

# See also
- copilot-backend.md
- copilot-frontend.md
