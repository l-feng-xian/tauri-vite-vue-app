<template>
  <canvas id="threeDmodel"></canvas>
  <div id="g_ui" style="position: fixed; right: 0;top: 0;"></div>
  <div class="uvedit-box">
  </div>
</template>
  
<script setup>
import InitInterface from "@/3dProject/index/initInterface";
import {ref, onMounted } from "vue";

onMounted(() => {
  const initInterface = new InitInterface(document.getElementById("threeDmodel"))
})

let editTLWidth = ref(20);
let dragOffsetX = 0;
const editResizeStart = ((e) => {
  dragOffsetX = e.offsetX
  window.addEventListener('mousemove', editResizeEnter)

  window.addEventListener('mouseup', (e => {
    window.removeEventListener('mousemove', editResizeEnter)
  }))
})

const editResizeEnter = ((e) => {
  if (e.pageX === 0) return;
  let dragX = ((e.pageX - dragOffsetX) / window.innerWidth).toFixed(6);
  editTLWidth.value = 100 - (dragX * 100);
})
</script>
  
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>