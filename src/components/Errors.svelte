<script lang="ts">
  export let errors: string[];
</script>

<ul class="errors">
  {#each errors as error}
  <li>{error}</li>
  {/each}
</ul>

<style lang="scss">
  .errors {
    margin-bottom: 40px;
    li {
      line-height: 30px;
      text-align: left;
      color: var(--primary-900);
    }
  }
</style>