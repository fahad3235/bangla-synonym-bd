// Pure logic for Bangla Synonym Explorer — testable in Node and the browser.
(function (root) {
  var BN_DIGITS = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  function toBnDigits(value) {
    return String(value).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }
  function formatCount(value, lang) {
    return lang === "bn" ? toBnDigits(value) : String(value);
  }
  // Case-insensitive substring search across word, transliteration, meanings,
  // synonyms and antonyms. Empty query returns every word (category still applies).
  function filterWords(words, query, category) {
    var q = (query || "").trim().toLowerCase();
    return words.filter(function (e) {
      if (category && category !== "All" && e.cat !== category) return false;
      if (!q) return true;
      var hay = [e.w, e.t, e.mEN, e.mBN].concat(e.syn, e.ant).join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }
  // Deterministic word of the day: day-of-year modulo word count.
  function wordOfDay(words, date) {
    if (!words.length) return null;
    var start = Date.UTC(date.getUTCFullYear(), 0, 0);
    var day = Math.floor((date.getTime() - start) / 86400000);
    return words[day % words.length];
  }
  // Build one quiz round. kind is "syn" or "ant". The correct answer is one
  // of the entry's synonyms/antonyms; distractors come from other entries'
  // same-side lists, never duplicating the correct answer or each other.
  // rng defaults to Math.random and is injectable for tests.
  function buildQuizRound(words, entry, kind, rng) {
    rng = rng || Math.random;
    var pool = kind === "syn" ? entry.syn : entry.ant;
    var correct = pool[Math.floor(rng() * pool.length)];
    var distractorPool = [];
    words.forEach(function (e) {
      if (e === entry) return;
      (kind === "syn" ? e.syn : e.ant).forEach(function (v) {
        if (v !== correct && distractorPool.indexOf(v) === -1) distractorPool.push(v);
      });
    });
    var options = [correct];
    while (options.length < 4 && distractorPool.length) {
      var i = Math.floor(rng() * distractorPool.length);
      options.push(distractorPool.splice(i, 1)[0]);
    }
    // Fisher-Yates shuffle.
    for (var j = options.length - 1; j > 0; j--) {
      var k = Math.floor(rng() * (j + 1));
      var tmp = options[j]; options[j] = options[k]; options[k] = tmp;
    }
    return { word: entry, kind: kind, correct: correct, options: options };
  }
  // Strict favorites import validation: must be an array of known word strings.
  function parseFavoritesImport(text, words) {
    var data;
    try { data = JSON.parse(text); } catch (e) { return { ok: false, error: "invalid-json" }; }
    if (!Array.isArray(data)) return { ok: false, error: "not-array" };
    var known = {};
    words.forEach(function (e) { known[e.w] = true; });
    for (var i = 0; i < data.length; i++) {
      if (typeof data[i] !== "string" || !known[data[i]]) return { ok: false, error: "unknown-word" };
    }
    return { ok: true, favorites: data.filter(function (v, idx) { return data.indexOf(v) === idx; }) };
  }
  var api = {
    toBnDigits: toBnDigits, formatCount: formatCount, filterWords: filterWords,
    wordOfDay: wordOfDay, buildQuizRound: buildQuizRound,
    parseFavoritesImport: parseFavoritesImport
  };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  else { root.SynLogic = api; }
})(typeof window !== "undefined" ? window : globalThis);
