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

## Deploying to Yandex Cloud

The repository includes a `Dockerfile` for building a container image with the
FastAPI backend and prebuilt React frontend.

1. Build the Docker image locally:
   ```bash
   docker build -t tour-guide-app .
   ```
2. Push the image to Yandex Container Registry (replace `<registry-id>` with your registry):
   ```bash
   docker tag tour-guide-app cr.yandex/<registry-id>/tour-guide-app:latest
   docker push cr.yandex/<registry-id>/tour-guide-app:latest
   ```
3. Create a Serverless Container:
   ```bash
   yc serverless container create \
     --name=tour-guide \
     --image=cr.yandex/<registry-id>/tour-guide-app:latest \
     --memory=512M --cores=1 \
     --service-account-id=<service-account-id>
   ```
4. Attach a public HTTP trigger to access the app over the Internet.

Provide the path to your Firebase service account JSON via the
`FIREBASE_CREDENTIALS` environment variable when creating the container.
