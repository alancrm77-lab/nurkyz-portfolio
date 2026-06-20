/* ============================================================
   Nurkyz Portfolio — interactivity & content
   Edit CONFIG to set the default language and toggle sections.
   ============================================================ */

const CONFIG = {
  defaultLanguage: 'en', // 'en' | 'ru'
  showStats: true,
  showRates: true,
  year: 2026,
  // Web3Forms access key — get a free one at https://web3forms.com (tied to your email).
  web3formsKey: '9d4a7569-8775-4c9f-b242-d8925fbd6401',
};

/* ---- Bilingual copy ---- */
const D = {
  en: {
    nav: { about: 'About', work: 'Work', podcast: 'Podcast', services: 'Services', contact: 'Contact' },
    heroBadge: 'Available for collabs',
    heroPre: "Hi, I'm",
    heroName: 'Nurkyz',
    heroRole: 'Lifestyle creator & host of the Kochmon Podcast',
    heroDesc: 'I make daily-life content that feels honest, warm and a little chaotic — and I help brands show up in my world without breaking the vibe.',
    ctaPrimary: 'Work with me',
    ctaSecondary: 'Watch the podcast',
    stickerA: 'always filming',
    stickerB: 'real, not perfect',
    marquee: ['Lifestyle', 'Daily vlogs', 'Kochmon Podcast', 'Brand collabs', 'Storytelling', 'Real moments'],
    aboutKicker: 'About me',
    aboutTitle: 'Real life, on camera —',
    aboutTitleAccent: 'with the volume up.',
    aboutP1: "I'm Nurkyz, a lifestyle creator documenting the messy, funny, beautiful parts of everyday life. My audience sticks around because it feels like texting a friend, not watching an ad.",
    aboutP2: "Off-camera I host the Kochmon Podcast, where the conversations get honest fast. Whether it's a 15-second reel or a full episode, I build trust — and that's what makes brand partnerships actually convert.",
    aboutTags: ['Lifestyle', 'UGC', 'Podcasting', 'Storytelling', 'Reels & Shorts', 'Daily vlogs'],
    workKicker: 'Selected work',
    workTitle: 'Content that actually gets watched',
    workNote: 'A snapshot of recent reels, collabs and series. Tap any to start a conversation.',
    podcastKicker: 'Kochmon Podcast',
    podcastTitle: 'Honest talks, zero filter',
    podcastDesc: 'New episodes every week — candid conversations on life, relationships and the things nobody says out loud. Streaming on YouTube and everywhere you listen.',
    podcastCta: 'Watch on YouTube',
    episodes: [
      { num: '12', title: 'Burnout, boundaries & saying no', meta: 'Latest · 48 min' },
      { num: '11', title: 'Dating in your twenties', meta: '52 min' },
      { num: '10', title: 'Building a life online', meta: '44 min' },
    ],
    servicesKicker: 'Work with me',
    servicesTitle: 'Packages & rates',
    services: [
      { name: 'UGC Starter', price: 'from $350', desc: 'Native, scroll-stopping content for your channels.', features: ['1 vertical video (15–30s)', '2 rounds of revisions', 'Raw + edited files', 'Usage rights included'], bg: '#fff', fg: '#2A1822', btnBg: '#FF4D8D', btnFg: '#fff' },
      { name: 'Creator Collab', price: 'from $900', desc: 'A full reel posted to my audience, made together.', features: ['1 reel on my profile', 'Story set (3 frames)', 'Concept + scripting', 'Performance recap'], bg: '#FF4D8D', fg: '#fff', btnBg: '#fff', btnFg: '#2A1822' },
      { name: 'Podcast Feature', price: "let's talk", desc: 'Integrate your brand into the Kochmon Podcast.', features: ['Host-read segment', 'Episode + clips', 'Cross-posted on socials', 'Long-term partnerships'], bg: '#fff', fg: '#2A1822', btnBg: '#FF4D8D', btnFg: '#fff' },
    ],
    servicesBtn: 'Get started',
    servicesFoot: 'Rates are starting points — every brief is custom. Tell me your goals and I’ll send a tailored proposal.',
    brandsKicker: 'Brands & partners',
    testKicker: 'Kind words',
    testTitle: 'What partners say',
    testimonials: [
      { quote: 'Nurkyz delivered content that felt completely native to her feed — our CTR doubled versus our usual creatives.', name: 'Aru K.', role: 'Marketing Lead, Beauty Brand', color: '#FF4D8D' },
      { quote: 'Fast, professional and genuinely funny. The reel outperformed everything else we ran that month.', name: 'Daniel M.', role: 'Founder, DTC Startup', color: '#9B6BFF' },
      { quote: 'Working with her on the podcast feature gave us a level of trust ads just can’t buy.', name: 'Saule T.', role: 'Brand Manager', color: '#FF7A59' },
    ],
    contactKicker: "Let's talk",
    contactTitle: 'Got a brand, a brief, or just a vibe?',
    contactDesc: 'Tell me what you’re building and how you’d like to work together. I reply to every serious enquiry within 48 hours.',
    fName: 'Your name', fNamePh: 'Jane Doe',
    fBrand: 'Brand / company', fBrandPh: 'Acme Co.',
    fEmail: 'Email', fEmailPh: 'you@brand.com',
    fMsg: 'Tell me about it', fMsgPh: 'Campaign, timeline, budget range…',
    fSubmit: 'Send enquiry',
    fSending: 'Sending…',
    fError: 'Something went wrong. Please email me directly at hello@nurkyz.com.',
    sentTitle: 'Got it — thank you!',
    sentDesc: "I'll get back to you within 48 hours.",
    footRights: 'All rights reserved.',
  },
  ru: {
    nav: { about: 'Обо мне', work: 'Работы', podcast: 'Подкаст', services: 'Услуги', contact: 'Контакты' },
    heroBadge: 'Открыта для коллабораций',
    heroPre: 'Привет, я',
    heroName: 'Нуркыз',
    heroRole: 'Лайфстайл-криэйтор и ведущая подкаста Kochmon',
    heroDesc: 'Я снимаю контент о настоящей жизни — честный, тёплый и немного хаотичный. И помогаю брендам органично вписаться в этот мир, не теряя вайба.',
    ctaPrimary: 'Работать со мной',
    ctaSecondary: 'Смотреть подкаст',
    stickerA: 'всегда снимаю',
    stickerB: 'честно, не идеально',
    marquee: ['Лайфстайл', 'Влоги', 'Подкаст Kochmon', 'Коллаборации', 'Истории', 'Живые моменты'],
    aboutKicker: 'Обо мне',
    aboutTitle: 'Настоящая жизнь в кадре —',
    aboutTitleAccent: 'на полной громкости.',
    aboutP1: 'Я Нуркыз, лайфстайл-криэйтор. Снимаю смешные, тёплые и неидеальные моменты обычной жизни. Аудитория остаётся со мной, потому что это похоже на переписку с подругой, а не на рекламу.',
    aboutP2: 'Вне кадра я веду подкаст Kochmon — здесь разговоры быстро становятся честными. Будь то 15-секундный рилс или целый выпуск, я строю доверие. Именно поэтому коллаборации с брендами работают.',
    aboutTags: ['Лайфстайл', 'UGC', 'Подкаст', 'Сторителлинг', 'Reels & Shorts', 'Влоги'],
    workKicker: 'Избранные работы',
    workTitle: 'Контент, который реально смотрят',
    workNote: 'Подборка свежих рилсов, коллабораций и рубрик. Нажмите на любой, чтобы начать разговор.',
    podcastKicker: 'Подкаст Kochmon',
    podcastTitle: 'Честные разговоры без фильтров',
    podcastDesc: 'Новые выпуски каждую неделю — откровенно о жизни, отношениях и о том, о чём обычно молчат. Смотрите на YouTube и слушайте на всех площадках.',
    podcastCta: 'Смотреть на YouTube',
    episodes: [
      { num: '12', title: 'Выгорание, границы и умение говорить «нет»', meta: 'Новый · 48 мин' },
      { num: '11', title: 'Отношения в двадцать с чем-то', meta: '52 мин' },
      { num: '10', title: 'Как строить жизнь онлайн', meta: '44 мин' },
    ],
    servicesKicker: 'Сотрудничество',
    servicesTitle: 'Форматы и цены',
    services: [
      { name: 'UGC Старт', price: 'от $350', desc: 'Нативный контент, который останавливает скролл, для ваших каналов.', features: ['1 вертикальное видео (15–30с)', '2 раунда правок', 'Сырые + смонтированные файлы', 'Права на использование'], bg: '#fff', fg: '#2A1822', btnBg: '#FF4D8D', btnFg: '#fff' },
      { name: 'Коллаборация', price: 'от $900', desc: 'Полноценный рилс на моей аудитории — делаем вместе.', features: ['1 рилс на моём профиле', 'Сторис (3 кадра)', 'Идея + сценарий', 'Отчёт по охватам'], bg: '#FF4D8D', fg: '#fff', btnBg: '#fff', btnFg: '#2A1822' },
      { name: 'Интеграция в подкаст', price: 'обсудим', desc: 'Интеграция вашего бренда в подкаст Kochmon.', features: ['Нативное упоминание', 'Выпуск + нарезки', 'Кросс-постинг в соцсетях', 'Долгосрочные партнёрства'], bg: '#fff', fg: '#2A1822', btnBg: '#FF4D8D', btnFg: '#fff' },
    ],
    servicesBtn: 'Начать',
    servicesFoot: 'Цены — это отправная точка, каждый бриф индивидуален. Расскажите о целях, и я пришлю персональное предложение.',
    brandsKicker: 'Бренды и партнёры',
    testKicker: 'Отзывы',
    testTitle: 'Что говорят партнёры',
    testimonials: [
      { quote: 'Нуркыз сделала контент, который полностью вписался в её ленту — наш CTR вырос вдвое по сравнению с обычными креативами.', name: 'Ару К.', role: 'Маркетинг, бьюти-бренд', color: '#FF4D8D' },
      { quote: 'Быстро, профессионально и по-настоящему смешно. Рилс обогнал всё, что мы запускали в том месяце.', name: 'Даниэль М.', role: 'Основатель, DTC-стартап', color: '#9B6BFF' },
      { quote: 'Интеграция в подкаст дала нам уровень доверия, который рекламой просто не купишь.', name: 'Сауле Т.', role: 'Бренд-менеджер', color: '#FF7A59' },
    ],
    contactKicker: 'Давайте обсудим',
    contactTitle: 'Есть бренд, бриф или просто идея?',
    contactDesc: 'Расскажите, что вы создаёте и как хотели бы сотрудничать. Отвечаю на каждый серьёзный запрос в течение 48 часов.',
    fName: 'Ваше имя', fNamePh: 'Иван Иванов',
    fBrand: 'Бренд / компания', fBrandPh: 'Acme Co.',
    fEmail: 'Email', fEmailPh: 'you@brand.com',
    fMsg: 'Расскажите подробнее', fMsgPh: 'Кампания, сроки, бюджет…',
    fSubmit: 'Отправить запрос',
    fSending: 'Отправка…',
    fError: 'Что-то пошло не так. Напишите мне напрямую на hello@nurkyz.com.',
    sentTitle: 'Получено — спасибо!',
    sentDesc: 'Я отвечу вам в течение 48 часов.',
    footRights: 'Все права защищены.',
  },
};

