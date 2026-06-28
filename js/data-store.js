(function () {
  const collections = ["schools", "teachers", "programs", "events", "activities"];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function get(name) {
    return clone((window.SEED_DATA && window.SEED_DATA[name]) || []);
  }

  function validData(value) {
    return value && typeof value === "object" && collections.every((name) => Array.isArray(value[name]));
  }

  const ready = (async () => {
    const contentURL = window.SIC_CONTENT_URL || "/api/content";
    try {
      const response = await fetch(contentURL, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Contenu indisponible (${response.status})`);
      const payload = await response.json();
      const source = payload.data || payload;
      if (!validData(source)) throw new Error("Structure de données invalide");
      window.SEED_DATA = clone(source);
    } catch (error) {
      console.warn("Contenu en ligne indisponible, utilisation des données intégrées.", error);
    }
  })();

  async function request(url, options) {
    const response = await fetch(url, options);
    if (response.status === 401) {
      location.href = "/login.html";
      throw new Error("Connexion expirée");
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Enregistrement impossible");
    return payload;
  }

  async function set(name, value) {
    if (!collections.includes(name)) throw new Error("Collection inconnue");
    await request(`/api/data/${name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value })
    });
    window.SEED_DATA[name] = clone(value);
  }

  async function uploadMedia(file) {
    return request("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: file.name, type: file.type, data: file.data })
    }).then((payload) => payload.url);
  }

  async function deleteMedia(urls) {
    const values = (urls || []).filter(Boolean);
    if (!values.length) return;
    await request("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: values })
    });
  }

  function all() {
    return Object.fromEntries(collections.map((name) => [name, get(name)]));
  }

  function exportAll() {
    return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data: all() }, null, 2);
  }

  async function importAll(payload) {
    const parsed = typeof payload === "string" ? JSON.parse(payload) : payload;
    const source = parsed.data || parsed;
    if (!collections.every((name) => Array.isArray(source[name]))) throw new Error("Sauvegarde incomplète");
    await request("/api/import", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: source })
    });
    collections.forEach((name) => {
      window.SEED_DATA[name] = clone(source[name]);
    });
  }

  async function reset() {
    await request("/api/reset", { method: "POST" });
    location.reload();
  }

  window.DataStore = { collections, ready, get, set, all, exportAll, importAll, reset, uploadMedia, deleteMedia };
})();
