<script lang="ts">
  interface Props {
    aidRequest: AidRequest;
  }

  let { aidRequest }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  <div>{aidRequest.shortDescription}</div>
  <div>{aidRequest.location.address}</div>
  <div>{aidRequest.details}</div>
</div>
