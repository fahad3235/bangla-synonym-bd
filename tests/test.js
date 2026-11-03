// Node unit tests for bangla-synonym-bd. Run: node tests/test.js
var assert = require("assert");
var data = require("../js/data.js");
var L = require("../js/logic.js");
var WORDS = data.WORDS;
var passed = 0;
function check(name, fn) { fn(); passed++; console.log("ok - " + name); }

// Seeded RNG (LCG) for deterministic quiz tests.
function seededRng(seed) {
  var s = seed >>> 0;
  return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

check("48 words, unique, valid shape", function () {
  assert.strictEqual(WORDS.length, 48);
  var seen = {};
  WORDS.forEach(function (e) {
    assert.ok(e.w && e.t && e.mEN && e.mBN && e.exBN && e.exEN && e.cat, e.w);
    assert.ok(!seen[e.w], "duplicate: " + e.w); seen[e.w] = true;
    assert.ok(e.syn.length >= 2, e.w + " needs >=2 synonyms");
    assert.ok(e.ant.length >= 1, e.w + " needs >=1 antonym");
    assert.ok(data.CATEGORIES.indexOf(e.cat) !== -1, e.w + " bad category");
    assert.ok(e.syn.indexOf(e.w) === -1 && e.ant.indexOf(e.w) === -1, e.w + " self-listed");
  });
});

check("filter: empty query returns all; category filters", function () {
  assert.strictEqual(L.filterWords(WORDS, "", "All").length, 48);
  var emo = L.filterWords(WORDS, "", "Emotion");
  assert.ok(emo.length > 0 && emo.every(function (e) { return e.cat === "Emotion"; }));
  assert.strictEqual(L.filterWords(WORDS, "", "Nope").length, 0);
});

check("filter: search by synonym, transliteration, and meaning", function () {
  assert.ok(L.filterWords(WORDS, "হর্ষ", "All").some(function (e) { return e.w === "সুখ"; }));
  assert.ok(L.filterWords(WORDS, "sukh", "All").some(function (e) { return e.w === "সুখ"; }));
  assert.ok(L.filterWords(WORDS, "victory", "All").some(function (e) { return e.w === "বিজয়"; }));
  assert.strictEqual(L.filterWords(WORDS, "zzzz-no-match", "All").length, 0);
});

check("wordOfDay is deterministic and in range", function () {
  var d1 = new Date(Date.UTC(2026, 10, 3));
  var a = L.wordOfDay(WORDS, d1);
  var b = L.wordOfDay(WORDS, d1);
  assert.strictEqual(a, b);
  assert.ok(WORDS.indexOf(a) !== -1);
  assert.strictEqual(L.wordOfDay([], d1), null);
});

check("quiz round: 4 unique options, correct included, correct from entry list", function () {
  WORDS.forEach(function (e) {
    ["syn", "ant"].forEach(function (kind) {
      var r = L.buildQuizRound(WORDS, e, kind, seededRng(42));
      assert.strictEqual(r.options.length, 4, e.w + " " + kind);
      assert.strictEqual(new Set(r.options).size, 4, e.w + " duplicate options");
      assert.ok(r.options.indexOf(r.correct) !== -1, e.w + " correct missing");
      var list = kind === "syn" ? e.syn : e.ant;
      assert.ok(list.indexOf(r.correct) !== -1, e.w + " correct not from entry");
    });
  });
});

check("favorites import: valid, deduped, rejected cases", function () {
  var ok = L.parseFavoritesImport(JSON.stringify(["সুখ", "দুঃখ", "সুখ"]), WORDS);
  assert.strictEqual(ok.ok, true);
  assert.deepStrictEqual(ok.favorites, ["সুখ", "দুঃখ"]);
  assert.strictEqual(L.parseFavoritesImport("not json", WORDS).ok, false);
  assert.strictEqual(L.parseFavoritesImport('{"a":1}', WORDS).ok, false);
  assert.strictEqual(L.parseFavoritesImport(JSON.stringify(["সুখ", "অজানা-শব্দ"]), WORDS).ok, false);
});

check("Bengali digits and count formatting", function () {
  assert.strictEqual(L.toBnDigits(103), "১০৩");
  assert.strictEqual(L.formatCount(48, "bn"), "৪৮");
  assert.strictEqual(L.formatCount(48, "en"), "48");
});

console.log(passed + " test groups passed.");
