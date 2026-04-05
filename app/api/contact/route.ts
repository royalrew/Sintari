import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { name, company, email, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Namn och e-post krävs." }, { status: 400 });
  }

  await transporter.sendMail({
    from: `"Sintari Hemsida" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_FROM,
    replyTo: email,
    subject: `Ny förfrågan från ${name}${company ? ` (${company})` : ""}`,
    text: `Namn: ${name}\nFöretag: ${company || "–"}\nE-post: ${email}\n\nMeddelande:\n${message || "–"}`,
    html: `
      <h2>Ny förfrågan via sintari.se</h2>
      <p><strong>Namn:</strong> ${name}</p>
      <p><strong>Företag:</strong> ${company || "–"}</p>
      <p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Meddelande:</strong></p>
      <p>${(message || "–").replace(/\n/g, "<br>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
