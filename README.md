# My Tasks

- [My Tasks](https://codenoobs-my-tasks.web.app) is a simple task management app designed to help users stay organized by offering essential task management features within an intuitive interface.
  - **Manage your tasks without the headache!**

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [User Authentication](#user-authentication)
- [Backend Services](#backend-services)
- [Purpose](#purpose)
- [Deployment](#deployment)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Author](#author)

## Features

- **Auth**: Sign up or log in securely using your Google account, ensuring a seamless experience.
- **Add New Task**: Create tasks with a single click, making it easy to track your to-dos.
- **Delete Task**: Remove completed or unnecessary tasks with a dedicated delete button.
- **Update Task**: Edit task details effortlessly to keep your list accurate and relevant.
- **Mark as Done**: Strike through completed tasks to maintain a clear overview of your progress.

## Demo

![App Screenshot](link-to-screenshot)

## User Authentication

- Users can log in to My Tasks using their Google account.
- All tasks are securely stored in a Firestore database, ensuring data privacy and security.

## Backend Services

- My Tasks uses [Firebase](https://firebase.google.com) for its backend services, including:
  - Authentication
  - Real-time data storage with Firestore
  - Hosting and deployment

## Purpose

- My Tasks was built to provide new developers with a hands-on example of building a modern web app while offering users a functional, streamlined task management experience.
- My Tasks was built as a code-along project for the [CodeNoobs](https://codenoobs.io) Web Dev Incubator.
- It demonstrates how to build and deploy a modern web app using Firebase for backend services while empowering users to manage their tasks efficiently.

## Deployment

- My Tasks is hosted and deployed on Firebase, ensuring scalability, security, and reliability.

## Installation

- Developers can deploy their own version of My Tasks by following these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/dannynow6/my-tasks-v3.git
   ```
2. Navigate to the project directory:
   ```bash
   cd my-tasks-v3
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://firebase.google.com)
   - Add your Firebase configuration details to a .env file in the root of the project:

## Author

- Built by [Dan G.](https://dgdesignanddev.com)
- 2025
