<script>
export default {
  data () {
    return {
      msg: 'Test'
    }
  }
}
</script>
<template>
  <div data-js="app">
    <h1>{{ msg }}</h1>
  </div>
</template>
<style>
[data-js="app"] {
  color: #ffcc00;
}
</style>
