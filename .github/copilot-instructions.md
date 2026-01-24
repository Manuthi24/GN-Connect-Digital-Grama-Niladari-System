# Copilot Instructions for GN-Connect

## Project Overview
- **Full-stack app** with a React frontend (`frontend/`) and Node.js/Express backend (`BACKEND/`).
- **Frontend** uses Create React App, React Router, Axios for API calls, FontAwesome for icons, and jsPDF for PDF generation.
- **Backend** uses Express, Mongoose (MongoDB), and CORS. Entry point: `BACKEND/app.js`.
- **Data flow:** Frontend communicates with backend via REST APIs (see `BACKEND/Routes/`).

## Key Directories & Files
- `frontend/src/Components/` — React components, organized by feature (e.g., `AppealObjection/`, `Home/`, `Welfare/`).
- `BACKEND/Controllers/` — Express route handlers (business logic).
- `BACKEND/Routes/` — API route definitions.
- `BACKEND/Model/` — Mongoose models for MongoDB.
- `BACKEND/Middleware/` — Custom Express middleware (e.g., file upload logic).

## Developer Workflows
- **Frontend:**
  - `npm start` — Start dev server (http://localhost:3000)
  - `npm run build` — Production build
  - `npm test` — Run tests (Jest/React Testing Library)
- **Backend:**
  - `npm start` (in `BACKEND/`) — Start backend with nodemon (auto-reloads on changes)

## Project-Specific Patterns
- **API calls:** Use Axios in frontend, typically in component files or utility functions.
- **Component structure:** Each feature has its own folder under `Components/`.
- **PDF/Print:** Use `jspdf` and `react-to-print` for document generation in frontend.
- **File uploads:** Handled by custom middleware in `BACKEND/Middleware/upload.js`.
- **Routing:**
  - Frontend: React Router (`react-router-dom`)
  - Backend: Express routers in `BACKEND/Routes/`
- **Models:** All MongoDB schemas in `BACKEND/Model/`.

## Integration Points
- **Frontend <-> Backend:** All data exchange via REST endpoints defined in backend `Routes/`.
- **Uploads:** Files saved to `BACKEND/uploads/` via backend API.

## Conventions & Tips
- **Naming:** Use PascalCase for React components, camelCase for variables/functions.
- **No custom test setup:** Uses default Create React App/Jest config.
- **No monorepo tooling:** Frontend and backend are managed separately.
- **Start both servers for full-stack dev:** Run frontend and backend in parallel for local development.

## Examples
- See `frontend/src/Components/AppealObjection/AppealObjection.js` for a typical API-consuming component.
- See `BACKEND/Controllers/AppealObjectionController.js` for backend business logic.
- See `BACKEND/Routes/AppealObjectionRoutes.js` for API route wiring.

---

Update this file if you introduce new architectural patterns, workflows, or conventions.
