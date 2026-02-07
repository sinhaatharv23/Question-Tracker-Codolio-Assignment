📌 Interactive Question Tracker (Codolio Assignment)

A modern, single-page React application for managing coding questions in a structured, hierarchical format using Topics → Subtopics → Questions.

This project was built as part of a technical assignment and focuses on usability, clean UI, drag-and-drop reordering, and efficient state management.

🚀 Live Demo

Deployed on Vercel:
https://question-tracker-codolio-assignment.vercel.app

⚠️ Note:
The Codolio public API works correctly in local development, but may fail on Vercel due to CORS restrictions from the external API.
The core application and all features work as expected locally.

🧠 Problem Statement

Build an interactive question management sheet that allows users to:

Create topics

Create subtopics

Add questions

Reorder everything using drag & drop

Maintain clean and intuitive UI

Integrate sample data via API

🛠️ Tech Stack

React (Vite)

Tailwind CSS

Zustand (State Management)

dnd-kit (Drag & Drop)

Framer Motion (Animations)

UUID

Vercel (Deployment)

✨ Core Features (As Required)
📂 Topic Management

Add topic

Edit topic

Delete topic

Drag & reorder topics

📁 Subtopic Management

Add subtopic under a topic

Edit subtopic

Delete subtopic

Drag & reorder subtopics

❓ Question Management

Add question under subtopic

Edit question

Delete question

Drag & reorder questions

🔄 Drag & Drop System

Fully functional reordering for:

Topics

Subtopics

Questions

⭐ Bonus Features Implemented

These were not required but added for better UX:

🌙 Dark / Light Mode

Toggle theme

Theme persistence using localStorage

✅ Mark Question as Solved

Track solved questions

Visual indication

Toggle state instantly

💾 Local Storage Persistence

Saves user-created topics/subtopics/questions

Data remains after refresh

🎨 UI/UX Improvements

Clean, modern layout

Smooth animations

Responsive design

Glassmorphism cards

Structured hierarchy

🌐 API Integration

Initial dataset is loaded using Codolio public API:

curl reference:
https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet

The app converts flat API data into:

Topic → Subtopic → Questions structure.

⚠️ Note:

Works perfectly in local environment.

May fail in deployed environment due to CORS blocking.

📦 Project Structure
src/
 ├── components/
 │   ├── TopicItem.jsx
 │   ├── SubtopicItem.jsx
 │   ├── QuestionItem.jsx
 │   └── SortableWrappers.jsx
 │
 ├── store/
 │   └── useSheetStore.js
 │
 ├── App.jsx
 └── main.jsx



▶️ How to Run Locally

Clone repo:

git clone https://github.com/sinhaatharv23/Question-Tracker-Codolio-Assignment.git

Install dependencies:

npm install

Start dev server:

npm run dev

Open:

http://localhost:5173


📌 Design Decisions

Zustand used for centralized state management

dnd-kit chosen for reliable drag & drop

Tailwind for rapid UI styling

UUID used for stable identity tracking

Hierarchical data structure for scalability

📈 Possible Future Improvements

Backend integration

User authentication

Progress analytics dashboard

Search & filters

Export solved list

Multi-user collaboration

👨‍💻 Author

Atharva
GitHub: https://github.com/sinhaatharv23

📷 Screenshots

<img width="1918" height="898" alt="image" src="https://github.com/user-attachments/assets/f4f704fb-ce2c-46ff-8e97-cb45e1475241" />
<img width="1913" height="862" alt="image" src="https://github.com/user-attachments/assets/9f336c5d-0f70-463b-a842-77e2d18b61c4" />


<img width="1919" height="894" alt="image" src="https://github.com/user-attachments/assets/ef20cf8e-181e-4c1a-9b53-a7069b9eb204" />
