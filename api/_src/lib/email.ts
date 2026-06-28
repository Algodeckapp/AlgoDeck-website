import { Resend } from 'resend';
import { env } from './env.js';

let resend: Resend | null = null;

function getResend() {
  if (resend) return resend;
  if (!env.resendApiKey) {
    return null;
  }
  try {
    resend = new Resend(env.resendApiKey);
    return resend;
  } catch (error) {
    console.error("[Email] Failed to initialize Resend client:", error);
    return null;
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  const client = getResend();
  
  if (!client) {
    console.warn(`[Email] Skipping email to ${to} (RESEND_API_KEY not set or invalid).`);
    // Log the email content to console in dev mode so it's not lost
    if (!env.isProduction) {
      console.log(`[DEV EMAIL PREVIEW] To: ${to} | Subject: ${subject}`);
    }
    return;
  }

  try {
    await client.emails.send({
      from: 'AlgoDeck <team@algodeck.app>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
  }
}