/* ---- Language-independent data ---- */
const PORTFOLIO = [
  { cat: 'Reel', color: '#FF4D8D', stripe: 'repeating-linear-gradient(45deg, #FFD6E4 0 14px, #FFCBDD 14px 28px)' },
  { cat: 'Collab', color: '#9B6BFF', stripe: 'repeating-linear-gradient(-45deg, #E9D8FF 0 14px, #DECBFF 14px 28px)' },
  { cat: 'Series', color: '#FF7A59', stripe: 'repeating-linear-gradient(45deg, #FFE0D4 0 14px, #FFD3C2 14px 28px)' },
  { cat: 'Reel', color: '#2FB6FF', stripe: 'repeating-linear-gradient(-45deg, #D4EEFF 0 14px, #C2E6FF 14px 28px)' },
  { cat: 'Vlog', color: '#BFF24A', stripe: 'repeating-linear-gradient(45deg, #EBF8C9 0 14px, #E0F3B3 14px 28px)' },
  { cat: 'Collab', color: '#FF4D8D', stripe: 'repeating-linear-gradient(-45deg, #FFD6E4 0 14px, #FFCBDD 14px 28px)' },
];

const WORK = {
  en: [
    { title: 'A day in my life', metric: '1.2M views · saved 38K' },
    { title: 'Skincare night routine', metric: 'Brand collab · 540K views' },
    { title: 'Get ready with me', metric: 'Series · 12 episodes' },
    { title: 'Trying viral recipes', metric: '890K views · 24K shares' },
    { title: 'What I eat in a week', metric: 'Vlog · 410K views' },
    { title: 'Honest product review', metric: 'Brand collab · 6.1% CTR' },
  ],
  ru: [
    { title: 'Один день из моей жизни', metric: '1.2М просмотров · 38К сохр.' },
    { title: 'Вечерний уход за кожей', metric: 'Коллаб · 540К просмотров' },
    { title: 'Собираюсь со мной', metric: 'Рубрика · 12 выпусков' },
    { title: 'Готовлю вирусные рецепты', metric: '890К просмотров · 24К репостов' },
    { title: 'Что я ем за неделю', metric: 'Влог · 410К просмотров' },
    { title: 'Честный обзор продукта', metric: 'Коллаб · CTR 6.1%' },
  ],
};

