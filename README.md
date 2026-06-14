# Assessment 3: Project – Build a Next.js 15 Application Integrated with a Laravel API

## Units

- **ICTWEB517** – Create web-based programs
- **ICTPRG546** – Validate application designs against specifications

---

## Assessment Overview

In this assessment, you will develop a **Next.js 15 (App Router)** frontend application integrated with a **provided Laravel Project Management Workspace API**.
You will demonstrate full **CRUD functionality** for the `projects` and `tasks` routes while using the `users` and `auth` routes (provided by the lecturer) for authentication and user handling.

---

## Assessment Resources

- Blackboard Cluster – Web Application Development
- IDE such as **VS Code**
- **Laravel Project Management Workspace API** (provided by lecturer)
- **Postman Online API Documentation** (official published documentation)
- **GitHub Classroom repository** with linting + static deployment workflow
- **Deployed API instance** available on _Screencraft_ for live endpoint testing **OR**
  **Working Laravel codebase** for local development
- **Sample JSON response files** representing example API objects
- **Database schema diagram**

---

## Assessment Instructions

You are to build a **web-based program** using an object-oriented programming language.
These tasks will be informed by the provided API and assessment template.

**You must:**

- Develop the application using the **Next.js 15 App Router** structure.
- Use **Next.js components** such as `<Link>`, `<Image>`, and standard error components.
- Build a **mobile-responsive UI/UX** using a chosen **CSS framework** (Tailwind, Bulma, Bootstrap, etc.).
- Implement full **CRUD operations** for the API routes below.
- Integrate Laravel API endpoints for:
  - `users` _(provided by lecturer in class activity)_
  - `auth` _(provided in assessment resources)_
  - `projects`
  - `tasks`
  - `milestones`
  - `checklist items`
  - `comments`
- Handle **forms** and **routes** with clear validation and error feedback.
- Submit via **GitHub Classroom** with a passing **GitHub Actions workflow** (linting + static build).
- Use **small, specific, descriptive Git commits** showing progressive development.
- Include **screenshots** of CRUD actions, error handling, and workflow results.
- Provide a **README** describing framework choice, API usage, and deployment.
- Research application hosting platforms suitable for **React/Next.js** (provide links).
- Upload your final application to your chosen hosting platform and submit the link via Blackboard.

---

## Additional Assessment Deliverables

### Your GitHub Classroom repository must include:

- Small, descriptive commits showing incremental progress
- Passing GitHub Actions workflow (linting + static deployment)
- README file detailing CSS framework, structure, and routes used

### You must also provide:

- Screenshots showing testing of CRUD operations, responsiveness, and errors
- Evidence of use of **Postman Online Documentation**

---

## API Documentation Reference

Students will use the **Laravel Project Management Workspace API**, documented online via Postman.
The documentation provides full endpoint definitions and CRUD requirements.

Additional API resources include:

- A **deployed API instance** on _Screencraft_
- A **local Laravel codebase** for development
- Example **JSON response files** for each resource type

