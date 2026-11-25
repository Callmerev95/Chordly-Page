/**
 * Tally → Google Sheets → GitHub issue bridge (Google Apps Script).
 *
 * Setup: see docs/testimonials-pipeline.md
 * - Reads rows from the active spreadsheet (Tally's Google Sheets integration).
 * - For each new, consented response, creates a GitHub issue labelled "testimonial".
 * - A maintainer later adds the "published" label, which the site auto-fetches.
 *
 * The GITHUB_TOKEN is read from Script Properties (Project Settings →
 * Script Properties) and is never stored in the repository.
 */

const CONFIG = {
  owner: 'Callmerev95',
  repo: 'Chordly-Page',
  labels: ['testimonial'],
  issueTitlePrefix: '[Testimonial] ',
  maxRowsPerRun: 25,
};

function syncTallyRows() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;

  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('GITHUB_TOKEN');
    if (!token) throw new Error('Missing GITHUB_TOKEN in Script Properties');

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return;

    const headers = values[0].map((h) => String(h).replace(/^\uFEFF/, '').trim().toLowerCase());
    const col = {
      submissionId: findCol(headers, 'submission id'),
      name: findCol(headers, 'display name'),
      platform: findCol(headers, 'platform'),
      review: findCol(headers, 'your review'),
      profile: findCol(headers, 'profile link'),
      consent: findAllCols(headers, 'i agree'),
    };
    if (col.name < 0 || col.review < 0) {
      throw new Error('Required columns not found: Display name / Your review');
    }

    const processed = new Set(JSON.parse(props.getProperty('PROCESSED_IDS') || '[]'));
    let created = 0;

    for (let r = 1; r < values.length && created < CONFIG.maxRowsPerRun; r++) {
      const row = values[r];
      const id = col.submissionId >= 0 ? cell(row, col.submissionId) : `row-${r}`;
      if (!id || processed.has(id)) continue;

      const consent = col.consent.some((c) => isTrue(row[c]));
      if (!consent) {
        processed.add(id);
        continue;
      }

      const name = cell(row, col.name);
      const review = cell(row, col.review);
      if (!name || !review) continue;

      const platform = cell(row, col.platform) || 'Listener';
      const profile = cell(row, col.profile);

      if (createIssue(token, id, { name, platform, review, profile })) {
        processed.add(id);
        created += 1;
      }
    }

    props.setProperty('PROCESSED_IDS', JSON.stringify([...processed]));
  } finally {
    lock.releaseLock();
  }
}

function findCol(headers, needle) {
  return headers.findIndex((h) => h.includes(needle));
}

function findAllCols(headers, needle) {
  return headers.map((h, i) => (h.includes(needle) ? i : -1)).filter((i) => i >= 0);
}

function cell(row, index) {
  return index >= 0 && row[index] != null ? String(row[index]).trim() : '';
}

function isTrue(value) {
  return value === true || /^(true|yes|1|x|✓)$/i.test(String(value).trim());
}

function createIssue(token, submissionId, data) {
  const body = [
    '### Display name / handle',
    '',
    data.name,
    '',
    '### Platform',
    '',
    data.platform,
    '',
    '### Your review',
    '',
    data.review,
    '',
    '### Profile link (optional)',
    '',
    data.profile || '_No response_',
    '',
    '### Consent',
    '',
    '- [x] I agree to have this review featured on chordly.my.id with attribution.',
    '',
    '<!-- tally-submission:' + submissionId + ' -->',
  ].join('\n');

  const payload = {
    title: CONFIG.issueTitlePrefix + data.name,
    body,
    labels: CONFIG.labels,
  };

  const response = UrlFetchApp.fetch(
    `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`,
    {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    }
  );

  const code = response.getResponseCode();
  if (code >= 200 && code < 300) return true;

  console.error('GitHub issue create failed', code, response.getContentText());
  return false;
}

/** Run once to install a 5-minute time-driven trigger. */
function installTrigger() {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    if (trigger.getHandlerFunction() === 'syncTallyRows') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('syncTallyRows').timeBased().everyMinutes(5).create();
}
