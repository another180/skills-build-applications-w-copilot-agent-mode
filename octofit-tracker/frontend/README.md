# Octofit Tracker Frontend

## API configuration

The frontend uses `VITE_CODESPACE_NAME` to call the API on port `8000` from a GitHub Codespace. Define it in `octofit-tracker/frontend/.env.local` using the Codespace name (not a URL):

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes `VITE_` variables to browser code, so this value is not secret. Restart the Vite dev server after changing `.env.local`. When the variable is unset, the frontend uses `http://localhost:8000` for local development.

The app loads activities, leaderboard entries, teams, users, and workouts from their corresponding `/api/.../` endpoints and accepts both array responses and paginated responses with `results` or `data` fields.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
