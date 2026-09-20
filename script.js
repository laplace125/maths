(() => {
  'use strict';

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Click-to-load videos (privacy-friendly YouTube embed) ---------- */
  document.querySelectorAll('.video-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' +
        encodeURIComponent(btn.dataset.video) + '?autoplay=1&rel=0';
      frame.title = btn.dataset.title || 'Video solution';
      frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      btn.parentElement.replaceChildren(frame);
    });
  });

  /* ---------- Warm-up challenge: laws of indices ---------- */
  const form = document.getElementById('challenge-form');
  if (!form) return;

  const questionEl = document.getElementById('question');
  const feedbackEl = document.getElementById('feedback');
  const checkBtn = document.getElementById('check-btn');
  const streakEl = document.getElementById('streak');

  const bases = ['2', '3', '5', '7', 'x', 'y', 'a', 'p'];
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (list) => list[rand(0, list.length - 1)];
  const base = (b) => (/\d/.test(b) ? b : '<i>' + b + '</i>');
  const sup = (n) => '<sup>' + n + '</sup>';
  const input = (cls) =>
    '<input id="answer" class="' + cls + '" type="text" inputmode="numeric" ' +
    'autocomplete="off" maxlength="3" aria-label="Your answer">';
  const slot = () => '<sup class="slot">' + input('exp') + '</sup>';

  const generators = [
    () => { // multiply: add the powers
      const b = base(pick(bases)), m = rand(2, 6), n = rand(2, 6);
      return {
        html: b + sup(m) + ' × ' + b + sup(n) + ' = ' + b + slot(),
        answer: m + n,
        why: 'Same base, so add the powers: ' + m + ' + ' + n + ' = ' + (m + n) + '.'
      };
    },
    () => { // divide: subtract the powers
      const b = base(pick(bases)), n = rand(2, 4), m = n + rand(2, 5);
      return {
        html: b + sup(m) + ' ÷ ' + b + sup(n) + ' = ' + b + slot(),
        answer: m - n,
        why: 'Same base, so subtract the powers: ' + m + ' − ' + n + ' = ' + (m - n) + '.'
      };
    },
    () => { // power of a power: multiply the powers
      const b = base(pick(bases)), m = rand(2, 4), n = rand(2, 4);
      return {
        html: '(' + b + sup(m) + ')' + sup(n) + ' = ' + b + slot(),
        answer: m * n,
        why: 'A power of a power means multiply the powers: ' + m + ' × ' + n + ' = ' + (m * n) + '.'
      };
    },
    () => { // zero index
      const b = base(pick(bases));
      return {
        html: b + sup(0) + ' = ' + input('plain'),
        answer: 1,
        why: 'Any non-zero number raised to the power 0 equals 1.'
      };
    }
  ];

  const tick = '<svg class="mark good" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 17l7 7L27 7"/></svg>';
  const cross = '<svg class="mark bad" viewBox="0 0 32 32" aria-hidden="true"><path d="M7 7l18 18M25 7L7 25"/></svg>';

  let current = null;
  let answered = false;
  let streak = 0;
  let lastIndex = -1;

  function newQuestion() {
    let i;
    do { i = rand(0, generators.length - 1); } while (i === lastIndex);
    lastIndex = i;
    current = generators[i]();
    answered = false;
    questionEl.innerHTML = current.html;
    feedbackEl.innerHTML = '';
    checkBtn.textContent = 'Check answer';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (answered) {
      newQuestion();
      document.getElementById('answer').focus();
      return;
    }

    const field = document.getElementById('answer');
    const raw = field.value.trim();

    if (!/^-?\d+$/.test(raw)) {
      feedbackEl.innerHTML = '<p>Type a whole number in the box, then check your answer.</p>';
      field.focus();
      return;
    }

    answered = true;
    field.readOnly = true;

    if (parseInt(raw, 10) === current.answer) {
      streak += 1;
      feedbackEl.innerHTML = tick +
        '<div><span class="note good">Correct!</span><p>' + current.why + '</p></div>';
    } else {
      streak = 0;
      feedbackEl.innerHTML = cross +
        '<div><span class="note">Not quite.</span><p>The answer is ' + current.answer +
        '. ' + current.why + '</p></div>';
    }

    streakEl.textContent = streak;
    checkBtn.textContent = 'Next question';
    checkBtn.focus();
  });

  newQuestion();
})();
