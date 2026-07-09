document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LOCALSTORAGE STATE INITIALIZATION
       ========================================================================== */
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentAccent = localStorage.getItem('accent') || 'violet';

    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-accent', currentAccent);

    // Sync active states on customizer UI
    const themeBtn = document.getElementById('theme-toggle');
    const accentBtns = document.querySelectorAll('.accent-btn');
    
    accentBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-accent-val') === currentAccent) {
            btn.classList.add('active');
        }
    });

    /* ==========================================================================
       STYLE CUSTOMIZER TOGGLE & ACCENT SETTER
       ========================================================================== */
    const customizer = document.getElementById('style-customizer');
    const customizerToggle = document.getElementById('customizer-toggle');

    if (customizerToggle && customizer) {
        customizerToggle.addEventListener('click', () => {
            customizer.classList.toggle('active');
        });

        // Close customizer if clicking outside
        document.addEventListener('click', (e) => {
            if (!customizer.contains(e.target) && customizer.classList.contains('active')) {
                customizer.classList.remove('active');
            }
        });
    }

    // Set Accent Color Dynamic Change
    accentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            accentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedAccent = btn.getAttribute('data-accent-val');
            document.documentElement.setAttribute('data-accent', selectedAccent);
            localStorage.setItem('accent', selectedAccent);
        });
    });

    /* ==========================================================================
       LIGHT & DARK THEME TOGGLE
       ========================================================================== */
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentThemeState = document.documentElement.getAttribute('data-theme');
            let newTheme = 'dark';
            if (currentThemeState === 'dark') {
                newTheme = 'light';
            }
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================================================
       SCROLL PERFORMANCE: PROGRESS BAR & NAV HIGHLIGHT
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // 1. Scroll Progress Bar
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const scrollPercentage = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        }

        // 2. Sticky Header shadow
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 3. Navigation link highlighting based on active section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       MOBILE MENU HAMBURGER NAVIGATION
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Close mobile navbar on navLink click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       HERO TEXT TYPEWRITER ANIMATION
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const professions = [
        'Web Applications.',
        'Smart Systems.',
        'OCR Solutions.',
        'React Experiences.',
        'ML-Powered Tools.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTyping() {
        if (!typewriterElement) return;

        const currentPhrase = professions[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing word, wait before deleting
            isDeleting = true;
            typingSpeed = 1500; 
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting word, move to next
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % professions.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(handleTyping, typingSpeed);
    }

    if (typewriterElement) {
        handleTyping();
    }

    /* ==========================================================================
       INTERACTIVE EXPERIENCE & EDUCATION TIMELINE SWITCHER
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelines = {
        work: document.getElementById('work-tab'),
        education: document.getElementById('education-tab')
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabTarget = btn.getAttribute('data-tab');
            Object.keys(timelines).forEach(key => {
                if (key === tabTarget) {
                    timelines[key].classList.add('active');
                } else {
                    timelines[key].classList.remove('active');
                }
            });
        });
    });

    // Expandable timeline detail drawer
    const detailToggles = document.querySelectorAll('.btn-detail-toggle');

    detailToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const card = toggle.closest('.timeline-content');
            const detailsList = card.querySelector('.timeline-details');
            
            if (detailsList) {
                const isVisible = detailsList.classList.contains('visible');
                detailsList.classList.toggle('visible');
                
                if (isVisible) {
                    toggle.textContent = 'Show Details';
                } else {
                    toggle.textContent = 'Hide Details';
                }
            }
        });
    });

    /* ==========================================================================
       PROJECT CARD GALLERY INTERACTIVE FILTER
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });

    /* ==========================================================================
       INTERSECTION OBSERVER SCROLL ENTRANCE REVEAL
       ========================================================================== */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once revealed, no need to track again
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in full view
        });

        scrollRevealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback if browser doesn't support IntersectionObserver
        scrollRevealElements.forEach(el => el.classList.add('active'));
    }

    /* ==========================================================================
       CONTACT FORM — EMAILJS (Gmail SMTP, no backend, no Outlook, no mailto)
       ============================================================
       ONE-TIME SETUP (5 minutes):

       STEP 1 — Create free account:
         → Go to https://www.emailjs.com and click "Sign Up Free"
         → Sign up using ahmanato789@gmail.com

       STEP 2 — Add Gmail as email service:
         → Dashboard → "Email Services" → "Add New Service"
         → Choose "Gmail" → Connect ahmanato789@gmail.com → Save
         → Copy the SERVICE ID shown (e.g. "service_abc123") → paste below

       STEP 3 — Create an email template:
         → Dashboard → "Email Templates" → "Create New Template"
         → Set "To Email" field to: ahmanato789@gmail.com
         → In the template body use these variables:
            From: {{from_name}} ({{from_email}})
            Subject: {{subject}}
            Message: {{message}}
         → Click Save → Copy the TEMPLATE ID → paste below

       STEP 4 — Get your Public Key:
         → Top-right menu → Account → "API Keys" tab
         → Copy the PUBLIC KEY → paste below

       STEP 5 — Save script.js. Done! Emails go straight to your Gmail inbox.
       ============================================================ */

    const EMAILJS_SERVICE_ID  = 'service_qzmtu62';   // e.g. 'service_abc123'
    const EMAILJS_TEMPLATE_ID = 'template_m924ab6';  // e.g. 'template_xyz456'
    const EMAILJS_PUBLIC_KEY  = 'IzyxDydnekyChTeHi';   // e.g. 'aBcDeFgHiJkLmNoP'

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm    = document.getElementById('contact-form');
    const submitBtn      = document.getElementById('form-submit-btn');
    const feedbackBanner = document.getElementById('form-feedback');

    if (contactForm && submitBtn && feedbackBanner) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Client-side validation
            const nameVal    = document.getElementById('name').value.trim();
            const emailVal   = document.getElementById('email').value.trim();
            const subjectVal = document.getElementById('subject').value.trim();
            const messageVal = document.getElementById('message').value.trim();

            if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                feedbackBanner.textContent = '⚠️ Please fill in all fields before sending.';
                feedbackBanner.className = 'form-feedback error';
                return;
            }

            // Show loading spinner
            const btnText    = submitBtn.querySelector('.btn-text');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');
            btnText.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            feedbackBanner.className = 'form-feedback hidden';

            // Check if EmailJS keys have been filled in
            const isConfigured = !EMAILJS_PUBLIC_KEY.startsWith('YOUR_');

            if (!isConfigured || typeof emailjs === 'undefined') {
                btnText.classList.remove('hidden');
                btnSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                feedbackBanner.innerHTML =
                    '⚙️ Email sending not activated yet. ' +
                    'Complete the 5-step EmailJS setup in <code>script.js</code> — ' +
                    'or reach Ahmad directly at <strong>ahmanato789@gmail.com</strong>.';
                feedbackBanner.className = 'form-feedback error';
                return;
            }

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name:  nameVal,
                    from_email: emailVal,
                    subject:    subjectVal,
                    message:    messageVal,
                    reply_to:   emailVal,
                });

                btnText.classList.remove('hidden');
                btnSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                feedbackBanner.textContent =
                    `✅ Message sent! Thanks ${nameVal} — I'll get back to you at ${emailVal} shortly.`;
                feedbackBanner.className = 'form-feedback success';
                contactForm.reset();

            } catch (error) {
                btnText.classList.remove('hidden');
                btnSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                feedbackBanner.textContent =
                    `❌ Failed to send (${error.text || 'network error'}). Please email ahmanato789@gmail.com directly.`;
                feedbackBanner.className = 'form-feedback error';
            }
        });
    }
});