const STATS = {
  en: [
    { num: '120K+', label: 'Followers across platforms', color: '#FF4D8D' },
    { num: '8M+', label: 'Monthly views', color: '#9B6BFF' },
    { num: '40+', label: 'Brand collaborations', color: '#FF7A59' },
    { num: '250K', label: 'Podcast listens', color: '#2FB6FF' },
  ],
  ru: [
    { num: '120K+', label: 'Подписчиков на всех платформах', color: '#FF4D8D' },
    { num: '8M+', label: 'Просмотров в месяц', color: '#9B6BFF' },
    { num: '40+', label: 'Коллабораций с брендами', color: '#FF7A59' },
    { num: '250K', label: 'Прослушиваний подкаста', color: '#2FB6FF' },
  ],
};

const BRANDS = ['STUDIO', 'MAISON', 'GLOW+', 'NOVA', 'LUME', 'VERTE'];

const SOCIALS = [
  { name: 'Instagram', handle: '@nurkyzkou_', url: 'https://www.instagram.com/nurkyzkou_/' },
  { name: 'Instagram', handle: '@kochmon_podcast', url: 'https://www.instagram.com/kochmon_podcast/' },
  { name: 'YouTube', handle: 'Kochmon Podcast', url: 'https://www.youtube.com/@Kochmon_podcast1' },
  { name: 'Email', handle: 'hello@nurkyz.com', url: 'mailto:hello@nurkyz.com' },
];

