# Stack MERN

A compact contact-manager prototype with a React frontend and an Express/MongoDB API. The API lists, creates, and deletes contact records; new records require a name, email, and phone number.

## Requirements

- Node.js and npm
- A MongoDB instance

## Run locally

Start the API in one terminal:

    cd server
    npm install
    node index.js

The API listens on port 5000 and exposes `/api/contacts`.

Start the React app in another terminal:

    cd frontend
    npm install
    npm start

The frontend typically opens at `http://localhost:3000`. Configure your own MongoDB connection in the server configuration before running. The current connection setting is in `server/index.js`; keep database credentials private.

## Structure

- `frontend/`: React application
- `server/index.js`: Express API and database connection
- `server/models/Contact.js`: contact schema
