Lendsqr Frontend Engineering Assessment
This repository contains the solution for the Lendsqr Frontend Engineering Assessment, demonstrating mastery in React, TypeScript, and SCSS by rebuilding key pages from a provided Figma design.

Setup & Installation
In order to run this project locally, follow the following instructions:

Clone the repository:
git clone https://github.com/Snotat/lendsqr-fe-test.git
cd lendsqr-fe-test

Install dependencies:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start

The app can be accessed at http://localhost:3000.

Run tests:

npm test
# or
yarn test

Live Site
View the deployed application here:
https://shuaib-olawale-lendsqr-fe-test.netlify.app

Source Code
The complete source code of this project is available on GitHub:
https://github.com/Snotat/lendsqr-fe-test

Video Presentation
Short video tutorial and review of the app:
https://www.loom.com/share/1248403f7a2f419aa3adc7ff19342281?sid=d43b9a6f-7f10-4f59-9a48-dac94feaa649

Application Overview
This web app re-implements the most essential pages of the provided Figma design, demonstrating expertise in React, TypeScript, SCSS, and best frontend development practices.

The app has the following primary pages:

Login Page: User authentication interface.

Dashboard Page: Overview of user statistics and table/card view of user data.

User List Page (User component): Paginated and filterable list of users.

User Details Page: Displays detailed data of a specific user.

Technical Stack & Rationale
The project was built strictly adhering to the provided technical stack, with additional libraries chosen to preserve greater functionality and development simplicity.

React

TypeScript

SCSS (Sass)

react-router-dom

axios (v1.x.x)

Local Storage:

sonner

framer-motion

react-icons

Key Features & Implementation Details
Page Structure & Routing
The App.tsx component serves as the top-level entry point, defining the primary navigation routes using react-router-dom:

/login: Renders the SignIn component.

/dashboard: Renders the Dashboard component.

/userdetails/:id: Renders the User component (which internally renders UserDetails) to display single user details for a dynamic id parameter.

/: Redirects to /login as it's the default entry.

*: Redirects all unmatched paths, displaying a "404 - Page Not Found" message.

Data Fetching & Caching (getUsers.ts)
The getUsers function in src/API/getUsers.ts makes a GET call to fetch user data from the MockAPI endpoint provided: https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users.

Setup & Installation
In order to run this project locally, follow the following instructions:

Clone the repository:
git clone https://github.com/Snotat/lendsqr-fe-test.git
cd lendsqr-fe-test

Install dependencies:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start

The app can be accessed at http://localhost:3000.

Run tests:

npm test
# or
yarn test

Contact
Name: Shuaib Nurudeen Olawale - snotat
Date: 21/07/2025