/* ---- App state ---- */
const state = {
  lang: D[CONFIG.defaultLanguage] ? CONFIG.defaultLanguage : 'en',
  sent: false,
};

/* ---- Helpers ---- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k === 'html') node.innerHTML = v;
    else if (v != null) node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(child));
  }
  return node;
}

/* Resolve a dotted i18n key against the current dictionary */
function lookup(c, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), c);
}

/* ---- Renderers ---- */
function renderText(c) {
  $$('[data-i18n]').forEach((node) => {
    const val = lookup(c, node.dataset.i18n);
    if (typeof val === 'string') node.textContent = val;
  });
}

function renderMarquee(c) {
  $$('[data-marquee]').forEach((group) => {
    group.replaceChildren();
    c.marquee.forEach((word) => {
      group.append(el('span', { class: 'marquee-word' }, word));
      group.append(el('span', { class: 'marquee-star' }, '✦'));
    });
  });
}

function renderStats(lang) {
  const wrap = $('[data-stats]');
  wrap.replaceChildren();
  STATS[lang].forEach((s) => {
    wrap.append(
      el('div', { class: 'stat-card' },
        el('div', { class: 'stat-num', style: `color:${s.color}` }, s.num),
        el('div', { class: 'stat-label' }, s.label),
      ),
    );
  });
}

