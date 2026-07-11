<script lang="ts">
  interface Props {
    need: Need;
  }

  let { need }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  <div>{need.title}</div>
  <div>{need.location.address}</div>
  <div>{need.description}</div>
</div>
