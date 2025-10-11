export function makeDefault() {
  const arr = [];
  for (let i = 1; i <= 12; i++)
    arr.push({
      week: i,
      workout: 0,
      photo: false,
      reading: false,
      resume: false,
    });
  return arr;
}

export function clamp(n, min, max) {
  return isNaN(n) ? min : Math.max(min, Math.min(max, n));
}

export function score(w) {
  const a = clamp(parseInt(w.workout) || 0, 0, 3) / 3;
  const b = w.photo ? 1 : 0;
  const c = w.reading ? 1 : 0;
  const d = w.resume ? 1 : 0;
  return Math.round(((a + b + c + d) / 4) * 100);
}

export function overallAverage(weeks) {
  const valid = weeks.filter(
    (w) => w.workout || w.photo || w.reading || w.resume
  );
  if (valid.length === 0) return 0;
  const sum = valid.reduce((s, w) => s + score(w), 0);
  return Math.round(sum / valid.length);
}

export function bestStreak(weeks) {
  let cur = 0,
    best = 0;
  for (const w of weeks) {
    if (score(w) >= 80) {
      cur++;
      best = Math.max(best, cur);
    } else cur = 0;
  }
  return best;
}
