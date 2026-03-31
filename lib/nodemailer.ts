import nodemailer from 'nodemailer'

type SemndEmailOtpProps = {
  to: string
  otp: string
  name: string
}

type AppointmentEmailProps = {
  to: string
  consultation: string
  date: string
  timing: string
  doctorName: string
  specialization: string
  patientName: string
}

type AppointmentEmailTemplateProps = {
  consultation: string
  date: string
  timing: string
  doctorName: string
  specialization: string
  patientName: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

// Send an email using async/await

export const sendMail = async ({ to, otp, name }: SemndEmailOtpProps) => {
  try {
    await transporter.sendMail({
      from: `"Ai Doctor" <${process.env.EMAIL}>`,
      to: to,
      subject: 'Your Otp code',
      html: otpEmailTemplate(otp, name),
    })
  } catch (error) {}
}

export const forgetPasswordOtpSend = async ({ to, otp, name }: SemndEmailOtpProps) => {
  try {
    await transporter.sendMail({
      from: `"Ai Doctor" <${process.env.EMAIL}>`,
      to: to,
      subject: 'Your Otp code',
      html: otpEmailTemplateForgetPassword(otp, name),
    })
  } catch (error) {}
}

export const appointmentBookingEmailSend = async ({
  to,
  consultation,
  date,
  timing,
  doctorName,
  specialization,
  patientName,
}: AppointmentEmailProps) => {
  try {
    await transporter.sendMail({
      from: `"MedCare" <${process.env.EMAIL}>`,
      to: to,
      subject: 'Your Appointment Booking',
      html: appointmentEmailTemplate({
        consultation,
        date,
        timing,
        doctorName,
        specialization,
        patientName,
      }),
    })
  } catch (error) {
    console.log(error)
  }
}

// /lib/mailer.js me function ke andar
const otpEmailTemplate = (otp: String, name = 'User') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 30px;
      text-align: center;
    }
    h1 {
      color: #333333;
    }
    p {
      color: #555555;
      font-size: 16px;
    }
    .otp {
      display: inline-block;
      background-color: #0070f3;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      padding: 15px 25px;
      border-radius: 8px;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello ${name},</h1>
    <p>Use the OTP below to complete your verification process. This code will expire in 10 minutes.</p>
    <div class="otp">${otp}</div>
    <p>If you did not request this OTP, please ignore this email.</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} YourCompany. All rights reserved.<br/>
      <a href="#">Unsubscribe</a>
    </div>
  </div>
</body>
</html>
`

export default otpEmailTemplate

const otpEmailTemplateForgetPassword = (otp: String, name = 'User') =>
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; padding:30px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #4f46e5, #7c3aed); padding:40px 30px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:28px; font-weight:700;">Verify Your Account</h1>
              <p style="margin:10px 0 0; font-size:16px; opacity:0.95;">Secure one-time password for login/reset</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px; color:#333333;">
              <p style="margin:0 0 16px; font-size:18px;">Hi <strong>${name}</strong>,</p>
              
              <p style="margin:0 0 20px; font-size:16px; line-height:1.7; color:#555;">
                Use the following One-Time Password (OTP) to complete your verification.
                This code is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <div style="display:inline-block; background:#f3f4f6; border:2px dashed #6366f1; border-radius:14px; padding:20px 30px;">
                  <span style="font-size:36px; letter-spacing:10px; font-weight:700; color:#111827;">
                    ${otp}
                  </span>
                </div>
              </div>

              <p style="margin:0 0 18px; font-size:15px; line-height:1.7; color:#666;">
                If you did not request this code, you can safely ignore this email.
              </p>

              <p style="margin:0; font-size:15px; line-height:1.7; color:#666;">
                For security reasons, please do not share this OTP with anyone.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:25px 30px; background:#f9fafb; text-align:center; font-size:13px; color:#888;">
              <p style="margin:0 0 8px;">This is an automated message, please do not reply.</p>
              <p style="margin:0;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

const appointmentEmailTemplate = ({
  consultation,
  date,
  timing,
  doctorName,
  specialization,
  patientName = 'Patient',
}: AppointmentEmailTemplateProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Appointment Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, sans-serif; color:#1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #2563eb, #06b6d4); padding:32px; text-align:center;">
              <h1 style="margin:0; font-size:28px; color:#ffffff; font-weight:700;">
                Appointment Confirmed
              </h1>
              <p style="margin:10px 0 0; font-size:15px; color:rgba(255,255,255,0.9);">
                Your doctor consultation has been successfully booked.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px; font-size:16px; line-height:1.7;">
                Hi <strong>${patientName}</strong>,
              </p>
              
              <p style="margin:0 0 24px; font-size:15px; line-height:1.8; color:#4b5563;">
                Thank you for booking your appointment with us. Here are your consultation details:
              </p>

              <!-- Appointment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:16px; padding:24px; margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0; font-size:15px; color:#111827;">
                    <strong>Consultation Type:</strong> ${consultation}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px; color:#111827;">
                    <strong>Date:</strong> ${date}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px; color:#111827;">
                    <strong>Time:</strong> ${timing}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px; color:#111827;">
                    <strong>Doctor:</strong> Dr. ${doctorName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px; color:#111827;">
                    <strong>Specialization:</strong> ${specialization}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center; margin:32px 0 20px;">
                <a href="#"
                  style="display:inline-block; background:linear-gradient(135deg, #2563eb, #06b6d4); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 28px; border-radius:12px;">
                  View Appointment
                </a>
              </div>

              <p style="margin:0 0 14px; font-size:14px; line-height:1.8; color:#6b7280;">
                Please make sure to be available at least 10 minutes before your scheduled consultation.
              </p>

              <p style="margin:0; font-size:14px; line-height:1.8; color:#6b7280;">
                If you need to reschedule or cancel, please do so in advance.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px; background:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">
              <p style="margin:0; font-size:13px; color:#9ca3af;">
                © 2026 Your Clinic / Health Platform. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