function renderAboutTags(c) {
  const wrap = $('[data-about-tags]');
  wrap.replaceChildren();
  c.aboutTags.forEach((tag) => wrap.append(el('span', { class: 'tag' }, tag)));
}

function renderWork(lang) {
  const wrap = $('[data-work]');
  wrap.replaceChildren();
  PORTFOLIO.forEach((p, i) => {
    const w = WORK[lang][i];
    wrap.append(
      el('a', { class: 'work-card', href: '#contact' },
        el('div', { class: 'work-thumb', style: `background-image:${p.stripe}` },
          el('span', { class: 'work-cat', style: `background:${p.color}` }, p.cat),
          el('span', { class: 'work-ph' }, 'thumbnail'),
        ),
        el('div', { class: 'work-body' },
          el('div', { class: 'work-name' }, w.title),
          el('div', { class: 'work-metric' }, w.metric),
        ),
      ),
    );
  });
}

function renderEpisodes(c) {
  const wrap = $('[data-episodes]');
  wrap.replaceChildren();
  c.episodes.forEach((ep) => {
    wrap.append(
      el('div', { class: 'episode' },
        el('div', { class: 'episode-num' }, ep.num),
        el('div', { class: 'episode-info' },
          el('div', { class: 'episode-title' }, ep.title),
          el('div', { class: 'episode-meta' }, ep.meta),
        ),
        el('span', { class: 'episode-play' }, '▶'),
      ),
    );
  });
}

function renderServices(c) {
  const wrap = $('[data-services]');
  wrap.replaceChildren();
  c.services.forEach((sv) => {
    const features = el('div', { class: 'service-features' });
    sv.features.forEach((f) => {
      features.append(
        el('div', { class: 'service-feature' },
          el('span', { class: 'star' }, '✦'),
          el('span', {}, f),
        ),
      );
    });
    wrap.append(
      el('div', { class: 'service-card', style: `background:${sv.bg};color:${sv.fg}` },
        el('div', { class: 'service-name' }, sv.name),
        el('div', { class: 'service-price' }, sv.price),
        el('p', { class: 'service-desc' }, sv.desc),
        features,
        el('a', { class: 'service-btn', href: '#contact', style: `background:${sv.btnBg};color:${sv.btnFg}` }, c.servicesBtn),
      ),
    );
  });
}

function renderBrands() {
  const wrap = $('[data-brands]');
  wrap.replaceChildren();
  BRANDS.forEach((b) => wrap.append(el('div', { class: 'brand-logo' }, b)));
}

