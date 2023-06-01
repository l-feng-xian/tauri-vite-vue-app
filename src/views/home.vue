<template>
  <canvas id="threeDmodel"></canvas>
  <div id="g_ui" style="position: fixed; right: 0;top: 0;"></div>
  <RouterView />
</template>
  
<script setup>
import InitInterface from "@/3dProject/index/initInterface";
import { onMounted } from "vue";
import EmitBus from "@/untils/emitBus.js";

onMounted(() => {
  const initInterface = new InitInterface(document.getElementById("threeDmodel"));
  EmitBus.on('getActiveModel', () => {
    const activeModel = initInterface.addModel.activeModel;
    initInterface.setModelTexture.setTexture(activeModel);
    console.log(activeModel,'getActiveModel----------');
  })
})

</script>
  
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>