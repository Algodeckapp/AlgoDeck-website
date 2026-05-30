import { Resend } from 'resend';
import { env } from './env.js';

const resend = new Resend(env.resendApiKey);

export async function sendEmail(to: string, subject: string, html: string) {
  if (!env.resendApiKey) {
    console.warn("[Email] RESEND_API_KEY is not set, skipping email.");
    return;
  }

  try {
    await resend.emails.send({
      from: 'AlgoDeck <team@algodeck.app>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
  }
}
