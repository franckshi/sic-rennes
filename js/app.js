(function () {
  const body = document.body;
  const root = body.dataset.root || ".";
  const view = body.dataset.view || "home";
  const data = window.SICI18n.localizeData(window.DataStore.all());
  const main = document.querySelector("#main-content");
  const directSchoolSlugs = new Set(["emile-zola"]);

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

  const schoolURL = (school) =>
    directSchoolSlugs.has(school.id)
      ? `${root}/${school.id}/`
      : `${root}/etablissements/?school=${encodeURIComponent(school.id)}`;

  const formatDate = (dateValue) =>
    new Intl.DateTimeFormat(window.SICI18n.locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${dateValue}T12:00:00`));

  function header() {
    const links = [
      ["home", "Accueil", `${root}/`],
      ["programs", "Le parcours", `${root}/programmes/`],
      ["schools", "Les pôles", `${root}/etablissements/`],
      ["agenda", "Agenda", `${root}/agenda/`],
      ["activities", "Projets", `${root}/activites/`],
      ["teachers", "L’équipe", `${root}/enseignants/`]
    ];
    document.querySelector("#site-header").innerHTML = `
      <header class="site-header">
        <div class="nav-shell">
          <a class="brand" href="${root}/" aria-label="Accueil — SIC à Rennes">
            <svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M8 21h32M12 17h24l-4-5H16l-4 5Zm3 4v13m18-13v13M10 35h28M16 26h16M20 26v9m8-9v9M7 39h34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24 5c2 3 5 4 8 5H16c3-1 6-2 8-5Z" fill="currentColor"/>
            </svg>
            <span><span class="brand-name">SIC à Rennes</span><span class="brand-cn">雷恩中文国际班</span></span>
          </a>
          <nav class="main-nav" id="main-nav" aria-label="Navigation principale">
            ${links.map(([id, label, href]) => `<a class="${view === id ? "active" : ""}" href="${href}">${label}</a>`).join("")}
          </nav>
          <div class="language-switcher" aria-label="Language">
            ${[["zh","中"],["fr","FR"],["en","EN"]].map(([id, label]) => `<button type="button" class="${window.SICI18n.language === id ? "active" : ""}" data-language="${id}" aria-pressed="${window.SICI18n.language === id}">${label}</button>`).join("")}
          </div>
          <a class="nav-cta" href="${root}/programmes/?program=admission">Découvrir la SIC</a>
          <button class="nav-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav"><span></span></button>
        </div>
      </header>`;
  }

  function footer() {
    document.querySelector("#site-footer").innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <h3>SIC à Rennes</h3>
            <p>Le portail de la Section internationale chinoise : parcours, projets, équipe et informations pratiques.</p>
          </div>
          <div><h3>Découvrir</h3><a href="${root}/programmes/">Le parcours</a><a href="${root}/etablissements/">Les pôles SIC</a><a href="${root}/agenda/">Agenda</a></div>
          <div><h3>Vie de la SIC</h3><a href="${root}/activites/">Projets des élèves</a><a href="${root}/enseignants/">L’équipe</a><a href="${root}/programmes/?program=admission">Préparer son entrée</a></div>
          <div><h3>Plateforme</h3><a href="${root}/admin.html">Administration</a><a href="mailto:contact@sic-rennes.fr">Contact</a><a href="#">Mentions légales</a></div>
        </div>
        <div class="container footer-bottom">© ${new Date().getFullYear()} SIC à Rennes · 雷恩中文国际班</div>
      </footer>`;
  }

  function cultureSVG() {
    return `
      <svg class="culture-outline" viewBox="0 0 900 520" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <path d="M0 420c95-30 148-82 235-87 88-5 138 52 224 39 72-11 103-72 171-88 87-20 164 26 270 1"/>
          <path d="M12 448c106-29 160-78 248-81 86-2 139 48 219 33 72-13 102-73 175-85 83-14 145 18 246 3"/>
          <path d="M504 306h210M534 286h150l-17-28H551l-17 28Zm21 20v82m110-82v82m-130 0h165M570 323h80M590 323v65m40-65v65"/>
          <path d="M610 210c17 24 47 33 83 40H527c36-7 66-16 83-40Zm-24-16h48l-8-28h-32l-8 28Zm24-28v-42"/>
          <path d="M40 380l32-52 35 37 34-60 45 38 37-71 43 55 37-36 44 53"/>
          <path d="M30 390h310M68 351v42m52-65v65m67-65v65m69-72v72m55-70v70"/>
          <path d="M746 119c22 17 47 17 75 2-14 25-32 41-58 48 28 5 48 21 60 48-31-13-59-12-83 5"/>
        </g>
      </svg>`;
  }

  function schoolRows(schools, limit) {
    return schools.slice(0, limit || schools.length).map((school) => `
      <a class="school-row reveal" href="${schoolURL(school)}">
        <span class="school-monogram">${escapeHTML(school.name.split(" ").filter(Boolean).slice(-2).map((part) => part[0]).join(""))}</span>
        <span><h3>${escapeHTML(school.name)}</h3><p>${escapeHTML(school.address)}</p></span>
        <p>${escapeHTML(school.description)}</p>
        <span class="tag">${escapeHTML(school.type)}</span>
        <span aria-hidden="true">→</span>
      </a>`).join("");
  }

  function eventRows(events, limit) {
    return events.slice(0, limit || events.length).map((event) => {
      const date = new Date(`${event.date}T12:00:00`);
      const day = String(date.getDate()).padStart(2, "0");
      const month = new Intl.DateTimeFormat(window.SICI18n.locale, { month: "short" }).format(date).replace(".", "").toUpperCase();
      return `
        <article class="event-row reveal">
          <time class="date-block" datetime="${event.date}"><strong>${day}</strong><span>${month}</span></time>
          <div><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.location)} · ${formatDate(event.date)}</p></div>
          <span class="tag">${escapeHTML(event.category)}</span>
          <span aria-hidden="true">→</span>
        </article>`;
    }).join("");
  }

  function activityCards(activities, limit) {
    const chars = ["旅", "春", "书", "茶", "乐", "画"];
    const colors = ["#dbe6df", "#eed7ca", "#e6ddc8", "#dae1d1", "#e8d6b8", "#d9e1e5"];
    return activities.slice(0, limit || activities.length).map((activity, index) => `
      <article class="activity-card reveal">
        <div class="activity-art" style="--activity-color:${colors[index % colors.length]}">${chars[index % chars.length]}</div>
        <small>${escapeHTML(activity.category)} · ${escapeHTML(activity.year)}</small>
        <h3>${escapeHTML(activity.title)}</h3>
        <p>${escapeHTML(activity.description)}</p>
      </article>`).join("");
  }

  function renderHome() {
    const featured = ["college-emile-zola", "emile-zola"]
      .map((id) => data.schools.find((school) => school.id === id))
      .filter(Boolean);
    main.innerHTML = `
      <section class="hero">
        <div class="hanzi-rain" aria-hidden="true"></div>
        <div class="container hero-copy">
          <h1>SIC à Rennes</h1>
          <div class="hero-cn">雷恩中文国际班</div>
          <p class="hero-lead">Un parcours bilingue du collège au baccalauréat,<br>pour apprendre, comprendre et grandir entre deux cultures.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${root}/programmes/">Découvrir la SIC</a>
            <a class="button button-secondary" href="${root}/etablissements/">Voir les deux pôles</a>
            <a class="button button-gold" href="${root}/activites/">Explorer les projets</a>
          </div>
        </div>
        ${cultureSVG()}
      </section>
      <section class="stats-band" aria-label="Chiffres clés">
        <div class="container stats-grid">
          <div class="stat"><strong>2</strong><span>pôles collège et lycée</span></div>
          <div class="stat"><strong>7</strong><span>années de parcours continu</span></div>
          <div class="stat"><strong>2</strong><span>langues au quotidien</span></div>
          <div class="stat"><strong>${data.programs.length}</strong><span>volets du parcours expliqués</span></div>
          <div class="stat"><strong>${data.activities.length}</strong><span>projets à découvrir</span></div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-heading reveal"><div><h2>Grandir dans un parcours international</h2></div><p>Une progression continue qui articule langue, culture, disciplines et projets collectifs.</p></div>
          <div class="pathway">
            ${[
              ["启", "6e", "Entrer dans le parcours et construire ses repères."],
              ["读", "5e", "Lire, écouter et s’exprimer avec plus d’aisance."],
              ["思", "4e", "Développer l’analyse et les projets bilingues."],
              ["进", "3e", "Consolider les acquis et préparer la suite."],
              ["深", "Lycée", "Approfondir la langue, la culture et les disciplines."],
              ["远", "Après-bac", "Valoriser un profil bilingue et international."]
            ].map(([icon, title, text]) => `<div class="path-step reveal"><div class="path-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section section-white">
        <div class="container">
          <div class="section-heading reveal"><h2>Les deux pôles de la SIC</h2><a class="section-link" href="${root}/etablissements/">Découvrir le parcours →</a></div>
          <div class="school-list">${schoolRows(featured)}</div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-heading reveal"><h2>Agenda prévisionnel</h2><a class="section-link" href="${root}/agenda/">Consulter l’agenda →</a></div>
          <div class="event-list">${eventRows(data.events, 4)}</div>
        </div>
      </section>
      <section class="section section-white">
        <div class="container">
          <div class="section-heading reveal"><h2>Projets des élèves</h2><a class="section-link" href="${root}/activites/">Voir tous les projets →</a></div>
          <div class="activity-grid">${activityCards(data.activities, 3)}</div>
        </div>
      </section>`;
    createHanziRain();
  }

  function renderSchools() {
    const requested = new URLSearchParams(location.search).get("school");
    if (requested) {
      renderSchoolDetail(requested);
      return;
    }
    main.innerHTML = `
      <section class="page-hero" data-watermark="校"><div class="container"><h1>Les pôles SIC</h1><p>Découvrez la continuité du parcours entre le collège et le lycée, ainsi que les équipes et enseignements associés.</p></div></section>
      <section class="section"><div class="container">
        <div class="toolbar" id="school-filters">
          ${["Tous","Collège","Lycée"].map((label, index) => `<button class="filter-button ${index === 0 ? "active" : ""}" data-filter="${label}">${label}</button>`).join("")}
          <input class="search-input" id="school-search" type="search" placeholder="Rechercher un pôle" aria-label="Rechercher un pôle">
        </div>
        <div class="school-list" id="school-results">${schoolRows(data.schools)}</div>
      </div></section>`;
    let type = "Tous";
    let query = "";
    const update = () => {
      const filtered = data.schools.filter((school) => (type === "Tous" || school.type === type) && `${school.name} ${school.description}`.toLowerCase().includes(query));
      document.querySelector("#school-results").innerHTML = filtered.length ? schoolRows(filtered) : `<div class="empty-state">Aucun pôle ne correspond à cette recherche.</div>`;
      initReveal();
    };
    document.querySelector("#school-filters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      type = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
      update();
    });
    document.querySelector("#school-search").addEventListener("input", (event) => {
      query = event.target.value.trim().toLowerCase();
      update();
    });
  }

  function renderSchoolDetail(id) {
    const school = data.schools.find((item) => item.id === id);
    if (!school) return renderNotFound("Établissement introuvable");
    const programs = school.programs.map((programId) => data.programs.find((program) => program.id === programId)).filter(Boolean);
    const teachers = school.teachers.map((teacherId) => data.teachers.find((teacher) => teacher.id === teacherId)).filter(Boolean);
    main.innerHTML = `
      <section class="page-hero" data-watermark="校"><div class="container"><h1>${escapeHTML(school.name)}</h1><p>${escapeHTML(school.description)}</p></div></section>
      <section class="section"><div class="container detail-layout">
        <div>
          <section class="detail-section reveal"><h2>Présentation</h2><p>${escapeHTML(school.description)}</p></section>
          <section class="detail-section reveal"><h2>Volets du parcours</h2>
            ${programs.length ? `<div class="cards">${programs.map((program) => `<a class="info-card" href="${root}/programmes/?program=${program.id}"><span class="program-code">${program.name}</span><h3>${program.title}</h3><p>${program.description}</p></a>`).join("")}</div>` : `<div class="empty-state">Les informations détaillées seront ajoutées prochainement.</div>`}
          </section>
          <section class="detail-section reveal"><h2>Équipe enseignante</h2>
            ${teachers.length ? `<div class="cards">${teachers.map((teacher) => `<article class="info-card"><div class="teacher-avatar">${teacher.name.split(" ").map((part) => part[0]).join("")}</div><h3>${escapeHTML(teacher.name)}</h3><p>${escapeHTML(teacher.biography)}</p></article>`).join("")}</div>` : `<div class="empty-state">La présentation de l’équipe sera publiée après validation.</div>`}
          </section>
          <section class="detail-section reveal"><h2>Localisation</h2><div class="map-placeholder"><div><div class="map-pin"></div><strong>${escapeHTML(school.address)}</strong><br><small>${school.latitude}, ${school.longitude}</small></div></div></section>
        </div>
        <aside class="detail-aside reveal">
          <dl>
            <dt>Type</dt><dd>${escapeHTML(school.type)} · ${escapeHTML(school.public_private)}</dd>
            <dt>Adresse</dt><dd>${escapeHTML(school.address)}</dd>
            <dt>Parcours</dt><dd>Section internationale chinoise</dd>
            <dt>Volets</dt><dd>${school.programs.map((item) => escapeHTML(item.toUpperCase())).join(", ") || "À confirmer"}</dd>
          </dl>
          ${school.website ? `<a class="button button-primary" style="width:100%;margin-top:24px" href="${escapeHTML(school.website)}" target="_blank" rel="noopener">Visiter le site officiel</a>` : ""}
        </aside>
      </div></section>`;
  }

  function renderPrograms() {
    const requested = new URLSearchParams(location.search).get("program");
    if (requested) {
      renderProgramDetail(requested);
      return;
    }
    main.innerHTML = `
      <section class="page-hero" data-watermark="学"><div class="container"><h1>Le parcours SIC</h1><p>Comprendre la progression du collège au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.</p></div></section>
      <section class="section"><div class="container"><div class="cards">
        ${data.programs.map((program) => `<a class="info-card reveal" href="${root}/programmes/?program=${program.id}"><span class="program-code">${escapeHTML(program.name)}</span><h2>${escapeHTML(program.title)}</h2><p>${escapeHTML(program.description)}</p><div class="card-meta"><span class="tag">Voir le parcours →</span></div></a>`).join("")}
      </div></div></section>`;
  }

  function renderProgramDetail(id) {
    const program = data.programs.find((item) => item.id === id);
    if (!program) return renderNotFound("Programme introuvable");
    const schools = data.schools.filter((school) => school.programs.includes(program.id));
    main.innerHTML = `
      <section class="page-hero" data-watermark="学"><div class="container"><div class="program-code">${escapeHTML(program.name)}</div><h1>${escapeHTML(program.title)}</h1><p>${escapeHTML(program.description)}</p></div></section>
      <section class="section"><div class="container detail-layout">
        <div>
          <section class="detail-section reveal"><h2>À qui s’adresse ce parcours ?</h2><p>${escapeHTML(program.target)}</p></section>
          <section class="detail-section reveal"><h2>Principaux avantages</h2><div class="cards">${program.advantages.map((advantage, index) => `<article class="info-card"><span class="program-code">0${index + 1}</span><h3>${escapeHTML(advantage)}</h3></article>`).join("")}</div></section>
          <section class="detail-section reveal"><h2>Après ce parcours</h2><p>${escapeHTML(program.higher_education)}</p></section>
          <section class="detail-section reveal"><h2>Où suivre ce volet ?</h2><div class="school-list">${schools.length ? schoolRows(schools) : `<div class="empty-state">Les informations pratiques seront ajoutées après validation.</div>`}</div></section>
        </div>
        <aside class="detail-aside reveal"><h3>Préparer son projet</h3><p>Découvrez les deux pôles SIC puis confirmez les modalités et dates auprès de l’établissement.</p><a class="button button-primary" style="width:100%" href="${root}/etablissements/">Voir les pôles SIC</a></aside>
      </div></section>`;
  }

  function renderAgenda() {
    const categories = ["Toutes", ...new Set(data.events.map((event) => event.category))];
    main.innerHTML = `
      <section class="page-hero" data-watermark="日"><div class="container"><h1>Agenda</h1><p>Réunions, ateliers, présentations et temps forts de la Section internationale chinoise. Les dates indiquées doivent être confirmées.</p></div></section>
      <section class="section"><div class="container">
        <div class="toolbar" id="event-filters">${categories.map((category, index) => `<button class="filter-button ${index === 0 ? "active" : ""}" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div>
        <div class="event-list" id="event-results">${eventRows(data.events)}</div>
      </div></section>`;
    document.querySelector("#event-filters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const category = button.dataset.category;
      document.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("active", item === button));
      const filtered = category === "Toutes" ? data.events : data.events.filter((item) => item.category === category);
      document.querySelector("#event-results").innerHTML = eventRows(filtered);
      initReveal();
    });
  }

  function renderActivities() {
    const years = [...new Set(data.activities.map((activity) => activity.year))].sort((a, b) => b - a);
    const categories = [...new Set(data.activities.map((activity) => activity.category))];
    main.innerHTML = `
      <section class="page-hero" data-watermark="艺"><div class="container"><h1>Projets des élèves</h1><p>Productions bilingues, ateliers, échanges et projets culturels qui donnent vie au parcours SIC.</p></div></section>
      <section class="section"><div class="container">
        <div class="toolbar">
          <select class="select-input" id="activity-year"><option value="">Toutes les années</option>${years.map((year) => `<option>${year}</option>`).join("")}</select>
          <select class="select-input" id="activity-category"><option value="">Toutes les catégories</option>${categories.map((category) => `<option>${escapeHTML(category)}</option>`).join("")}</select>
        </div>
        <div class="activity-grid" id="activity-results">${activityCards(data.activities)}</div>
      </div></section>`;
    const update = () => {
      const year = document.querySelector("#activity-year").value;
      const category = document.querySelector("#activity-category").value;
      const filtered = data.activities.filter((activity) => (!year || String(activity.year) === year) && (!category || activity.category === category));
      document.querySelector("#activity-results").innerHTML = filtered.length ? activityCards(filtered) : `<div class="empty-state">Aucune activité ne correspond à ces filtres.</div>`;
      initReveal();
    };
    document.querySelector("#activity-year").addEventListener("change", update);
    document.querySelector("#activity-category").addEventListener("change", update);
  }

  function renderTeachers() {
    main.innerHTML = `
      <section class="page-hero" data-watermark="师"><div class="container"><h1>L’équipe SIC</h1><p>Les fonctions pédagogiques qui accompagnent les élèves et relient langue, disciplines, projets et familles.</p></div></section>
      <section class="section"><div class="container"><div class="cards">
        ${data.teachers.map((teacher) => {
          const schools = teacher.schools.map((id) => data.schools.find((school) => school.id === id)).filter(Boolean);
          return `<article class="info-card reveal"><div class="teacher-avatar">${teacher.name.split(" ").map((part) => part[0]).join("")}</div><h2>${escapeHTML(teacher.name)}</h2><p>${escapeHTML(teacher.biography)}</p><div class="card-meta">${schools.map((school) => `<a class="tag" href="${schoolURL(school)}">${escapeHTML(school.name)}</a>`).join("")}</div></article>`;
        }).join("")}
      </div></div></section>`;
  }

  function renderNotFound(title) {
    main.innerHTML = `<section class="page-hero" data-watermark="？"><div class="container"><h1>${escapeHTML(title)}</h1><p>Cette page n’est pas encore disponible.</p><a class="button button-primary" href="${root}/">Revenir à l’accueil</a></div></section>`;
  }

  function createHanziRain() {
    const host = document.querySelector(".hanzi-rain");
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = ["中","国","文","汉","语","学","习","爱","梦","书","春","福","龙","文化","交流"];
    host.innerHTML = Array.from({ length: 24 }, (_, index) => {
      const left = (index * 41 + 7) % 100;
      const duration = 15 + (index % 8) * 2.2;
      const delay = -((index * 3.4) % 21);
      const size = 16 + (index % 5) * 7;
      return `<span class="falling-hanzi" style="left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;font-size:${size}px">${chars[index % chars.length]}</span>`;
    }).join("");
  }

  function initReveal() {
    window.SICI18n.translatePage();
    const nodes = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
  }

  function initInteractions() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelector(".language-switcher").addEventListener("click", (event) => {
      const button = event.target.closest("[data-language]");
      if (button) window.SICI18n.setLanguage(button.dataset.language);
    });
    addEventListener("pointermove", (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    }, { passive: true });
  }

  header();
  footer();
  ({
    home: renderHome,
    schools: renderSchools,
    programs: renderPrograms,
    agenda: renderAgenda,
    activities: renderActivities,
    teachers: renderTeachers,
    schoolDetail: () => renderSchoolDetail(body.dataset.school)
  }[view] || (() => renderNotFound("Page introuvable")))();
  window.SICI18n.translatePage();
  initInteractions();
  initReveal();
})();
