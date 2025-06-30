# Google Apps Script Email Notifications Setup Guide

This guide will help you set up automatic email notifications for transport registrations using Google Apps Script and Gmail.

## Prerequisites

- A Google account with Gmail access
- Basic knowledge of Google Apps Script (no coding required)
- Your Firebase project already set up

## Step 1: Create Google Apps Script

1. **Go to [script.google.com](https://script.google.com)**
2. **Sign in** with your Google account
3. **Click "New project"**
4. **Name it** "Transport Email Notifications"
5. **Replace the default code** with the provided script (see below)

## Step 2: Copy the Apps Script Code

Replace the default code in your Apps Script editor with this:

```javascript
// Google Apps Script for Transport Registration Email Notifications
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.action || !data.registration) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Missing required fields: action and registration'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const { action, registration } = data;
    
    // Send email based on action
    let emailResult;
    switch (action) {
      case 'approved':
        emailResult = sendApprovalEmail(registration);
        break;
      case 'rejected':
        emailResult = sendRejectionEmail(registration);
        break;
      case 'waitlisted':
        emailResult = sendWaitlistEmail(registration);
        break;
      default:
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid action. Must be: approved, rejected, or waitlisted'
        })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      emailResult: emailResult
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error processing request:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendApprovalEmail(registration) {
  const subject = `Transport Registration Approved - ${registration.studentName}`;
  const body = `
Dear ${registration.parentName},

We are pleased to inform you that your transport registration for ${registration.studentName} has been APPROVED.

Registration Details:
- Student: ${registration.studentName}
- Route: ${registration.routeName}
- Pickup Location: ${registration.pickupLocation}
- Dropoff Location: ${registration.dropoffLocation}
- Pickup Time: ${registration.pickupTime}
- Dropoff Time: ${registration.dropoffTime}

Your transport service will begin on the next school day. Please ensure your child is at the pickup location 5 minutes before the scheduled time.

If you have any questions, please contact our transport department.

Best regards,
Ambassador Academy Transport Team
  `.trim();
  
  return GmailApp.sendEmail(registration.parentEmail, subject, body);
}

function sendRejectionEmail(registration) {
  const subject = `Transport Registration Update - ${registration.studentName}`;
  const body = `
Dear ${registration.parentName},

We regret to inform you that your transport registration for ${registration.studentName} has been REJECTED.

Registration Details:
- Student: ${registration.studentName}
- Route: ${registration.routeName}
- Pickup Location: ${registration.pickupLocation}
- Dropoff Location: ${registration.dropoffLocation}

Reason: ${registration.adminNotes || 'No specific reason provided'}

If you believe this decision was made in error or if you have additional information to provide, please contact our transport department for reconsideration.

We apologize for any inconvenience this may cause.

Best regards,
Ambassador Academy Transport Team
  `.trim();
  
  return GmailApp.sendEmail(registration.parentEmail, subject, body);
}

function sendWaitlistEmail(registration) {
  const subject = `Transport Registration Waitlisted - ${registration.studentName}`;
  const body = `
Dear ${registration.parentName},

Your transport registration for ${registration.studentName} has been placed on our WAITLIST.

Registration Details:
- Student: ${registration.studentName}
- Route: ${registration.routeName}
- Pickup Location: ${registration.pickupLocation}
- Dropoff Location: ${registration.dropoffLocation}

This means that while we cannot currently accommodate your request, you will be contacted immediately if a spot becomes available on this route.

We will review your application regularly and contact you as soon as space becomes available.

If you have any questions or if your circumstances change, please contact our transport department.

Best regards,
Ambassador Academy Transport Team
  `.trim();
  
  return GmailApp.sendEmail(registration.parentEmail, subject, body);
}

// Test function to verify the script is working
function testEmail() {
  const testRegistration = {
    studentName: "Test Student",
    parentName: "Test Parent",
    parentEmail: "your-email@gmail.com", // Replace with your email for testing
    routeName: "Test Route",
    pickupLocation: "Test Pickup",
    dropoffLocation: "Test Dropoff",
    pickupTime: "7:00 AM",
    dropoffTime: "3:00 PM",
    adminNotes: "Test rejection reason"
  };
  
  console.log("Testing approval email...");
  sendApprovalEmail(testRegistration);
  
  console.log("Testing rejection email...");
  sendRejectionEmail(testRegistration);
  
  console.log("Testing waitlist email...");
  sendWaitlistEmail(testRegistration);
}
```

## Step 3: Deploy as Web App

1. **Click "Deploy"** in the top menu
2. **Select "New deployment"**
3. **Choose "Web app"** as the type
4. **Configure the settings:**
   - **Execute as:** "Me" (your Google account)
   - **Who has access:** "Anyone" (for now - we can secure it later)
5. **Click "Deploy"**
6. **Authorize the app** when prompted
7. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Update Your Firebase Service

1. **Open** `src/services/firebaseService.ts`
2. **Find the emailService section** (around line 820)
3. **Replace** `'YOUR_APPS_SCRIPT_URL_HERE'` with your actual Web App URL

```typescript
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec',
```

## Step 5: Test the Setup

1. **Navigate to** your admin dashboard
2. **Go to** the Transport Registrations page
3. **Try approving/rejecting/waitlisting** a registration
4. **Check the parent's email** for the notification

## Step 6: Test with the Test Page

1. **Update the test email** in `EmailTestPage.tsx` with your real email
2. **Navigate to** the Email Test page in your admin area
3. **Click the test buttons** to verify emails are being sent

## Troubleshooting

### Common Issues:

1. **"Failed to send email" error:**
   - Check that your Apps Script URL is correct
   - Verify the script is deployed as a web app
   - Check browser console for detailed errors

2. **CORS errors:**
   - The script includes CORS headers, but some browsers may still block
   - Try testing from your admin dashboard instead of the test page

3. **"Script not found" error:**
   - Make sure you copied the entire URL from the deployment
   - Verify the script is deployed and accessible

4. **Emails not sending:**
   - Check that your Google account has permission to send emails
   - Verify the recipient email address is valid
   - Check the Apps Script execution logs

### Security Considerations:

1. **For production use**, consider:
   - Adding authentication to your Apps Script
   - Limiting access to specific domains
   - Using environment variables for sensitive data

2. **Rate limiting:**
   - Google Apps Script has daily quotas
   - Monitor usage in the Apps Script dashboard

## Customization

### Email Templates:
You can customize the email content by editing the `sendApprovalEmail`, `sendRejectionEmail`, and `sendWaitlistEmail` functions in your Apps Script.

### Adding More Actions:
To add more email types (e.g., cancellation, reminder), add new cases to the switch statement and create corresponding email functions.

## Monitoring

1. **Check Apps Script logs:**
   - Go to your Apps Script project
   - Click "Executions" in the left sidebar
   - View recent executions and any errors

2. **Monitor email delivery:**
   - Check your Gmail "Sent" folder
   - Verify recipients are receiving emails

## Next Steps

Once this is working, you can:
1. Add email notifications for other features (applications, events, etc.)
2. Customize email templates with your school's branding
3. Add more sophisticated email logic (conditional content, attachments, etc.)
4. Implement email tracking and analytics

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Review the Apps Script execution logs
3. Verify all URLs and permissions are correct
4. Test with a simple email first before complex notifications 