# Frontend Frameworks and Versions

- React: ^18.3.1
- React Router DOM: ^6.23.1
- Bootstrap: ^5.3.3, react-bootstrap: ^2.10.2
- TypeScript: ^4.9.5
- react-beautiful-dnd, react-dnd: drag-and-drop
- Jest, @testing-library/*: testing

# Installed Dependencies

- See frontend/package.json for full list
- Key: react, react-dom, react-router-dom, bootstrap, react-bootstrap, react-beautiful-dnd, react-dnd, react-datepicker, dotenv

# Architecture Patterns

- Component-based (React)
- Container/presentational split (dashboard, forms, cards, columns)
- Service abstraction for API calls (services/candidateService.js)

# Project Structure & Major Elements

- src/
  - components/: AddCandidateForm, CandidateCard, CandidateDetails, FileUploader, PositionDetails, Positions, RecruiterDashboard, StageColumn
  - services/: candidateService.js (API abstraction)
  - App.js: main router, route definitions
  - index.tsx: entry point
  - public/: static assets

# Routes & Related Components

- /: RecruiterDashboard
- /add-candidate: AddCandidateForm
- /positions: Positions (list)
- /positions/:id: PositionDetails (with drag-and-drop stages, candidate details)

# Style Guides

- Bootstrap + react-bootstrap for UI
- ESLint via react-scripts
- Follows DDD/clean code principles (see backend/ManifestoBuenasPracticas.md)

# Current Implementation Status

- Main dashboard, add candidate, and position management implemented
- Drag-and-drop for candidate stages (react-beautiful-dnd)
- File upload for CVs (FileUploader, backend /upload)
- API integration with backend
- TypeScript support

# See also
- backend/ManifestoBuenasPracticas.md (good practices)
- backend/api-spec.yaml (API spec)
- backend/ModeloDatos.md (data model)
