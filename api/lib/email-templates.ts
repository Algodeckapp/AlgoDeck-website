/**
 * Professional HTML Email Templates for AlgoDeck
 * Brand Colors: Navy (#05070F), Blue (#3A7BFF)
 */

const header = `
  <div style="background-color: #05070F; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <img src="https://algodeck.app/assets/logo-primary.png" alt="AlgoDeck" style="width: 180px; height: auto;" />
  </div>
`;


const footer = `
  <div style="padding: 30px 20px; text-align: center; color: #64748B; font-size: 12px;">
    <p>© ${new Date().getFullYear()} AlgoDeck. All rights reserved.</p>
    <p>Professional algorithmic trading automation for mobile.</p>
    <div style="margin-top: 20px;">
      <a href="https://algodeck.app" style="color: #3A7BFF; text-decoration: none; margin: 0 10px;">Website</a>
      <a href="https://algodeck.app/support" style="color: #3A7BFF; text-decoration: none; margin: 0 10px;">Support</a>
    </div>
  </div>
`;

const container = (content: string) => `
  <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
    ${header}
    <div style="padding: 40px 30px; color: #0F172A; line-height: 1.6;">
      ${content}
    </div>
    <div style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0;">
      ${footer}
    </div>
  </div>
`;

export const templates = {
  // 1. User: Contact Confirmation
  contactUser: (name: string, subject: string, message: string) => container(`
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; color: #05070F;">Message Received</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to AlgoDeck. This is an automated confirmation that we have received your inquiry regarding <strong>"${subject}"</strong>.</p>
    <p>Our technical desk has been notified, and one of our specialists will get back to you within 24 hours.</p>
    <div style="background-color: #F1F5F9; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; color: #64748B; margin-top: 0;">Your Message:</h3>
      <p style="margin-bottom: 0; font-style: italic;">"${message}"</p>
    </div>
    <p>In the meantime, feel free to explore our <a href="https://algodeck.app/docs" style="color: #3A7BFF; font-weight: 600;">Documentation</a> or join our community.</p>
  `),

  // 2. User: Demo Confirmation
  demoUser: (name: string) => container(`
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; color: #05070F;">Demo Request Confirmed</h1>
    <p>Hi ${name},</p>
    <p>We've received your request for a personalized demo of the AlgoDeck platform. We're excited to show you how our automation can transform your trading edge.</p>
    <p>A member of our sales team will contact you shortly to schedule a time that works best for you.</p>
    <div style="text-align: center; margin: 40px 0;">
      <a href="https://algodeck.app/features" style="background-color: #3A7BFF; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Explore Platform Features</a>
    </div>
  `),

  // 3. Admin: Notification (All fields)
  adminNotification: (title: string, fields: Array<{ label: string, value: string }>) => container(`
    <h1 style="font-size: 20px; font-weight: 700; margin-bottom: 10px; color: #3A7BFF;">${title}</h1>
    <p style="color: #64748B; margin-bottom: 30px;">A new submission has been received from the website.</p>
    <table style="width: 100%; border-collapse: collapse;">
      ${fields.map(f => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 12px; width: 140px; vertical-align: top;"><strong>${f.label}</strong></td>
          <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #0F172A; font-size: 14px;">${f.value || 'N/A'}</td>
        </tr>
      `).join('')}
    </table>
    <div style="margin-top: 40px; text-align: center;">
      <a href="https://algodeck.app/admin" style="color: #3A7BFF; font-weight: 600; font-size: 14px;">View in Admin Dashboard →</a>
    </div>
  `),

  // 4. User: Newsletter Welcome
  newsletterUser: (email: string) => container(`
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; color: #05070F;">Welcome to the Edge</h1>
    <p>Thank you for subscribing to the AlgoDeck newsletter. You've joined a community of data-driven traders focused on mobile-first automation.</p>
    <p>You'll now be the first to know about:</p>
    <ul style="padding-left: 20px;">
      <li style="margin-bottom: 10px;">New strategy factory updates</li>
      <li style="margin-bottom: 10px;">Platform optimization tips</li>
      <li style="margin-bottom: 10px;">Beta access to upcoming features</li>
    </ul>
    <p style="margin-top: 30px;">Your registered email: <strong>${email}</strong></p>
  `),

  // 5. User: Waitlist Confirmation
  waitlistUser: (name: string, source: string) => container(`
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; color: #05070F;">You're on the list!</h1>
    <p>Hi ${name},</p>
    <p>Thanks for your interest in the <strong>${source.replace('_', ' ')}</strong>. You have been successfully added to our priority waitlist.</p>
    <p>We're putting the finishing touches on the mobile experience and will notify you as soon as your access is ready.</p>
    <p>We appreciate your patience and your passion for better trading automation.</p>
  `)
};
