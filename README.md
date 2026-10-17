# 🚀 FlowPilot — Project Management Dashboard

FlowPilot is a modern project management dashboard built with React and Vite. It helps users organize projects, manage tasks, track progress, and customize their workspace through a clean and responsive interface.

## ✨ Features

- 📊 **Dashboard Overview** — View project and task information.
- 📁 **Project Management** — Create, search, and delete projects.
- ✅ **Task Management** — Create tasks, manage due dates, and track completion.
- 📅 **Calendar** — View tasks by date and navigate between months.
- 👥 **Team Management** — Add, search, and manage team members.
- 📈 **Analytics** — View project statistics and task completion progress.
- ⚙️ **Settings** — Customize appearance and notification preferences.
- 🔐 **Firebase Authentication** — Support for user authentication.
- 💾 **Local Data Persistence** — Store project and task data in browser local storage.
- 📱 **Responsive UI** — Designed for desktop and smaller screens.

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- DaisyUI
- React Router
- React Icons
- Motion
- Firebase Authentication
- Browser Local Storage

## 📂 Project Structure

```text
flowpilot/
├── public/
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       ├── Analytics.jsx
│   │       ├── CalendarView.jsx
│   │       ├── Settings.jsx
│   │       └── Team.jsx
│   ├── firebase.js
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The folder structure above is illustrative. Adjust it to match your actual project files.*

## 🔐 Authentication & Data

FlowPilot uses Firebase Authentication for account access.

Currently, project and task data are stored in browser local storage. This means the data is browser-specific and is not automatically synchronized across devices or users.

Team member information and settings may also use local state or browser storage, depending on their implementation.

A shared cloud database, such as Firebase Cloud Firestore, can be added to support synchronized, user-specific data storage.

## 🌐 Deployment

FlowPilot can be deployed using [Vercel](https://vercel.com/).

Recommended build settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

After deployment, configure Firebase Authentication's authorized domains to include your deployed website domain.

## 🚧 Future Improvements

- Firebase Cloud Firestore integration
- User-specific project and task storage
- Persistent team management
- Improved notifications and reminders
- Enhanced analytics and reporting
- Additional accessibility and responsive design improvements

## 👨‍💻 Author

**Md Ahasanul Haque Ashad**

GitHub: [@ahasanulhaqueasad](https://github.com/ahasanulhaqueasad)

## 📄 License

This project is currently available for personal learning and development. Add a formal open-source license if you intend to distribute it under specific terms.
