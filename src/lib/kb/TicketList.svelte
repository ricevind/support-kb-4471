<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // The export, the ids it repeats, and the causes inside one ticket, with the ticket each cause got.
  let { ticket, repo, issues }: { ticket: number; repo: string; issues: Record<string, number> } = $props();

  const rows = reports.length;
  const unique = $derived(uniqueById(reports as Report[]));
  const merged = $derived(unique.filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf).filter((g) => g.cause !== 'unplaced'));
</script>

<p class="sum">
  <strong>{rows}</strong> exported rows · <strong>{unique.length}</strong> unique ids ·
  <strong>{merged.length}</strong> merged into #{ticket} · <strong>{groups.length}</strong>
  {groups.length === 1 ? 'problem' : 'problems'}
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.cause)}
      <tr>
        <td><code>{g.cause}</code></td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>
          {#if issues[g.cause]}
            <a href="https://github.com/{repo}/issues/{issues[g.cause]}">#{issues[g.cause]}</a>
          {:else}
            none yet
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
</style>
