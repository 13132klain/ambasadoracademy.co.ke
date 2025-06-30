# Firebase Setup Guide for Ambassador Academy

This guide will help you set up Firebase for your Ambassador Academy website to enable real-time data storage and management.

## Prerequisites

- A Google account
- Node.js and npm installed
- Firebase CLI (optional but recommended)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name: `ambassador-academy-website`
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development - you can secure it later)
4. Select a location closest to your users (e.g., `us-central1` for US)
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname: `ambassador-academy-web`
6. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/config/firebase.ts` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Set Up Firestore Collections

Your Firebase service is already configured to work with these collections:

### Collections Structure:

1. **events** - School events and activities
   - Fields: title, description, date, time, location, type, priority, attendees, status, createdAt, updatedAt

2. **applications** - Student admission applications
   - Fields: studentName, parentName, email, phone, level, type, dateSubmitted, status, documents, notes, interviewDate, interviewTime, createdAt, updatedAt

3. **terms** - Academic terms and calendar
   - Fields: name, startDate, endDate, weeks, holidays, events, createdAt, updatedAt

4. **gallery** - Photo gallery items
   - Fields: title, description, imageUrl, category, tags, dateUploaded, dateTaken, location, photographer, featured, createdAt, updatedAt

## Step 6: Security Rules (Optional but Recommended)

In your Firestore Database settings, you can set up security rules. For development, you can use these basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // WARNING: This allows anyone to read/write
    }
  }
}
```

**For production, you should implement proper authentication and security rules.**

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin` in your browser
3. Try adding, editing, and deleting events, applications, etc.
4. Check your Firebase console to see the data being stored

## Step 8: Deploy Your Website

### Option 1: Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```

4. Build your project:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   firebase deploy
   ```

### Option 2: Deploy to Other Platforms

You can deploy to any static hosting platform (Vercel, Netlify, etc.) since your app uses Firebase for backend services.

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file in your project root:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Update `src/config/firebase.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## Features Available

With Firebase connected, your website now has:

✅ **Real-time data storage** for all admin content
✅ **Events management** - Add, edit, delete school events
✅ **Admissions management** - Track student applications
✅ **Calendar management** - Manage academic terms and holidays
✅ **Gallery management** - Upload and manage photos
✅ **No authentication required** - Direct access to admin panel
✅ **Responsive design** - Works on all devices

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console > Authentication > Settings

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Double-check your API key in the configuration

3. **"Firebase: Error (permission-denied)"**
   - Check your Firestore security rules
   - Make sure you're in test mode for development

4. **Data not loading**
   - Check browser console for errors
   - Verify your Firebase configuration
   - Ensure Firestore is enabled in your project

## Next Steps

1. **Add Authentication** (optional) - Implement user login for admin access
2. **Add Image Upload** - Integrate Firebase Storage for gallery images
3. **Add Real-time Updates** - Implement live updates for events and applications
4. **Add Notifications** - Send email notifications for new applications
5. **Add Analytics** - Track website usage and performance

## Support

If you encounter any issues:
1. Check the Firebase documentation
2. Review browser console for error messages
3. Verify your Firebase configuration
4. Ensure all collections are properly set up

Your Ambassador Academy website is now ready to go live with full data management capabilities! 🎉 