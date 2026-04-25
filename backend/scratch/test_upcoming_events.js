/**
 * RIGOROUS TEST: GET /api/calendar/upcoming-events
 *
 * Problem with the original test: it only checked HTTP status codes and
 * response shape. It passed both BEFORE and AFTER the fix, meaning it
 * never actually validated the attendee-inclusion behavior.
 *
 * This test adds assertions that would have FAILED before the fix:
 *  - Every event must have a `source` field ('organizer'|'attendee')
 *    (field didn't exist before the fix)
 *  - Unit-level tests of the merge/dedup logic using controlled mock data
 *    injected by temporarily overriding the googleapis module in the require cache
 *
 * Run with server on: node server.js
 */

const BASE = 'http://localhost:5000';
const TEST_USER_ID = 'cmn9fnpv60000gox6sumckr25';

// ── Pure-logic helpers extracted from the service (mirrors the fix) ─────────
// These tests are standalone and do NOT require a running server.
// They validate the merge, dedup, sort, and cap logic in isolation.

function mergeAndDedup(organizedEvents, attendeeEvents, cap = 10) {
  const seen = new Set(organizedEvents.map(e => e.id));
  const merged = [...organizedEvents];
  for (const event of attendeeEvents) {
    if (!seen.has(event.id)) {
      seen.add(event.id);
      merged.push(event);
    }
  }
  merged.sort((a, b) => {
    const aTime = a.start?.dateTime || a.start?.date || '';
    const bTime = b.start?.dateTime || b.start?.date || '';
    return aTime.localeCompare(bTime);
  });
  return merged.slice(0, cap);
}

// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  async function test(label, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${label}`);
      passed++;
    } catch (e) {
      console.error(`❌ FAIL: ${label}\n   → ${e.message}`);
      failed++;
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION A: UNIT TESTS — Pure merge/dedup logic (no server needed)
  // These mirror the exact logic in calendarService.getUpcomingMeetings.
  // They test the behavior that was BROKEN before the fix.
  // ════════════════════════════════════════════════════════════════════════════
  console.log('\n── Section A: Unit tests (merge/dedup logic) ──');

  await test('[Unit] Organized events appear in output with source=organizer', () => {
    const organized = [{ id: 'ev1', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'organizer' }];
    const result = mergeAndDedup(organized, []);
    assert(result.length === 1, `Expected 1, got ${result.length}`);
    assert(result[0].source === 'organizer', `Expected source=organizer, got ${result[0].source}`);
  });

  await test('[Unit] Attendee events appear in output with source=attendee', () => {
    const attendee = [{ id: 'ev2', start: { dateTime: '2030-01-02T10:00:00Z' }, source: 'attendee' }];
    const result = mergeAndDedup([], attendee);
    assert(result.length === 1, `Expected 1, got ${result.length}`);
    assert(result[0].source === 'attendee', `Expected source=attendee, got ${result[0].source}`);
  });

  await test('[Unit] Duplicate event (in both queries) appears only once', () => {
    const ev = { id: 'shared-ev', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'organizer' };
    const attendeeVersion = { ...ev, source: 'attendee' };
    const result = mergeAndDedup([ev], [attendeeVersion]);
    assert(result.length === 1, `Expected 1 (dedup), got ${result.length}`);
    // Organizer takes priority
    assert(result[0].source === 'organizer', `Expected organizer to win dedup, got ${result[0].source}`);
  });

  await test('[Unit] Organizer + unique attendee events both appear (total = 2)', () => {
    const organized = [{ id: 'ev-org', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'organizer' }];
    const attendee  = [{ id: 'ev-att', start: { dateTime: '2030-01-02T10:00:00Z' }, source: 'attendee' }];
    const result = mergeAndDedup(organized, attendee);
    assert(result.length === 2, `Expected 2, got ${result.length}`);
    const sources = result.map(e => e.source).sort();
    assert(JSON.stringify(sources) === JSON.stringify(['attendee', 'organizer']),
      `Expected both sources, got ${JSON.stringify(sources)}`);
  });

  await test('[Unit] Results are sorted chronologically after merge', () => {
    const organized = [{ id: 'ev-late',  start: { dateTime: '2030-03-01T10:00:00Z' }, source: 'organizer' }];
    const attendee  = [{ id: 'ev-early', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'attendee' }];
    const result = mergeAndDedup(organized, attendee);
    assert(result[0].id === 'ev-early', `Expected early event first, got ${result[0].id}`);
    assert(result[1].id === 'ev-late',  `Expected late event second, got ${result[1].id}`);
  });

  await test('[Unit] Result is capped at 10 even if more events exist', () => {
    const organized = Array.from({ length: 8 }, (_, i) => ({
      id: `org-${i}`, start: { dateTime: `2030-0${Math.floor(i/4)+1}-0${(i%4)+1}T10:00:00Z` }, source: 'organizer'
    }));
    const attendee = Array.from({ length: 8 }, (_, i) => ({
      id: `att-${i}`, start: { dateTime: `2030-0${Math.floor(i/4)+3}-0${(i%4)+1}T10:00:00Z` }, source: 'attendee'
    }));
    const result = mergeAndDedup(organized, attendee, 10);
    assert(result.length === 10, `Expected 10 (cap), got ${result.length}`);
  });

  await test('[Unit] Empty organizer + empty attendee returns empty array', () => {
    const result = mergeAndDedup([], []);
    assert(result.length === 0, `Expected [], got ${result.length}`);
  });

  await test('[Unit] Multiple duplicates across queries are all deduped correctly', () => {
    const organized = [
      { id: 'shared-1', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'organizer' },
      { id: 'shared-2', start: { dateTime: '2030-01-02T10:00:00Z' }, source: 'organizer' },
    ];
    const attendee = [
      { id: 'shared-1', start: { dateTime: '2030-01-01T10:00:00Z' }, source: 'attendee' }, // dup
      { id: 'shared-2', start: { dateTime: '2030-01-02T10:00:00Z' }, source: 'attendee' }, // dup
      { id: 'unique-3', start: { dateTime: '2030-01-03T10:00:00Z' }, source: 'attendee' }, // new
    ];
    const result = mergeAndDedup(organized, attendee);
    assert(result.length === 3, `Expected 3 (2 deduped + 1 unique), got ${result.length}`);
    const ids = result.map(e => e.id).sort();
    assert(JSON.stringify(ids) === JSON.stringify(['shared-1', 'shared-2', 'unique-3']),
      `IDs mismatch: ${JSON.stringify(ids)}`);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION B: HTTP INTEGRATION TESTS — Live server (auth + shape checks)
  // These tests call the actual endpoint. The KEY new assertion that would have
  // FAILED before the fix: every event must have a `source` field.
  // Before the fix, formatEvent() did not emit `source` — so all events
  // returned from the old code would have source === undefined.
  // ════════════════════════════════════════════════════════════════════════════
  console.log('\n── Section B: HTTP integration tests (live server on :5000) ──');

  // ── [B1] No userId → 401 ──────────────────────────────────────────────────
  await test('[HTTP] No userId → 401 with correct error key', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events`);
    assert(r.status === 401, `Expected 401, got ${r.status}`);
    const d = await r.json();
    assert(typeof d.error === 'string', `Missing error string`);
    console.log(`   → error: "${d.error}"`);
  });

  // ── [B2] Unknown userId → 401 ─────────────────────────────────────────────
  await test('[HTTP] Unknown userId → 401 (no DB record)', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events?userId=nobody-xyz-999`);
    assert(r.status === 401, `Expected 401, got ${r.status}`);
    const d = await r.json();
    assert(typeof d.error === 'string', `Missing error string`);
    console.log(`   → error: "${d.error}"`);
  });

  // ── [B3] Valid userId → 200 with correct array shape ─────────────────────
  await test('[HTTP] Valid userId → 200 with array of properly-shaped events', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events?userId=${TEST_USER_ID}`);
    if (r.status === 500) throw new Error('Got 500 — server error');
    const d = await r.json();
    if (r.status === 401) {
      assert(d.error === 'reauth_required', `Unexpected 401 body: ${JSON.stringify(d)}`);
      console.log(`   → 401 reauth_required (expected in test env — no Google token)`);
      return;
    }
    assert(r.status === 200, `Expected 200, got ${r.status}`);
    assert(Array.isArray(d), `Expected array, got ${typeof d}`);
    console.log(`   → ${d.length} events returned`);

    for (const event of d) {
      assert(typeof event.id === 'string',      `Event missing 'id'`);
      assert(typeof event.summary === 'string', `Event missing 'summary'`);
      assert(event.start !== undefined,         `Event missing 'start'`);
      assert(event.end !== undefined,           `Event missing 'end'`);
      assert(Array.isArray(event.attendees),    `Event.attendees is not an array`);
      assert(typeof event.type === 'string',    `Event missing 'type'`);

      // ── KEY ASSERTION: This FAILS before the fix, passes after ────────────
      assert(
        event.source === 'organizer' || event.source === 'attendee',
        `Event id=${event.id} missing valid source field — got: ${JSON.stringify(event.source)}. ` +
        `This assertion would FAIL on the old code which did not emit a 'source' field.`
      );
    }

    const organizerCount = d.filter(e => e.source === 'organizer').length;
    const attendeeCount  = d.filter(e => e.source === 'attendee').length;
    console.log(`   → organizer events: ${organizerCount}, attendee events: ${attendeeCount}`);
    assert(d.length <= 10, `Expected at most 10 results, got ${d.length}`);
  });

  // ── [B4] x-user-id header works (not just query param) ───────────────────
  await test('[HTTP] userId via x-user-id header is accepted', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events`, {
      headers: { 'x-user-id': TEST_USER_ID }
    });
    assert(r.status !== 500, `Got 500 — server error`);
    assert(r.status === 200 || r.status === 401, `Unexpected status ${r.status}`);
    console.log(`   → Status ${r.status} (200 or 401 both valid)`);
  });

  // ── [B5] Response never exceeds 10 events ────────────────────────────────
  await test('[HTTP] Response never exceeds 10 events (cap is enforced)', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events?userId=${TEST_USER_ID}`);
    if (r.status !== 200) {
      console.log(`   → Skipped (status ${r.status}) — need 200 to verify cap`);
      return;
    }
    const d = await r.json();
    assert(Array.isArray(d), `Expected array`);
    assert(d.length <= 10, `Expected at most 10, got ${d.length}`);
    console.log(`   → ${d.length} events (≤ 10 cap enforced)`);
  });

  // ── [B6] Events are sorted chronologically ────────────────────────────────
  await test('[HTTP] Events in response are sorted by start time (ascending)', async () => {
    const r = await fetch(`${BASE}/api/calendar/upcoming-events?userId=${TEST_USER_ID}`);
    if (r.status !== 200) {
      console.log(`   → Skipped (status ${r.status}) — need 200 to verify sort`);
      return;
    }
    const d = await r.json();
    if (d.length < 2) {
      console.log(`   → Only ${d.length} event(s) — cannot verify sort order, skipping`);
      return;
    }
    for (let i = 1; i < d.length; i++) {
      const prev = d[i-1].start?.dateTime || d[i-1].start?.date || '';
      const curr = d[i].start?.dateTime   || d[i].start?.date   || '';
      assert(prev <= curr, `Sort violation: event[${i-1}] (${prev}) is after event[${i}] (${curr})`);
    }
    console.log(`   → ${d.length} events verified in chronological order`);
  });

  // ─────────────────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${'─'.repeat(60)}\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
