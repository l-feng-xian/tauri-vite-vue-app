<template>
  <canvas id="threeDmodel"></canvas>
  <div id="g_ui" style="position: fixed; right: 0;top: 0;"></div>
  <RouterView />
</template>
  
<script setup>
import InitInterface from "@/3dProject/index/initInterface";
import { onMounted } from "vue";

onMounted(() => {
  const initInterface = new InitInterface(document.getElementById("threeDmodel"))
})

</script>
  
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>