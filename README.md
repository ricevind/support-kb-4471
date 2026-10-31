# support-kb-4471

Tickets filed from the support desk's ticket #4471, and the kb page that explains them.

Ticket #4471 merged 412 reports about dates into one ticket and closed it as one bug: "dates parse
mm/dd in eu locales". Sorted by cause, those reports are two different bugs.

| problem  | reports | tenants | received                  | ticket |
| -------- | ------- | ------- | ------------------------- | ------ |
| `parser` | 379     | 11      | 2026-04-01 → 2026-10-04   | #1     |
| `hint`   | 33      | 3       | 2026-04-17 → 2026-09-22   | #2     |

- `parser`: the shared date parser reads every date month first. Tenants that write the day first
  get their dates flipped.
- `hint`: the booking-v3 form prints `MM/DD/YYYY` under its date field, then reads the input day
  first. Same subject lines as the bug above, different bug.

## Where things are

- `src/` — the support desk's kb, as exported, plus the page this work added:
  `src/routes/kb/incidents/4471-causes/+page.svx`.
- `site/` — the kb built as a static site, so the page can be read as the desk sees it:
  `site/kb/incidents/4471-causes.html`.
- `src/lib/kb/causes.ts` — how a report is assigned a cause: tenant locale, booking form and
  channel. Intake's `meta.intakeTag` is a guess and is not used for counting.
- `src/lib/kb/TicketList.svelte` — the table of problems and tickets above, computed at render time.

## Counts

The export holds 427 rows for ticket #4471 but only 412 unique report ids, because the ticket
system's pages overlap. All 412 were merged into #4471. Reports the desk read as a one-day move are
still counted where they were filed, and are footnoted under the cause table on the page.

## Build

```
npm install
npm run build     # writes the static site to site/
```

The page is signed in its frontmatter; its desk ref is derived from that signature by
`src/lib/kb/desk-ref.ts`.
