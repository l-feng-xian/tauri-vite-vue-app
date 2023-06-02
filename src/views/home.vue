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
  //获取选择模型
  EmitBus.on("getActiveModel", () => {
    const activeModel = initInterface.addModel.activeModel;
    initInterface.setModelTexture.setTexture(activeModel);
    console.log(activeModel,'getActiveModel----------');
  })
  //设置控制器是否可以自由旋转
  EmitBus.on("setControlLock", (viewLock) =>{
    console.log(viewLock);
    initInterface.camera.setControlsLock(viewLock);
  })
  //绘制完成更新贴图纹理
  EmitBus.on("drawModelTextureOver", () =>{
    initInterface.setModelTexture.updete();
  })
})

</script>
  
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>