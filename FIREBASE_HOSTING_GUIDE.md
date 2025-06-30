# Firebase Hosting Guide for Ambassador Academy

This guide will help you deploy your React frontend to Firebase Hosting and connect a custom domain.

---

## 1. Build Your React App

From the `Ambassador Academy` directory, run:

```sh
npm run build
```
This creates a `dist` folder with your production-ready files.

---

## 2. Install Firebase CLI

If you haven't already, install the Firebase CLI globally:

```sh
npm install -g firebase-tools
```

---

## 3. Login to Firebase

```sh
firebase login
```

---

## 4. Initialize Firebase Hosting

In your `Ambassador Academy` directory:

```sh
firebase init hosting
```
- Select your Firebase project (or create one if needed).
- Set the public directory to `dist`.
- Choose **Yes** for single-page app rewrite (if using React Router).
- Do **not** overwrite `index.html` if prompted.

---

## 5. Deploy to Firebase

```sh
firebase deploy
```
Your site will be live at `https://your-project-id.web.app` and `https://your-project-id.firebaseapp.com`.

---

## 6. Add a Custom Domain

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Go to **Hosting** > **Add custom domain**.
4. Enter your domain (e.g., `www.yoursite.com`).
5. Firebase will provide DNS records (TXT for verification, then A records for pointing).
6. Go to your domain registrar (Namecheap, GoDaddy, etc.) and add the DNS records as instructed.
7. Wait for DNS propagation (can take a few minutes to a few hours).

---

## 7. Force HTTPS (Optional)
Firebase Hosting automatically provides SSL for your custom domain.

---

## 8. Backend/API (Optional)
If you have a backend (Node.js/Express), host it elsewhere (e.g., Render, Railway, etc.) and update your frontend to use the deployed API URL.

---

## Troubleshooting
- **DNS changes can take time**: Wait up to 24 hours for DNS propagation.
- **Check Firebase Console** for deployment status and errors.
- **Update environment variables** in your frontend to use the correct API endpoints if needed.

---

**Congratulations! Your site is now live with Firebase Hosting and a custom domain.** 