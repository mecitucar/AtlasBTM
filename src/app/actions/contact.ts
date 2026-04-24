"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;

  if (!name || !email || !description) {
    return { success: false, error: "missing_fields" };
  }

  const files = formData.getAll("files") as File[];
  const attachments = await Promise.all(
    files
      .filter((f) => f.size > 0)
      .map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
  );

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #bf0a28; border-bottom: 2px solid #bf0a28; padding-bottom: 10px;">
        Nouvelle Demande de Devis / New Quote Request
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Nom / Name:</td><td style="padding: 8px;">${name}</td></tr>
        <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">E-mail:</td><td style="padding: 8px;">${email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Tel:</td><td style="padding: 8px;">${phone || "-"}</td></tr>
        <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">Societe / Company:</td><td style="padding: 8px;">${company || "-"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Sujet / Subject:</td><td style="padding: 8px;">${subject || "-"}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 3px solid #bf0a28;">
        <strong>Description:</strong><br/><br/>
        ${description.replace(/\n/g, "<br/>")}
      </div>
      ${attachments.length > 0 ? `<p style="margin-top: 15px; color: #666;">Fichiers joints / Attachments: ${attachments.length}</p>` : ""}
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;"/>
      <p style="color: #999; font-size: 12px;">Atlas Batiment Modulaire - Contact Form</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Atlas BTM - Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Atlas BTM] ${subject || "Demande de devis"} - ${name}`,
      html: htmlBody,
      attachments,
    });
    return { success: true };
  } catch {
    return { success: false, error: "send_failed" };
  }
}