function renderTestimonials(c) {
  const wrap = $('[data-testimonials]');
  wrap.replaceChildren();
  c.testimonials.forEach((t) => {
    wrap.append(
      el('div', { class: 'testimonial' },
        el('div', { class: 'testimonial-quote-mark', style: `color:${t.color}` }, '“'),
        el('p', { class: 'testimonial-quote' }, t.quote),
        el('div', { class: 'testimonial-author' },
          el('span', { class: 'testimonial-avatar', style: `background:${t.color}` }),
          el('div', {},
            el('div', { class: 'testimonial-name' }, t.name),
            el('div', { class: 'testimonial-role' }, t.role),
          ),
        ),
      ),
    );
  });
}

function renderSocials() {
  const wrap = $('[data-socials]');
  wrap.replaceChildren();
  SOCIALS.forEach((so) => {
    wrap.append(
      el('a', { class: 'social-link', href: so.url, target: '_blank', rel: 'noopener' },
        el('span', { class: 'social-name' }, so.name),
        el('span', { class: 'social-handle' }, so.handle),
      ),
    );
  });
}

function renderForm(c) {
  const wrap = $('[data-form-wrap]');
  wrap.replaceChildren();

  if (state.sent) {
    wrap.append(
      el('div', { class: 'form-success' },
        el('div', { class: 'check' }, '✦'),
        el('div', { class: 'success-title' }, c.sentTitle),
        el('p', { class: 'success-desc' }, c.sentDesc),
      ),
    );
    return;
  }

  const form = el('form', { class: 'contact-form' });

  const field = (labelText, inputNode) =>
    el('div', { class: 'field' }, el('label', {}, labelText), inputNode);

  const submitBtn = el('button', { type: 'submit', class: 'form-submit' }, c.fSubmit);
  const errorNote = el('p', { class: 'form-error', role: 'alert', hidden: 'true' }, c.fError);

  form.append(
    // Web3Forms config fields
    el('input', { type: 'hidden', name: 'access_key', value: CONFIG.web3formsKey }),
    el('input', { type: 'hidden', name: 'subject', value: 'New enquiry from nurkyz.com' }),
    el('input', { type: 'hidden', name: 'from_name', value: 'Nurkyz Portfolio' }),
    // Honeypot — bots fill this, humans don't
    el('input', { type: 'checkbox', name: 'botcheck', class: 'hp', tabindex: '-1', autocomplete: 'off' }),

    el('div', { class: 'form-row' },
      field(c.fName, el('input', { type: 'text', name: 'name', placeholder: c.fNamePh, required: 'true' })),
      field(c.fBrand, el('input', { type: 'text', name: 'company', placeholder: c.fBrandPh })),
    ),
    field(c.fEmail, el('input', { type: 'email', name: 'email', placeholder: c.fEmailPh, required: 'true' })),
    field(c.fMsg, el('textarea', { name: 'message', rows: '4', placeholder: c.fMsgPh, required: 'true' })),
    submitBtn,
    errorNote,
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorNote.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = c.fSending;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        state.sent = true;
        renderForm(D[state.lang]);
        return;
      }
      throw new Error(data.message || 'Submission failed');
    } catch (err) {
      errorNote.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = c.fSubmit;
    }
  });

  wrap.append(form);
}

function renderLangButtons() {
  $$('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
}

/* ---- Full render ---- */
function render() {
  const lang = state.lang;
  const c = D[lang];
  document.documentElement.lang = lang;

  renderText(c);
  renderMarquee(c);
  renderAboutTags(c);
  renderWork(lang);
  renderEpisodes(c);
  renderBrands();
  renderTestimonials(c);
  renderSocials();
  renderForm(c);
  renderLangButtons();

  // Toggleable sections
  const statsSection = $('#stats');
  statsSection.hidden = !CONFIG.showStats;
  if (CONFIG.showStats) renderStats(lang);

  $('#services').hidden = !CONFIG.showRates;
  if (CONFIG.showRates) renderServices(c);

  $('[data-year]').textContent = CONFIG.year;
}

/* ---- Wire up ---- */
$$('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.lang = btn.dataset.lang;
    render();
  });
});

render();
