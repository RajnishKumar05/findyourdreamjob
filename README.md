# JobFinder Application

A modern job search platform built with Next.js, Firebase, and TypeScript.

## Features

- 🔒 User authentication with Firebase (Email/Password and Google Sign-in)
- 💼 Job listings with detailed information
- 🗺️ Interactive job map visualization
- 📝 Resume builder tool
- 🔍 Advanced job search and filtering
- 📱 Responsive design for all devices
- 🌐 Offline capabilities with Firebase Firestore

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Firebase](https://firebase.google.com/) - Backend services (Authentication, Firestore, Storage)
- [Lucide Icons](https://lucide.dev/) - Beautiful SVG icons

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-finder.git
   cd job-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google providers)
   - Set up Firestore database
   - Get your Firebase configuration

4. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup Instructions

### Authentication

1. Go to Firebase Console > Authentication > Sign-in method
2. Enable Email/Password provider
3. Enable Google provider

### Firestore Database

1. Go to Firebase Console > Firestore Database
2. Create a new database in production mode
3. Set up the following collections:
   - `users`: User profiles
   - `jobs`: Job listings
   - `applications`: Job applications
   - `resumes`: User resumes

### Security Rules

Add these security rules to your Firestore database for basic protection:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null && (resource == null || resource.data.createdBy == request.auth.uid);
    }
    match /applications/{applicationId} {
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || resource.data.employerId == request.auth.uid);
      allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Project Structure

```
job-finder/
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages
│   ├── components/     # Reusable components
│   │   ├── auth/       # Authentication components
│   │   ├── resume/     # Resume builder components
│   │   └── ui/         # UI components (shadcn/ui)
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript type definitions
├── .env.local          # Environment variables
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License.
