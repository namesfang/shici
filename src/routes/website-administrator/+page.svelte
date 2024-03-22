<script lang="ts">
  import QRCode from 'qrcode';
	import Icon from "$component/Icon.svelte";

  export let data;

  let dataURL = ''
	QRCode.toDataURL(data.qrl, (error, url)=> {
    dataURL = url
  });
</script>

<div class="wrapper">
  <div class="contact">
    <div class="qr" style:background-image={`url(${dataURL})`}>
      <Icon type="wechat-fill" large />
    </div>
    <p>添加管理员({ data.id })微信</p>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--height-wrapper);

    .contact {
      width: 280px;
      height: 280px;
      border-radius: 10px;
      border: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: var(--gray-100);

      p {
        line-height: 36px;
        font-size: 14px;
      }

      .qr {
        width: 150px;
        height: 150px;
        margin: 24px 24px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 150px 150px;

        :global(i) {
          color: #07cd66;
          background-color: var(--white);
          padding: 5px;
          border-radius: 4px;
        }
      }
    }
  }
</style>