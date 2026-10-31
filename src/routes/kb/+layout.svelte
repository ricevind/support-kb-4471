<script lang="ts">
  import Runbook from '#lib/layouts/runbook.svelte';
  let { data, children } = $props();
</script>

<Runbook title={data.metadata.title} owner={data.metadata.owner} status={data.metadata.status} reviewed={data.metadata.reviewed}>
  {@render children()}
</Runbook>
