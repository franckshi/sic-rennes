(async function () {
  try {
    const status = await fetch("/api/auth/status", { cache: "no-store" }).then((response) => response.json());
    if (!status.authenticated) {
      location.replace("/login.html");
      return;
    }
  } catch {
    location.replace("/login.html");
    return;
  }
  await window.DataStore.ready;
  document.body.classList.remove("auth-pending");
  const i18n = window.AdminI18n;
  const t = i18n?.t || ((value) => value);
  const config = {
    schools: {
      label: "Pôles SIC",
      singular: "pôle",
      title: (item) => item.name,
      subtitle: (item) => `${item.type || t("Type non renseigné")} · ${item.address || t("Adresse non renseignée")}`,
      media: { field: "photos", accept: "image/*", label: "Photos" },
      fields: [
        ["id", "Identifiant", "text", "Identifiant URL unique"],
        ["monogram", "Monogramme", "text", "Initiales affichées dans la liste"],
        ["name", "Nom", "text", ""],
        ["type", "Type", "select", ["École primaire", "Collège", "Lycée", "Université", "Formation adultes"]],
        ["public_private", "Statut", "text", "Public, privé, association…"],
        ["address", "Adresse", "text", ""],
        ["website", "Site officiel", "url", ""],
        ["principal", "Direction / chef d’établissement", "text", "Nom ou « Direction à confirmer »"],
        ["students", "Nombre d’élèves", "number", ""],
        ["teachers", "Identifiants enseignants", "array", "Séparés par des virgules"],
        ["programs", "Identifiants programmes", "array", "Ex. lvb, lvc, sic"],
        ["course_modules", "Modules affichés sur la page", "array", "Primaire : chinois · Collège : chinois, langue-litterature, mathematiques-chinois · Lycée : ajouter connaissance-monde"],
        ["teaching_assignments", "Classes, matières et enseignants", "multiline", "Une ligne par matière. Format : Classe | Matière | Enseignant | Note"],
        ["latitude", "Latitude", "number", ""],
        ["longitude", "Longitude", "number", ""],
        ["description", "Description", "textarea", ""]
      ]
    },
    teachers: {
      label: "Enseignants",
      singular: "enseignant",
      title: (item) => item.name,
      subtitle: (item) => item.biography || t("Biographie non renseignée"),
      media: { field: "photo", accept: "image/*", label: "Photo" },
      fields: [
        ["id", "Identifiant", "text", ""],
        ["name", "Nom", "text", ""],
        ["level", "Niveau", "text", "Primaire, Collège, Lycée…"],
        ["coordo", "Coordo", "text", "Coordination ou référent principal"],
        ["is_overall", "Responsable général SIC", "boolean", "Affiche cette fiche au-dessus des équipes par niveau"],
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
      subtitle: (item) => `${item.name || t("Code non renseigné")} · ${item.description || t("Description non renseignée")}`,
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
      subtitle: (item) => `${item.date || t("Date inconnue")} · ${item.location || t("Lieu inconnu")}`,
      fields: [
        ["id", "Identifiant", "text", ""],
        ["date", "Date exacte", "date", "Laisser vide si la date n’est pas confirmée"],
        ["period", "Période affichée", "text", "Ex. Septembre 2026 ou 2026-2027 · date à confirmer"],
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
      subtitle: (item) => `${item.year || t("Année inconnue")} · ${item.category || t("Catégorie inconnue")}`,
      media: { field: "photos", accept: "image/*", label: "Photos du projet (3 à 4 recommandées, 4 maximum)" },
      fields: [
        ["id", "Identifiant", "text", ""],
        ["symbol", "Caractère illustratif", "text", "Un caractère chinois affiché sur la carte"],
        ["title", "Titre", "text", ""],
        ["year", "Année scolaire", "text", "Ex. 2026-2027"],
        ["category", "Catégorie", "text", ""],
        ["description", "Résumé de la carte", "textarea", "Texte court visible sur la liste des projets"],
        ["detail_intro", "Introduction de la page", "textarea", "Texte d’ouverture de la page détaillée"],
        ["content_blocks", "Blocs image et texte", "blocks", "Réorganisez les blocs avec les flèches ou par glisser-déposer. Les numéros d’image correspondent aux photos ci-dessous."]
      ]
    }
  };

  let collection = "schools";
  let selectedId = null;
  let draggedId = null;
  let draggedBlock = null;
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
      `<button class="admin-tab ${key === collection ? "active" : ""}" data-collection="${key}">${t(value.label)}<span>${DataStore.get(key).length}</span></button>`
    ).join("");
  }

  function renderList() {
    const term = search.value.trim().toLowerCase();
    const cfg = config[collection];
    const filtered = items().filter((item) => `${cfg.title(item)} ${cfg.subtitle(item)}`.toLowerCase().includes(term));
    list.innerHTML = filtered.length
      ? filtered.map((item) => `<div class="record-item ${item.id === selectedId ? "active" : ""}" data-id="${escapeHTML(item.id)}" draggable="true">
          <span class="drag-handle" aria-hidden="true">↕</span>
          <button class="record-main" type="button" data-open-id="${escapeHTML(item.id)}"><strong>${escapeHTML(cfg.title(item) || t("Sans titre"))}</strong><small>${escapeHTML(cfg.subtitle(item))}</small></button>
          <span class="record-actions" aria-label="${escapeHTML(t("Changer l’ordre"))}">
            <button type="button" data-order="-1" title="${escapeHTML(t("Monter"))}">↑</button>
            <button type="button" data-order="1" title="${escapeHTML(t("Descendre"))}">↓</button>
          </span>
        </div>`).join("")
      : `<div class="admin-empty">${t("Aucun résultat.")}</div>`;
  }

  function blockRowMarkup(value = "text |  | ") {
    const [type = "text", first = "", ...rest] = String(value).split("|").map((part) => part.trim());
    const body = rest.join(" | ");
    return `<div class="content-block-row" data-content-block>
      <span class="content-block-handle" draggable="true" data-block-handle title="${escapeHTML(t("Déplacer"))}">↕</span>
      <select data-block-type aria-label="${escapeHTML(t("Type de bloc"))}">
        ${[["text", "Texte"], ["image", "Image"], ["gallery", "Galerie"]].map(([key, label]) => `<option value="${key}" ${type === key || (type === "texte" && key === "text") || (type === "galerie" && key === "gallery") ? "selected" : ""}>${t(label)}</option>`).join("")}
      </select>
      <input type="text" data-block-first value="${escapeHTML(first)}" placeholder="${escapeHTML(t("Titre ou n° de photo(s)"))}">
      <textarea data-block-body placeholder="${escapeHTML(t("Texte, titre de galerie ou légende"))}">${escapeHTML(body)}</textarea>
      <span class="content-block-actions"><button type="button" data-block-move="-1" title="${escapeHTML(t("Monter"))}">↑</button><button type="button" data-block-move="1" title="${escapeHTML(t("Descendre"))}">↓</button><button type="button" data-block-remove title="${escapeHTML(t("Supprimer"))}">×</button></span>
    </div>`;
  }

  function blockEditorMarkup(name, values) {
    const items = Array.isArray(values) && values.length ? values : ["text | Présentation | ", "gallery | 1,2,3,4 | Photos du projet"];
    return `<div class="content-block-editor" data-block-editor>
      <div data-block-list>${items.map((value) => blockRowMarkup(value)).join("")}</div>
      <div class="content-block-add"><button type="button" data-add-block="text">${t("+ Texte")}</button><button type="button" data-add-block="image">${t("+ Image")}</button><button type="button" data-add-block="gallery">${t("+ Galerie")}</button></div>
      <textarea name="${name}" data-block-value hidden>${escapeHTML(items.join("\n"))}</textarea>
    </div>`;
  }

  function syncBlockEditor(editor) {
    if (!editor) return;
    const lines = [...editor.querySelectorAll("[data-content-block]")].map((row) => {
      const type = row.querySelector("[data-block-type]").value;
      const first = row.querySelector("[data-block-first]").value.trim();
      const body = row.querySelector("[data-block-body]").value.trim();
      return `${type} | ${first} | ${body}`;
    });
    editor.querySelector("[data-block-value]").value = lines.join("\n");
  }

  function fieldMarkup([name, label, type, helper], item) {
    const raw = item[name] ?? "";
    const value = Array.isArray(raw) ? raw.join(type === "multiline" || type === "blocks" ? "\n" : ", ") : raw;
    const wide = type === "textarea" || type === "multiline" || type === "blocks" || name === "name" || name === "title" ? "wide" : "";
    let control = "";
    if (type === "blocks") {
      control = blockEditorMarkup(name, Array.isArray(raw) ? raw : []);
    } else if (type === "textarea" || type === "multiline") {
      control = `<textarea id="field-${name}" name="${name}">${escapeHTML(value)}</textarea>`;
    } else if (type === "boolean") {
      const checked = name === "is_overall" ? raw === true : raw !== false;
      control = `<label class="checkbox-field"><input id="field-${name}" name="${name}" type="checkbox" ${checked}> <span>${t("Afficher")}</span></label>`;
    } else if (type === "select") {
      control = `<select id="field-${name}" name="${name}">${helper.map((option) => `<option value="${escapeHTML(option)}" ${value === option ? "selected" : ""}>${escapeHTML(t(option))}</option>`).join("")}</select>`;
    } else {
      const step = type === "number" ? `step="any"` : "";
      control = `<input id="field-${name}" name="${name}" type="${type === "array" ? "text" : type}" value="${escapeHTML(value)}" ${step}>`;
    }
    const hint = Array.isArray(helper) ? "" : helper;
    return `<div class="form-field ${wide}"><label for="field-${name}">${escapeHTML(t(label))}</label>${control}${hint ? `<small>${escapeHTML(t(hint))}</small>` : ""}</div>`;
  }

  function openEditor(id) {
    selectedId = id || null;
    const cfg = config[collection];
    const item = selectedId ? items().find((record) => record.id === selectedId) : {};
    if (selectedId && !item) return;
    pendingMedia = [];
    fieldsHost.innerHTML = cfg.fields.map((field) => fieldMarkup(field, item || {})).join("");
    document.querySelector("#editor-title").textContent = i18n?.editTitle ? i18n.editTitle(cfg.singular, !selectedId) : selectedId ? `Modifier ${cfg.singular}` : `Nouvel ${cfg.singular}`;
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
    document.querySelector("#media-label").textContent = t(media.label);
    document.querySelector("#media-help").textContent = collection === "activities"
      ? t("La première photo devient la miniature de la carte. Une nouvelle sélection remplace les photos actuelles.")
      : t("Les fichiers sont enregistrés sur le serveur avec les contenus. Privilégiez des fichiers légers.");
    const current = media.secondField
      ? [...(item[media.field] || []), ...(item[media.secondField] || [])]
      : Array.isArray(item[media.field]) ? item[media.field] : item[media.field] ? [item[media.field]] : [];
    mediaPreview.innerHTML = current.map((source, index) => `<figure class="media-chip"><img src="${escapeHTML(source)}" alt="${escapeHTML(t("Médias"))} ${index + 1}"><figcaption>${collection === "activities" && index === 0 ? t("Photo 1 · miniature") : `${t("Photo")} ${index + 1}`}</figcaption></figure>`).join("");
    mediaInput.value = "";
  }

  function blobDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function compressImage(file) {
    if (!file.type.startsWith("image/")) throw new Error(t("Seules les images sont acceptées."));
    const objectURL = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = objectURL;
      await image.decode();
      const maxSide = 1800;
      const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      let blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
      if (blob && blob.size > 3 * 1024 * 1024) blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.68));
      if (!blob || blob.size > 3 * 1024 * 1024) throw new Error(t("Image trop volumineuse après compression."));
      return { name: file.name.replace(/\.[a-z0-9]+$/i, ".webp"), type: "image/webp", data: await blobDataURL(blob) };
    } finally {
      URL.revokeObjectURL(objectURL);
    }
  }

  function readFiles(files) {
    return Promise.all([...files].map(compressImage));
  }

  function formValue(field, formData) {
    const [name, , type] = field;
    const value = formData.get(name);
    if (type === "array") return value.split(",").map((part) => part.trim()).filter(Boolean);
    if (type === "multiline") return value.split("\n").map((part) => part.trim()).filter(Boolean);
    if (type === "blocks") return value.split("\n").map((part) => part.trim()).filter(Boolean);
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
      toast(t("Ordre mis à jour."));
    } catch (error) {
      console.error(error);
      toast(t(error.message));
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
      toast(t("Ordre mis à jour."));
    } catch (error) {
      console.error(error);
      toast(t(error.message));
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
      toast(t("Cet identifiant existe déjà."));
      return;
    }
    try {
      let replacedMedia = [];
      if (cfg.media && pendingMedia.length) {
        const uploadedMedia = [];
        for (const file of pendingMedia) uploadedMedia.push(await DataStore.uploadMedia(file));
        if (collection === "teachers") {
          replacedMedia = current.photo ? [current.photo] : [];
          result.photo = uploadedMedia[0];
        } else if (collection === "activities") {
          replacedMedia = current.photos || [];
          result.photos = uploadedMedia.slice(0, 4);
        } else {
          result.photos = [...(result.photos || []), ...uploadedMedia];
        }
      }
      const index = records.findIndex((record) => record.id === selectedId);
      if (index >= 0) records[index] = result;
      else records.unshift(result);
      await DataStore.set(collection, records);
      if (replacedMedia.length) await DataStore.deleteMedia(replacedMedia).catch(console.warn);
      selectedId = result.id;
      renderTabs();
      openEditor(result.id);
      toast(t("Modifications enregistrées en ligne."));
    } catch (error) {
      console.error(error);
      toast(t(error.message));
    }
  }

  async function removeSelected() {
    if (!selectedId || !confirm(t("Supprimer définitivement cet élément ?"))) return;
    try {
      await DataStore.set(collection, items().filter((record) => record.id !== selectedId));
      closeEditor();
      renderTabs();
      toast(t("Élément supprimé."));
    } catch (error) {
      console.error(error);
      toast(t(error.message));
    }
  }

  function exportJSON() {
    const blob = new Blob([DataStore.exportAll()], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `sic-a-rennes-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast(t("Export JSON créé."));
  }

  async function importJSON(file) {
    try {
      await DataStore.importAll(await file.text());
      closeEditor();
      renderTabs();
      renderList();
      toast(t("Données importées."));
    } catch (error) {
      console.error(error);
      toast(t("Le fichier JSON est invalide."));
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
    document.querySelector("#collection-title").textContent = t(config[collection].label);
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
  fieldsHost.addEventListener("click", (event) => {
    const editor = event.target.closest("[data-block-editor]");
    if (!editor) return;
    const add = event.target.closest("[data-add-block]");
    if (add) {
      const defaults = { text: "text | Nouveau titre | Nouveau texte", image: "image | 1 | Légende", gallery: "gallery | 1,2,3,4 | Photos du projet" };
      editor.querySelector("[data-block-list]").insertAdjacentHTML("beforeend", blockRowMarkup(defaults[add.dataset.addBlock]));
      syncBlockEditor(editor);
      return;
    }
    const row = event.target.closest("[data-content-block]");
    if (!row) return;
    if (event.target.closest("[data-block-remove]")) row.remove();
    const move = event.target.closest("[data-block-move]");
    if (move) {
      const offset = Number(move.dataset.blockMove);
      const sibling = offset < 0 ? row.previousElementSibling : row.nextElementSibling;
      if (sibling) row.parentElement.insertBefore(row, offset < 0 ? sibling : sibling.nextElementSibling);
    }
    syncBlockEditor(editor);
  });
  fieldsHost.addEventListener("input", (event) => syncBlockEditor(event.target.closest("[data-block-editor]")));
  fieldsHost.addEventListener("change", (event) => syncBlockEditor(event.target.closest("[data-block-editor]")));
  fieldsHost.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-block-handle]");
    if (!handle) return;
    draggedBlock = handle.closest("[data-content-block]");
    draggedBlock.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
  });
  fieldsHost.addEventListener("dragover", (event) => {
    const row = event.target.closest("[data-content-block]");
    if (!row || !draggedBlock || row === draggedBlock) return;
    event.preventDefault();
    row.classList.add("drag-over");
  });
  fieldsHost.addEventListener("dragleave", (event) => event.target.closest("[data-content-block]")?.classList.remove("drag-over"));
  fieldsHost.addEventListener("drop", (event) => {
    const row = event.target.closest("[data-content-block]");
    if (!row || !draggedBlock || row === draggedBlock) return;
    event.preventDefault();
    row.parentElement.insertBefore(draggedBlock, row);
    document.querySelectorAll(".content-block-row.drag-over").forEach((item) => item.classList.remove("drag-over"));
    syncBlockEditor(row.closest("[data-block-editor]"));
  });
  fieldsHost.addEventListener("dragend", () => {
    draggedBlock?.classList.remove("dragging");
    document.querySelectorAll(".content-block-row.drag-over").forEach((item) => item.classList.remove("drag-over"));
    draggedBlock = null;
  });
  mediaInput.addEventListener("change", async () => {
    pendingMedia = await readFiles(mediaInput.files);
    if (collection === "activities" && pendingMedia.length > 4) {
      pendingMedia = pendingMedia.slice(0, 4);
      toast(t("Quatre photos maximum : seules les quatre premières seront enregistrées."));
    }
    mediaPreview.innerHTML = pendingMedia.map((file, index) => `<figure class="media-chip"><img src="${file.data}" alt="${escapeHTML(file.name)}"><figcaption>${index === 0 && collection === "activities" ? "Photo 1 · miniature" : escapeHTML(file.name)}</figcaption></figure>`).join("");
  });
  document.querySelector("#export-button").addEventListener("click", exportJSON);
  document.querySelector("#import-button").addEventListener("click", () => document.querySelector("#import-file").click());
  document.querySelector("#import-file").addEventListener("change", (event) => event.target.files[0] && importJSON(event.target.files[0]));
  document.querySelector("#reset-button").addEventListener("click", async () => {
    if (!confirm(t("Réinitialiser toutes les données du site ?"))) return;
    try {
      await DataStore.reset();
    } catch (error) {
      console.error(error);
      toast(t(error.message));
    }
  });
  document.querySelector("#logout-button").addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    location.replace("/login.html");
  });

  i18n?.apply(document);
  document.querySelector("#collection-title").textContent = t(config[collection].label);
  renderTabs();
  renderList();
})();
