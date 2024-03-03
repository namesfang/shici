<script lang="ts">
  export let size = 194;
  export let large = false;
  export let medium = false;
  export let small = false;

  let src = '';
  $: {
    const sizes = [large, medium, small]
    const nums = [194, 114, 72]

    for(let i in sizes) {
      if(sizes[i]) {
        size = nums[i]
        break;
      }
    }

    src = `/images/logo-${size}.jpg`
  }
</script>

<img {src} alt="LOGO"/>