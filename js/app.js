// Bangla Synonym Explorer — browser UI. All state in localStorage; no network.
(function () {
  var L = window.SynLogic;
  var I18N = {
    en: { tagline: "Explore Bangla synonyms & antonyms", searchPh: "Search a word, meaning, synonym…", all: "All",
      syn: "Synonyms", ant: "Antonyms", meaning: "Meaning", example: "Example", fav: "Favorite",
      wotd: "Word of the Day", quiz: "Quiz", explore: "Explore", favorites: "Favorites",
      startQuiz: "Start 10-round quiz", qSyn: "Pick a SYNONYM of", qAnt: "Pick an ANTONYM of",
      correct: "Correct!", wrong: "Not quite — the answer was", score: "Score", streak: "Streak",
      round: "Round", quizDone: "Quiz complete!", playAgain: "Play again",
      noFav: "No favorites yet. Tap ★ on any word card to save it.",
      noResult: "No words match. Try another search or category.",
      exportBtn: "Export favorites", importBtn: "Import favorites", clearFav: "Clear favorites",
      imported: "favorites imported.", importBad: "Import failed: file must be a JSON list of known words.",
      cleared: "Favorites cleared.", words: "words", copied: "Copied!" },
    bn: { tagline: "বাংলা প্রতিশব্দ ও বিপরীতশব্দ জানুন", searchPh: "শব্দ, অর্থ বা প্রতিশব্দ লিখুন…", all: "সব",
      syn: "প্রতিশব্দ", ant: "বিপরীতশব্দ", meaning: "অর্থ", example: "উদাহরণ", fav: "প্রিয়",
      wotd: "আজকের শব্দ", quiz: "কুইজ", explore: "খুঁজুন", favorites: "প্রিয় শব্দ",
      startQuiz: "১০ রাউন্ডের কুইজ শুরু করুন", qSyn: "এর একটি প্রতিশব্দ বাছুন", qAnt: "এর একটি বিপরীতশব্দ বাছুন",
      correct: "সঠিক!", wrong: "হয়নি — সঠিক উত্তর ছিল", score: "স্কোর", streak: "ধারাবাহিকতা",
      round: "রাউন্ড", quizDone: "কুইজ শেষ!", playAgain: "আবার খেলুন",
      noFav: "এখনো কোনো প্রিয় শব্দ নেই। যেকোনো কার্ডের ★ চাপুন।",
      noResult: "কিছু মেলেনি। অন্য শব্দ বা বিভাগ চেষ্টা করুন।",
      exportBtn: "প্রিয় শব্দ এক্সপোর্ট", importBtn: "প্রিয় শব্দ ইমপোর্ট", clearFav: "প্রিয় শব্দ মুছুন",
      imported: "টি প্রিয় শব্দ ইমপোর্ট হয়েছে।", importBad: "ইমপোর্ট ব্যর্থ: ফাইলটি অবশ্যই জানা শব্দের JSON তালিকা হতে হবে।",
      cleared: "প্রিয় শব্দ মুছে ফেলা হয়েছে।", words: "টি শব্দ", copied: "কপি হয়েছে!" }
  };
  var CAT_BN = { All: "সব", Emotion: "অনুভূতি", Character: "চরিত্র", Action: "কাজ", Time: "সময়", Nature: "প্রকৃতি", Quality: "গুণ", Life: "জীবন" };
  var state = {
    lang: localStorage.getItem("bsyn-lang") || "en",
    query: "", category: "All", tab: "explore",
    favorites: JSON.parse(localStorage.getItem("bsyn-favs") || "[]"),
    quiz: null
  };
  function t(k) { return I18N[state.lang][k]; }
  function saveFavs() { localStorage.setItem("bsyn-favs", JSON.stringify(state.favorites)); }
  function isFav(w) { return state.favorites.indexOf(w) !== -1; }
  function toggleFav(w) {
    var i = state.favorites.indexOf(w);
    if (i === -1) state.favorites.push(w); else state.favorites.splice(i, 1);
    saveFavs(); render();
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function chip(text, cls) {
    var s = document.createElement("button");
    s.className = "chip " + (cls || ""); s.textContent = text;
    return s;
  }
  function wordCard(e) {
    var card = el('<article class="card"><div class="card-top"><div><h3 class="word"></h3><p class="translit"></p></div><button class="fav-btn" aria-label="favorite"></button></div><p class="meaning"></p><div class="row"><span class="label"></span><span class="chips syn"></span></div><div class="row"><span class="label ant-label"></span><span class="chips ant"></span></div><p class="example"></p></article>');
    card.querySelector(".word").textContent = e.w;
    card.querySelector(".translit").textContent = e.t + " · " + (state.lang === "bn" ? CAT_BN[e.cat] : e.cat);
    var favBtn = card.querySelector(".fav-btn");
    favBtn.textContent = isFav(e.w) ? "★" : "☆";
    favBtn.classList.toggle("active", isFav(e.w));
    favBtn.onclick = function () { toggleFav(e.w); };
    card.querySelector(".meaning").textContent = t("meaning") + ": " + (state.lang === "bn" ? e.mBN : e.mEN);
    card.querySelector(".row .label").textContent = t("syn");
    card.querySelector(".ant-label").textContent = t("ant");
    e.syn.forEach(function (s) { card.querySelector(".chips.syn").appendChild(chip(s, "syn")); });
    e.ant.forEach(function (a) { card.querySelector(".chips.ant").appendChild(chip(a, "ant")); });
    card.querySelector(".example").textContent = t("example") + ": " + (state.lang === "bn" ? e.exBN : e.exEN + " (" + e.exBN + ")");
    return card;
  }
  function renderExplore() {
    var list = document.getElementById("word-list");
    list.innerHTML = "";
    var results = L.filterWords(WORDS, state.query, state.category);
    document.getElementById("result-count").textContent =
      L.formatCount(results.length, state.lang) + " " + t("words");
    if (!results.length) {
      list.appendChild(el('<p class="empty" id="empty-msg"></p>'));
      document.getElementById("empty-msg").textContent = t("noResult");
      return;
    }
    results.forEach(function (e) { list.appendChild(wordCard(e)); });
  }
  function renderWotd() {
    var box = document.getElementById("wotd-card");
    box.innerHTML = "";
    box.appendChild(wordCard(L.wordOfDay(WORDS, new Date())));
  }
  function renderFavorites() {
    var list = document.getElementById("fav-list");
    list.innerHTML = "";
    var favs = WORDS.filter(function (e) { return isFav(e.w); });
    if (!favs.length) {
      list.appendChild(el('<p class="empty" id="fav-empty"></p>'));
      document.getElementById("fav-empty").textContent = t("noFav");
      return;
    }
    favs.forEach(function (e) { list.appendChild(wordCard(e)); });
  }
  function renderQuiz() {
    var box = document.getElementById("quiz-box");
    box.innerHTML = "";
    var q = state.quiz;
    if (!q) {
      var start = el('<div class="quiz-start"><p></p><button class="btn primary"></button></div>');
      start.querySelector("p").textContent = t("quiz") + " · 10 " + t("round").toLowerCase() + "s";
      start.querySelector("button").textContent = t("startQuiz");
      start.querySelector("button").onclick = startQuiz;
      box.appendChild(start);
      return;
    }
    if (q.done) {
      var done = el('<div class="quiz-start"><h3></h3><p></p><button class="btn primary"></button></div>');
      done.querySelector("h3").textContent = t("quizDone");
      done.querySelector("p").textContent = t("score") + ": " + L.formatCount(q.score, state.lang) + "/10 · " + t("streak") + ": " + L.formatCount(q.bestStreak, state.lang);
      done.querySelector("button").textContent = t("playAgain");
      done.querySelector("button").onclick = startQuiz;
      box.appendChild(done);
      return;
    }
    var round = q.rounds[q.index];
    var wrap = el('<div class="quiz-round"><p class="quiz-meta"></p><h3 class="quiz-q"></h3><div class="options"></div><p class="feedback" aria-live="polite"></p></div>');
    wrap.querySelector(".quiz-meta").textContent = t("round") + " " + L.formatCount(q.index + 1, state.lang) + "/10 · " + t("score") + ": " + L.formatCount(q.score, state.lang) + " · " + t("streak") + ": " + L.formatCount(q.streak, state.lang);
    wrap.querySelector(".quiz-q").textContent = (round.kind === "syn" ? t("qSyn") : t("qAnt")) + " " + round.word.w + " (" + round.word.t + ")";
    round.options.forEach(function (opt) {
      var b = document.createElement("button");
      b.className = "option"; b.textContent = opt;
      b.onclick = function () {
        if (q.answered) return;
        q.answered = true;
        var fb = wrap.querySelector(".feedback");
        if (opt === round.correct) {
          q.score++; q.streak++; q.bestStreak = Math.max(q.bestStreak, q.streak);
          b.classList.add("right"); fb.textContent = t("correct");
        } else {
          q.streak = 0; b.classList.add("wrong"); fb.textContent = t("wrong") + ": " + round.correct;
        }
        wrap.querySelectorAll(".option").forEach(function (o) {
          o.disabled = true;
          if (o.textContent === round.correct) o.classList.add("right");
        });
        var next = document.createElement("button");
        next.className = "btn primary next-btn";
        next.textContent = q.index === 9 ? t("quizDone") : "→";
        next.onclick = function () {
          q.index++;
          if (q.index >= 10) q.done = true;
          q.answered = false; renderQuiz();
        };
        wrap.appendChild(next);
      };
      wrap.querySelector(".options").appendChild(b);
    });
    box.appendChild(wrap);
  }
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function startQuiz() {
    var pool = shuffled(WORDS).slice(0, 10);
    var rounds = pool.map(function (e, i) {
      return L.buildQuizRound(WORDS, e, i % 2 === 0 ? "syn" : "ant");
    });
    state.quiz = { rounds: rounds, index: 0, score: 0, streak: 0, bestStreak: 0, done: false, answered: false };
    renderQuiz();
  }
  function renderTabs() {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === state.tab);
    });
    ["explore", "wotd", "quiz", "favorites"].forEach(function (id) {
      document.getElementById("tab-" + id).hidden = state.tab !== id;
    });
  }
  function render() {
    document.getElementById("tagline").textContent = t("tagline");
    document.getElementById("search").placeholder = t("searchPh");
    document.querySelectorAll(".tab").forEach(function (b) {
      b.textContent = { explore: t("explore"), wotd: t("wotd"), quiz: t("quiz"), favorites: t("favorites") }[b.dataset.tab];
    });
    document.getElementById("lang-toggle").textContent = state.lang === "en" ? "বাংলা" : "English";
    document.getElementById("export-btn").textContent = t("exportBtn");
    document.getElementById("import-btn").textContent = t("importBtn");
    document.getElementById("clear-btn").textContent = t("clearFav");
    renderTabs(); renderExplore(); renderWotd(); renderFavorites(); renderQuiz();
  }
  function renderCategories() {
    var wrap = document.getElementById("categories");
    wrap.innerHTML = "";
    CATEGORIES.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "cat" + (state.category === c ? " active" : "");
      b.textContent = state.lang === "bn" ? CAT_BN[c] : c;
      b.onclick = function () { state.category = c; render(); renderCategories(); };
      wrap.appendChild(b);
    });
  }
  document.getElementById("search").addEventListener("input", function (e) {
    state.query = e.target.value; renderExplore();
  });
  document.getElementById("lang-toggle").addEventListener("click", function () {
    state.lang = state.lang === "en" ? "bn" : "en";
    localStorage.setItem("bsyn-lang", state.lang);
    render(); renderCategories();
  });
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { state.tab = b.dataset.tab; render(); });
  });
  document.getElementById("export-btn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(state.favorites, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "bangla-synonym-favorites.json"; a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById("import-btn").addEventListener("click", function () {
    document.getElementById("import-file").click();
  });
  document.getElementById("import-file").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var res = L.parseFavoritesImport(reader.result, WORDS);
      var note = document.getElementById("fav-note");
      if (res.ok) {
        state.favorites = res.favorites; saveFavs();
        note.textContent = L.formatCount(res.favorites.length, state.lang) + " " + t("imported");
      } else {
        note.textContent = t("importBad");
      }
      render();
    };
    reader.readAsText(file);
    e.target.value = "";
  });
  document.getElementById("clear-btn").addEventListener("click", function () {
    if (state.favorites.length && window.confirm(state.lang === "bn" ? "সব প্রিয় শব্দ মুছে ফেলবেন?" : "Clear all favorites?")) {
      state.favorites = []; saveFavs(); render();
      document.getElementById("fav-note").textContent = t("cleared");
    }
  });
  render(); renderCategories();
})();
