import type { APIRoute } from "astro";
import Brevo from "@getbrevo/brevo";

export const HEAD: APIRoute = async ({ request }) => {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstname = data.get("firstname") as string;
  const lastname = data.get("lastname") as string;
  const phone = data.get("phone")as string;
  const email = data.get("email")as string;
  const message = data.get("message")as string;
  const turnstileToken = data.get("cf-turnstile-response") as string | undefined;

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
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, import.meta.env.BREVO_API_KEY);

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "New Contact Form Submission";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: "Sunrise Vista Media", email: "info@cobaltweb.tech" };
  sendSmtpEmail.to = [{ email: "cgarza@cobaltweb.tech" }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return new Response(
      JSON.stringify({
        success: true,
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
        error: true,
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
      secret: import.meta.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })

  return await response.json()
}
