# Ambassador Academy Project Documentation

---

## 1. Project Overview

**Project Name:** Ambassador Academy Website & Admissions System

**Description:**
A modern, responsive web platform for Ambassador Academy, featuring program information, online admissions, admin management, and automated email notifications for application approvals.

**Key Features:**
- Programs showcase with detailed modals and downloadable brochures
- Online application form with validation and backend integration
- Admin dashboard for managing applications and program data
- Automated email notifications for approved applications
- Firebase backend for real-time data and serverless functions

**Tech Stack:**
- Frontend: React (TypeScript), Tailwind CSS
- Backend: Firebase Firestore, Firebase Functions (Node.js/TypeScript)
- Email: Nodemailer via SMTP (Cloud Functions)

**Repository/Deployment Link:**
- [Your repository or live site link here]

---

## 2. Getting Started

### Prerequisites
- Node.js v18+
- Firebase CLI
- Firebase project with Firestore enabled
- SMTP/email service credentials

### Installation
```bash
git clone <repo-url>
cd project-bolt-sb1-s6stsje5/Ambassador Academy
npm install
```

### Environment Setup
- Set up Firebase config as per `FIREBASE_SETUP.md`
- Configure SMTP credentials for email notifications:
```bash
firebase functions:config:set smtp.host="your-smtp-host" \
                          smtp.user="your-smtp-username" \
                          smtp.pass="your-smtp-password"
```

### Running the Project
- **Frontend:**
  ```bash
  npm run dev
  ```
- **Backend/Functions:**
  ```bash
  cd ../functions
  npm install
  npm run build
  npm run serve
  ```
- **Production Deployment:**
  - Deploy frontend to your chosen host (Firebase Hosting, Vercel, Netlify, etc.)
  - Deploy functions: `npm run deploy` from the `functions` directory

---

## 3. Features & Usage

### Programs Section
- Browse available programs with images, icons, and details
- Download program-specific brochures (PDF)

### Application Process
- Click "Apply for This Program" to open the application form
- Fill in student and parent details, contact info, and notes
- Submit the form (auto-fills program info, sets status to 'pending')
- Receive confirmation on the site

### Admin Panel
- Log in as admin (see `LoginPage.tsx` for logic)
- View, filter, and search applications
- Edit application status (approve, reject, etc.)
- Download reports (PDF/CSV)

### Email Notifications
- When an application is approved, an email is sent to the parent/guardian
- Email includes application details and next steps
- Email template is customizable in `functions/src/index.ts`

---

## 4. Deployment

- **Frontend:** Deploy using your preferred static hosting (see `FIREBASE_HOSTING_GUIDE.md`)
- **Backend/Functions:** Deploy with Firebase CLI (`npm run deploy` in `functions`)
- **Environment Variables:** Set via Firebase config for sensitive data (SMTP, API keys)

---

## 5. Testing

- Submit a test application via the website
- Approve the application in the admin panel
- Check the recipient email for the approval notification
- View Firebase Functions logs for troubleshooting:
  ```bash
  firebase functions:log --only onApplicationStatusChange
  ```

---

## 6. Troubleshooting

- **Emails not sending:**
  - Check SMTP config and credentials
  - Review Firebase Functions logs
- **Function deployment issues:**
  - Ensure Node.js version compatibility
  - Run `npm install` in the `functions` directory
- **Frontend errors:**
  - Check browser console and network tab
  - Ensure Firebase config is correct

---

## 7. Future Improvements

- Field validation and spam protection
- File upload capability for applications
- Admin notifications for new applications
- Privacy notices and terms acceptance
- Accessibility improvements
- Analytics tracking
- Multi-language support
- SMS notifications
- Email tracking and analytics

---

## 8. Credits & License

- **Contributors:** [Your Name/Team]
- **License:** [MIT or specify]

---

## 9. Contact

- **Support Email:** info@ambassadoracademy.ac.ke
- **Project Maintainer:** [Your Name/Contact]

---

## 10. Screenshots & Diagrams (Optional)

- Add UI screenshots, admin panel images, and email template previews here.
- Add flowcharts or sequence diagrams if helpful.

---

For more details, see:
- `EMAIL_NOTIFICATIONS_GUIDE.md` (for email system)
- `FIREBASE_SETUP.md` (for Firebase setup)
- `functions/README.md` (for backend functions) 