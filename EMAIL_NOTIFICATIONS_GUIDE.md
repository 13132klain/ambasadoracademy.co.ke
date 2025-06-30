# Email Notifications System Guide

This guide explains how the automatic email notification system works for Ambassador Academy's application process and provides setup instructions.

## Overview

The system automatically sends email notifications to applicants when their application status changes to "approved". The notification includes:
- Application approval confirmation
- Student and program details
- Next steps for enrollment
- Contact information
- Professional branding and styling

## Setup Instructions

### 1. Prerequisites
- Node.js (v18 or later)
- Firebase CLI
- Firebase project with Firestore enabled
- SMTP server credentials

### 2. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 3. Firebase Functions Setup
```bash
# Login to Firebase
firebase login

# Initialize Firebase Functions (if not already done)
firebase init functions

# Navigate to functions directory
cd functions

# Install dependencies
npm install
```

### 4. Configure SMTP Settings
```bash
# Set SMTP configuration
firebase functions:config:set smtp.host="your-smtp-host" \
                          smtp.user="your-smtp-username" \
                          smtp.pass="your-smtp-password"

# Example for Gmail
firebase functions:config:set smtp.host="smtp.gmail.com" \
                          smtp.user="your-email@gmail.com" \
                          smtp.pass="your-app-specific-password"
```

### 5. Deploy Functions
```bash
npm run deploy
```

## How It Works

1. **Trigger**: The system monitors the `applications` collection in Firestore
2. **Condition**: When an application's status changes to "approved"
3. **Action**: Sends a formatted HTML email to the applicant's parent/guardian

## Email Template Details

The email includes:
- School branding with maroon and blue gradient header
- Personalized greeting
- Application details:
  - Student name
  - Program level
  - Type (Day/Boarding)
- Next steps for enrollment
- Contact information
- Professional footer

## Testing

1. Access the Admissions Management page
2. Edit an application
3. Change status to "approved"
4. The system will automatically send the email
5. Check the Firebase Functions logs for confirmation

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check SMTP configuration
   - Verify email address format
   - Check Firebase Functions logs
   - Ensure sufficient quota/credits

2. **SMTP Authentication Failed**
   - Verify credentials
   - Check if 2FA requires app-specific password
   - Confirm SMTP host settings

3. **Function Deployment Failed**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review Firebase CLI errors

### Viewing Logs
```bash
# View Firebase Functions logs
firebase functions:log

# Filter for email-related logs
firebase functions:log --only onApplicationStatusChange
```

## Maintenance and Updates

### Regular Tasks
1. Monitor email delivery rates
2. Check bounce notifications
3. Update SMTP credentials as needed
4. Review and update email templates

### Best Practices
1. Use a dedicated email sending service for production
2. Implement email verification when collecting addresses
3. Keep HTML templates mobile-responsive
4. Include both HTML and plain text versions
5. Monitor spam score of email content

## Security Considerations

1. **SMTP Credentials**
   - Use environment variables
   - Rotate credentials regularly
   - Use app-specific passwords when possible

2. **Email Content**
   - Avoid sending sensitive information
   - Include privacy policy reference
   - Use TLS for email transmission

3. **Access Control**
   - Restrict function invocation to authorized users
   - Implement rate limiting
   - Monitor for unusual activity

## Customization

### Modifying Email Template
The email template can be customized in `functions/src/index.ts`:
```typescript
const mailOptions = {
  // ... existing options ...
  html: `
    // Modify HTML template here
  `
};
```

### Adding New Notifications
To add notifications for other status changes:
1. Modify the condition check in the function
2. Create new email templates
3. Add appropriate triggers

## Future Enhancements

Consider implementing:
1. Multiple language support
2. SMS notifications
3. Email tracking and analytics
4. Custom notification preferences
5. Automated reminder system
6. Bulk notification capabilities

## Support

For technical support:
- Email: tech@ambassadoracademy.ac.ke
- Internal Documentation: [Link to your internal wiki]
- Firebase Support: https://firebase.google.com/support

## Version History

- v1.0.0 - Initial implementation
- Current version: v1.0.0 