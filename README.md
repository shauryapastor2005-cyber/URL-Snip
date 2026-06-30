# URL Snip

A full-stack URL shortener built using **Node.js, Express, MongoDB, React, and Docker**. The application allows users to generate compact Base62-encoded short URLs, create custom aliases, configure link expiration, and view click analytics through a simple web interface.

**Live Application:** https://url-shortener-3v52pt8eq-invariant1.vercel.app/

**Backend API:** https://url-shortener-backend-fhbx.onrender.com

> **Note:** The backend is hosted on Render's free tier. If the service has been idle, the first request may take 30–60 seconds while Render wakes up the server.

---
```text
## Features

- Shorten any valid HTTP/HTTPS URL.
- Generate sequential Base62-encoded short IDs without using external ID-generation libraries.
- Create custom aliases for shortened URLs.
- Configure optional link expiration.
- Automatically redirect to the original URL.
- Track every redirect.
- View analytics including total clicks, first visit, last visit, clicks today, and visit history.
- Centralized error handling with appropriate HTTP status codes.
- Dockerized frontend and backend.
- Deployed using Vercel and Render.

---
```
## Architecture

```text
                    React Frontend
                           │
                        Axios API
                           │
                           ▼
                  Express REST API
                           │
                    Express Router
                           │
                    Controllers
                           │
                    Mongoose Models
                           │
                           ▼
                    MongoDB Atlas
```

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- Docker

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Docker
- Nginx

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```text
url-shortener/
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── connectDB.js
│   ├── constants
│   │   └── index.js
│   ├── controllers
│   │   └── url.controller.js
│   ├── index.js
│   ├── models
│   │   ├── counter.model.js
│   │   └── url.model.js
│   ├── package-lock.json
│   ├── package.json
│   └── routes
│       └── url.router.js
└── frontend
    ├── Dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── favicon.svg
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   │   ├── AnalyticsForm.jsx
    │   │   ├── AnalyticsResult.jsx
    │   │   ├── ErrorMessage.jsx
    │   │   ├── Loader.jsx
    │   │   ├── ResultCard.jsx
    │   │   └── UrlForm.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   └── Home.jsx
    │   └── services
    │       └── urlService.js
    └── vite.config.js
```

---

## Base62 ID Generation

Instead of relying on packages such as `nanoid`, this project implements sequential Base62 encoding from scratch.

1. A MongoDB counter stores the latest sequence number.
2. Every new URL receives the next sequence value.
3. The numeric value is converted into a Base62 string using the character set below.

```text
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
```

This produces compact, sequential, and unique short URLs while demonstrating the underlying encoding algorithm.

---

## Analytics

Every redirect records a timestamp in the database.

The analytics endpoint computes the following values dynamically from the stored visit history.

- Total Clicks
- First Visit
- Last Visit
- Clicks Today
- Complete Visit History

---

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:shauryapastor2005-cyber/url-shortener.git
cd url-shortener
```

### 2. Backend Setup

Move into the backend directory and install the dependencies.

```bash
cd backend
npm install
cp .env.example .env
```

Configure the environment variables.

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

Start the backend server.

```bash
npm run dev
```

The backend will be available at:

```
http://localhost:8000
```

### 3. Frontend Setup

Open another terminal and move into the frontend directory.

```bash
cd frontend
npm install
cp .env.example .env
```

Configure the frontend environment variables.

```env
VITE_API_URL=http://localhost:8000
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## Environment Variables

### Backend

| Variable      | Description                     |
| ------------- | ------------------------------- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT`        | Backend server port             |
| `CORS_ORIGIN` | Allowed frontend origin         |

### Frontend

| Variable       | Description     |
| -------------- | --------------- |
| `VITE_API_URL` | Backend API URL |

---

## Docker

### Backend

Build the Docker image.

```bash
cd backend
docker build -t url-shortener-backend .
```

Run the container.

```bash
docker run -p 8000:8000 --env-file .env url-shortener-backend
```

### Frontend

Build the Docker image.

```bash
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:8000 -t url-shortener-frontend .
```

Run the container.

```bash
docker run -p 5173:80 url-shortener-frontend
```

---

## API Endpoints

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/url`                | Create a short URL                 |
| GET    | `/:shortId`           | Redirect to the original URL       |
| GET    | `/analytics/:shortId` | Retrieve analytics for a short URL |

### HTTP Response Codes

| Status Code | Description              |
| ----------- | ------------------------ |
| 201         | URL created successfully |
| 302         | Redirect to original URL |
| 400         | Invalid request          |
| 404         | Short URL not found      |
| 409         | Alias already exists     |
| 410         | Link has expired         |

---

## Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## Future Improvements

- User authentication
- QR code generation
- Bulk URL shortening
- Redis caching
- Rate limiting
- Custom domains
- Geo-location analytics
- Device and browser analytics
- Pagination for analytics

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
