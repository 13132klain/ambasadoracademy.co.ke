import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Get Gmail credentials from environment config
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Cloud Function to send email on status change
export const sendTransportStatusEmail = functions.firestore
  .document('transportRegistrations/{registrationId}')
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only send email if status changed
    if (before.status === after.status) return null;

    let subject = '';
    let text = '';

    if (after.status === 'approved') {
      subject = 'Your Transport Registration is Approved!';
      text = `Dear ${after.parentName},\n\nYour transport registration for ${after.studentName} has been approved.\n\nThank you,\nAmbassador Academy`;
    } else if (after.status === 'rejected') {
      subject = 'Your Transport Registration is Rejected';
      text = `Dear ${after.parentName},\n\nWe regret to inform you that your transport registration for ${after.studentName} has been rejected.\n\nThank you,\nAmbassador Academy`;
    } else if (after.status === 'waitlisted') {
      subject = 'Your Transport Registration is Waitlisted';
      text = `Dear ${after.parentName},\n\nYour transport registration for ${after.studentName} has been waitlisted. We will contact you with further updates.\n\nThank you,\nAmbassador Academy`;
    } else {
      return null;
    }

    const mailOptions = {
      from: `Ambassador Academy <${gmailEmail}>`,
      to: after.parentEmail,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent to:', after.parentEmail);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return null;
  });

export const onApplicationStatusChange = functions.firestore
  .document('applications/{applicationId}')
  .onUpdate(async (change) => {
    const newData = change.after.data();
    const previousData = change.before.data();

    // Only send notification if status has changed to 'approved'
    if (newData.status === 'approved' && previousData.status !== 'approved') {
      const mailOptions = {
        from: '"Ambassador Academy" <admissions@ambassadoracademy.ac.ke>',
        to: newData.email,
        subject: 'Your Application has been Approved! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #8B0000, #000080); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Application Approved!</h1>
            </div>
            
            <div style="padding: 20px; background-color: #f9f9f9;">
              <p>Dear ${newData.parentName},</p>
              
              <p>We are delighted to inform you that ${newData.studentName}'s application to Ambassador Academy has been approved! 🎉</p>
              
              <h2>Application Details:</h2>
              <ul>
                <li>Student: ${newData.studentName}</li>
                <li>Level: ${newData.level.charAt(0).toUpperCase() + newData.level.slice(1).replace('-', ' ')}</li>
                <li>Type: ${newData.type.charAt(0).toUpperCase() + newData.type.slice(1)}</li>
              </ul>
              
              <h2>Next Steps:</h2>
              <ol>
                <li>Complete the enrollment process within 14 days</li>
                <li>Submit any pending documents</li>
                <li>Pay the required fees</li>
                <li>Attend the orientation session (details to follow)</li>
              </ol>
              
              <p>Our admissions team will contact you shortly with detailed information about the enrollment process.</p>
              
              <p>If you have any questions, please don't hesitate to reach out to us at:</p>
              <ul>
                <li>Email: theambasadoracademy00@gmail.com</li>
                <li>Phone: +254797727230</li>
              </ul>
              
              <p style="margin-top: 20px;">
                Welcome to the Ambassador Academy family!<br>
                Best regards,<br>
                The Admissions Team
              </p>
            </div>
            
            <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px;">
              <p>Ambassador Academy | Rongai, Kajiado County, Kenya</p>
            </div>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Approval notification sent to ${newData.email}`);
      } catch (error) {
        console.error('Error sending approval notification:', error);
      }
    }
  }); 