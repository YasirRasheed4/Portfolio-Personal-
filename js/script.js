window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 500);
  });

  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileClose.addEventListener('click', closeMobileMenu);

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('yr-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });

  const sections = document.querySelectorAll('main section[id], #hero');
  const navA = document.querySelectorAll('.navlinks a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  });

  const roles = ['Software Engineering Student', 'Graphic Designer', 'Video Editor', 'Frontend Web Developer', 'Web Hosting', 'Artificial Intelligence Specialist'];
  let ri = 0, ci = 0, deleting = false;
  const typedText = document.getElementById('typedText');
  function typeLoop(){
    const word = roles[ri];
    if(!deleting){
      typedText.textContent = word.slice(0, ci+1); ci++;
      if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      typedText.textContent = word.slice(0, ci-1); ci--;
      if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.15});
  revealEls.forEach(el => io.observe(el));

  const counters = document.querySelectorAll('.counter');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        const decimal = parseInt(el.dataset.decimal || '0');
        let cur = 0;
        const step = target / 60;
        const anim = setInterval(() => {
          cur += step;
          if(cur >= target){ cur = target; clearInterval(anim); }
          el.textContent = decimal ? cur.toFixed(decimal) : Math.floor(cur);
        }, 22);
        cio.unobserve(el);
      }
    });
  }, {threshold:.5});
  counters.forEach(c => cio.observe(c));

  function fillBars(panel){
    panel.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
  }
  const sio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ fillBars(document.querySelector('.skill-panel.active')); sio.disconnect(); } });
  }, {threshold:.3});
  sio.observe(document.getElementById('skills'));

  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
      const panel = document.querySelector('.skill-panel[data-panel="'+tab.dataset.tab+'"]');
      panel.classList.add('active');
      fillBars(panel);
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards = document.querySelectorAll('.proj-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projCards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.classList.toggle('hidden-item', !show);
      });
    });
  });

  document.querySelectorAll('.learn-more[data-project-filter]').forEach(link => {
    link.addEventListener('click', () => {
      const matchingFilter = document.querySelector('.filter-btn[data-filter="' + link.dataset.projectFilter + '"]');
      if (matchingFilter) matchingFilter.click();
    });
  });

  const caseData = {
    1: {
      cat: 'Web Development · University Academic Project',
      title: 'Event Management System',
      overview: 'EventSphere is a web-based Event Management System with separate sign-in and registration views for administrators, organizers, and participants. It provides a central dashboard for managing events, venues, bookings, users, and payments.',
      problem: 'Event organizers need one place to publish events, define venues, manage available seats, and track registrations. Participants also need a straightforward way to find events and book tickets without relying on disconnected records.',
      goals: ['Create and manage events with dates, times, categories, venues, seat limits, prices, and status', 'Maintain venue records including location, capacity, address, contact information, and facilities', 'Manage ticket bookings with payment method selection and booking status', 'Provide role-based views for administrators, organizers, and participants'],
      role: ['Planned the EventSphere workflow and feature structure', 'Designed the interface for event, venue, booking, and participant management', 'Built and tested the responsive frontend experience', 'Presented the completed Event Management System as a university project'],
      tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Event Management UI'],
      process: ['Requirements', 'User Roles', 'Dashboard Flow', 'UI Design', 'Development', 'Testing', 'Presentation'],
      challenges: 'The main challenge was bringing several connected workflows into one clear system: events depend on venues, bookings depend on events, and participant records depend on bookings. The solution was to separate each workflow into focused dashboard modules while keeping the navigation consistent.',
      results: 'Created a working EventSphere system with authentication views, dashboard navigation, event creation, venue management, booking management, participant tracking, ticket payment options, and searchable management controls.',
      lessons: 'Learned how to structure a multi-role management application, connect related data across workflows, and keep a feature-rich dashboard understandable for different users.'
    },
    4: {
      cat: 'Web Development · Artificial Intelligence',
      title: 'AI Chat Bot Project',
      overview: 'An AI chatbot web project developed under the DecodeLabs repository, focused on creating a conversational interface for interacting with an artificial intelligence system.',
      problem: 'Users need a simple way to communicate with an AI system without dealing with a complicated interface. The project focuses on presenting the conversation clearly and making interaction straightforward.',
      goals: ['Build a focused chat interface for AI-powered conversations', 'Keep the interaction simple and easy to follow', 'Organize the project in a reusable web development structure', 'Create a practical project demonstrating applied artificial intelligence'],
      role: ['Planned the chatbot interface and interaction flow', 'Developed the frontend experience for the AI chat project', 'Structured the project repository and user-facing components', 'Tested the conversation interface for a clear user experience'],
      tools: ['HTML', 'CSS', 'JavaScript', 'Artificial Intelligence', 'GitHub'],
      process: ['Concept', 'Conversation Flow', 'UI Design', 'Development', 'Testing', 'Documentation'],
      challenges: 'The main challenge was presenting an AI conversation in a clear, approachable interface while keeping the project focused on the user interaction rather than unnecessary visual complexity.',
      results: 'Built an AI chatbot project that demonstrates conversational AI through a dedicated web interface and an organized GitHub project repository.',
      lessons: 'Gained practical experience combining frontend development with artificial intelligence concepts and learned how interface decisions shape the way users interact with AI.'
    },
    5: {
      cat: 'Web Development · Artificial Intelligence',
      title: 'AI Data Classification Project',
      overview: 'An artificial intelligence project developed under the DecodeLabs repository, focused on classifying data into meaningful categories through a structured workflow.',
      problem: 'Unorganized data is difficult to interpret consistently. Classification helps turn incoming data into clear categories that can support analysis and decision-making.',
      goals: ['Prepare input data for classification', 'Organize data into meaningful categories', 'Demonstrate a practical artificial intelligence workflow', 'Present the project in a clear structure'],
      role: ['Defined the classification workflow', 'Prepared and organized the project data', 'Developed the AI-focused project structure', 'Tested and documented the classification results'],
      tools: ['Python', 'Artificial Intelligence', 'Machine Learning', 'Data Classification', 'GitHub'],
      process: ['Data Preparation', 'Feature Planning', 'Model Workflow', 'Classification', 'Testing', 'Documentation'],
      challenges: 'The main challenge was turning raw input into consistent categories while keeping the workflow understandable. Clear preparation and organized classification steps made the project easier to evaluate.',
      results: 'Created an AI data classification project that demonstrates how structured input can be grouped into useful categories.',
      lessons: 'Built practical understanding of data preparation, classification workflows, and applying AI to organize information.'
    },
    6: {
      cat: 'Web Development · Artificial Intelligence',
      title: 'AI Recommendation System',
      overview: 'An artificial intelligence recommendation project developed under the DecodeLabs repository, focused on generating relevant suggestions from data and preferences.',
      problem: 'When users have many choices, finding relevant items can be difficult. Recommendations help narrow those choices by identifying useful patterns.',
      goals: ['Organize data for recommendations', 'Identify relationships between preferences and items', 'Generate relevant suggestions through an AI workflow', 'Present the recommendation process clearly'],
      role: ['Planned the recommendation workflow', 'Structured the data and project components', 'Developed the AI-focused recommendation logic', 'Tested the relevance of generated suggestions'],
      tools: ['Python', 'Artificial Intelligence', 'Machine Learning', 'Recommendation Systems', 'GitHub'],
      process: ['Requirements', 'Data Preparation', 'Pattern Analysis', 'Recommendation Logic', 'Testing', 'Documentation'],
      challenges: 'The main challenge was translating data relationships into useful recommendations while keeping the workflow understandable.',
      results: 'Created an AI recommendation system project that demonstrates how data and preferences can produce relevant suggestions.',
      lessons: 'Learned how recommendation systems use data relationships and strengthened my understanding of applying AI to user-focused software.'
    },
    7: {
      cat: 'Web Development · Artificial Intelligence',
      title: 'Image Text Recognition',
      overview: 'An artificial intelligence project developed under the DecodeLabs repository, focused on recognizing and extracting text from image input.',
      problem: 'Text stored inside images is difficult to search, edit, or analyze manually. Image text recognition helps convert visual text into usable digital information.',
      goals: ['Accept image input for text recognition', 'Process visual content for readable text', 'Extract recognized text into a usable format', 'Demonstrate a practical computer vision and AI workflow'],
      role: ['Planned the image-to-text workflow', 'Structured the image processing project', 'Developed the recognition-focused components', 'Tested the output for clarity and usefulness'],
      tools: ['Python', 'Artificial Intelligence', 'Optical Character Recognition', 'Image Processing', 'GitHub'],
      process: ['Image Input', 'Preprocessing', 'Text Recognition', 'Output Formatting', 'Testing', 'Documentation'],
      challenges: 'The main challenge was handling different image conditions while keeping the recognized output readable and useful.',
      results: 'Created an image text recognition project that demonstrates how AI can convert text in images into digital content.',
      lessons: 'Gained practical understanding of image processing, OCR workflows, and applying AI to extract useful information from visual data.'
    },
    2: {
      cat: 'Graphic Design',
      title: 'Graphic Design Portfolio',
      overview: 'An ongoing collection of branding and marketing design work created for small businesses and promotional campaigns. Role: Graphic Designer.',
      problem: "Small local businesses often need professional-looking branding and promotional material but don't have in-house design resources or large budgets.",
      goals: ['Deliver consistent, on-brand visual identities', 'Produce promotional material ready for print and social media', 'Keep turnaround times fast without sacrificing quality'],
      role: ['Designed branding materials, posters, and flyers', 'Created pricing lists and marketing graphics', 'Produced social media assets and packaging mockups'],
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'CorelDRAW'],
      process: ['Research', 'Concept', 'Design', 'Client Feedback', 'Final Delivery'],
      challenges: "Keeping designs consistent with each business's existing branding while still bringing a fresh, polished look — resolved through close reference to existing brand assets before starting new concepts.",
      results: 'Produced a library of branding, poster, and social media designs used directly in promotional campaigns.',
      lessons: 'Sharpened my eye for consistency, client communication, and delivering under real business constraints.'
    },
    3: {
      cat: 'Video Editing',
      title: 'Video Editing Showcase',
      overview: 'A collection of promotional videos, reels, and advertisements edited for social media and marketing use. Role: Video Editor.',
      problem: 'Businesses and creators needed short, engaging video content optimized for social platforms, with limited time to produce it themselves.',
      goals: ['Create engaging, well-paced edits for social media', 'Apply consistent color grading and motion graphics', 'Deliver content ready for multiple platforms'],
      role: ['Edited raw footage into finished promotional videos', 'Applied color grading and motion graphics', 'Adapted content for different aspect ratios and platforms'],
      tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut', 'DaVinci Resolve'],
      process: ['Footage Review', 'Rough Cut', 'Motion Graphics', 'Color Grading', 'Final Export'],
      challenges: 'Keeping edits tight and attention-grabbing within short social media formats — solved by prioritizing pacing and trimming ruthlessly in the rough cut stage.',
      results: 'Delivered a set of polished promotional videos and reels used across social media and advertising.',
      lessons: 'Built a stronger sense of pacing, visual storytelling, and how editing choices affect viewer retention.'
    }
  };

  const modal = document.getElementById('caseModal');
  const modalBody = document.getElementById('modalBody');
  document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('open'); });

  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', () => {
      const d = caseData[card.dataset.case];
      modalBody.innerHTML = `
        <div class="mp-cat">${d.cat}</div>
        <h3>${d.title}</h3>
        <div class="modal-section"><h4>Overview</h4><p>${d.overview}</p></div>
        <div class="modal-section"><h4>Problem</h4><p>${d.problem}</p></div>
        <div class="modal-section"><h4>Goals</h4><ul>${d.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div>
        <div class="modal-section"><h4>My Role</h4><ul>${d.role.map(r=>`<li>${r}</li>`).join('')}</ul></div>
        <div class="modal-section"><h4>Tools</h4><div class="tag-row">${d.tools.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
        <div class="modal-section"><h4>Process</h4><div class="mini-timeline">${d.process.map(p=>`<span class="step">${p}</span>`).join('<span>→</span>')}</div></div>
        <div class="modal-section"><h4>Challenges</h4><p>${d.challenges}</p></div>
        <div class="modal-section"><h4>Results</h4><p>${d.results}</p></div>
        <div class="modal-section"><h4>Lessons Learned</h4><p>${d.lessons}</p></div>
      `;
      modal.classList.add('open');
    });
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(!name || !emailOk || !subject || !message){
      formMsg.textContent = 'Please fill in all fields with a valid email address.';
      formMsg.className = 'form-msg error';
      return;
    }
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '.7';
    setTimeout(() => {
      window.location.href = `mailto:ygill1207@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      formMsg.textContent = 'Your message is ready to send via your email client.';
      formMsg.className = 'form-msg success';
      submitBtn.textContent = 'Send Message';
      submitBtn.style.opacity = '1';
      form.reset();
    }, 700);
  });

  document.getElementById('backTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* --- Existing EmailJS handler --- */

emailjs.init({
    publicKey: "04w4c2s2hfx-aMiXX"
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.send("service_tqn552w", "template_vz81g8q", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
    .then(function() {

  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', event => event.stopPropagation());
  });
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    })
    .catch(function(error) {
        alert("Failed to send message.");
        console.error(error);
    });
});
