<template>
    <div class="canvas-edit" :class="{ 'canvas-edit-s': !titleBar }">
        <div class="canvas-edit-top" :style="{ height: editHeight }">
            <div id="canvasEditView" class="canvas-edit-top-l" :style="{ width: editTLWidth + '%' }">
                <!-- <ul class="operate">
                    <li class="operate-i" v-for="(item, index) in operateList" :key="index">
                        <span class="iconfont cursor-p">&#xe636;</span>
                    </li>
                </ul> -->
            </div>
            <div class="canvas-edit-top-r" :style="{ width: (100 - editTLWidth) + '%' }">
                <div class="canvas-edit-resize" @mousedown.stop="editResizeStart"></div>
                <div style="flex: 1;">
                    r
                </div>
            </div>
        </div>
        <div class="canvas-edit-footer" style="height:0%;">footer</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia"

import CanvasEditInit from "@/CvEditEntrance/CanvasEditInit.js"
import Rectangle from "@/CvEditEntrance/geometrys/Rectangle.js"

onMounted(() => {
    const canvasEditInit = new CanvasEditInit({
        width: document.getElementById('canvasEditView').offsetWidth,
        height: document.getElementById('canvasEditView').offsetHeight,
        element: document.getElementById('canvasEditView'),
        // treeModel: ['f']
    });
    new Rectangle('add')
})

const { titleBar } = storeToRefs(useStore())

const operateList = [
    { type: '选择' },
    { type: '缩放' },
    { type: '旋转' },

]

let editHeight = ref('100%');
let editTLWidth = ref(80);
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
    editTLWidth.value = dragX * 100;
})
</script>

<style scoped>
@import "@/assets/css/canvasEdit.css";
</style>