**Postman Documentation:**
[https://documenter.getpostman.com/view/30237461/2sB3WpQLLK](https://documenter.getpostman.com/view/30237461/2sB3WpQLLK)

---

## Assessment Checklist (S / NYS)

| No. | Task                                                             | S / NYS |
| --- | ---------------------------------------------------------------- | ------- |
| 1   | Apply basic language syntax and layout using Next.js             | ☐       |
| 2   | Apply object-oriented principles using React within Next.js      | ☐       |
| 3   | Debug using IDE tools and fix syntax errors                      | ☐       |
| 4   | Implement full CRUD functionality for the API routes             | ☐       |
| 5   | Develop in a framework environment with error handling           | ☐       |
| 6   | Implement App Router layout, CSS framework, and error components | ☐       |
| 7   | Maintain data state and display on pages                         | ☐       |
| 8   | Update state from user input                                     | ☐       |
| 9   | Include screenshots of debugging, testing, and workflow results  | ☐       |
| 10  | Test application on two devices                                  | ☐       |
| 11  | Research and document hosting platforms                          | ☐       |
| 12  | Upload and submit hosted link via Blackboard                     | ☐       |

# Project Management Dashboard – Next.js 15

## Student Information

- **Student Name:** Anhelina Potapenko
- **Course:** ICT50220 Diploma of Information Technology (Front-End Web Development)
- **Unit:** Web App Using Frameworks
- **Assessment:** Next.js Project Management Dashboard

---

## Project Overview

This project is a Project Management Dashboard developed using **Next.js 15 App Router**. The application integrates with a Laravel API to manage projects and related resources.

The system allows users to create, view, edit, and delete project management data through a responsive user interface.

---

## Technologies Used

- Next.js 15 (App Router)
- React
- JavaScript (ES6+)
- Bulma CSS Framework
- Laravel API
- GitHub Classroom
- GitHub Actions
- Vercel

---

## Features

### Dashboard

- Displays total counts of:
  - Projects
  - Tasks
  - Milestones
  - Checklist Items
  - Comments
  - Users

### Users

- View all users
- View individual user details

### Projects

- Create projects
- View all projects
- View project details
- Edit projects
- Delete projects

### Tasks

- Create tasks
- View all tasks
- View task details
- Edit tasks
- Delete tasks

### Milestones

- Create milestones
- View milestones
- Edit milestones
- Delete milestones

### Checklist Items

- Create checklist items
- View checklist items
- Edit checklist items
- Delete checklist items

### Comments

- Create comments
- View comments
- Edit comments
- Delete comments

---

## API Integration

The application integrates with Laravel API endpoints provided for the assessment.

### Endpoints Used

- `/users`
- `/projects`
- `/tasks`
- `/milestones`
- `/checklist-items`
- `/comments`
- Authentication endpoints provided within assessment resources

---

## CRUD Operations

The application implements full CRUD functionality for:

### Users

- Read

### Tasks

- Create
- Read
- Update
- Delete

### Projects

- Create
- Read
- Update
- Delete

Additional CRUD functionality was also implemented for milestones, checklist items, and comments.

---

## Validation and Error Handling

The application includes:

- Required field validation
- User-friendly validation messages
- API error handling
- Success messages after create/update actions
- Redirects after successful operations
- Safe handling of API responses

Examples include:

- "Add project name"
- "Select project"
- "The status field is required."
- "Project was created successfully."

---

## Responsive Design

Bulma CSS was used to create a mobile-responsive user interface.

The application was tested across multiple screen sizes to ensure usability on:

- Desktop devices
- Tablets
- Mobile devices

---

## Project Structure

The application follows the Next.js 15 App Router structure.

Example:

app/

- page.js
- error.js
- loading.js
- not-found.js
- projects/
- tasks/
- milestones/
- checklists/
- comments/
- users/
- components/

Dynamic routes use `[id]` folders.

Example:

projects/

- page.js
- create/page.js
- [id]/page.js
- [id]/edit/page.js

---

## Environment Variables

The application uses environment variables for secure API access.

API_BASE_URL= "https://myjamjar.com.au/v1"

API_TOKEN= Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b

These values are configured locally using `.env.local` and on Vercel through Environment Variables.

---

## Running the Application

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

Build the application:

npm run build

Start production server:

npm start

---

## Deployment

The application was deployed using Vercel.

Deployment URL:

(Add your Vercel URL here)

---

## GitHub Actions

GitHub Actions were used to verify that the project successfully passed:

- Linting checks
- Static build checks

Link (without API): https://github.com/NM-TAFE/at3-web-app-using-frameworks-anhelinapotapenko/commits/main
Link: https://github.com/anhelinapotapenko/at3_web_app/commits/main/

---

## Hosting Research

### Vercel

https://vercel.com

Advantages:

- Official Next.js hosting platform
- Automatic deployments
- Environment variable support
- Excellent App Router support

Project link: https://at3-web-app.vercel.app/

### Netlify

https://www.netlify.com

Advantages:

- Easy deployment process
- Continuous deployment integration
- Free hosting tier

### Cloudflare Pages

https://pages.cloudflare.com

Advantages:

- Fast global CDN
- Free hosting options
- Git integration

Vercel was selected due to its native support for Next.js applications.

---

## Screenshots Included

The assessment submission includes screenshots demonstrating:

- Dashboard
- Task CRUD operations
- Project CRUD operations
- Validation errors
- API error handling
- Success messages
- Mobile responsive layouts
- GitHub Actions workflow results
- Vercel deployment

---

## Author

Anhelina Potapenko

2026
