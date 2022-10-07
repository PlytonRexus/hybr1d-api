const mailTemplates = {
  REGISTRATION: { name: 'registration-template', subject: 'Welcome to the  Family!' },
  LOGIN_OTP: { name: 'login-otp-template', subject: 'OTP for logging in' },
  CONTACT_US: { name: 'contact-us-template', subject: 'Contact Request on Website' },
  STATUS_CHANGE: { name: 'status-change-template', subject: 'Application Status Changed' },
  APPLICATION_ACCEPTED: { name: 'application-accepted-template', subject: 'Application Accepted' },
  APPLICATION_REJECTED: { name: 'application-rejected-template', subject: 'Application Rejected' }
}
module.exports = mailTemplates
