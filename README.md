# Job Finder Application

A modern job search platform built with Next.js, React, and Firebase. Find your dream job with ease!

## Features

- 🔍 Browse and search job listings
- 📝 Create and manage your professional resume
- 🗺️ View jobs on an interactive map
- 📊 Track application status and analytics
- 👤 User authentication with Google and email/password
- 💾 Offline data persistence

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

## Deployment Instructions

### Deploying to Vercel

1. **Fork/Clone this repository**
   ```
   git clone https://github.com/RajnishKumar05/findyourdreamjob.git
   cd job-finder
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Add your domain to authorized domains list in Firebase Auth settings

4. **Set up Environment Variables in Vercel**
   - Go to your Vercel project settings
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     NEXTAUTH_URL=your_vercel_deployment_url
     NEXTAUTH_SECRET=a_random_secret_string
     ```

5. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Follow the deployment steps in Vercel dashboard
   - Choose Next.js as the framework preset
   - Add environment variables as specified above
   - Deploy!

## Local Development

1. Clone the repository
2. Create a `.env.local` file with the environment variables
3. Run `npm install`
4. Run `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## PowerShell Commands

In Windows PowerShell, use semicolons instead of && to chain commands:
```
cd job-finder; npm run dev
```

## License

MIT
