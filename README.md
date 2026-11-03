# Bangla Synonym Explorer — বাংলা প্রতিশব্দ ও বিপরীতশব্দ

An offline, bilingual (English / বাংলা) explorer for Bangla synonyms
(প্রতিশব্দ) and antonyms (বিপরীতশব্দ). Built for students and Bangla
learners who want to grow their vocabulary with meanings, examples, and
a quick quiz — no account, no network, no tracking.

## Features

- **48 common Bangla words** with transliteration, meaning (EN + BN),
  2–3 synonyms, antonyms, and a Bangla example sentence with English gloss.
- **Search** across words, transliterations, meanings, synonyms, and antonyms.
- **Category filter**: Emotion, Character, Action, Time, Nature, Quality, Life.
- **Word of the Day** — deterministic (day-of-year modulo 48), so everyone
  sees the same word on the same day.
- **10-round quiz** — alternate synonym/antonym rounds, 4 options, score
  and best-streak tracking.
- **Favorites** — star any word; favorites persist in `localStorage` and
  can be exported to / imported from a JSON file (strict validation:
  the file must be a JSON list of words from the built-in set).
- **EN / বাংলা toggle** persisted in `localStorage`, with Bengali digits
  for counts in বাংলা mode.
- **Responsive** down to 390 px mobile width; works fully offline.

## Stack

Plain HTML, CSS, and JavaScript — no framework, no build step, no backend.
Data lives in `js/data.js`; pure logic (filtering, word-of-day, quiz
generation, import validation) lives in `js/logic.js` so it can be unit
tested in Node.

## Prerequisites

Any modern browser. For tests: Node.js 18+.

## Run locally

```sh
# From the project root, serve the folder (any static server works):
npx serve .
# …or simply open index.html in a browser.
```

## Testing

```sh
node tests/test.js
```

The suite checks data integrity (48 unique words, every entry has
meanings, ≥2 synonyms, ≥1 antonym, an example, and a valid category),
search/category filtering, deterministic word-of-day, quiz-round
invariants (4 unique options, correct answer present and drawn from the
entry's own list — 96 rounds), favorites-import validation, and Bengali
digit formatting. A headless-Chrome (CDP) smoke test additionally
verified: 48 cards render, search narrows to the right word, the বাংলা
toggle shows Bengali digits, the quiz yields 4 options with feedback,
favorites round-trip, and the word-of-day card renders.

## Deployment

Static site — deploy the folder as-is to GitHub Pages, Netlify, or any
static host. The live GitHub Pages site for this project is
https://fahad3235.github.io/bangla-synonym-bd/ (when Pages is enabled).

## Limitations

- Word meanings are the commonly given ones; this is a personal learning
  tool, **not an academic dictionary** — for exam or publication use,
  cross-check against a standard Bangla dictionary.
- The 48-word set is fixed; there is no user-added word feature yet.
- Favorites live only in the browser's `localStorage` on one device.

## Status

MVP complete and tested (see Testing above). License: MIT for the code;
word data is general Bangla vocabulary.
