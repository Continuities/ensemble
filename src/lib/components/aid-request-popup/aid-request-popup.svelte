<script lang="ts">
  interface Props {
    aidRequest: AidRequest;
  }

  let { aidRequest }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  <div>{aidRequest.shortDescription}</div>
  {#if aidRequest.location}
    <div>{aidRequest.location.address}</div>
  {/if}
  <div>{aidRequest.details}</div>
</div>
