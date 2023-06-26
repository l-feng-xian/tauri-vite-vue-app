<template>
  <canvas id="threeDmodel"></canvas>
  <div id="g_ui" style="position: fixed; right: 0;top: 0;"></div>
  <div class="uv-edit-c" @click="editPenClick"><el-icon class="edit-pen"><EditPen /></el-icon></div>
  <div class="loading" v-if="expressOver">
    <div class="loading-box">
      <p class="text">loading</p>
      <div class="express text">{{ express }}</div>
    </div>
  </div>
  <RouterView />
</template>
  
<script setup>
import InitInterface from "@/3dProject/index/initInterface";
import { ref, onMounted } from "vue";
import EmitBus from "@/untils/emitBus.js";

let express = ref(0);
let expressOver = ref(true);

let initInterface = null;

onMounted(() => {
  initInterface = new InitInterface(document.getElementById("threeDmodel"));
  //加载进度
  EmitBus.on("singleAssetLoadedEmit", (val) => {
    express.value = val.toFixed(0);
    if(express.value == 100) {
      expressOver.value = false;
    }
  })
  //获取选择模型
  EmitBus.on("getActiveModel", () => {
    const activeModel = initInterface.addModel.activeModel;
    initInterface.setModelTexture.setTexture(activeModel);
  })
  //设置控制器是否可以自由旋转
  EmitBus.on("setControlLock", (viewLock) => {
    console.log(viewLock);
    initInterface.camera.setControlsLock(viewLock);
  })
  //canvas图像纹理绘制
  EmitBus.on("drawModelTextureOver", () => {
    initInterface.setModelTexture.updete();
  })
  
  
})

const editPenClick = () =>{
  initInterface.addModel.setModels();
}

</script>
  
<style lang="scss" scoped>
.uv-edit-c {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ecd3a3;
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #b15818;
  box-shadow: 0px 2px 0px #b15818;
  cursor: pointer;
}

.uv-edit-c:hover .edit-pen {
  transform-origin: 40% 100%;
  animation: editpen 0.5s ease-out;
}

@keyframes editpen {
  0% {
    transform: rotate(20deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dab46d;

  .loading-box {
    text-align: center;
    font-size: 40px;

    .text {
      font-weight: bold;
      text-shadow: 1px 1px 10px #ffffff;
    }
  }
}</style>