# Testimonials pipeline

How a listener story travels from a submission to the live site.

```
Tally form ──▶ Google Sheet ──▶ Apps Script ──▶ GitHub issue (label: testimonial)
                                                   │
GitHub issue (testimonial template) ──────────────┤
                                                   ▼
                                    maintainer reviews, adds label: published
                                                   │
                                                   ▼
                        Site fetches published issues live → coverflow card
```

- The site never displays unmoderated content. Only issues labelled `published` are shown.
- Submissions require a consent checkbox. The Apps Script bridge skips rows without consent.
- Cards parsed from issues get `verified: true` and a `Source` link back to the issue.

## 1. Auto-fetch on the site (no setup required)

`src/utils/testimonialsFeed.ts` fetches
`https://api.github.com/repos/Callmerev95/Chordly-Page/issues?labels=published&state=open`
and parses the issue-form body into `Testimonial` entries. Results are cached in memory and
`sessionStorage` (10 minutes) and merged with the static fallback in `src/data/testimonials.ts`.

This runs unauthenticated (60 requests/hour per IP), so caching and in-flight dedupe keep usage low.

## 2. Tally → Google Sheets

1. In Tally, open the form → **Integrations → Google Sheets** and connect a spreadsheet.
2. New responses are appended as rows. Keep the default header row.

## 3. GitHub token

1. GitHub → **Settings → Developer settings → Fine-grained tokens → Generate new token**.
2. Repository access: only `Callmerev95/Chordly-Page`.
3. Permissions: **Issues → Read and write**.
4. Copy the token once. You will paste it into Apps Script (never into this repo or chat).

## 4. Apps Script bridge

1. In the Google Sheet: **Extensions → Apps Script**.
2. Paste `scripts/tally-to-github-bridge.gs`.
3. **Project Settings → Script Properties → Add** `GITHUB_TOKEN` = your token.
4. Run `installTrigger` once and authorize. It installs a 5-minute trigger calling `syncTallyRows`.
5. (Optional) Run `syncTallyRows` manually to process existing rows.

The bridge creates issues with label `testimonial` only, never `published`, so a human still
approves each story before it appears.

## 5. Moderation

1. Open the new issue, confirm consent and quality.
2. Add the label `published` to publish. Remove it to unpublish.
3. To keep a review but hide it temporarily, remove `published`; the card disappears on the next load.

## Security

- Keep `GITHUB_TOKEN` in Apps Script Script Properties, scoped to this one repository (`issues:write`).
- Never commit tokens, Sheet links with secrets, or exported submission CSVs (already gitignored).
- Profile links are only rendered when they are valid `http(s)` URLs.

## Cost

Free: Google Sheets + Apps Script + GitHub (public repo) cover this workload at testimonial volume.
