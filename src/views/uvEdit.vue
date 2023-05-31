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
                <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="colorChange"/>
                <el-input-number style="margin:0 10px;width: 110px;" v-model="brushSize" :min="1" :max="100" @change="brushSizeChange" />
            </div>
            <div class="uvedit-c-content">
                <div class="uvedit-umap"></div>
            </div>
        </div>
        <div class="uvedit-r"></div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

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

const colorChange = (e) =>{
    console.log(e);
}
let brushSize = ref(0);
const brushSizeChange = (e) =>{
    console.log(e);
}

</script>
    
<style lang="scss" scoped>
@import "@/assets/css/uvedit.scss";
</style>