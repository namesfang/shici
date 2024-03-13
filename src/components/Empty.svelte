<script lang="ts">
	import Icon from "./Icon.svelte";

  export let tips = '暂无数据'
</script>

<div class="empty">
  <div>
    <Icon type="frown" color="--gray-300" large/>
  </div>
  <p>{tips}</p>
</div>

<style lang="scss" scoped>
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 40px 0;
  div {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 50%;
    background-color: var(--gray-50);
    position: relative;
    &::after {
      content: "";
      width: 50px;
      height: 50px;
      background-color: var(--gray-50);
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      right: -20px;
    }
  }
  p {
    line-height: 30px;
    font-size: 14px;
    color: var(--gray-600);
    margin: 0;
  }
}
</style>