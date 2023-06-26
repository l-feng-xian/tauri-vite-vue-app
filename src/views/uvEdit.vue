<template>
    <div class="uvedit-box">
        <div class="uvedit-l">
            <div class="uvedit-l-bar">
                <el-button type="primary" @click="upResource">
                    <el-icon class="el-icon--right">
                        <UploadFilled />
                    </el-icon>
                    上传素材
                </el-button>
            </div>
            <div class="uvedit-l-content">
                <div v-if="resourceList.length" class="uvedit-l-resource">
                    <el-image class="uvedit-resource-i" v-for="(m, i) in resourceList" :key="i" :src="m" fit="cover" />
                </div>
                <el-empty v-else class="empty" description="上传一些素材吧！！！" />
            </div>
        </div>
        <div class="uvedit-c">
            <div class="uvedit-c-bar">
                <div class="uvedit-icon" @click="viewLockChange">
                    <el-icon color="#fff">
                        <Unlock v-if="viewLock" />
                        <Lock v-else />
                    </el-icon>
                </div>
                <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @active-change="colorChange" />
                <el-input-number style="margin:0 10px;width: 110px;" v-model="brushSize" :min="1" :max="100"/>
            </div>
            <div class="uvedit-c-content">
                <div class="uvedit-umap">
                    <canvas id="uveditCanvas" width="0" height="0"></canvas>
                </div>
            </div>
        </div>
        <div class="uvedit-r"></div>
        <div class="close" @click="closeUVedit"><el-icon><CloseBold /></el-icon></div>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import EmitBus from "@/untils/emitBus.js";

let cvs = null;
let ctx = null;

onMounted(() => {
    EmitBus.emit("getActiveModel");
    cvs = document.getElementById("uveditCanvas");
    ctx = uveditCanvas.getContext("2d");

    cvs.addEventListener("mousedown", canvasDrow)
})
const closeUVedit = () => {
    router.go(-1);
}
//上传素材资源
let resourceList = ref([]);
const upResource = () => {
    const upload = document.createElement("input");
    upload.type = 'file';
    upload.multiple = true;
    upload.click();
    upload.addEventListener("change", (event) => {
        const file = event.target.files;
        let fileList = [];
        for (const key in file) {
            fileList.push(file[key]);
        }
        fileList = fileList.splice(0, fileList.length - 2);
        console.log(fileList);
        fileList.map(m => {
            console.log(m);
            let fileType = m.type.split("/")[0];
            if (fileType === "image") {
                resourceList.value.push(URL.createObjectURL(m))
            }
        })
    })
}

//锁定视图
let viewLock = ref(true);
const viewLockChange = () => {
    viewLock.value = !viewLock.value
    EmitBus.emit("setControlLock", viewLock.value);
}

//改变画笔颜色
let color = ref('rgba(0, 0, 0, 1)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    '#3296fa',
    '#5924fc',
    '#c71585',
])

const colorChange = (e) => {
    color.value = e;
}

//改变画笔尺寸
let brushSize = ref(10);

EmitBus.on("drawModelTexture", (uv) => {
    drowArc(uv.x * cvs.width, uv.y * cvs.height)
});

const isDrow = ref(false);
const canvasDrow = () => {
    isDrow.value = true;
    cvs.addEventListener("mousemove", (e) =>{
        if(isDrow.value) {
            drowArc(e.offsetX, e.offsetY)
        }
    })
    cvs.addEventListener("mouseup", (e) =>{
        isDrow.value = false
    })
}

//绘制圆
const drowArc = (w,h) => {
    ctx.beginPath();
    ctx.fillStyle = color.value;
    ctx.arc(w, h, brushSize.value/2, 0 , 2*Math.PI);
    ctx.closePath();
    ctx.fill();
    EmitBus.emit("drawModelTextureOver");
}


</script>
    
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>