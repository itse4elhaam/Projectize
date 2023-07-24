# Projectize(IN PROGRESS)

Projectize is a web application built using the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS, and GraphQL. It allows you to efficiently manage and track the number of projects you're working on. With a user-friendly interface, Projectize enables you to add, update, and delete projects as needed.

## Features

- User Authentication: Register and log in securely to access your projects.
- Add Projects: Add details of the projects you're working on, such as name, description, and start date.
- Update Projects: Modify project details whenever needed, including the project's current status.
- Delete Projects: Remove projects that are no longer active or relevant.
- View Project List: See a list of all your projects along with their key information.
- Responsive Design: Enjoy a seamless experience across various devices with responsive UI design.

## Installation

1. Clone the repository to your local machine:

```
git clone git@github.com:itse4elhaam/Projectize.git
cd projectize
```

2. Install server dependencies:

```
npm install
```

3. Install client dependencies:

```
cd ../client
npm install
```

4. Set up environment variables:

    Create a .env file in the server directory.
    Add the following environment variables and replace the values accordingly:
```
    PORT=8000
    NODE_ENV= "Development"
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
```

5. Run the servers

Run in the root folder to start both client & server simultaneously
```
npm run dev
```
Run in the root folder to start server
```
npm run server
```
Run in the root folder to start client
```
npm run client
```

## Technologies Used

- MongoDB: NoSQL database for storing project data.
- Express: Backend framework for building the server.
- React: Frontend library for building the user interface.
- Node.js: JavaScript runtime for running the server.
- Tailwind CSS: Utility-first CSS framework for responsive styling.
- GraphQL: Query language and runtime for API interactions.

## Contributing

This project is currently under progress and hence not open to contributions, but if you still want to collaborate or be of help in some way contact me a at e4elhaam@gmail.com