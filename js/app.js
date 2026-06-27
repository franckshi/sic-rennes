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

  const visiblePrograms = () => data.programs.filter((program) => program.visible !== false);

  const activityURL = (activity) => `${root}/activites/?activity=${encodeURIComponent(activity.id)}`;

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
        <span class="school-monogram">${escapeHTML(school.monogram || school.name.split(" ").filter(Boolean).slice(-2).map((part) => part[0]).join(""))}</span>
        <span><h3>${escapeHTML(school.name)}</h3><p>${escapeHTML(school.address)}</p></span>
        <p>${escapeHTML(school.description)}</p>
        <span class="tag">${escapeHTML(school.type)}</span>
        <span aria-hidden="true">→</span>
      </a>`).join("");
  }

  function schoolChip(id, label) {
    const school = data.schools.find((item) => item.id === id);
    if (!school) return "";
    return `<a class="school-chip" href="${schoolURL(school)}"><span>${escapeHTML(school.monogram || label || school.name.slice(0, 1))}</span>${escapeHTML(label || school.name)}</a>`;
  }

  function schoolPathways() {
    const groups = [
      {
        title: "Groupe A primaire → Collège Landry",
        text: "Carle Bahon et La Poterie forment le groupe A. Les CM2 poursuivent vers Collège Landry, puis vers Lycée Émile Zola.",
        primary: [["ecole-carle-bahon", "Carle Bahon"], ["ecole-la-poterie", "La Poterie"]],
        middle: ["college-le-landry", "Collège Landry"]
      },
      {
        title: "Groupe B primaire → Collège Émile Zola",
        text: "Jules Ferry et L'Ille forment le groupe B. Les CM2 poursuivent vers Collège Émile Zola, puis vers Lycée Émile Zola.",
        primary: [["ecole-jules-ferry", "Jules Ferry"], ["ecole-lille", "L'Ille"]],
        middle: ["college-emile-zola", "Collège Émile Zola"]
      }
    ];
    return `<div class="school-pathways">${groups.map((group) => `
      <article class="school-pathway-card reveal">
        <h3>${escapeHTML(group.title)}</h3>
        <p>${escapeHTML(group.text)}</p>
        <div class="pathway-flow">
          <div>${group.primary.map(([id, label]) => schoolChip(id, label)).join("")}</div>
          <span aria-hidden="true">→</span>
          <div>${schoolChip(group.middle[0], group.middle[1])}</div>
          <span aria-hidden="true">→</span>
          <div>${schoolChip("emile-zola", "Lycée Émile Zola")}</div>
        </div>
      </article>`).join("")}</div>`;
  }

  function campusMap(schools) {
    const points = schools.filter((school) => Number.isFinite(school.latitude) && Number.isFinite(school.longitude));
    return `<div class="campus-map reveal">
      <div class="map-copy">
        <h3>Carte des 7 pôles SIC à Rennes</h3>
        <p>Explorez les rues et les repères de Rennes. Survolez un marqueur pour lire le résumé de l’établissement et cliquez pour ouvrir sa page.</p>
        <div class="map-legend"><span>● Primaire</span><span>● Collège</span><span>● Lycée</span></div>
      </div>
      <div class="map-canvas" id="campus-real-map" data-point-count="${points.length}" aria-label="Carte interactive des pôles SIC"></div>
    </div>`;
  }

  function initCampusMap() {
    const host = document.querySelector("#campus-real-map");
    if (!host || !window.L) return;
    const points = data.schools.filter((school) => Number.isFinite(school.latitude) && Number.isFinite(school.longitude));
    if (!points.length) return;
    const map = window.L.map(host, { scrollWheelZoom: false, zoomControl: true });
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const bounds = [];
    points.forEach((school) => {
      const level = school.type.includes("primaire") ? "primary" : school.type === "Collège" ? "middle" : "high";
      const icon = window.L.divIcon({
        className: "campus-leaflet-marker",
        html: `<span class="campus-marker-${level}"><b>${escapeHTML(school.monogram || "•")}</b></span>`,
        iconSize: [42, 50],
        iconAnchor: [21, 48],
        tooltipAnchor: [0, -42]
      });
      const marker = window.L.marker([school.latitude, school.longitude], {
        icon,
        keyboard: true,
        title: school.name,
        alt: school.name
      }).addTo(map);
      marker.bindTooltip(`<strong>${escapeHTML(school.name)}</strong><small>${escapeHTML(school.address)}</small><em>${escapeHTML(school.description)}</em>`, {
        className: "campus-leaflet-tooltip",
        direction: "top",
        opacity: 1
      });
      marker.on("click", () => { location.href = schoolURL(school); });
      bounds.push([school.latitude, school.longitude]);
    });
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: 13 });
  }

  function teachingStages(items) {
    return items.map((item) => {
      const [level, schedule, ...description] = item.split("|").map((part) => part.trim());
      return `<article class="teaching-stage">
        <div><span class="program-code">${escapeHTML(level)}</span>${schedule ? `<strong>${escapeHTML(schedule)}</strong>` : ""}</div>
        <p>${escapeHTML(description.join(" | ") || schedule || "")}</p>
      </article>`;
    }).join("");
  }

  function teachingFeatures(items) {
    return items.map((item, index) => `<article class="teaching-feature"><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHTML(item)}</p></article>`).join("");
  }

  function cohortMap2026(items) {
    const pathways = [];
    const pathwayIndex = new Map();
    items.forEach((item) => {
      const [pathway, site, level, students, teachers, schedule, ...noteParts] = item.split("|").map((part) => part.trim());
      if (!pathway || !site || !level) return;
      if (!pathwayIndex.has(pathway)) {
        const record = { pathway, sites: [], siteIndex: new Map() };
        pathwayIndex.set(pathway, record);
        pathways.push(record);
      }
      const pathwayRecord = pathwayIndex.get(pathway);
      if (!pathwayRecord.siteIndex.has(site)) {
        const siteRecord = { site, rows: [] };
        pathwayRecord.siteIndex.set(site, siteRecord);
        pathwayRecord.sites.push(siteRecord);
      }
      pathwayRecord.siteIndex.get(site).rows.push({
        level,
        students,
        teachers,
        schedule,
        note: noteParts.join(" | ")
      });
    });
    return `<div class="cohort-map">${pathways.map((pathway) => `
      <section class="cohort-pathway">
        <h3>${escapeHTML(pathway.pathway)}</h3>
        <div class="cohort-sites">
          ${pathway.sites.map((site) => `
            <article class="cohort-site">
              <h4>${escapeHTML(site.site)}</h4>
              <div class="cohort-classes">
                ${site.rows.map((row) => `
                  <div class="cohort-class">
                    <span class="cohort-level">${escapeHTML(row.level)}</span>
                    <div>
                      <strong>${escapeHTML(row.students)}</strong>
                      <p>${escapeHTML(row.teachers)}</p>
                      <small>${escapeHTML([row.schedule, row.note].filter(Boolean).join(" · "))}</small>
                    </div>
                  </div>`).join("")}
              </div>
            </article>`).join("")}
        </div>
      </section>`).join("")}</div>`;
  }

  function eventRows(events, limit) {
    return events.slice(0, limit || events.length).map((event) => {
      const hasDate = /^\d{4}-\d{2}-\d{2}$/.test(event.date || "");
      const date = hasDate ? new Date(`${event.date}T12:00:00`) : null;
      const day = hasDate ? String(date.getDate()).padStart(2, "0") : ({ zh: "待", fr: "À", en: "TBC" }[window.SICI18n.language] || "—");
      const month = hasDate
        ? new Intl.DateTimeFormat(window.SICI18n.locale, { month: "short" }).format(date).replace(".", "").toUpperCase()
        : ({ zh: "确认", fr: "CONF.", en: "DATE" }[window.SICI18n.language] || "TBC");
      const timing = hasDate ? formatDate(event.date) : (event.period || "Date à confirmer");
      return `
        <article class="event-row reveal">
          ${hasDate ? `<time class="date-block" datetime="${event.date}"><strong>${day}</strong><span>${month}</span></time>` : `<div class="date-block" aria-label="Date à confirmer"><strong>${day}</strong><span>${month}</span></div>`}
          <div><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.location)} · ${escapeHTML(timing)}</p></div>
          <span class="tag">${escapeHTML(event.category)}</span>
          <span aria-hidden="true">→</span>
        </article>`;
    }).join("");
  }

  function activityCards(activities, limit) {
    const chars = ["旅", "考", "华", "影", "院", "航", "春", "迎"];
    const colors = ["#dbe6df", "#eed7ca", "#e6ddc8", "#dae1d1", "#e8d6b8", "#d9e1e5"];
    return activities.slice(0, limit || activities.length).map((activity, index) => `
      <a class="activity-card reveal" href="${activityURL(activity)}">
        <div class="activity-art ${activity.photos?.[0] ? "has-photo" : ""}" style="--activity-color:${colors[index % colors.length]}">${activity.photos?.[0] ? `<img src="${escapeHTML(activity.photos[0])}" alt="${escapeHTML(activity.title)}" loading="lazy">` : escapeHTML(activity.symbol || chars[index % chars.length])}</div>
        <small>${escapeHTML(activity.category)} · ${escapeHTML(activity.year)}</small>
        <h3>${escapeHTML(activity.title)}</h3>
        <p>${escapeHTML(activity.description)}</p>
        <span class="activity-card-link">Découvrir le projet →</span>
      </a>`).join("");
  }

  function activityContentBlocks(activity) {
    const photos = (activity.photos || []).slice(0, 4);
    const blocks = activity.content_blocks?.length
      ? activity.content_blocks
      : ["text | Présentation | " + (activity.detail_intro || activity.description), "gallery | 1,2,3,4 | Photos du projet"];
    return blocks.map((block) => {
      const [rawType, first = "", ...rest] = String(block).split("|").map((part) => part.trim());
      const type = rawType.toLowerCase();
      if (["text", "texte"].includes(type)) {
        return `<section class="activity-content-text reveal"><h2>${escapeHTML(first)}</h2><p>${escapeHTML(rest.join(" | "))}</p></section>`;
      }
      if (type === "image") {
        const source = photos[Math.max(0, Number(first || 1) - 1)];
        if (!source) return "";
        const caption = rest.join(" | ");
        return `<figure class="activity-content-image reveal"><img src="${escapeHTML(source)}" alt="${escapeHTML(caption || activity.title)}" loading="lazy">${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ""}</figure>`;
      }
      if (["gallery", "galerie"].includes(type)) {
        const indexes = first.split(",").map((value) => Number(value.trim()) - 1).filter((value) => value >= 0);
        const selected = (indexes.length ? indexes.map((index) => photos[index]) : photos).filter(Boolean);
        if (!selected.length) return "";
        const title = rest.join(" | ");
        return `<section class="activity-content-gallery reveal">${title ? `<h2>${escapeHTML(title)}</h2>` : ""}<div>${selected.map((source, index) => `<img src="${escapeHTML(source)}" alt="${escapeHTML(`${activity.title} — ${index + 1}`)}" loading="lazy">`).join("")}</div></section>`;
      }
      return "";
    }).join("");
  }

  function renderActivityDetail(id) {
    const activity = data.activities.find((item) => item.id === id);
    if (!activity) return renderNotFound("Projet introuvable");
    document.title = `${activity.title} — SIC à Rennes`;
    const cover = activity.photos?.[0];
    main.innerHTML = `
      <section class="activity-detail-hero">
        <div class="container activity-detail-layout">
          <div class="activity-detail-copy reveal">
            <a class="back-link" href="${root}/activites/">← Tous les projets</a>
            <small>${escapeHTML(activity.category)} · ${escapeHTML(activity.year)}</small>
            <h1>${escapeHTML(activity.title)}</h1>
            <p>${escapeHTML(activity.detail_intro || activity.description)}</p>
          </div>
          <div class="activity-detail-cover reveal ${cover ? "has-photo" : ""}">${cover ? `<img src="${escapeHTML(cover)}" alt="${escapeHTML(activity.title)}">` : `<span>${escapeHTML(activity.symbol || "项")}</span>`}</div>
        </div>
      </section>
      <section class="section"><div class="container activity-content">${activityContentBlocks(activity)}</div></section>`;
  }

  function renderHome() {
    const featured = data.schools;
    main.innerHTML = `
      <section class="hero">
        <div class="hanzi-rain" aria-hidden="true"></div>
        <div class="container hero-copy">
          <h1>SIC à Rennes</h1>
          <div class="hero-cn">雷恩中文国际班</div>
          <p class="hero-lead">Un parcours bilingue du CE2 au baccalauréat,<br>pour apprendre, comprendre et grandir entre deux cultures.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${root}/programmes/">Découvrir la SIC</a>
            <a class="button button-secondary" href="${root}/etablissements/">Voir les sept pôles</a>
            <a class="button button-gold" href="${root}/activites/">Explorer les projets</a>
          </div>
        </div>
        ${cultureSVG()}
      </section>
      <section class="stats-band" aria-label="Chiffres clés">
        <div class="container stats-grid">
          <div class="stat"><strong>${data.schools.length}</strong><span>établissements SIC à Rennes</span></div>
          <div class="stat"><strong>10</strong><span>années de parcours continu</span></div>
          <div class="stat"><strong>2</strong><span>langues au quotidien</span></div>
          <div class="stat"><strong>${visiblePrograms().length}</strong><span>volets du parcours expliqués</span></div>
          <div class="stat"><strong>${data.activities.length}</strong><span>projets à découvrir</span></div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-heading reveal"><div><h2>Grandir dans un parcours international</h2></div><p>Une progression continue qui articule langue, culture, disciplines et projets collectifs.</p></div>
          <div class="pathway">
            ${[
              ["启", "Primaire · CE2-CM2", "Découvrir le chinois par l’oral, les jeux, les chants, les images, les gestes et les premiers caractères."],
              ["思", "Collège · 6e-3e", "Approfondir la langue, entrer dans la littérature chinoise et utiliser le chinois en mathématiques."],
              ["深", "Lycée · 2nde-Terminale", "Élargir la littérature, renforcer les mathématiques et découvrir le monde en chinois."],
              ["远", "Après-bac", "Valoriser un profil bilingue, interculturel et international pour construire son projet d’études."]
            ].map(([icon, title, text]) => `<div class="path-step reveal"><div class="path-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section section-white">
        <div class="container">
          <div class="section-heading reveal"><h2>Les sept pôles de la SIC</h2><a class="section-link" href="${root}/etablissements/">Découvrir le parcours →</a></div>
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
      <section class="page-hero" data-watermark="校"><div class="container"><h1>Les pôles SIC</h1><p>Découvrez les sept établissements SIC à Rennes, de l’école primaire au lycée.</p></div></section>
      <section class="section"><div class="container">
        <div class="section-heading reveal"><div><h2>Deux chemins, un même lycée</h2></div><p>Les écoles primaires sont organisées en deux groupes de poursuite vers deux collèges, puis tous les élèves rejoignent le Lycée Émile Zola.</p></div>
        ${schoolPathways()}
      </div></section>
      <section class="section section-white"><div class="container">
        <div class="section-heading reveal"><h2>Carte des pôles</h2><p>Une lecture rapide de la répartition des sept sites dans Rennes.</p></div>
        ${campusMap(data.schools)}
      </div></section>
      <section class="section"><div class="container">
        <div class="toolbar" id="school-filters">
          ${["Tous","École primaire","Collège","Lycée"].map((label, index) => `<button class="filter-button ${index === 0 ? "active" : ""}" data-filter="${label}">${label}</button>`).join("")}
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
          <section class="detail-section reveal"><h2>Localisation</h2><div class="map-placeholder"><div><div class="map-pin"></div><strong>${escapeHTML(school.address)}</strong>${Number.isFinite(school.latitude) && Number.isFinite(school.longitude) ? `<br><small>${school.latitude}, ${school.longitude}</small>` : ""}</div></div></section>
        </div>
        <aside class="detail-aside reveal">
          <dl>
            <dt>Type</dt><dd>${escapeHTML(school.type)} · ${escapeHTML(school.public_private)}</dd>
            <dt>Adresse</dt><dd>${escapeHTML(school.address)}</dd>
            <dt>Parcours</dt><dd>Section internationale chinoise</dd>
            <dt>Volets</dt><dd>${programs.map((program) => escapeHTML(program.name)).join(", ") || "À confirmer"}</dd>
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
      <section class="page-hero" data-watermark="学"><div class="container"><h1>Le parcours SIC</h1><p>Comprendre la progression du primaire au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.</p></div></section>
      <section class="section"><div class="container"><div class="cards">
        ${visiblePrograms().map((program) => `<a class="info-card reveal" href="${root}/programmes/?program=${program.id}"><span class="program-code">${escapeHTML(program.name)}</span><h2>${escapeHTML(program.title)}</h2><p>${escapeHTML(program.description)}</p><div class="card-meta"><span class="tag">Voir le parcours →</span></div></a>`).join("")}
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
          ${program.cohort_map_2026?.length ? `<section class="detail-section reveal"><h2>Organisation 2026-2027</h2><p class="section-intro">D’après l’arbre fourni : deux groupes d’écoles primaires alimentent deux collèges SIC, puis les deux collèges poursuivent vers le lycée Émile Zola.</p>${cohortMap2026(program.cohort_map_2026)}</section>` : ""}
          ${program.stage_details?.length ? `<section class="detail-section reveal"><h2>Une progression du primaire au BFI</h2><div class="teaching-timeline">${teachingStages(program.stage_details)}</div></section>` : ""}
          ${program.teaching_methods?.length ? `<section class="detail-section reveal"><h2>Méthodes d’enseignement</h2><div class="teaching-features">${teachingFeatures(program.teaching_methods)}</div></section>` : ""}
          ${program.cultural_projects?.length ? `<section class="detail-section reveal"><h2>Culture et projets</h2><div class="teaching-features">${teachingFeatures(program.cultural_projects)}</div></section>` : ""}
          <section class="detail-section reveal"><h2>Après ce parcours</h2><p>${escapeHTML(program.higher_education)}</p></section>
          <section class="detail-section reveal"><h2>Où suivre ce volet ?</h2><div class="school-list">${schools.length ? schoolRows(schools) : `<div class="empty-state">Les informations pratiques seront ajoutées après validation.</div>`}</div></section>
        </div>
        <aside class="detail-aside reveal"><h3>Préparer son projet</h3><p>Découvrez les sept pôles SIC puis confirmez les modalités et dates auprès de l’établissement.</p><a class="button button-primary" style="width:100%" href="${root}/etablissements/">Voir les pôles SIC</a>${program.source_note ? `<div class="source-note"><strong>Source pédagogique</strong><p>${escapeHTML(program.source_note)}</p></div>` : ""}</aside>
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
    const requested = new URLSearchParams(location.search).get("activity");
    if (requested) {
      renderActivityDetail(requested);
      return;
    }
    const years = [...new Set(data.activities.map((activity) => activity.year))].sort((a, b) => String(b).localeCompare(String(a), undefined, { numeric: true }));
    const categories = [...new Set(data.activities.map((activity) => activity.category))];
    main.innerHTML = `
      <section class="page-hero" data-watermark="艺"><div class="container"><h1>Projets des élèves</h1><p>Voyages, certifications, cinéma, fêtes et partenariats internationaux prolongent les apprentissages au-delà de la classe.</p></div></section>
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
      <section class="section"><div class="container"><div class="team-grid">
        ${data.teachers.map((teacher) => {
          const schools = teacher.schools.map((id) => data.schools.find((school) => school.id === id)).filter(Boolean);
          return `<article class="team-card reveal">
            <div class="teacher-avatar">${escapeHTML(teacher.level?.[0] || teacher.name.split(" ").map((part) => part[0]).join(""))}</div>
            <div class="team-meta"><span>${escapeHTML(teacher.level || "SIC")}</span><h2>${escapeHTML(teacher.name)}</h2><strong>${escapeHTML(teacher.coordo || "Coordination à confirmer")}</strong></div>
            <p>${escapeHTML(teacher.biography)}</p>
            ${teacher.members?.length ? `<div class="teacher-members"><h3>Enseignants et référents</h3>${teacher.members.map((member) => `<p>${escapeHTML(member)}</p>`).join("")}</div>` : ""}
            <div class="card-meta">${schools.map((school) => `<a class="tag" href="${schoolURL(school)}">${escapeHTML(school.name)}</a>`).join("")}</div>
          </article>`;
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
  initCampusMap();
  initInteractions();
  initReveal();
})();
