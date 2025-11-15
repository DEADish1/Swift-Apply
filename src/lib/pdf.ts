// PDF generation utilities for resume export

export interface ResumeData {
  contact: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  headline?: string;
  summary?: string;
  experiences: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  skills: string[];
  education?: {
    school: string;
    degree?: string;
    field?: string;
    endDate?: string;
  }[];
}

export function generateResumeHTML(data: ResumeData): string {
  const experienceHTML = data.experiences
    .map(
      (exp) => `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>${exp.title}</strong><br/>
            <span style="color: #666;">${exp.company}</span>
          </div>
          <div style="text-align: right; color: #666; font-size: 14px;">
            ${exp.startDate} - ${exp.endDate}<br/>
            ${exp.location}
          </div>
        </div>
        <ul style="margin-top: 8px; padding-left: 20px;">
          ${exp.bullets.map((b) => `<li style="margin-bottom: 4px;">${b}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  const skillsHTML = data.skills.join(" • ");

  const educationHTML = data.education
    ? data.education
        .map(
          (edu) => `
        <div style="margin-bottom: 8px;">
          <strong>${edu.school}</strong>
          ${edu.degree ? `<br/>${edu.degree}${edu.field ? ` in ${edu.field}` : ""}` : ""}
          ${edu.endDate ? `<br/><span style="color: #666; font-size: 14px;">${edu.endDate}</span>` : ""}
        </div>
      `
        )
        .join("")
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .name {
          font-size: 32px;
          font-weight: bold;
          margin: 0;
        }
        .contact {
          color: #666;
          margin-top: 8px;
        }
        .headline {
          color: #2563eb;
          font-size: 18px;
          font-weight: 600;
          margin-top: 16px;
        }
        .section {
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
          margin-bottom: 12px;
        }
        ul {
          margin: 0;
        }
        li {
          margin-bottom: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="name">${data.contact.name}</h1>
        <div class="contact">
          ${data.contact.email} • ${data.contact.phone} • ${data.contact.location}
        </div>
        ${data.headline ? `<div class="headline">${data.headline}</div>` : ""}
      </div>

      ${
        data.summary
          ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${data.summary}</p>
        </div>
      `
          : ""
      }

      <div class="section">
        <div class="section-title">Professional Experience</div>
        ${experienceHTML}
      </div>

      <div class="section">
        <div class="section-title">Skills</div>
        <p>${skillsHTML}</p>
      </div>

      ${
        educationHTML
          ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${educationHTML}
        </div>
      `
          : ""
      }
    </body>
    </html>
  `;
}
