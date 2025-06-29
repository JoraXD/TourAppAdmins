# Tour Guide Manager

This project combines a React frontend with Firebase Cloud Functions to manage excursions, users, and customers.

## Deployment

1. Install the Firebase CLI and initialize your Firebase project.
2. Update `.firebaserc` with your Firebase project ID.
3. Build the frontend:
   ```bash
   cd frontend && npm install && npm run build
   ```
4. Deploy functions and hosting:
   ```bash
   firebase deploy
   ```

The API is exposed under `/api` and the React app is served via Firebase Hosting.
