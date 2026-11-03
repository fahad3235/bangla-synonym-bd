// Bangla Synonym & Antonym data — 48 commonly used Bangla words.
// Meanings are the commonly given ones; this is a personal learning tool,
// not an academic dictionary. Each entry: word, transliteration, meanings,
// synonyms, antonyms, an example sentence, and a category.
(function (root) {
  var WORDS = [
    {w:"সুখ",t:"sukh",mEN:"happiness",mBN:"সুখ",syn:["আনন্দ","হর্ষ","উল্লাস"],ant:["দুঃখ","বিষাদ"],exBN:"সুখ সবার কাম্য।",exEN:"Everyone desires happiness.",cat:"Emotion"},
    {w:"দুঃখ",t:"dukkho",mEN:"sorrow",mBN:"দুঃখ",syn:["বিষাদ","বেদনা","কষ্ট"],ant:["সুখ","আনন্দ"],exBN:"দুঃখের পরেই সুখ আসে।",exEN:"Happiness comes after sorrow.",cat:"Emotion"},
    {w:"আনন্দ",t:"anondo",mEN:"joy",mBN:"আনন্দ",syn:["হর্ষ","উল্লাস","খুশি"],ant:["বিষাদ","দুঃখ"],exBN:"খবরটা শুনে সবাই আনন্দ পেল।",exEN:"Everyone felt joy hearing the news.",cat:"Emotion"},
    {w:"ভালোবাসা",t:"bhalobasha",mEN:"love",mBN:"ভালোবাসা",syn:["প্রেম","স্নেহ","মমতা"],ant:["ঘৃণা","বিদ্বেষ"],exBN:"মায়ের ভালোবাসা অতুলনীয়।",exEN:"A mother's love is incomparable.",cat:"Emotion"},
    {w:"ঘৃণা",t:"ghrina",mEN:"hatred",mBN:"ঘৃণা",syn:["বিদ্বেষ","অবজ্ঞা","বিরাগ"],ant:["ভালোবাসা","স্নেহ"],exBN:"ঘৃণা দিয়ে কিছুই জয় করা যায় না।",exEN:"Nothing can be won with hatred.",cat:"Emotion"},
    {w:"রাগ",t:"rag",mEN:"anger",mBN:"রাগ",syn:["ক্রোধ","কোপ","রোষ"],ant:["শান্তি","ধৈর্য"],exBN:"রাগের মাথায় সিদ্ধান্ত নিয়ো না।",exEN:"Do not decide in anger.",cat:"Emotion"},
    {w:"শান্তি",t:"shanti",mEN:"peace",mBN:"শান্তি",syn:["প্রশান্তি","স্বস্তি","নীরবতা"],ant:["অশান্তি","কলহ"],exBN:"সবাই শান্তি চায়।",exEN:"Everyone wants peace.",cat:"Emotion"},
    {w:"ভয়",t:"bhoy",mEN:"fear",mBN:"ভয়",syn:["আতঙ্ক","ত্রাস","শঙ্কা"],ant:["সাহস","নির্ভয়"],exBN:"অন্ধকারে তার ভয় লাগে।",exEN:"He is afraid in the dark.",cat:"Emotion"},
    {w:"সাহস",t:"sahosh",mEN:"courage",mBN:"সাহস",syn:["বীরত্ব","নির্ভীকতা","দুঃসাহস"],ant:["ভয়","কাপুরুষতা"],exBN:"সাহস থাকলে কঠিন কাজও সহজ হয়।",exEN:"With courage, even hard work becomes easy.",cat:"Character"},
    {w:"সততা",t:"sotota",mEN:"honesty",mBN:"সততা",syn:["সত্যবাদিতা","ন্যায়পরায়ণতা","সরলতা"],ant:["মিথ্যা","প্রতারণা"],exBN:"সততাই সেরা নীতি।",exEN:"Honesty is the best policy.",cat:"Character"},
    {w:"ধৈর্য",t:"dhoirjo",mEN:"patience",mBN:"ধৈর্য",syn:["সহিষ্ণুতা","ধীরতা","স্থৈর্য"],ant:["অধৈর্য","অস্থিরতা"],exBN:"ধৈর্য ধরো, ফল আসবেই।",exEN:"Be patient; the result will come.",cat:"Character"},
    {w:"অহংকার",t:"ohongkar",mEN:"arrogance",mBN:"অহংকার",syn:["গর্ব","দম্ভ","আত্মাভিমান"],ant:["বিনয়","নম্রতা"],exBN:"অহংকার পতনের মূল।",exEN:"Arrogance is the root of downfall.",cat:"Character"},
    {w:"বিনয়",t:"binoy",mEN:"humility",mBN:"বিনয়",syn:["নম্রতা","শিষ্টতা","ভদ্রতা"],ant:["অহংকার","ঔদ্ধত্য"],exBN:"বিনয় মানুষকে বড় করে।",exEN:"Humility makes a person great.",cat:"Character"},
    {w:"পরিশ্রম",t:"porishrom",mEN:"hard work",mBN:"পরিশ্রম",syn:["শ্রম","চেষ্টা","সাধনা"],ant:["অলসতা","অকর্মণ্যতা"],exBN:"পরিশ্রম ছাড়া সাফল্য আসে না।",exEN:"Success never comes without hard work.",cat:"Action"},
    {w:"অলসতা",t:"oloshota",mEN:"laziness",mBN:"অলসতা",syn:["আলস্য","কুঁড়েমি","জড়তা"],ant:["পরিশ্রম","উদ্যম"],exBN:"অলসতা সাফল্যের শত্রু।",exEN:"Laziness is the enemy of success.",cat:"Action"},
    {w:"দ্রুত",t:"druto",mEN:"fast",mBN:"দ্রুত",syn:["তাড়াতাড়ি","শীঘ্র","বেগে"],ant:["ধীরে","আস্তে"],exBN:"সে দ্রুত হেঁটে গেল।",exEN:"He walked away quickly.",cat:"Action"},
    {w:"ধীর",t:"dhir",mEN:"slow",mBN:"ধীর",syn:["মন্থর","আস্তে","ধীরগতি"],ant:["দ্রুত","বেগবান"],exBN:"ধীরে ধীরে কাজটা শেষ করো।",exEN:"Finish the work slowly and steadily.",cat:"Action"},
    {w:"শুরু",t:"shuru",mEN:"beginning",mBN:"শুরু",syn:["আরম্ভ","সূচনা","প্রারম্ভ"],ant:["শেষ","সমাপ্তি"],exBN:"আজ থেকেই শুরু করো।",exEN:"Start from today itself.",cat:"Time"},
    {w:"শেষ",t:"shesh",mEN:"end",mBN:"শেষ",syn:["সমাপ্তি","অন্ত","পরিসমাপ্তি"],ant:["শুরু","আরম্ভ"],exBN:"গল্পের শেষটা সুন্দর।",exEN:"The ending of the story is beautiful.",cat:"Time"},
    {w:"সকাল",t:"shokal",mEN:"morning",mBN:"সকাল",syn:["প্রভাত","ঊষা","ভোর"],ant:["সন্ধ্যা","রাত"],exBN:"সকালের বাতাস মন ভালো করে দেয়।",exEN:"The morning air lifts the mood.",cat:"Time"},
    {w:"রাত",t:"rat",mEN:"night",mBN:"রাত",syn:["রজনী","নিশি","যামিনী"],ant:["দিন","দিবস"],exBN:"রাতের আকাশে তারা জ্বলছে।",exEN:"Stars shine in the night sky.",cat:"Time"},
    {w:"দিন",t:"din",mEN:"day",mBN:"দিন",syn:["দিবস","অহ্ন","দিবা"],ant:["রাত","রজনী"],exBN:"দিনের বেলা রোদ থাকে।",exEN:"There is sunshine during the day.",cat:"Time"},
    {w:"আলো",t:"alo",mEN:"light",mBN:"আলো",syn:["জ্যোতি","দীপ্তি","কিরণ"],ant:["অন্ধকার","আঁধার"],exBN:"আলো ছাড়া পড়া যায় না।",exEN:"You cannot read without light.",cat:"Nature"},
    {w:"অন্ধকার",t:"ondhokar",mEN:"darkness",mBN:"অন্ধকার",syn:["আঁধার","তমসা","তিমির"],ant:["আলো","জ্যোতি"],exBN:"অন্ধকারে পথ দেখা যায় না।",exEN:"You cannot see the path in darkness.",cat:"Nature"},
    {w:"বৃষ্টি",t:"brishti",mEN:"rain",mBN:"বৃষ্টি",syn:["বর্ষা","বারিধারা","বর্ষণ"],ant:["খরা","অনাবৃষ্টি"],exBN:"বৃষ্টিতে মাঠ ভিজে গেল।",exEN:"The field got wet in the rain.",cat:"Nature"},
    {w:"আকাশ",t:"akash",mEN:"sky",mBN:"আকাশ",syn:["গগন","নভঃ","অম্বর"],ant:["পাতাল","ভূতল"],exBN:"আকাশে মেঘ ভেসে বেড়াচ্ছে।",exEN:"Clouds drift across the sky.",cat:"Nature"},
    {w:"গরম",t:"gorom",mEN:"hot",mBN:"গরম",syn:["উষ্ণ","তপ্ত","উত্তপ্ত"],ant:["ঠান্ডা","শীতল"],exBN:"আজ খুব গরম পড়েছে।",exEN:"It is very hot today.",cat:"Nature"},
    {w:"ঠান্ডা",t:"thanda",mEN:"cold",mBN:"ঠান্ডা",syn:["শীতল","হিমশীতল","শীত"],ant:["গরম","উষ্ণ"],exBN:"শীতে ঠান্ডা হাওয়া বয়।",exEN:"A cold wind blows in winter.",cat:"Nature"},
    {w:"বড়",t:"boro",mEN:"big",mBN:"বড়",syn:["বৃহৎ","বিশাল","মহৎ"],ant:["ছোট","ক্ষুদ্র"],exBN:"এটা একটা বড় বাড়ি।",exEN:"This is a big house.",cat:"Quality"},
    {w:"ছোট",t:"chhoto",mEN:"small",mBN:"ছোট",syn:["ক্ষুদ্র","লঘু","অল্প"],ant:["বড়","বৃহৎ"],exBN:"ছোট বইটা আমার।",exEN:"The small book is mine.",cat:"Quality"},
    {w:"নতুন",t:"notun",mEN:"new",mBN:"নতুন",syn:["নবীন","নূতন","আধুনিক"],ant:["পুরনো","প্রাচীন"],exBN:"আমি নতুন জামা কিনেছি।",exEN:"I bought a new shirt.",cat:"Quality"},
    {w:"পুরনো",t:"purono",mEN:"old",mBN:"পুরনো",syn:["প্রাচীন","জীর্ণ","পুরাতন"],ant:["নতুন","নবীন"],exBN:"পুরনো বাড়িটার অনেক স্মৃতি।",exEN:"The old house holds many memories.",cat:"Quality"},
    {w:"সুন্দর",t:"shundor",mEN:"beautiful",mBN:"সুন্দর",syn:["মনোহর","রূপবান","চমৎকার"],ant:["কুৎসিত","কদর্য"],exBN:"ফুলটা খুব সুন্দর।",exEN:"The flower is very beautiful.",cat:"Quality"},
    {w:"কঠিন",t:"kothin",mEN:"difficult",mBN:"কঠিন",syn:["দুঃসাধ্য","দুরূহ","শক্ত"],ant:["সহজ","সরল"],exBN:"অঙ্কটা আমার কাছে কঠিন লাগে।",exEN:"The maths problem feels difficult to me.",cat:"Quality"},
    {w:"সহজ",t:"shohoj",mEN:"easy",mBN:"সহজ",syn:["সরল","অনায়াস","সুগম"],ant:["কঠিন","দুঃসাধ্য"],exBN:"এই কাজটা খুব সহজ।",exEN:"This task is very easy.",cat:"Quality"},
    {w:"সত্য",t:"sotto",mEN:"truth",mBN:"সত্য",syn:["সত্যতা","বাস্তবতা","যথার্থতা"],ant:["মিথ্যা","অসত্য"],exBN:"সত্য কথা সবসময় বলো।",exEN:"Always speak the truth.",cat:"Character"},
    {w:"মিথ্যা",t:"mittha",mEN:"lie",mBN:"মিথ্যা",syn:["অসত্য","ভ্রান্তি","ছলনা"],ant:["সত্য","যথার্থ"],exBN:"মিথ্যা বলা উচিত নয়।",exEN:"You should not tell lies.",cat:"Character"},
    {w:"বন্ধু",t:"bondhu",mEN:"friend",mBN:"বন্ধু",syn:["মিত্র","সখা","সুহৃদ"],ant:["শত্রু","বৈরী"],exBN:"সে আমার সবচেয়ে ভালো বন্ধু।",exEN:"He is my best friend.",cat:"Life"},
    {w:"শত্রু",t:"shotru",mEN:"enemy",mBN:"শত্রু",syn:["বৈরী","অরি","প্রতিপক্ষ"],ant:["বন্ধু","মিত্র"],exBN:"শত্রুকেও ক্ষমা করা যায়।",exEN:"Even an enemy can be forgiven.",cat:"Life"},
    {w:"ধনী",t:"dhoni",mEN:"rich",mBN:"ধনী",syn:["ধনবান","সম্পদশালী","বিত্তবান"],ant:["গরিব","দরিদ্র"],exBN:"ধনী হয়েও সে বিনয়ী।",exEN:"Though rich, he is humble.",cat:"Life"},
    {w:"গরিব",t:"gorib",mEN:"poor",mBN:"গরিব",syn:["দরিদ্র","নিঃস্ব","অভাবী"],ant:["ধনী","সম্পদশালী"],exBN:"গরিব মানুষেরও স্বপ্ন থাকে।",exEN:"Poor people have dreams too.",cat:"Life"},
    {w:"স্বাস্থ্য",t:"shastho",mEN:"health",mBN:"স্বাস্থ্য",syn:["সুস্থতা","আরোগ্য","নিরোগতা"],ant:["অসুস্থতা","রোগ","ব্যাধি"],exBN:"স্বাস্থ্যই সম্পদ।",exEN:"Health is wealth.",cat:"Life"},
    {w:"জ্ঞান",t:"gyan",mEN:"knowledge",mBN:"জ্ঞান",syn:["বিদ্যা","শিক্ষা","বোধ"],ant:["অজ্ঞতা","মূর্খতা"],exBN:"জ্ঞান মানুষকে আলোকিত করে।",exEN:"Knowledge enlightens people.",cat:"Character"},
    {w:"অজ্ঞতা",t:"oggota",mEN:"ignorance",mBN:"অজ্ঞতা",syn:["মূর্খতা","অনভিজ্ঞতা","অজ্ঞানতা"],ant:["জ্ঞান","বিদ্যা"],exBN:"অজ্ঞতা দূর করতে পড়তে হয়।",exEN:"Reading removes ignorance.",cat:"Character"},
    {w:"বিজয়",t:"bijoy",mEN:"victory",mBN:"বিজয়",syn:["জয়","সাফল্য","জয়লাভ"],ant:["পরাজয়","হার"],exBN:"পরিশ্রমের ফলেই বিজয় আসে।",exEN:"Victory comes through hard work.",cat:"Action"},
    {w:"পরাজয়",t:"porajoy",mEN:"defeat",mBN:"পরাজয়",syn:["হার","ব্যর্থতা","পরাভব"],ant:["বিজয়","জয়"],exBN:"পরাজয় থেকেও শেখা যায়।",exEN:"You can learn even from defeat.",cat:"Action"},
    {w:"আশা",t:"asha",mEN:"hope",mBN:"আশা",syn:["প্রত্যাশা","ভরসা","আকাঙ্ক্ষা"],ant:["হতাশা","নিরাশা"],exBN:"আশা কখনো ছাড়তে নেই।",exEN:"Never give up hope.",cat:"Emotion"},
    {w:"হতাশা",t:"hotasha",mEN:"despair",mBN:"হতাশা",syn:["নিরাশা","বিষণ্ণতা","ভগ্নাশা"],ant:["আশা","প্রত্যাশা"],exBN:"হতাশা কাটিয়ে আবার চেষ্টা করো।",exEN:"Shake off despair and try again.",cat:"Emotion"}
  ];
  var CATEGORIES = ["All","Emotion","Character","Action","Time","Nature","Quality","Life"];
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { WORDS: WORDS, CATEGORIES: CATEGORIES };
  } else {
    root.WORDS = WORDS; root.CATEGORIES = CATEGORIES;
  }
})(typeof window !== "undefined" ? window : globalThis);
