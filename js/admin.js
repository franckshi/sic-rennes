(function () {
  const config = {
    schools: {
      label: "Pôles SIC",
      singular: "pôle",
      title: (item) => item.name,
      subtitle: (item) => `${item.type || "Type non renseigné"} · ${item.address || "Adresse non renseignée"}`,
      media: { field: "photos", accept: "image/*", label: "Photos" },
      fields: [
        ["id", "Identifiant", "text", "Identifiant URL unique"],
        ["monogram", "Monogramme", "text", "Initiales affichées dans la liste"],
        ["name", "Nom", "text", ""],
        ["type", "Type", "select", ["École primaire", "Collège", "Lycée", "Université", "Formation adultes"]],
        ["public_private", "Statut", "text", "Public, privé, association…"],
        ["address", "Adresse", "text", ""],
        ["website", "Site officiel", "url", ""],
        ["students", "Nombre d’élèves", "number", ""],
        ["teachers", "Identifiants enseignants", "array", "Séparés par des virgules"],
        ["programs", "Identifiants programmes", "array", "Ex. lvb, lvc, sic"],
        ["latitude", "Latitude", "number", ""],
        ["longitude", "Longitude", "number", ""],
        ["description", "Description", "textarea", ""]
      ]
    },
    teachers: {
      label: "Enseignants",
      singular: "enseignant",
      title: (item) => item.name,
      subtitle: (item) => item.biography || "Biographie non renseignée",
      media: { field: "photo", accept: "image/*", label: "Photo" },
      fields: [
        ["id", "Identifiant", "text", ""],
        ["name", "Nom", "text", ""],
        ["level", "Niveau", "text", "Primaire, Collège, Lycée…"],
        ["coordo", "Coordo", "text", "Coordination ou référent principal"],
        ["schools", "Pôles SIC", "array", "Identifiants séparés par des virgules"],
        ["programs", "Programmes", "array", "Identifiants séparés par des virgules"],
        ["members", "Membres de l’équipe", "multiline", "Une personne ou mission par ligne"],
        ["email", "E-mail", "email", "Optionnel"],
        ["biography", "Biographie", "textarea", ""]
      ]
    },
    programs: {
      label: "Parcours",
      singular: "volet du parcours",
      title: (item) => item.title,
      subtitle: (item) => `${item.name || "Code non renseigné"} · ${item.description || "Description non renseignée"}`,
      fields: [
        ["id", "Identifiant", "text", ""],
        ["name", "Nom court", "text", "Ex. Collège, Lycée, DNL"],
        ["title", "Titre", "text", ""],
        ["visible", "Afficher dans la liste des parcours", "boolean", "Décochez pour garder la page accessible sans afficher la carte"],
        ["target", "Public concerné", "textarea", ""],
        ["advantages", "Avantages", "array", "Séparés par des virgules"],
        ["cohort_map_2026", "Organisation 2026-2027", "multiline", "Une ligne par classe. Format : Parcours | Établissement | Niveau | Effectif | Enseignants | Horaire | Note"],
        ["stage_details", "Progression par niveau", "multiline", "Une étape par ligne. Format conseillé : Niveau | Horaire | Description"],
        ["teaching_methods", "Méthodes d’enseignement", "multiline", "Une méthode par ligne"],
        ["cultural_projects", "Culture et projets", "multiline", "Un projet ou axe par ligne"],
        ["higher_education", "Après ce parcours", "textarea", ""],
        ["source_note", "Source et précision", "textarea", "Source publique et éventuelles réserves"],
        ["description", "Description", "textarea", ""]
      ]
    },
    events: {
      label: "Agenda",
      singular: "événement",
      title: (item) => item.title,
      subtitle: (item) => `${item.date || "Date inconnue"} · ${item.location || "Lieu inconnu"}`,
      fields: [
        ["id", "Identifiant", "text", ""],
        ["date", "Date", "date", ""],
        ["title", "Titre", "text", ""],
        ["location", "Lieu", "text", ""],
        ["school", "Établissement", "text", "Identifiant de l’établissement"],
        ["category", "Catégorie", "text", ""],
        ["description", "Description", "textarea", ""]
      ]
    },
    activities: {
      label: "Activités",
      singular: "activité",
      title: (item) => item.title,
      subtitle: (item) => `${item.year || "Année inconnue"} · ${item.category || "Catégorie inconnue"}`,
      media: { field: "photos", secondField: "videos", accept: "image/*,video/*", label: "Photos et vidéos" },
      fields: [
        ["id", "Identifiant", "text", ""],
        ["title", "Titre", "text", ""],
        ["year", "Année", "number", ""],
        ["category", "Catégorie", "text", ""],
        ["description", "Description", "textarea", ""]
      ]
    }
  };

  let collection = "schools";
  let selectedId = null;
  let draggedId = null;
  let pendingMedia = [];
  const tabs = document.querySelector("#admin-tabs");
  const list = document.querySelector("#record-list");
  const search = document.querySelector("#record-search");
  const form = document.querySelector("#editor-form");
  const empty = document.querySelector("#editor-empty");
  const fieldsHost = document.querySelector("#editor-fields");
  const mediaField = document.querySelector("#media-field");
  const mediaInput = document.querySelector("#media-upload");
  const mediaPreview = document.querySelector("#media-preview");

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

  const slugify = (value) =>
    String(value || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  function items() {
    return DataStore.get(collection);
  }

  function renderTabs() {
    tabs.innerHTML = Object.entries(config).map(([key, value]) =>
      `<button class="admin-tab ${key === collection ? "active" : ""}" data-collection="${key}">${value.label}<span>${DataStore.get(key).length}</span></button>`
    ).join("");
  }

  function renderList() {
    const term = search.value.trim().toLowerCase();
    const cfg = config[collection];
    const filtered = items().filter((item) => `${cfg.title(item)} ${cfg.subtitle(item)}`.toLowerCase().includes(term));
    list.innerHTML = filtered.length
      ? filtered.map((item) => `<div class="record-item ${item.id === selectedId ? "active" : ""}" data-id="${escapeHTML(item.id)}" draggable="true">
          <span class="drag-handle" aria-hidden="true">↕</span>
          <button class="record-main" type="button" data-open-id="${escapeHTML(item.id)}"><strong>${escapeHTML(cfg.title(item) || "Sans titre")}</strong><small>${escapeHTML(cfg.subtitle(item))}</small></button>
          <span class="record-actions" aria-label="Changer l’ordre">
            <button type="button" data-order="-1" title="Monter">↑</button>
            <button type="button" data-order="1" title="Descendre">↓</button>
          </span>
        </div>`).join("")
      : `<div class="admin-empty">Aucun résultat.</div>`;
  }

  function fieldMarkup([name, label, type, helper], item) {
    const raw = item[name] ?? "";
    const value = Array.isArray(raw) ? raw.join(type === "multiline" ? "\n" : ", ") : raw;
    const wide = type === "textarea" || type === "multiline" || name === "name" || name === "title" ? "wide" : "";
    let control = "";
    if (type === "textarea" || type === "multiline") {
      control = `<textarea id="field-${name}" name="${name}">${escapeHTML(value)}</textarea>`;
    } else if (type === "boolean") {
      const checked = raw !== false ? "checked" : "";
      control = `<label class="checkbox-field"><input id="field-${name}" name="${name}" type="checkbox" ${checked}> <span>Afficher</span></label>`;
    } else if (type === "select") {
      control = `<select id="field-${name}" name="${name}">${helper.map((option) => `<option ${value === option ? "selected" : ""}>${escapeHTML(option)}</option>`).join("")}</select>`;
    } else {
      const step = type === "number" ? `step="any"` : "";
      control = `<input id="field-${name}" name="${name}" type="${type === "array" ? "text" : type}" value="${escapeHTML(value)}" ${step}>`;
    }
    const hint = Array.isArray(helper) ? "" : helper;
    return `<div class="form-field ${wide}"><label for="field-${name}">${label}</label>${control}${hint ? `<small>${escapeHTML(hint)}</small>` : ""}</div>`;
  }

  function openEditor(id) {
    selectedId = id || null;
    const cfg = config[collection];
    const item = selectedId ? items().find((record) => record.id === selectedId) : {};
    if (selectedId && !item) return;
    pendingMedia = [];
    fieldsHost.innerHTML = cfg.fields.map((field) => fieldMarkup(field, item || {})).join("");
    document.querySelector("#editor-title").textContent = selectedId ? `Modifier ${cfg.singular}` : `Nouvel ${cfg.singular}`;
    document.querySelector("#delete-button").hidden = !selectedId;
    empty.hidden = true;
    form.hidden = false;
    setupMedia(item || {});
    renderList();
  }

  function closeEditor() {
    selectedId = null;
    form.hidden = true;
    empty.hidden = false;
    renderList();
  }

  function setupMedia(item) {
    const media = config[collection].media;
    if (!media) {
      mediaField.hidden = true;
      return;
    }
    mediaField.hidden = false;
    mediaInput.accept = media.accept;
    mediaInput.multiple = collection !== "teachers";
    document.querySelector("#media-label").textContent = media.label;
    const current = media.secondField
      ? [...(item[media.field] || []), ...(item[media.secondField] || [])]
      : Array.isArray(item[media.field]) ? item[media.field] : item[media.field] ? [item[media.field]] : [];
    mediaPreview.innerHTML = current.map((source, index) => `<span class="media-chip">${source.startsWith("data:") ? `Média local ${index + 1}` : escapeHTML(source)}</span>`).join("");
    mediaInput.value = "";
  }

  function readFiles(files) {
    return Promise.all([...files].map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, type: file.type, data: reader.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })));
  }

  function formValue(field, formData) {
    const [name, , type] = field;
    const value = formData.get(name);
    if (type === "array") return value.split(",").map((part) => part.trim()).filter(Boolean);
    if (type === "multiline") return value.split("\n").map((part) => part.trim()).filter(Boolean);
    if (type === "number") return value === "" ? 0 : Number(value);
    if (type === "boolean") return formData.has(name);
    return value.trim();
  }

  async function moveRecord(sourceId, targetId) {
    if (!sourceId || !targetId || sourceId === targetId || search.value.trim()) return;
    const records = items();
    const from = records.findIndex((record) => record.id === sourceId);
    const to = records.findIndex((record) => record.id === targetId);
    if (from < 0 || to < 0) return;
    const [moved] = records.splice(from, 1);
    records.splice(to, 0, moved);
    try {
      await DataStore.set(collection, records);
      renderList();
      toast("Ordre mis à jour.");
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }

  async function moveRecordByOffset(id, offset) {
    if (!id || search.value.trim()) return;
    const records = items();
    const from = records.findIndex((record) => record.id === id);
    const to = from + offset;
    if (from < 0 || to < 0 || to >= records.length) return;
    const [moved] = records.splice(from, 1);
    records.splice(to, 0, moved);
    try {
      await DataStore.set(collection, records);
      renderList();
      toast("Ordre mis à jour.");
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }

  async function save(event) {
    event.preventDefault();
    const cfg = config[collection];
    const records = items();
    const current = selectedId ? records.find((record) => record.id === selectedId) : {};
    const formData = new FormData(form);
    const result = { ...current };
    cfg.fields.forEach((field) => {
      result[field[0]] = formValue(field, formData);
    });
    if (!result.id) result.id = slugify(result.name || result.title || `${collection}-${Date.now()}`);
    const duplicate = records.find((record) => record.id === result.id && record.id !== selectedId);
    if (duplicate) {
      toast("Cet identifiant existe déjà.");
      return;
    }
    if (cfg.media && pendingMedia.length) {
      if (collection === "teachers") {
        result.photo = pendingMedia[0].data;
      } else if (collection === "activities") {
        result.photos = [...(result.photos || []), ...pendingMedia.filter((file) => file.type.startsWith("image/")).map((file) => file.data)];
        result.videos = [...(result.videos || []), ...pendingMedia.filter((file) => file.type.startsWith("video/")).map((file) => file.data)];
      } else {
        result.photos = [...(result.photos || []), ...pendingMedia.map((file) => file.data)];
      }
    }
    const index = records.findIndex((record) => record.id === selectedId);
    if (index >= 0) records[index] = result;
    else records.unshift(result);
    try {
      await DataStore.set(collection, records);
      selectedId = result.id;
      renderTabs();
      openEditor(result.id);
      toast("Modifications enregistrées en ligne.");
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }

  async function removeSelected() {
    if (!selectedId || !confirm("Supprimer définitivement cet élément ?")) return;
    try {
      await DataStore.set(collection, items().filter((record) => record.id !== selectedId));
      closeEditor();
      renderTabs();
      toast("Élément supprimé.");
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }

  function exportJSON() {
    const blob = new Blob([DataStore.exportAll()], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `sic-a-rennes-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("Export JSON créé.");
  }

  async function importJSON(file) {
    try {
      await DataStore.importAll(await file.text());
      closeEditor();
      renderTabs();
      renderList();
      toast("Données importées.");
    } catch (error) {
      console.error(error);
      toast("Le fichier JSON est invalide.");
    }
  }

  let toastTimer;
  function toast(message) {
    const node = document.querySelector("#admin-toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collection]");
    if (!button) return;
    collection = button.dataset.collection;
    search.value = "";
    document.querySelector("#collection-title").textContent = config[collection].label;
    closeEditor();
    renderTabs();
    renderList();
  });
  list.addEventListener("click", (event) => {
    const orderButton = event.target.closest("[data-order]");
    if (orderButton) {
      const item = orderButton.closest("[data-id]");
      moveRecordByOffset(item?.dataset.id, Number(orderButton.dataset.order));
      return;
    }
    const button = event.target.closest("[data-open-id]");
    if (button) openEditor(button.dataset.openId);
  });
  list.addEventListener("dragstart", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    draggedId = button.dataset.id;
    button.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedId);
  });
  list.addEventListener("dragover", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button || !draggedId || search.value.trim()) return;
    event.preventDefault();
    button.classList.add("drag-over");
  });
  list.addEventListener("dragleave", (event) => {
    event.target.closest("[data-id]")?.classList.remove("drag-over");
  });
  list.addEventListener("drop", async (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    event.preventDefault();
    document.querySelectorAll(".drag-over").forEach((node) => node.classList.remove("drag-over"));
    await moveRecord(draggedId || event.dataTransfer.getData("text/plain"), button.dataset.id);
    draggedId = null;
  });
  list.addEventListener("dragend", () => {
    draggedId = null;
    document.querySelectorAll(".dragging,.drag-over").forEach((node) => node.classList.remove("dragging", "drag-over"));
  });
  search.addEventListener("input", renderList);
  document.querySelector("#new-button").addEventListener("click", () => openEditor());
  document.querySelector("#close-editor").addEventListener("click", closeEditor);
  document.querySelector("#delete-button").addEventListener("click", removeSelected);
  form.addEventListener("submit", save);
  mediaInput.addEventListener("change", async () => {
    pendingMedia = await readFiles(mediaInput.files);
    mediaPreview.innerHTML = pendingMedia.map((file) => `<span class="media-chip">${escapeHTML(file.name)}</span>`).join("");
  });
  document.querySelector("#export-button").addEventListener("click", exportJSON);
  document.querySelector("#import-button").addEventListener("click", () => document.querySelector("#import-file").click());
  document.querySelector("#import-file").addEventListener("change", (event) => event.target.files[0] && importJSON(event.target.files[0]));
  document.querySelector("#reset-button").addEventListener("click", async () => {
    if (!confirm("Réinitialiser toutes les données du site ?")) return;
    try {
      await DataStore.reset();
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  });
  document.querySelector("#logout-button").addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    location.replace("/login.html");
  });

  renderTabs();
  renderList();
})();
