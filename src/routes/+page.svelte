<script lang="ts">
  const start = async ()=> {
    const res = await fetch('/api/author')
    const end = await res.json();
  }
</script>

<h1>Welcome to</h1>

<button on:click={ start } type="button">开始</button>
