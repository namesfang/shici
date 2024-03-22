<script lang="ts">
  import { page } from '$app/stores'

  export let size = 194;
  
  export let large = false;
  export let medium = false;
  export let small = false;

  export let circle = false;
  export let round = false;

  export let className = ''

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

<img {src} alt={$page.data.locals.title} title={$page.data.locals.title} class:round={ round } class:circle={ circle } class={className}/>

<style>
  .round {
    border-radius: 16px;
  }
  .circle {
    border-radius: 50%;
  }
</style>