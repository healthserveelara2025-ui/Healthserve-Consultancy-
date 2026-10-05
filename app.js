/**
 * HEALTHSERVE HEALTH CONSULTANCY — PPC CONVERSION ENGINE
 * Architecture:
 * 1. Google Ads / GTM Conversion Event Hooks
 * 2. URL Attribution & UTM Parameter Capture
 * 3. Two-Stage Lead Qualification State
 * 4. Critical Entry Gate & Unlock Sequence
 * 5. Interactive Destination Panels
 * 6. Journey Stage & Personal Situation Engine
 * 7. Stuck Cases Modal / Drawer System (8 Services)
 * 8. 6 On-Page Interactive Evaluation Tools
 * 9. Contextual WhatsApp Message Generator
 */

(function () {
  'use strict';

  // ==========================================
  // CONFIGURATION & CONSTANTS
  // ==========================================
  const HEALTHSERVE_PHONE = '+971 502720059';
  const HEALTHSERVE_WHATSAPP_NUM = '971502720059';

  // Initialize dataLayer for Google Tag Manager / Google Ads
  window.dataLayer = window.dataLayer || [];

  function trackEvent(eventName, customParams = {}) {
    const eventPayload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      lead_profile: {
        english_comfort: leadState.english_comfort || 'not_set',
        has_name: Boolean(leadState.name),
        has_whatsapp: Boolean(leadState.whatsapp),
        profession: leadState.profession,
        destination: leadState.destination,
        journey_stage: leadState.journey_stage,
        experience: leadState.experience
      },
      attribution: {
        utm_source: leadState.utm_source,
        utm_medium: leadState.utm_medium,
        utm_campaign: leadState.utm_campaign,
        utm_term: leadState.utm_term,
        gclid: leadState.gclid
      },
      ...customParams
    };

    window.dataLayer.push(eventPayload);
    console.log('[Analytics Event]', eventName, eventPayload);
  }

  // Google Sheets Webhook URL (Target Sheet: https://docs.google.com/spreadsheets/d/1g6W43-BMVKRhh_C87RNIshg3TF54gIt9Mcq8bQLn6pQ/edit)
  let GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwnOWJqKBqWrr1DJplMY2rtkE4DCWctzZigfU11UjO1FB9kgqsZu5NIWKaeXSDc7Jiz1g/exec';

  function sendLeadToGoogleSheet(extra = {}) {
    const payload = {
      timestamp: new Date().toISOString(),
      name: leadState.name || 'Anonymous Candidate',
      whatsapp: leadState.whatsapp || '',
      english_comfort: leadState.english_comfort || 'Not specified',
      profession: leadState.profession || 'Healthcare Professional',
      destination: leadState.destination || 'GCC',
      experience: leadState.experience || 'Not specified',
      journey_stage: leadState.journey_stage || 'Planning & Exploring',
      utm_source: leadState.utm_source || 'google_search_ads',
      utm_medium: leadState.utm_medium || 'cpc',
      utm_campaign: leadState.utm_campaign || 'gcc_healthcare',
      utm_term: leadState.utm_term || '',
      gclid: leadState.gclid || '',
      landing_page: window.location.href,
      target_sheet: 'https://docs.google.com/spreadsheets/d/1g6W43-BMVKRhh_C87RNIshg3TF54gIt9Mcq8bQLn6pQ/edit',
      ...extra
    };

    // 1. Store locally in browser storage for audit, offline safety, and instant export
    try {
      const db = JSON.parse(localStorage.getItem('healthserve_sheet_leads') || '[]');
      db.unshift(payload);
      localStorage.setItem('healthserve_sheet_leads', JSON.stringify(db));
      console.log('📊 [Lead Capture] Lead stored in browser cache (Total leads: ' + db.length + '):', payload);
    } catch (e) {}

    // 2. Dispatch to local Node server endpoint (/api/leads) for server-side persistence
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json()).then(res => {
        console.log('💾 [Lead Capture] Saved to server leads.json:', res);
      }).catch(() => {});
    } catch (e) {}

    // 3. Dispatch to live Google Sheet Apps Script webhook if configured
    const activeWebhook = GOOGLE_SHEET_WEBHOOK_URL || (function() {
      try { return localStorage.getItem('healthserve_webhook_url') || ''; } catch(e) { return ''; }
    })();

    if (activeWebhook && activeWebhook.startsWith('https://script.google.com/')) {
      try {
        fetch(activeWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(() => {
          console.log('✅ [Google Sheets Integration] Transmitted to G Ads Lead Sheet successfully');
        }).catch(err => {
          console.warn('⚠️ [Google Sheets Integration] Fetch warning:', err);
        });
      } catch (err) {
        console.warn('⚠️ [Google Sheets Integration] Network error:', err);
      }
    }
    return payload;
  }

  // ==========================================
  // ATTRIBUTION CAPTURE (GCLID & UTM PARAMS)
  // ==========================================
  function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const webhookParam = urlParams.get('webhook') || urlParams.get('sheet_webhook');
    if (webhookParam && webhookParam.startsWith('https://script.google.com/')) {
      try {
        localStorage.setItem('healthserve_webhook_url', webhookParam);
        console.log('🔗 [Google Sheet Integration] Active Webhook registered from URL:', webhookParam);
      } catch(e) {}
    }

    return {
      utm_source: urlParams.get('utm_source') || 'google_search_ads',
      utm_medium: urlParams.get('utm_medium') || 'cpc',
      utm_campaign: urlParams.get('utm_campaign') || 'gcc_healthcare_careers',
      utm_term: urlParams.get('utm_term') || 'nurse_jobs_dubai',
      utm_content: urlParams.get('utm_content') || '',
      gclid: urlParams.get('gclid') || '',
      referrer: document.referrer || ''
    };
  }

  const attributionData = parseUrlParameters();

  // Restore leadState if user refreshed, else initialize fresh
  let leadState = {
    english_comfort: '',
    name: '',
    country_code: '+91',
    whatsapp: '',
    profession: 'Nurse',
    destination: 'UAE',
    journey_stage: 'Planning',
    experience: '3-5 years',
    stuck_situation: '',
    landing_page: window.location.href,
    ...attributionData
  };

  try {
    const saved = sessionStorage.getItem('healthserve_lead_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      leadState = { ...leadState, ...parsed };
    }
  } catch (e) {
    console.warn('SessionStorage unavailable');
  }

  function saveLeadState() {
    try {
      sessionStorage.setItem('healthserve_lead_state', JSON.stringify(leadState));
    } catch (e) {}
  }

  // ==========================================
  // DOM LOAD & ENTRY GATE LOGIC
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initEntryGate();
    initHeroVideo();
    initHeroInsiderCard();
    initDestinations();
    initSituationSelector();
    initHookEligibilityForm();
    initStuckCaseModals();
    initInteractiveTools();
    initQualificationForm();
    initFaqAccordion();
    initStickyBar();
    initWhatsAppLinks();
    initReviewsSection();

    // Track entry gate view on initial load
    trackEvent('entry_gate_view');
  });

  // ==========================================
  // HERO INSIDER CARD CONTROLLER (PARALLAX & SCROLL)
  // ==========================================
  function initHeroInsiderCard() {
    const insiderCard = document.getElementById('heroInsiderCard');
    const scrollCta = document.getElementById('heroInsiderScrollCta');

    if (scrollCta) {
      scrollCta.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('.education-hook-section') || document.getElementById('destinations') || document.getElementById('hookEligibilitySection');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          trackEvent('hero_insider_scroll_click');
        }
      });
    }

    // Subtle performance-friendly parallax for desktop only
    if (insiderCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (window.innerWidth > 992) {
              const scrollY = window.scrollY;
              if (scrollY < 650) {
                insiderCard.style.transform = `translateY(${scrollY * 0.04}px)`;
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // ==========================================
  // 1. ENTRY GATE CONTROLLER
  // ==========================================
  function initEntryGate() {
    const gateOverlay = document.getElementById('entryGateOverlay');
    const gateForm = document.getElementById('entryGateForm');
    const englishOptions = document.querySelectorAll('input[name="gateEnglish"]');
    const nameInput = document.getElementById('gateName');
    const countryCodeSelect = document.getElementById('gateCountryCode');
    const phoneInput = document.getElementById('gatePhone');
    const gateNameGroup = document.getElementById('gateNameGroup');
    const gatePhoneGroup = document.getElementById('gatePhoneGroup');
    const gateNameError = document.getElementById('gateNameError');
    const gatePhoneError = document.getElementById('gatePhoneError');
    const gateSubmitBtn = document.getElementById('gateSubmitBtn');
    const gateSkipBtn = document.getElementById('gateSkipBtn');
    const welcomeBar = document.getElementById('userWelcomeBar');
    const welcomeNameDisplay = document.getElementById('welcomeUserName');

    if (!gateOverlay || !gateForm) return;

    // Track form start on first interaction
    let formStarted = false;
    function markFormStart() {
      if (!formStarted) {
        formStarted = true;
        trackEvent('entry_form_start');
      }
    }

    englishOptions.forEach(opt => {
      opt.addEventListener('change', (e) => {
        markFormStart();
        document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
        e.target.closest('.radio-card').classList.add('active');
        leadState.english_comfort = e.target.value;
        saveLeadState();
      });
    });

    nameInput.addEventListener('input', () => {
      markFormStart();
      leadState.name = nameInput.value.trim();
      if (gateNameError) gateNameError.style.display = 'none';
      if (gateNameGroup) gateNameGroup.classList.remove('has-error', 'shake-error');
      nameInput.style.borderColor = '';
    });

    phoneInput.addEventListener('input', () => {
      markFormStart();
      leadState.whatsapp = phoneInput.value.trim();
      if (gatePhoneError) gatePhoneError.style.display = 'none';
      if (gatePhoneGroup) gatePhoneGroup.classList.remove('has-error', 'shake-error');
      phoneInput.style.borderColor = '';
    });

    countryCodeSelect.addEventListener('change', () => {
      leadState.country_code = countryCodeSelect.value;
    });

    // If previously completed in this session, hide gate smoothly & remove from display
    if (leadState.name && leadState.whatsapp && leadState.english_comfort) {
      gateOverlay.classList.add('hidden');
      gateOverlay.style.display = 'none';
      if (welcomeBar && welcomeNameDisplay) {
        welcomeNameDisplay.textContent = leadState.name;
        welcomeBar.classList.add('visible');
      }
      const hookNameInput = document.getElementById('hookName');
      const hookPhoneInput = document.getElementById('hookPhone');
      if (hookNameInput) hookNameInput.value = leadState.name;
      if (hookPhoneInput) {
        const rawNum = leadState.whatsapp.replace(/^\+\d+\s*/, '');
        hookPhoneInput.value = rawNum || leadState.whatsapp;
      }
      updateDynamicWhatsAppLinks();
    }

    // Skip handler for visitors who want to browse general pathways first
    if (gateSkipBtn) {
      gateSkipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        trackEvent('entry_gate_skip');
        leadState.name = leadState.name || 'Healthcare Professional';
        leadState.whatsapp = leadState.whatsapp || 'Provided Later';
        leadState.english_comfort = leadState.english_comfort || 'Comfortable in English';
        saveLeadState();

        gateOverlay.style.transition = 'opacity 0.3s ease';
        gateOverlay.style.opacity = '0';
        setTimeout(() => {
          gateOverlay.classList.add('hidden');
          gateOverlay.style.display = 'none';
          if (welcomeBar && welcomeNameDisplay) {
            welcomeNameDisplay.textContent = leadState.name;
            welcomeBar.classList.add('visible');
          }
          trackEvent('landing_page_view');
          updateDynamicWhatsAppLinks();
        }, 300);
      });
    }

    gateForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedEnglish = document.querySelector('input[name="gateEnglish"]:checked');
      if (!selectedEnglish) {
        alert('Please select your English communication preference to continue.');
        return;
      }

      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        if (gateNameError) gateNameError.style.display = 'flex';
        if (gateNameGroup) {
          gateNameGroup.classList.add('has-error', 'shake-error');
          setTimeout(() => gateNameGroup.classList.remove('shake-error'), 500);
        }
        nameInput.focus();
        return;
      }

      const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
      if (!phoneVal || phoneVal.length < 7) {
        if (gatePhoneError) gatePhoneError.style.display = 'flex';
        if (gatePhoneGroup) {
          gatePhoneGroup.classList.add('has-error', 'shake-error');
          setTimeout(() => gatePhoneGroup.classList.remove('shake-error'), 500);
        }
        phoneInput.focus();
        return;
      }

      // Show interactive button loading state
      if (gateSubmitBtn) {
        gateSubmitBtn.disabled = true;
        gateSubmitBtn.innerHTML = `
          <svg class="btn-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#FFFFFF"></path>
          </svg>
          <span>Unlocking Your Guidance...</span>
        `;
      }

      leadState.english_comfort = selectedEnglish.value;
      leadState.name = nameVal;
      leadState.country_code = countryCodeSelect.value;
      leadState.whatsapp = `${leadState.country_code} ${phoneVal}`;
      saveLeadState();

      // Automatically sync to Google Sheets
      sendLeadToGoogleSheet({
        form_source: 'entry_gate_step1'
      });

      // Synchronize embedded Curiosity Hook form inputs
      const hookNameInput = document.getElementById('hookName');
      const hookPhoneInput = document.getElementById('hookPhone');
      if (hookNameInput) hookNameInput.value = leadState.name;
      if (hookPhoneInput) hookPhoneInput.value = phoneVal;

      // Track conversion events
      trackEvent('entry_form_complete', {
        name: leadState.name,
        phone: leadState.whatsapp,
        english_comfort: leadState.english_comfort
      });

      // Smooth unlock transition with guaranteed display: none
      gateOverlay.style.transition = 'opacity 0.35s ease';
      gateOverlay.style.opacity = '0';
      setTimeout(() => {
        gateOverlay.classList.add('hidden');
        gateOverlay.style.display = 'none';
        if (welcomeBar && welcomeNameDisplay) {
          welcomeNameDisplay.textContent = leadState.name;
          welcomeBar.classList.add('visible');
        }
        trackEvent('landing_page_view');
        updateDynamicWhatsAppLinks();
      }, 350);
    });
  }

  // ==========================================
  // 1B. HERO BACKGROUND VIDEO CONTROLLER
  // ==========================================
  function initHeroVideo() {
    const video = document.getElementById('heroBgVideo');
    const toggleBtn = document.getElementById('heroVideoToggle');
    if (!video || !toggleBtn) return;

    const iconPause = toggleBtn.querySelector('.icon-pause');
    const iconPlay = toggleBtn.querySelector('.icon-play');
    const statusText = toggleBtn.querySelector('.video-status-text');

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Hero video autoplay delayed:', err);
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        if (statusText) statusText.textContent = 'Play Video';
      });
    }

    toggleBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        if (statusText) statusText.textContent = 'Video Playing';
      } else {
        video.pause();
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        if (statusText) statusText.textContent = 'Play Video';
      }
    });
  }

  // ==========================================
  // 2. GCC DESTINATION SELECTOR
  // ==========================================
  const destinationData = {
    uae: {
      title: 'United Arab Emirates (UAE)',
      regulators: ['DHA (Dubai)', 'DOH (Abu Dhabi)', 'MOHAP (Northern Emirates)'],
      overview: 'The UAE operates three distinct healthcare regulatory bodies. Dubai facilities fall under Dubai Health Authority (DHA), Abu Dhabi and Al Ain under Department of Health (DOH), while Sharjah, Ajman, RAK, Fujairah, and UAQ fall under MOHAP. Professionals can also benefit from the Unified Healthcare Professional Qualification Requirements (PQR).',
      checklist: [
        'Primary Source Verification (DataFlow PSV) required for qualifications, experience & licensing',
        'Prometric or Pearson VUE Computer-Based Testing (CBT) / Oral assessment where applicable',
        'PQR guidelines determine required clinical years post-registration based on educational tier',
        'Eligibility Letter granted upon passing enables direct facility job sponsorship'
      ],
      defaultAuthority: 'DHA / DOH / MOHAP'
    },
    saudi: {
      title: 'Kingdom of Saudi Arabia (KSA)',
      regulators: ['SCFHS (Saudi Commission for Health Specialties)'],
      overview: 'All healthcare professionals practising in Saudi Arabia must obtain professional classification and registration through SCFHS via the official Mumaris+ portal. Saudi Arabia is actively hiring healthcare workers for major Vision 2030 healthcare transformations, King Fahad Medical City, and premier hospital clusters.',
      checklist: [
        'SCFHS DataFlow Primary Source Verification report mandatory',
        'SCFHS Prometric Examination for designated professional categories',
        'Professional classification certificate issued through Mumaris+',
        'Minimum required clinical experience post-internship depending on tier'
      ],
      defaultAuthority: 'SCFHS'
    },
    qatar: {
      title: 'State of Qatar',
      regulators: ['DHP / QCHP (Department of Healthcare Professions)'],
      overview: 'The Department of Healthcare Professions (DHP), operating under the Ministry of Public Health (MoPH) in Qatar, regulates the licensing of all healthcare practitioners in governmental and private healthcare facilities across the country, including Hamad Medical Corporation and Sidra Medicine.',
      checklist: [
        'Mandatory DataFlow verification of academic certificates and employment credentials',
        'Prometric Computer-Based Qualifying Examination for nurses and allied health',
        'Certificate of Good Standing from recent council within 6 months validity',
        'Evaluation letter issued enabling licensing under sponsoring healthcare facility'
      ],
      defaultAuthority: 'DHP / QCHP'
    },
    bahrain: {
      title: 'Kingdom of Bahrain',
      regulators: ['NHRA (National Health Regulatory Authority)'],
      overview: 'The National Health Regulatory Authority (NHRA) governs all healthcare practice in Bahrain. Healthcare professionals must meet NHRA qualification standards and submit documentation through authorized primary source verification channels before obtaining licensure.',
      checklist: [
        'DataFlow verification of credentials and clinical practice certificates',
        'Licensure examination through Prometric or local NHRA board exam',
        'Verification of professional council registration and uninterrupted clinical practice',
        'Licence activation upon contract with a licensed medical facility in Bahrain'
      ],
      defaultAuthority: 'NHRA'
    },
    oman: {
      title: 'Sultanate of Oman',
      regulators: ['OMSB (Oman Medical Specialty Board) & MoH Oman'],
      overview: 'Healthcare professionals intending to work in Oman are evaluated through the Oman Medical Specialty Board (OMSB) and Ministry of Health. Oman requires rigorous credential verification and designated Pearson VUE / Prometric examination prior to viva or licence issuance.',
      checklist: [
        'DataFlow primary source verification required prior to exam booking or viva',
        'Pearson VUE / OMSB qualifying computer-based examination',
        'Proof of continuous clinical practice and valid home country council licence',
        'Ministry of Health clinical interview/viva where applicable by specialty'
      ],
      defaultAuthority: 'OMSB'
    }
  };

  function initDestinations() {
    const tabBtns = document.querySelectorAll('.dest-tab-btn');
    const panelContent = document.getElementById('destPanelContent');
    if (!tabBtns.length || !panelContent) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const destKey = btn.dataset.dest;
        const data = destinationData[destKey];
        if (!data) return;

        leadState.destination = data.title;
        saveLeadState();

        trackEvent('pathway_selection', {
          destination_selected: data.title,
          authority: data.defaultAuthority
        });

        // Render panel content smoothly
        panelContent.innerHTML = `
          <div class="dest-panel-grid">
            <div class="dest-panel-info">
              <h3>${data.title}</h3>
              <div class="dest-regulators-badges">
                ${data.regulators.map(r => `<span class="reg-badge-tag">${r}</span>`).join('')}
              </div>
              <p class="dest-desc">${data.overview}</p>
              <ul class="dest-checklist">
                ${data.checklist.map(item => `
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
              <div class="applicable-tag" style="margin-bottom: 1.25rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Requirements vary by profession, qualification tier & clinical years
              </div>
            </div>
            <div class="dest-panel-card">
              <h4>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#30C4F2" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Explore Your Pathway for ${data.defaultAuthority}
              </h4>
              <p>Wondering if your specific qualification and years of experience qualify you under ${data.defaultAuthority} regulations?</p>
              <button class="btn-primary" style="font-size: 0.9rem; padding: 0.75rem 1.25rem;" onclick="window.HealthserveApp.syncAndScrollToForm('${data.defaultAuthority}')">
                Check My ${data.defaultAuthority} Eligibility
              </button>
            </div>
          </div>
        `;

        updateDynamicWhatsAppLinks();
      });
    });
  }

  // ==========================================
  // 3. PERSONAL SITUATION SELECTOR ENGINE
  // ==========================================
  const situationInsights = {
    starting: {
      title: "Stage: Just Starting Out",
      advice: "You want to work in the GCC but haven't chosen a regulator or checked eligibility requirements. The ideal first step is comparing destinations (e.g. Dubai vs Saudi Arabia) based on your exact qualification tier and experience.",
      steps: [
        "1. Identify whether your diploma/degree is recognized by destination PQR",
        "2. Calculate post-registration clinical experience requirements",
        "3. Review timeline and primary document preparation"
      ],
      stageName: "I'm Just Starting"
    },
    checking: {
      title: "Stage: Evaluating Eligibility",
      advice: "You have your qualification certificates and want to confirm whether your profile meets the destination authority's criteria before committing financial resources to DataFlow or exams.",
      steps: [
        "1. Check credential equivalency against latest Unified Healthcare PQR",
        "2. Confirm continuous clinical practice without unexplained gaps",
        "3. Determine if Prometric / CBT examination applies to your category"
      ],
      stageName: "I'm Checking My Eligibility"
    },
    started: {
      title: "Stage: Application in Progress",
      advice: "You have already initiated your DataFlow or regulator portal profile (such as Sheryan, Mumaris+, or DOH portal) and want to ensure smooth progression without receiving rejection remarks or verification discrepancies.",
      steps: [
        "1. Audit existing document submissions for compliance",
        "2. Monitor Primary Source Verification (PSV) timeline",
        "3. Prepare for examination scheduling once PSV report concludes"
      ],
      stageName: "I've Started Licensing"
    },
    stuck: {
      title: "Stage: Delayed, Disputed, or Stuck Case",
      advice: "Something is delaying or blocking your application — such as a negative or unable-to-verify DataFlow report, missing verification response from a university, or portal rejection. You do not always need to start from scratch.",
      steps: [
        "1. Perform forensic case review on discrepancy or rejection remarks",
        "2. Contact issuing institutions or file an official appeal/re-review",
        "3. Submit missing documentation under specialist guidance"
      ],
      stageName: "I'm Stuck"
    },
    licensed: {
      title: "Stage: Existing License Holder",
      advice: "You already hold an active or expired GCC healthcare license and require a facility transfer, professional title upgrade (e.g. Registered Nurse to Specialist Nurse), additional qualification endorsement, or re-registration.",
      steps: [
        "1. Review renewal or transfer prerequisites between medical facilities",
        "2. Submit upgrade documentation under updated PQR criteria",
        "3. Secure Good Standing Certificates with valid dates"
      ],
      stageName: "I Already Have a License"
    }
  };

  function initSituationSelector() {
    const situationBtns = document.querySelectorAll('.situation-btn');
    const resultBox = document.getElementById('situationResultBox');
    if (!situationBtns.length || !resultBox) return;

    situationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        situationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const sitKey = btn.dataset.situation;
        const insight = situationInsights[sitKey];
        if (!insight) return;

        leadState.journey_stage = insight.stageName;
        saveLeadState();

        trackEvent('pathway_selection', {
          situation_selected: insight.stageName
        });

        resultBox.innerHTML = `
          <div class="situation-result-info">
            <span class="section-tag" style="margin-bottom: 0.5rem;">Personalized Assessment</span>
            <h3>${insight.title}</h3>
            <p>${insight.advice}</p>
            <ul class="situation-recommended-steps">
              ${insight.steps.map(s => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${s}</li>`).join('')}
            </ul>
          </div>
          <div class="situation-result-cta">
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Connect directly with our Dubai licensing specialists for this situation:
            </p>
            <button type="button" class="btn-primary js-situation-whatsapp-btn" onclick="window.HealthserveApp.redirectSituationToWhatsApp('${insight.stageName}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.504 2 2.016 6.488 2.016 12.015c0 1.93.551 3.73 1.504 5.253L2 22l4.89-1.488c1.47.85 3.17 1.33 4.981 1.33 5.527 0 10.016-4.488 10.016-10.015C21.887 6.488 17.558 2 12.031 2zm5.79 14.18c-.24.67-1.39 1.25-1.92 1.32-.51.07-1.16.1-3.37-.8-2.65-1.08-4.35-3.8-4.48-3.97-.13-.17-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.32.7-.32.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.75 1.83.82 1.97.07.14.12.3.02.48-.09.18-.14.3-.28.46-.14.16-.3.35-.43.47-.14.13-.29.28-.13.55.17.28.74 1.22 1.6 1.98 1.1.98 2.03 1.29 2.31 1.43.29.14.46.12.63-.08.18-.19.74-.86.94-1.15.2-.3.4-.25.68-.15.27.1 1.74.82 2.04.97.3.15.5.23.57.35.08.12.08.72-.16 1.39z"/>
              </svg>
              <span>Get WhatsApp Guidance on This Step →</span>
            </button>
          </div>
        `;

        updateDynamicWhatsAppLinks();
      });
    });
  }

  // ==========================================
  // 3.5. EMBEDDED CURIOSITY HOOK ELIGIBILITY FORM
  // ==========================================
  function initHookEligibilityForm() {
    const form = document.getElementById('hookEligibilityForm');
    if (!form) return;

    const profSelect = document.getElementById('hookProf');
    const destSelect = document.getElementById('hookDest');
    const expSelect = document.getElementById('hookExp');
    const stageSelect = document.getElementById('hookStage');
    const nameInput = document.getElementById('hookName');
    const phoneInput = document.getElementById('hookPhone');
    const countryCodeSelect = document.getElementById('hookCountryCode');
    const syncStatusEl = document.getElementById('hookSyncStatus');

    // Pre-populate if available from entry gate
    if (leadState.name && nameInput) nameInput.value = leadState.name;
    if (leadState.whatsapp && phoneInput) {
      const cleanPhone = leadState.whatsapp.replace(/^\+\d+\s*/, '');
      phoneInput.value = cleanPhone || leadState.whatsapp;
    }
    if (leadState.country_code && countryCodeSelect) {
      countryCodeSelect.value = leadState.country_code;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const profVal = profSelect ? profSelect.value : '';
      const destVal = destSelect ? destSelect.value : '';
      const expVal = expSelect ? expSelect.value : '';
      const stageVal = stageSelect ? stageSelect.value : '';
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const codeVal = countryCodeSelect ? countryCodeSelect.value : '+91';
      const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';

      if (!profVal) {
        alert('Please select your healthcare profession.');
        if (profSelect) profSelect.focus();
        return;
      }
      if (!destVal) {
        alert('Please select your target GCC destination authority.');
        if (destSelect) destSelect.focus();
        return;
      }
      if (!nameVal || nameVal.length < 2) {
        alert('Please enter your full name.');
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phoneVal || phoneVal.length < 7) {
        alert('Please enter your valid WhatsApp mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      const fullWhatsApp = `${codeVal} ${phoneVal}`;

      // Update global lead state
      leadState.profession = profVal;
      leadState.destination = destVal;
      leadState.experience = expVal;
      leadState.journey_stage = stageVal;
      leadState.name = nameVal;
      leadState.whatsapp = fullWhatsApp;
      leadState.country_code = codeVal;
      saveLeadState();

      // Visual feedback in UI
      if (syncStatusEl) {
        syncStatusEl.innerHTML = '<span class="live-dot" style="background:#10B981"></span> Verification request submitted! Connecting to WhatsApp specialist...';
        syncStatusEl.style.color = '#047857';
      }

      // Record lead in Google Sheets (and browser backup database)
      sendLeadToGoogleSheet({
        source_form: 'Curiosity Hook Interactive Pre-Screening',
        profession: profVal,
        destination: destVal,
        experience: expVal,
        journey_stage: stageVal,
        name: nameVal,
        whatsapp: fullWhatsApp
      });

      // Track GTM Conversion Events
      trackEvent('hook_eligibility_complete', {
        profession: profVal,
        destination: destVal,
        experience: expVal,
        journey_stage: stageVal
      });
      trackEvent('eligibility_form_complete', {
        profession: profVal,
        destination: destVal,
        experience: expVal,
        journey_stage: stageVal
      });

      updateDynamicWhatsAppLinks();

      // Generate structured WhatsApp enquiry
      const waMessage = `Hello Healthserve Dubai team,
My name is ${nameVal}.
I would like to check my eligibility and licensing requirements for the GCC.

*My Profile:*
• Profession: ${profVal}
• Destination: ${destVal}
• Clinical Experience: ${expVal}
• Current Status: ${stageVal}
• Contact: ${fullWhatsApp}

Could you please review my eligibility and guide me on the next step?`;

      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${HEALTHSERVE_WHATSAPP_NUM}?text=${encodedMsg}`;

      trackEvent('whatsapp_click', { source: 'hook_eligibility_form' });

      // Immediate redirect to WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 350);
    });
  }

  // ==========================================
  // 4. MAJOR "STUCK CASES" MODAL / DRAWER SYSTEM
  // ==========================================
  const stuckServicesDetails = {
    'new-license': {
      title: 'New Professional Licence',
      subtitle: 'Apply for your first professional healthcare licence with structured documentation support.',
      summary: 'For doctors, nurses, and allied healthcare professionals applying for their first GCC licence (DHA, MOHAP, DOH, SCFHS, DHP, NHRA, OMSB).',
      whatWeHelpWith: [
        'Complete credential evaluation against destination Healthcare Professional Qualification Requirements (PQR)',
        'Primary Source Verification (DataFlow PSV) filing and document validation',
        'Credentialing portal account creation and dossier compilation',
        'Examination booking guidance (Prometric / Pearson VUE / Oral) where applicable',
        'Securing the final Eligibility Letter or Professional Registration'
      ],
      commonRoadblocks: 'Submitting unapproved documents, mismatched experience dates, or taking the wrong exam before completing verification.'
    },
    'license-renewal': {
      title: 'Licence Renewal Support',
      subtitle: 'Renew your professional healthcare licence before expiry with full compliance.',
      summary: 'Ensuring uninterrupted clinical practice rights across UAE, Saudi Arabia, and Gulf healthcare authorities.',
      whatWeHelpWith: [
        'Continuing Medical Education (CME / CPD) credit points audit and verification',
        'Malpractice insurance compliance verification',
        'Employment verification and current employer authorization',
        'Timely submission through regulatory portals to prevent penalties or cancellation'
      ],
      commonRoadblocks: 'Insufficient accredited CME points, lapsed clinical practice periods, or delayed submissions causing license deactivation.'
    },
    'license-transfer': {
      title: 'Licence Transfer Between Facilities / Regulators',
      subtitle: 'Seamlessly transfer your existing healthcare licence to a new medical facility or authority.',
      summary: 'Moving between healthcare facilities within the same emirate, or converting between DHA, MOHAP, and DOH under the Unified Healthcare framework.',
      whatWeHelpWith: [
        'Inter-authority licence conversion (e.g. DHA to DOH or MOHAP) without retaking exams',
        'Facility transfer clearance and cancellation processing from previous sponsor',
        'Verification of existing DataFlow reports and transferring existing report records',
        'Issuance of updated active clinical practice licence with new employer'
      ],
      commonRoadblocks: 'Employer non-objection disputes, mismatched facility clinical scope, or unverified past experience reports.'
    },
    'upgrade-title': {
      title: 'Upgrade Professional Title / Designation',
      subtitle: 'Advance your registered designation to Specialist, Consultant, or Senior Practitioner.',
      summary: 'For practitioners who have acquired additional years of clinical practice or higher specialty board qualifications.',
      whatWeHelpWith: [
        'Verification of specialty certificates, fellowships, and post-graduate master’s degrees',
        'Logbook audit and surgical/clinical procedure records review',
        'Filing for designation elevation under updated PQR criteria',
        'Specialty committee assessment interview / viva coordination where applicable'
      ],
      commonRoadblocks: 'Unaccredited fellowship certificates or insufficient documented clinical cases required for title upgrade.'
    },
    'additional-qualification': {
      title: 'Additional Qualification Registration',
      subtitle: 'Register newly acquired degrees, sub-specialty diplomas, or accredited certifications.',
      summary: 'Formally endorse new clinical qualifications onto your official regulatory profile to broaden your clinical scope.',
      whatWeHelpWith: [
        'DataFlow primary source verification for newly obtained academic certificates',
        'Submission to regulatory boards for scope-of-practice endorsement',
        'Verification of university accreditation status with destination Ministries of Higher Education',
        'Updating your professional register entry on government databases'
      ],
      commonRoadblocks: 'Distance-learning diplomas that do not meet GCC clinical residency requirements.'
    },
    'schedule-exam': {
      title: 'Schedule CBT / Oral Examination',
      subtitle: 'Book and prepare for Prometric, Pearson VUE, or regulatory board examinations.',
      summary: 'Step-by-step assistance in booking your assessment, eligibility approval, and exam date scheduling.',
      whatWeHelpWith: [
        'Securing Exam Eligibility Number from the regulatory authority',
        'Prometric or Pearson VUE exam slot booking at authorized testing centers in India, Nepal, or Gulf',
        'Syllabus and blueprint orientation for your specific specialty',
        'Rescheduling, exam re-takes, and result dispatch support'
      ],
      commonRoadblocks: 'Attempting to schedule an exam without an approved eligibility code or missing the 3-attempt limit rules.'
    },
    'good-standing': {
      title: 'Certificate of Good Standing (CGS) Assistance',
      subtitle: 'Obtain, verify, and transfer Good Standing Certificates from home councils or GCC authorities.',
      summary: 'All GCC healthcare regulators require a recent CGS issued within the last 3-6 months from all councils where you held registration.',
      whatWeHelpWith: [
        'Liaison with State Nursing Councils, Medical Councils, or Pharmacy Councils in India/Nepal',
        'Direct council-to-regulator submission compliance',
        'Obtaining CGS from DHA, DOH, MOHAP, or SCFHS for international migration',
        'Ensuring valid date windows for licensing dossier submission'
      ],
      commonRoadblocks: 'Council delays leading to expired certificates, or non-compliance with digital council verification standards.'
    },
    're-registration': {
      title: 'Re-Registration & Expired Licence Revival',
      subtitle: 'Re-activate lapsed or cancelled GCC healthcare licences after clinical breaks.',
      summary: 'For healthcare professionals whose GCC registration lapsed or who left the Gulf region and wish to return to practise.',
      whatWeHelpWith: [
        'Review of clinical gap duration against regulatory CME and practice policy',
        'Documenting interim clinical practice in home country (India/Nepal/etc.) during the gap',
        'DataFlow verification of gap employment history',
        'Assessment of whether re-examination or clinical attachment is mandated'
      ],
      commonRoadblocks: 'Unexplained practice gaps exceeding 2 to 5 years, which often trigger re-examination requirements.'
    }
  };

  function initStuckCaseModals() {
    const dialog = document.getElementById('serviceCaseDialog');
    const dialogTitle = document.getElementById('caseDialogTitle');
    const dialogContent = document.getElementById('caseDialogBody');
    const dialogCta = document.getElementById('caseDialogCta');
    const closeBtn = document.getElementById('closeCaseDialog');

    if (!dialog || !closeBtn) return;

    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        const serviceKey = card.dataset.service;
        const details = stuckServicesDetails[serviceKey];
        if (!details) return;

        leadState.stuck_situation = details.title;
        saveLeadState();

        trackEvent('stuck_service_view', {
          service_title: details.title
        });

        dialogTitle.textContent = details.title;
        dialogContent.innerHTML = `
          <div style="margin-bottom: 1.25rem;">
            <p style="font-size: 1rem; font-weight: 600; color: var(--primary-deep); margin-bottom: 0.5rem;">${details.subtitle}</p>
            <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.6;">${details.summary}</p>
          </div>
          <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">What Healthserve Supports With:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-body);">
              ${details.whatWeHelpWith.map(w => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${w}</span></li>`).join('')}
            </ul>
          </div>
          <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 1rem 1.25rem; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
            <p style="font-size: 0.84rem; color: #92400E; line-height: 1.5;"><strong>Common Pitfall:</strong> ${details.commonRoadblocks}</p>
          </div>
        `;

        dialogCta.onclick = () => {
          dialog.close();
          openWhatsAppWithSituation(details.title);
        };

        dialog.showModal();
      });
    });
  }

  // ==========================================
  // 5. 6 INTERACTIVE EVALUATION TOOLS
  // ==========================================
  function initInteractiveTools() {
    const dialog = document.getElementById('toolDialog');
    const toolTitle = document.getElementById('toolDialogTitle');
    const toolBody = document.getElementById('toolDialogBody');
    const closeBtn = document.getElementById('closeToolDialog');

    if (!dialog || !closeBtn) return;

    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    document.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const href = card.getAttribute('href') || 'https://healthserve.ae/career-hub/register';
        const toolType = card.dataset.tool;
        trackEvent('career_hub_tool_clicked', { tool_type: toolType });
        window.location.href = href;
      });
    });
  }

  function renderTool(toolType, titleEl, bodyEl, dialogEl) {
    if (toolType === 'readiness') {
      titleEl.textContent = 'Career Readiness Self-Assessment';
      bodyEl.innerHTML = `
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Answer three quick questions to get an indicative view of your readiness for a GCC healthcare licensing application.
        </p>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">1. Do you currently hold a valid active license in your home country (e.g. Nursing Council / Medical Council)?</label>
            <select id="toolQ1" class="form-select-custom">
              <option value="yes">Yes, active and valid</option>
              <option value="expiring">Yes, but expiring soon</option>
              <option value="no">No or lapsed</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">2. How many years of continuous post-registration clinical experience do you have?</label>
            <select id="toolQ2" class="form-select-custom">
              <option value="under2">Less than 2 years</option>
              <option value="2to5" selected>2 to 5 years</option>
              <option value="over5">More than 5 years</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">3. Are your basic documents (transcripts, degree certificates, experience letters) currently in your possession?</label>
            <select id="toolQ3" class="form-select-custom">
              <option value="all" selected>Yes, I have all original documents</option>
              <option value="some">I have some, others need to be requested</option>
              <option value="none">Need to apply from university</option>
            </select>
          </div>
          <button class="btn-primary" style="margin-top: 0.5rem;" onclick="window.HealthserveApp.calculateReadiness()">Evaluate My Readiness</button>
          <div id="readinessResult" style="display: none; padding: 1.25rem; border-radius: var(--radius-md); margin-top: 0.5rem;"></div>
        </div>
      `;
    } else if (toolType === 'eligibility') {
      titleEl.textContent = 'Country Eligibility Checker';
      bodyEl.innerHTML = `
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Select your profession and target country to view basic qualification benchmarks.
        </p>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">Your Profession</label>
            <select id="toolProf" class="form-select-custom">
              <option value="nurse_bsc">Registered Nurse (B.Sc Nursing / Post Basic)</option>
              <option value="nurse_gnm">Staff Nurse (GNM / Diploma)</option>
              <option value="general_doctor">General Practitioner (MBBS)</option>
              <option value="specialist_doctor">Specialist Doctor (MD / MS / DNB)</option>
              <option value="allied_physio">Physiotherapist / Allied Health</option>
              <option value="pharmacist">Pharmacist (B.Pharm / Pharm.D)</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">Target GCC Destination</label>
            <select id="toolDest" class="form-select-custom">
              <option value="uae_dha">Dubai (DHA)</option>
              <option value="uae_doh">Abu Dhabi (DOH)</option>
              <option value="uae_mohap">UAE Northern Emirates (MOHAP)</option>
              <option value="saudi">Saudi Arabia (SCFHS)</option>
              <option value="qatar">Qatar (DHP / QCHP)</option>
              <option value="bahrain">Bahrain (NHRA)</option>
              <option value="oman">Oman (OMSB)</option>
            </select>
          </div>
          <button class="btn-primary" onclick="window.HealthserveApp.checkEligibilityBenchmark()">Check Indicative Benchmark</button>
          <div id="eligibilityResult" style="display: none; padding: 1.25rem; border-radius: var(--radius-md); margin-top: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle);"></div>
        </div>
      `;
    } else if (toolType === 'comparison') {
      titleEl.textContent = 'GCC Healthcare Destination Comparison';
      bodyEl.innerHTML = `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
            <thead>
              <tr style="background: var(--bg-surface); border-bottom: 2px solid var(--border-subtle);">
                <th style="padding: 0.75rem 0.5rem;">Authority</th>
                <th style="padding: 0.75rem 0.5rem;">Primary Verification</th>
                <th style="padding: 0.75rem 0.5rem;">Exam Format</th>
                <th style="padding: 0.75rem 0.5rem;">Indicative Window</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.75rem 0.5rem; font-weight: 700;">UAE (DHA / DOH / MOHAP)</td>
                <td style="padding: 0.75rem 0.5rem;">DataFlow PSV</td>
                <td style="padding: 0.75rem 0.5rem;">Prometric / Pearson CBT (where applicable)</td>
                <td style="padding: 0.75rem 0.5rem;">6 to 12 weeks</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.75rem 0.5rem; font-weight: 700;">Saudi Arabia (SCFHS)</td>
                <td style="padding: 0.75rem 0.5rem;">DataFlow (Mumaris+)</td>
                <td style="padding: 0.75rem 0.5rem;">SCFHS Prometric CBT</td>
                <td style="padding: 0.75rem 0.5rem;">6 to 10 weeks</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.75rem 0.5rem; font-weight: 700;">Qatar (DHP)</td>
                <td style="padding: 0.75rem 0.5rem;">DataFlow PSV</td>
                <td style="padding: 0.75rem 0.5rem;">QCHP Prometric CBT</td>
                <td style="padding: 0.75rem 0.5rem;">8 to 14 weeks</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.75rem 0.5rem; font-weight: 700;">Bahrain (NHRA)</td>
                <td style="padding: 0.75rem 0.5rem;">DataFlow PSV</td>
                <td style="padding: 0.75rem 0.5rem;">Prometric / Local Exam</td>
                <td style="padding: 0.75rem 0.5rem;">6 to 12 weeks</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0.5rem; font-weight: 700;">Oman (OMSB)</td>
                <td style="padding: 0.75rem 0.5rem;">DataFlow PSV</td>
                <td style="padding: 0.75rem 0.5rem;">Pearson VUE CBT / Viva</td>
                <td style="padding: 0.75rem 0.5rem;">8 to 16 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 1rem;">
          *Note: Processing windows are indicative and vary depending on issuing institution response speeds, regulator review queues, and individual verification outcomes.
        </p>
      `;
    } else if (toolType === 'roadmap') {
      titleEl.textContent = 'Career Roadmap Generator';
      bodyEl.innerHTML = `
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1rem;">
          The typical progressive milestones from initial credential assessment to practicing legally in a GCC hospital:
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">01</span>
            <div><strong style="font-size:0.9rem;">Eligibility Audit:</strong> Matching your qualification and continuous clinical practice with the destination Unified Healthcare PQR.</div>
          </div>
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">02</span>
            <div><strong style="font-size:0.9rem;">Document Dossier Curation:</strong> Preparing transcripts, degree certificate, home council registration, recent CGS, and experience letters.</div>
          </div>
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">03</span>
            <div><strong style="font-size:0.9rem;">Primary Source Verification:</strong> Initiating DataFlow verification directly with your issuing university, hospital, and licensing council.</div>
          </div>
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">04</span>
            <div><strong style="font-size:0.9rem;">CBT Examination (where applicable):</strong> Booking Prometric / Pearson VUE slot and clearing your specialty multiple-choice assessment.</div>
          </div>
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">05</span>
            <div><strong style="font-size:0.9rem;">Eligibility Letter Issuance:</strong> Receiving the official regulatory confirmation validating you as eligible to practice.</div>
          </div>
          <div style="display:flex; gap: 0.75rem; align-items:flex-start; padding: 0.75rem; background: var(--bg-surface); border-radius: 8px;">
            <span style="font-weight:800; color:var(--primary-dark);">06</span>
            <div><strong style="font-size:0.9rem;">Clinical Facility Placement:</strong> Applying to hiring hospitals/clinics with verified eligibility in hand.</div>
          </div>
        </div>
      `;
    } else if (toolType === 'dataflow') {
      titleEl.textContent = 'DataFlow Readiness Checklist';
      bodyEl.innerHTML = `
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Ensure you have the critical components required before submitting your Primary Source Verification (PSV) application:
        </p>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
          <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
            <input type="checkbox" id="chk1" style="margin-top: 3px;">
            <label for="chk1"><strong>Official Degree / Diploma:</strong> Final certificate issued by an accredited university or council.</label>
          </li>
          <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
            <input type="checkbox" id="chk2" style="margin-top: 3px;">
            <label for="chk2"><strong>Year-wise Marksheets / Transcripts:</strong> Complete record for each academic year or semester.</label>
          </li>
          <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
            <input type="checkbox" id="chk3" style="margin-top: 3px;">
            <label for="chk3"><strong>Home Country Council Registration:</strong> Valid, active registration card/certificate.</label>
          </li>
          <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
            <input type="checkbox" id="chk4" style="margin-top: 3px;">
            <label for="chk4"><strong>Experience Letters:</strong> On official hospital letterhead with designation, department, start and end dates, and HR contacts.</label>
          </li>
          <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
            <input type="checkbox" id="chk5" style="margin-top: 3px;">
            <label for="chk5"><strong>Passport Copy:</strong> Clear color scan of valid passport (minimum 6 months validity).</label>
          </li>
        </ul>
        <div style="margin-top: 1.5rem; text-align: center;">
          <button class="btn-primary" style="font-size: 0.9rem; padding: 0.75rem 1.5rem;" onclick="window.HealthserveApp.syncAndScrollToForm()">
            Review My Documents With Healthserve →
          </button>
        </div>
      `;
    } else if (toolType === 'timeline') {
      titleEl.textContent = 'Licence Timeline Estimator';
      bodyEl.innerHTML = `
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Get an indicative processing timeframe based on where you are currently starting from:
        </p>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="font-size: 0.88rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">Your Current Stage</label>
            <select id="timelineStage" class="form-select-custom" onchange="window.HealthserveApp.updateTimelineEstimate()">
              <option value="fresh">Starting from zero (no documents verified yet)</option>
              <option value="dataflow_in_progress">DataFlow submitted, waiting for PSV report</option>
              <option value="dataflow_positive">DataFlow report positive, need exam / eligibility</option>
              <option value="exam_cleared">Exam cleared, ready for eligibility issuance</option>
            </select>
          </div>
          <div id="timelineOutput" style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-top: 0.5rem;">
            <strong style="color: var(--primary-deep); font-size: 1.1rem; display: block; margin-bottom: 0.35rem;">Estimated Timeline: 8 to 14 weeks</strong>
            <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">
              Includes document curation (1-2 wks), DataFlow primary source verification (4-8 wks depending on university response time), and exam booking/clearing.
            </p>
          </div>
        </div>
      `;
    }
  }

  // ==========================================
  // 6. SECOND-STAGE QUALIFICATION FORM
  // ==========================================
  function initQualificationForm() {
    const qualForm = document.getElementById('qualificationForm');
    const resultBox = document.getElementById('guidanceResultBox');
    const resultHeading = document.getElementById('resultHeading');
    const resultDetails = document.getElementById('resultDetails');
    const resultWhatsAppBtn = document.getElementById('resultWhatsAppBtn');

    if (!qualForm || !resultBox) return;

    // Track when user starts interacting with qualification section
    let qualFormStarted = false;
    qualForm.addEventListener('change', () => {
      if (!qualFormStarted) {
        qualFormStarted = true;
        trackEvent('eligibility_form_start');
      }
    });

    // Pill selectors
    document.querySelectorAll('.pill-option').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const parentGrid = pill.closest('.select-pill-grid');
        parentGrid.querySelectorAll('.pill-option').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');

        const field = pill.dataset.field;
        const val = pill.dataset.value;
        if (field === 'profession') leadState.profession = val;
        if (field === 'destination') leadState.destination = val;
        if (field === 'stage') leadState.journey_stage = val;
        if (field === 'experience') leadState.experience = val;

        saveLeadState();
        updateDynamicWhatsAppLinks();
      });
    });

    qualForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather selections
      const profEl = qualForm.querySelector('.pill-option[data-field="profession"].selected');
      const destEl = qualForm.querySelector('.pill-option[data-field="destination"].selected');
      const stageEl = qualForm.querySelector('.pill-option[data-field="stage"].selected');
      const expEl = qualForm.querySelector('.pill-option[data-field="experience"].selected');

      if (profEl) leadState.profession = profEl.dataset.value;
      if (destEl) leadState.destination = destEl.dataset.value;
      if (stageEl) leadState.journey_stage = stageEl.dataset.value;
      if (expEl) leadState.experience = expEl.dataset.value;

      saveLeadState();

      trackEvent('eligibility_form_complete', {
        profession: leadState.profession,
        destination: leadState.destination,
        journey_stage: leadState.journey_stage,
        experience: leadState.experience
      });

      // Render custom pathway summary
      const userName = leadState.name ? `${leadState.name}, your` : 'Your';
      resultHeading.textContent = `${userName} ${leadState.profession} Pathway for ${leadState.destination}`;

      let adviceText = `Based on your profile as a ${leadState.profession} with ${leadState.experience} of experience aiming for ${leadState.destination}, your pathway involves primary source verification (DataFlow PSV), compliance check against the destination Healthcare PQR, and CBT exam scheduling where applicable.`;

      if (leadState.journey_stage === 'Stuck with an existing case') {
        adviceText = `Since you have an existing application with delays or remarks, Healthserve can review your case notes directly to identify why verification was stalled or contested, helping you avoid starting over.`;
      } else if (leadState.journey_stage === 'Already licensed') {
        adviceText = `Since you hold a registration or previous licence, your immediate pathway focuses on facility transfer, title upgrade, or re-registration under updated Unified Healthcare criteria.`;
      }

      resultDetails.textContent = adviceText;
      resultBox.classList.add('visible');

      updateDynamicWhatsAppLinks();

      // Scroll to result box
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ==========================================
  // 7. CONTEXTUAL WHATSAPP & PHONE LINK ENGINE
  // ==========================================
  function generateWhatsAppMessage() {
    const namePart = leadState.name ? `my name is ${leadState.name}.` : '';
    const profPart = leadState.profession || 'healthcare professional';
    const destPart = leadState.destination || 'the GCC';
    const stagePart = leadState.journey_stage || 'the planning stage';
    const expPart = leadState.experience ? `(${leadState.experience} clinical experience)` : '';
    const stuckPart = leadState.stuck_situation ? ` Specifically regarding ${leadState.stuck_situation}.` : '';

    return `Hello Healthserve, ${namePart} I am a ${profPart} ${expPart} exploring licensing in ${destPart}. I am currently at: ${stagePart}.${stuckPart} Could you please provide guidance on my next steps?`;
  }

  function updateDynamicWhatsAppLinks() {
    const rawMsg = generateWhatsAppMessage();
    const encodedMsg = encodeURIComponent(rawMsg);
    const waUrl = `https://wa.me/${HEALTHSERVE_WHATSAPP_NUM}?text=${encodedMsg}`;

    document.querySelectorAll('.js-whatsapp-link').forEach(link => {
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  function initWhatsAppLinks() {
    updateDynamicWhatsAppLinks();

    document.querySelectorAll('.js-whatsapp-link').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          profession: leadState.profession,
          destination: leadState.destination,
          stage: leadState.journey_stage
        });
      });
    });

    document.querySelectorAll('.js-phone-link').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click');
      });
    });
  }

  function openWhatsAppWithSituation(situationTitle) {
    leadState.stuck_situation = situationTitle;
    saveLeadState();
    const rawMsg = generateWhatsAppMessage();
    const encodedMsg = encodeURIComponent(rawMsg);
    trackEvent('whatsapp_click', { situation: situationTitle });
    window.open(`https://wa.me/${HEALTHSERVE_WHATSAPP_NUM}?text=${encodedMsg}`, '_blank');
  }

  // ==========================================
  // 8. STICKY CONVERSION BAR
  // ==========================================
  function initStickyBar() {
    const stickyBar = document.getElementById('stickyConversionBar');
    if (!stickyBar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ==========================================
  // 8B. SEO FAQ ACCORDION CONTROLLER
  // ==========================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for a clean mobile reading experience
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          const questionText = btn.querySelector('span') ? btn.querySelector('span').textContent.trim() : `FAQ #${index + 1}`;
          trackEvent('faq_opened', {
            faq_index: index + 1,
            question: questionText
          });
        }
      });
    });
  }

  // ==========================================
  // 9. PUBLIC API & GLOBAL HELPERS
  // ==========================================
  window.HealthserveApp = {
    syncAndScrollToForm(destination = '', stage = '') {
      if (destination) {
        leadState.destination = destination;
        const hookDest = document.getElementById('hookDest');
        if (hookDest) {
          for (let opt of hookDest.options) {
            if (opt.value.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(opt.value.toLowerCase())) {
              hookDest.value = opt.value;
              break;
            }
          }
        }
      }

      if (stage) {
        leadState.journey_stage = stage;
        const hookStage = document.getElementById('hookStage');
        if (hookStage) {
          for (let opt of hookStage.options) {
            if (opt.value.toLowerCase().includes(stage.toLowerCase()) || stage.toLowerCase().includes(opt.value.toLowerCase())) {
              hookStage.value = opt.value;
              break;
            }
          }
        }
      }

      saveLeadState();
      updateDynamicWhatsAppLinks();

      const formSection = document.getElementById('hookEligibilitySection') || document.getElementById('hookEligibilityForm');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },

    calculateReadiness() {
      const q1 = document.getElementById('toolQ1').value;
      const q2 = document.getElementById('toolQ2').value;
      const q3 = document.getElementById('toolQ3').value;
      const resBox = document.getElementById('readinessResult');

      let score = 0;
      if (q1 === 'yes') score += 35;
      if (q2 === 'over5') score += 40;
      else if (q2 === '2to5') score += 30;
      else score += 10;
      if (q3 === 'all') score += 25;
      else if (q3 === 'some') score += 15;

      resBox.style.display = 'block';
      if (score >= 75) {
        resBox.style.background = '#ECFDF5';
        resBox.style.border = '1px solid #A7F3D0';
        resBox.innerHTML = `
          <strong style="color: #065F46; font-size: 1rem;">High Readiness (${score}/100)</strong>
          <p style="font-size: 0.88rem; color: #047857; margin-top: 0.25rem;">
            You possess strong foundational credentials (active license, solid continuous experience, and documents ready). You are in an ideal position to initiate your DataFlow verification and eligibility assessment.
          </p>
        `;
      } else {
        resBox.style.background = '#FFFBEB';
        resBox.style.border = '1px solid #FDE68A';
        resBox.innerHTML = `
          <strong style="color: #92400E; font-size: 1rem;">Moderate Readiness (${score}/100)</strong>
          <p style="font-size: 0.88rem; color: #B45309; margin-top: 0.25rem;">
            Your profile shows potential, but certain areas (such as document collation, council renewals, or clinical experience duration) may require review before filing to avoid verification discrepancies.
          </p>
        `;
      }
    },

    checkEligibilityBenchmark() {
      const prof = document.getElementById('toolProf').value;
      const dest = document.getElementById('toolDest').value;
      const res = document.getElementById('eligibilityResult');

      res.style.display = 'block';
      let msg = '';

      if (prof.includes('nurse_bsc')) {
        msg = '<strong>B.Sc Nursing:</strong> Recognized for Registered Nurse title across UAE (DHA/DOH/MOHAP) and Saudi (SCFHS). Typical prerequisite: Minimum 2 continuous years post-registration experience in a hospital setting of at least 50-100 beds.';
      } else if (prof.includes('nurse_gnm')) {
        msg = '<strong>GNM / Diploma Nursing:</strong> Eligible for Assistant Nurse / Staff Nurse category under MOHAP and select GCC pathways. Some authorities require additional clinical years or qualification elevation.';
      } else if (prof.includes('doctor')) {
        msg = '<strong>Medical Doctors (MBBS / Postgrad):</strong> MBBS requires completed internship + 2 years clinical practice for GP licensing. Specialists require recognized postgraduate qualification (MD/MS/DNB/Fellowship) + 3+ years post-specialization practice.';
      } else {
        msg = '<strong>Allied Health & Pharmacy:</strong> Minimum 2 years continuous experience in a licensed clinical setting post-graduation, with primary source verification of syllabus and clinical rotation.';
      }

      res.innerHTML = `
        <div style="font-size: 0.88rem; color: var(--text-body); line-height: 1.6;">
          ${msg}
          <div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--text-muted); border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem;">
            *Exact criteria governed by Unified Healthcare PQR. Subject to individual credential audit.
          </div>
        </div>
      `;
    },

    updateTimelineEstimate() {
      const stage = document.getElementById('timelineStage').value;
      const output = document.getElementById('timelineOutput');

      if (stage === 'fresh') {
        output.innerHTML = `
          <strong style="color: var(--primary-deep); font-size: 1.1rem; display: block; margin-bottom: 0.35rem;">Estimated Timeline: 8 to 14 weeks</strong>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">Includes document curation, DataFlow primary source verification, and exam booking/clearing.</p>
        `;
      } else if (stage === 'dataflow_in_progress') {
        output.innerHTML = `
          <strong style="color: var(--primary-deep); font-size: 1.1rem; display: block; margin-bottom: 0.35rem;">Estimated Timeline: 3 to 6 weeks</strong>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">Awaiting DataFlow report completion and expediting response from issuing institutions.</p>
        `;
      } else if (stage === 'dataflow_positive') {
        output.innerHTML = `
          <strong style="color: var(--primary-deep); font-size: 1.1rem; display: block; margin-bottom: 0.35rem;">Estimated Timeline: 2 to 4 weeks</strong>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">Focus on Prometric / Pearson VUE exam scheduling or immediate Eligibility Letter filing.</p>
        `;
      } else {
        output.innerHTML = `
          <strong style="color: var(--primary-deep); font-size: 1.1rem; display: block; margin-bottom: 0.35rem;">Estimated Timeline: 1 to 2 weeks</strong>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">Final dossier clearance and issuance of Eligibility Letter / Professional Register entry.</p>
        `;
      }
    },

    redirectSituationToWhatsApp(stageName) {
      leadState.journey_stage = stageName;
      leadState.stuck_situation = stageName;
      saveLeadState();

      // Log action to Google Sheets & local cache
      sendLeadToGoogleSheet({
        source_action: 'Situation Selector Button Click',
        journey_stage: stageName,
        situation: stageName
      });

      trackEvent('whatsapp_click', {
        source: 'situation_selector',
        situation: stageName
      });

      const namePart = leadState.name ? `My name is ${leadState.name}. ` : '';
      const profPart = leadState.profession ? `I am a ${leadState.profession}` : 'I am a healthcare professional';
      const destPart = leadState.destination ? `aiming for ${leadState.destination}` : 'aiming for the GCC';
      const waMsg = `Hello Healthserve Dubai team, ${namePart}${profPart} ${destPart}.
In my licensing journey, I am currently at: *${stageName}*.

Could you please provide guidance on what my specific next steps should be?`;

      const encoded = encodeURIComponent(waMsg);
      const waUrl = `https://wa.me/${HEALTHSERVE_WHATSAPP_NUM}?text=${encoded}`;
      window.open(waUrl, '_blank');
    },

    exportLeadsAsCSV() {
      try {
        const leads = JSON.parse(localStorage.getItem('healthserve_sheet_leads') || '[]');
        if (!leads.length) {
          alert('No leads recorded in local storage yet.');
          return;
        }
        const headers = Object.keys(leads[0]);
        const csvRows = [headers.join(',')];
        for (const lead of leads) {
          const values = headers.map(header => {
            const escaped = ('' + (lead[header] || '')).replace(/"/g, '""');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(','));
        }
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `healthserve_leads_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error('Failed to export leads', e);
      }
    }
  };

  // ==========================================
  // REVIEWS & TESTIMONIALS CONTROLLER (120 REVIEWS)
  // ==========================================
  function initReviewsSection() {
    const reviewsSection = document.getElementById('reviewsSection');
    const track = document.getElementById('reviewsTrack');
    const viewport = document.getElementById('reviewsViewport');
    const prevBtn = document.getElementById('reviewsPrevBtn');
    const nextBtn = document.getElementById('reviewsNextBtn');
    const paginationDots = document.getElementById('reviewsPaginationDots');
    const filterChips = document.querySelectorAll('.review-filter-chip');
    const writeBtn = document.getElementById('writeReviewBtn');
    const canvas = document.getElementById('reviewsConstellationCanvas');

    if (!reviewsSection || !track) return;

    // Configurable Google Review Destination URL
    const REVIEW_URL = 'https://healthserve.ae/reviews';
    if (writeBtn) {
      writeBtn.href = REVIEW_URL;
      writeBtn.setAttribute('target', '_blank');
      writeBtn.setAttribute('rel', 'noopener noreferrer');
      writeBtn.addEventListener('click', (e) => {
        if (!REVIEW_URL || REVIEW_URL === '#') {
          e.preventDefault();
          alert('Healthserve review portal will open shortly. Thank you for sharing your experience!');
        } else {
          trackEvent('review_cta_click');
        }
      });
    }

    // Safety fallback for reviews dataset
    const reviewsData = (typeof HEALTHSERVE_REVIEWS_DATA !== 'undefined' && Array.isArray(HEALTHSERVE_REVIEWS_DATA))
      ? HEALTHSERVE_REVIEWS_DATA
      : [];

    if (!reviewsData.length) return;

    let currentCategory = 'ALL';
    let filteredReviews = [...reviewsData];
    let currentIndex = 0;
    let autoRotateTimer = null;
    let isInteracting = false;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Calculate items visible per page based on viewport width
    function getCardsPerView() {
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 1100) return 2;
      return 3;
    }

    // Render Review Cards
    function renderCards() {
      track.innerHTML = '';

      filteredReviews.forEach((r) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('data-id', r.id);
        card.setAttribute('data-category', r.category);

        // Generate gold stars
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
          starsHtml += `<span class="star-glyph">${i <= r.rating ? '★' : '☆'}</span>`;
        }

        const country = r.country || 'Global';
        const initial = r.name ? r.name.charAt(0).toUpperCase() : 'H';

        card.innerHTML = `
          <div class="review-card-top">
            <div class="review-stars" aria-label="${r.rating} out of 5 stars">${starsHtml}</div>
            <span class="review-category-badge">${r.category || 'General'}</span>
          </div>
          <p class="review-quote-text">"${r.review}"</p>
          <div class="review-author-wrap">
            <div class="review-avatar-circle" aria-hidden="true">${initial}</div>
            <div class="review-author-info">
              <span class="review-author-name">${r.name}</span>
              <span class="review-author-role">
                <span>${r.profession}</span> · <span class="review-country-pill">${country}</span>
              </span>
            </div>
          </div>
        `;
        track.appendChild(card);
      });

      updatePagination();
      moveToIndex(0, false);
    }

    // Update Pagination Dots
    function updatePagination() {
      if (!paginationDots) return;
      paginationDots.innerHTML = '';
      const cardsPerView = getCardsPerView();
      const totalPages = Math.ceil(filteredReviews.length / cardsPerView);
      const maxDots = Math.min(totalPages, 8); // Display clean dot cluster

      for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('button');
        dot.className = `reviews-dot ${i === 0 ? 'active' : ''}`;
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to review slide ${i + 1}`);
        dot.addEventListener('click', () => {
          moveToIndex(i * cardsPerView);
          resetAutoRotate();
        });
        paginationDots.appendChild(dot);
      }
    }

    function updateActiveDot() {
      if (!paginationDots) return;
      const dots = paginationDots.querySelectorAll('.reviews-dot');
      if (!dots.length) return;
      const cardsPerView = getCardsPerView();
      const activePageIndex = Math.min(Math.floor(currentIndex / cardsPerView), dots.length - 1);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activePageIndex);
      });
    }

    // Move to specific card index
    function moveToIndex(index, animate = true) {
      const cards = track.querySelectorAll('.review-card');
      if (!cards.length) return;

      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);

      // Clamp or cycle
      if (index > maxIndex) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = maxIndex;
      } else {
        currentIndex = index;
      }

      // Compute translate distance
      const card = cards[0];
      const cardRect = card.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.gap) || 28;
      const step = cardRect.width + gap;
      const targetTranslate = -(currentIndex * step);

      if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.style.transition = 'none';
        track.style.transform = `translateX(${targetTranslate}px)`;
      } else {
        track.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        track.style.transform = `translateX(${targetTranslate}px)`;
      }

      prevTranslate = targetTranslate;
      currentTranslate = targetTranslate;

      if (prevBtn) prevBtn.disabled = (currentIndex === 0);
      if (nextBtn) nextBtn.disabled = (currentIndex >= maxIndex && maxIndex > 0);

      updateActiveDot();
    }

    // Next / Prev controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        moveToIndex(currentIndex + cardsPerView);
        resetAutoRotate();
        trackEvent('review_carousel_next');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        moveToIndex(currentIndex - cardsPerView);
        resetAutoRotate();
        trackEvent('review_carousel_prev');
      });
    }

    // Filter Chips Event
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');

        const cat = chip.getAttribute('data-category');
        currentCategory = cat;

        if (cat === 'ALL') {
          filteredReviews = [...reviewsData];
        } else if (cat === 'LICENSING') {
          filteredReviews = reviewsData.filter(r => (r.category || '').toUpperCase().includes('LICENSING'));
        } else if (cat === 'CAREER GUIDANCE') {
          filteredReviews = reviewsData.filter(r => (r.category || '').toUpperCase().includes('CAREER'));
        } else if (cat === 'TRAINING') {
          filteredReviews = reviewsData.filter(r => (r.category || '').toUpperCase().includes('TRAINING'));
        } else if (cat === 'EXAM PREPARATION') {
          filteredReviews = reviewsData.filter(r => (r.category || '').toUpperCase().includes('EXAM'));
        }

        renderCards();
        resetAutoRotate();
        trackEvent('review_filter_click', { category: cat });
      });
    });

    // Touch & Pointer Drag Interaction (Momentum drag)
    if (viewport) {
      let startY = 0;
      let isHorizontalSwipe = false;

      viewport.addEventListener('pointerdown', (e) => {
        isDragging = true;
        isHorizontalSwipe = false;
        startX = e.clientX;
        startY = e.clientY;
        track.style.transition = 'none';
        pauseAutoRotate();
      });

      viewport.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;

        if (!isHorizontalSwipe) {
          // If moved vertically more than horizontally, allow native page scroll
          if (Math.abs(diffY) > 8 && Math.abs(diffY) > Math.abs(diffX)) {
            isDragging = false;
            return;
          }
          if (Math.abs(diffX) > 8 && Math.abs(diffX) >= Math.abs(diffY)) {
            isHorizontalSwipe = true;
            try { viewport.setPointerCapture(e.pointerId); } catch(err) {}
          }
        }

        if (isHorizontalSwipe) {
          track.style.transform = `translateX(${prevTranslate + diffX}px)`;
        }
      });

      const handlePointerEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try { viewport.releasePointerCapture(e.pointerId); } catch(err) {}

        if (!isHorizontalSwipe) {
          resetAutoRotate();
          return;
        }
        isHorizontalSwipe = false;

        const cards = track.querySelectorAll('.review-card');
        if (!cards.length) return;
        const cardRect = cards[0].getBoundingClientRect();
        const gap = parseFloat(window.getComputedStyle(track).gap) || 28;
        const step = cardRect.width + gap;
        const movedBy = (e.clientX - startX);

        if (movedBy < -50) {
          moveToIndex(currentIndex + 1);
        } else if (movedBy > 50) {
          moveToIndex(currentIndex - 1);
        } else {
          moveToIndex(currentIndex);
        }
        resetAutoRotate();
      };

      viewport.addEventListener('pointerup', handlePointerEnd);
      viewport.addEventListener('pointercancel', handlePointerEnd);

      viewport.addEventListener('pointerenter', pauseAutoRotate);
      viewport.addEventListener('pointerleave', resumeAutoRotate);
      viewport.addEventListener('focusin', pauseAutoRotate);
      viewport.addEventListener('focusout', resumeAutoRotate);
    }

    // Auto-Rotation Timer
    function startAutoRotate() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (autoRotateTimer) clearInterval(autoRotateTimer);
      autoRotateTimer = setInterval(() => {
        if (!isInteracting && !isDragging) {
          const cardsPerView = getCardsPerView();
          moveToIndex(currentIndex + 1);
        }
      }, 5500);
    }

    function pauseAutoRotate() {
      isInteracting = true;
      if (autoRotateTimer) clearInterval(autoRotateTimer);
    }

    function resumeAutoRotate() {
      isInteracting = false;
      startAutoRotate();
    }

    function resetAutoRotate() {
      pauseAutoRotate();
      setTimeout(() => {
        isInteracting = false;
        startAutoRotate();
      }, 4000);
    }

    // Resize recalculation
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updatePagination();
        moveToIndex(currentIndex, false);
      }, 150);
    });

    // Initial render
    renderCards();
    startAutoRotate();

    // ==========================================
    // AMBIENT CONSTELLATION VISUAL (CANVAS)
    // ==========================================
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = canvas.width = reviewsSection.offsetWidth;
        let height = canvas.height = reviewsSection.offsetHeight;
        let animFrame = null;
        let isSectionVisible = false;

        const particleCount = 28;
        const particles = [];
        const colors = ['#30C4F2', '#0284C7', '#FAA30C'];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() * 1.8 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }

        function drawConstellation() {
          if (!isSectionVisible) return;
          ctx.clearRect(0, 0, width, height);

          // Draw connecting links
          for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) {
                const alpha = (1 - dist / 120) * 0.15;
                ctx.strokeStyle = `rgba(48, 196, 242, ${alpha})`;
                ctx.lineWidth = 0.85;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }

          // Draw particles
          particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.65;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
          });

          animFrame = requestAnimationFrame(drawConstellation);
        }

        window.addEventListener('resize', () => {
          width = canvas.width = reviewsSection.offsetWidth;
          height = canvas.height = reviewsSection.offsetHeight;
        });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isSectionVisible = true;
              if (!animFrame) animFrame = requestAnimationFrame(drawConstellation);
            } else {
              isSectionVisible = false;
              if (animFrame) {
                cancelAnimationFrame(animFrame);
                animFrame = null;
              }
            }
          });
        }, { threshold: 0.1 });

        observer.observe(reviewsSection);
      }
    }
  }

  window.HealthserveApp = HealthserveApp;

})();
