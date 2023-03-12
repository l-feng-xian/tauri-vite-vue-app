<template>
  <canvas id="threeDmodel"></canvas>
  <div id="g_ui" style="position: fixed; right: 0;top: 0;"></div>
  <div class="messagebox">
    <input type="checkbox" name="" id="threm_chackbox">
    <p>Label标签内文字更加需要填写
      Label标签内for属性的值为自定义，一般与想实现点击会触发控件对象的ID对应相同。</p>
  </div>
</template>

<script setup>
import Entrance from "./entrance/entrance.js"
import { onMounted } from "vue";

onMounted(() => {
  const entrance = new Entrance(document.getElementById("threeDmodel"))
})
</script>

<style scoped>
</style>
