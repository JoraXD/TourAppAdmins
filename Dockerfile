# Build frontend
FROM node:18-bullseye AS frontend-build
WORKDIR /app
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Final image
FROM python:3.11-slim
WORKDIR /app
COPY backend ./backend
COPY start.py ./start.py
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
RUN pip install fastapi uvicorn firebase-admin python-dotenv

EXPOSE 8000
CMD ["python", "backend/main_firestore.py"]
