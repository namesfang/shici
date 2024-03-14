<script lang="ts">
  export let title: string;
  export let keyword: string;
</script>

<div class="toolbar">
  <div class="inner">
    <h2>{title}</h2>
    <form>
      <input type="text" name="keyword" placeholder="搜索诗词标题" bind:value={ keyword }/>
      <button type="submit">搜索</button>
    </form>
  </div>
</div>

<style lang="scss">
  .toolbar {
    height: 64px;
    background-color: var(--gray-100);

    .inner {
      width: 1200px;
      height: 64px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 16px;
        color: var(--gray-600);
      }

      form {
        display: flex;
        input {
          height: 20px;
          padding: 6px 12px;
          border: 0;
          background-color: var(--white);
          border-radius: 4px 0 0 4px;
          &:focus {
            outline: 4px solid var(--primary-900);
          }
        }
        button {
          width: 50px;
          color: var(--white);
          height: 32px;
          border: 0;
          border-radius: 0 4px 4px 0;
          background-color: var(--primary-900);
          &:active {
            font-size: 15px;
          }
        }
      }
    }
  }
</style>