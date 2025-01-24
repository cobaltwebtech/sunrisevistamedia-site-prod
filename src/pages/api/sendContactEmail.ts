import type { APIRoute } from "astro";
import Brevo from "@getbrevo/brevo";

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const turnstileToken = data.get("cf-turnstile-response");

  // Verify Turnstile token
  const turnstileVerification = await verifyTurnstileToken(turnstileToken as string);
  if (!turnstileVerification.success) {
    return new Response(
      JSON.stringify({
        message: "Turnstile verification failed. Please try again.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Configure Brevo API client
  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "New Contact Form Submission";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: "Your Website", email: process.env.EMAIL_FROM };
  sendSmtpEmail.to = [{ email: process.env.EMAIL_TO }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return new Response(
      JSON.stringify({
        message: "Your message has been sent successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "There was an error sending your message. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

async function verifyTurnstileToken(token: string) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })

  return await response.json()
}
