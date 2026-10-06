# Healthserve Health Consultancy — Premium GCC Healthcare Licensing Platform

A high-end, editorial, conversion-focused landing page engineered for Google Ads (PPC) campaigns and international healthcare candidates.

---

## Brand Guidelines & Visual Source of Truth

- **Brand Name**: Healthserve Health Consultancy
- **Logo**: Official logo preserved at `assets/healthserve-logo.png` with strict natural aspect ratio (282 × 56).
- **Official Colors**:
  - **Primary Orange**: `#F9A01B`
  - **Primary Blue**: `#2CC5F4`
  - **Slate Grey**: `#6D6E71`
  - **Black**: `#231F20`
  - **White**: `#FFFFFF`
- **Typography**:
  - **Headings**: `Raleway` (weights 600, 700, 800, 900)
  - **Supporting & Body**: `Avenir` / `Plus Jakarta Sans` (weights 400, 500, 600, 700)

---

## Architectural Sections & Visual Journey

1. **Sticky Header**: Minimalist advisory bar with Healthserve official logo, active GCC Licensing Advisory status indicator, direct advisor call link (`+971 50 998 8776`), and quick WhatsApp action.
2. **Hero Section (Cinematic Editorial Composition)**:
   - **Left**: Bold headline (*"Your GCC Healthcare Licence Starts With the Right Path."*), supporting lead, dual CTAs (*"Check My Eligibility"* and *"Talk to an Advisor"*), and regulated authorities badge row.
   - **Right**: Asymmetric composition featuring `assets/hero-nurse-dubai.jpg` (licensed South Asian nurse in a sunlit modern Dubai hospital corridor overlooking the city skyline) with a floating glass info badge (*"Licensing Guidance • Eligibility • Verification • Registration"*).
3. **Slim Trust Strip**: Clean typographic badge strip highlighting `DHA`, `DOH`, `SHA`, `MOHAP`, `SCFHS`, `DHP`, `NHRA`, and `OMSB`.
4. **The Interactive Hook ("Where Are You Planning to Practise?")**:
   - 7 large interactive profession cards: *Nurse*, *Doctor*, *Dentist*, *Pharmacist*, *Physiotherapist*, *Allied Health*, *Other*.
   - 6 destination panels: *UAE*, *Sharjah (SHA)*, *Saudi Arabia*, *Qatar*, *Bahrain*, *Oman*.
   - Dynamic pathway card updating in real time with soft glowing borders and animated indicators.
5. **"Your Path" Visual (5-Stage Animated Journey)**:
   - 01 Eligibility (*Review qualification and experience.*)
   - 02 Documents (*Prepare required records.*)
   - 03 Verification (*Primary source verification where applicable.*)
   - 04 Assessment\* (*Exam or assessment where applicable.*)
   - 05 Registration / Licence (*Proceed toward professional registration.*)
6. **GCC Destination Showcase**: Dedicated interactive panels for UAE, Sharjah (SHA), Saudi Arabia, Qatar, Bahrain, and Oman with one-line regulatory context.
7. **"Already Started?" Diagnostic Section**: Stage selector (*New Licence*, *Renewal*, *Transfer*, *Upgrade*, *Verification*, *Exam / Assessment*, *Other*) with an **"I'm Stuck →"** button triggering an instant diagnostic modal with pre-filled WhatsApp resolution.
8. **Document / Verification Visual ("Know What Comes Next.")**: Ultra-realistic clinical visual (`assets/doctor-consultation.jpg`) with floating UI chips highlighting qualification, experience, and DataFlow primary source validation.
9. **Why Healthserve ("Guidance Without the Guesswork.")**: 3 core principles (Eligibility First, Clear Process, Human Guidance) and an ethical disclaimer (*"We provide licensing guidance — not job or visa sales."*).
10. **Realistic Candidate Testimonials**: Transparent editorial cards with quotation styling and clear placeholder attribution (no fake faces or fake Google review badges).
11. **Social Proof Strip**: Clean trust credentials highlighting UAE operations and GCC-wide regulatory coverage.
12. **Final Conversion Block**: Asymmetric dark-slate card pairing a high-contrast CTA with a team editorial visual (`assets/healthcare-team.jpg`).
13. **3-Step Guided Onboarding Modal ("Let's Find Your Licensing Path.")**:
    - Step 1: English comfort (*Comfortable*, *Somewhat comfortable*, *Need support*)
    - Step 2: Full Name
    - Step 3: WhatsApp Number
    - Displays step counter (`01 / 03`, `02 / 03`, `03 / 03`), progress bar, and instant WhatsApp deep link on completion.
14. **Mobile Sticky Action Bar**: Bottom thumb-accessible quick-action bar with WhatsApp and "Check Eligibility →".

---

## PPC & Google Ads Tracking Taxonomy

Events automatically pushed to `window.dataLayer`:

| Event | Category | Trigger |
|---|---|---|
| **`eligibility_submitted`** | **Primary Conversion** | Guided onboarding completed & submitted |
| **`whatsapp_clicked`** | **Secondary Conversion** | Any WhatsApp button or advisor link clicked |
| **`call_clicked`** | **Secondary Conversion** | Direct advisor call link clicked |
| `eligibility_started` | Engagement | Onboarding modal opened |
| `profession_selected` | Navigation | Candidate selects a clinical profession |
| `destination_selected` | Navigation | Candidate selects a GCC destination |
| `pathway_viewed` | Engagement | Dynamic pathway calculated and viewed |
| `stuck_stage_selected` | Diagnostic | Candidate clicks an ongoing application stage |
| `diagnostic_opened` | Diagnostic | "I'm Stuck →" diagnostic modal opened |

### Attribution Preservation
All parameters (`gclid`, `fbclid`, `wbraid`, `gbraid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) are preserved across all interactions, forms, and WhatsApp pre-filled messages.

---

## Local Development & Preview

Static preview server:
```bash
node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]); fs.readFile(filePath, (err, data) => { if (err) { res.writeHead(404); res.end('Not found'); return; } const ext = path.extname(filePath); const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }[ext] || 'text/plain'; res.writeHead(200, { 'Content-Type': mime }); res.end(data); }); }); server.listen(4173, () => console.log('Server running on http://localhost:4173'));"
```

Preview URL: `http://localhost:4173`
