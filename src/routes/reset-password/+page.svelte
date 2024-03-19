<script lang="ts">
	import AdminQr from "$component/AdminQR.svelte";
</script>

<div class="wrapper">
  <AdminQr/>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--height-header) - var(--height-footer));
  }
</style>