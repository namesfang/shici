<script lang="ts">
	import Icon from '$component/Icon.svelte';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	let dataURL = '';

	onMount(async () => {
		dataURL = await QRCode.toDataURL('https://u.wechat.com/MIcHSRO9F6QdwoS15iV07a4?s=2');
	});
</script>

<div class="admin-qr">
	<div class="qr" style:background-image={`url(${dataURL})`}>
		<Icon type="wechat-fill" large />
	</div>
	<p>添加管理员微信</p>
</div>

<style lang="scss">
	.admin-qr {
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
</style>
