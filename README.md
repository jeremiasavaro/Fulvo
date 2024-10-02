# Fulvo

## Overview

This project aims to develop a web application to organize football matches where users can interact with each other, invite others to join their matches, and allow fields to be associated with the platform for easy booking. The application will use a React frontend and a Flask backend to provide a seamless experience for users and field owners.

## Features

- **User Interaction:**
  - Users can create and organize soccer matches, invite friends, and confirm participation.
  
- **Field Booking:**
  - Soccer fields can be associated with the platform, allowing users to reserve slots for their matches.
  
- **Responsive Frontend:**
  - The frontend, developed using React, offers a dynamic and interactive user experience for scheduling, viewing matches, and managing bookings.
  
- **Scalable Backend:**
  - A RESTful API built with Flask handles the backend logic, processes requests from the frontend, and manages interactions with the database.

## Installation

### Prerequisites:

- **Python 3.7+**
- **Node.js & npm**
- **Pipenv or virtualenv (optional but recommended)**

### Backend Setup:

1. Clone the repository:
   ```bash
   git clone https://github.com/jeremiasavaro/Fulvo.git
   cd Fulvo.git/backend
2. Create a virtual environment and activate it:
   ```bash
   pipenv install
   pipenv shell
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
4. Run the Flask application:
   ```bash
   flask run

### Frontend Setup:

1. Navigate to the frontend directory:
   ```bash
   cd Fulvo.git/frontend
2. Install the required dependencies:
   ```bash
   npm install
3. Install serve
   ```bash
   npm install -g serve
4. Create the build:
   ```bash
   npm run build
5. Run the build
    ```bash
   serve -s build

## Contact
For any questions or inquiries, please contact jeremiasavaro7@gmail.com.
