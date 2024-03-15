<script lang="ts">
  export let type: string;
  export let keyword = '';
  export let items: CommonItem[];
</script>

<div class="tab">
  <ul>
    {#each items as {label, value} }
    <li>
      <a href={`/search/${value}?keyword=${keyword}`} class={type == value ? 'active' : ''}>{label}</a>
    </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .tab {
    height: 36px;
    margin: 40px 0;
    position: relative;
    &::after {
      content: "";
      border-bottom: 2px solid var(--primary-700);
      position: absolute;
      inset: auto 0 0 0;
    }

    ul {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      li {
        margin-right: 20px;
        a {
          width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          display: block;
          overflow: hidden;
          position: relative;
        }

        .active {
          color: var(--white);
          &::before {
            content: "";
            width: 85px;
            height: 60px;
            z-index: -1;
            transform-origin: 0 0;
            transform: rotate(15deg);
            background-color: var(--primary-700);
            position: absolute;
            left: 15px;
            top: -22px;
          }
        }
      }
    }
  }
</style>