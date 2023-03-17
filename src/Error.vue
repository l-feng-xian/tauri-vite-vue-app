<template>
    <div class="error-page">
        <div class="error-content">
            <div class="cube-box">
                <div class="cube">
                    <li v-for="(item, i) in cubeFace" :key="i" :style="item.style">{{ item.text }}</li>
                </div>
                <div class="cube-shadow"></div>
            </div>
        </div>
        <div class="start-item" v-for="(item, i) in startList" :key="i" :style="item.style"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cubeFace = [
    { style: { transform: 'rotateY(90deg) translateZ(100px)' }, text: 0 },
    { style: { transform: 'rotateY(-90deg) translateZ(100px)' }, text: 4 },
    { style: { transform: 'rotateX(90deg) translateZ(100px)' }, text: 0 },
    { style: { transform: 'rotateX(90deg) translateZ(-100px)' }, text: 4 },
    { style: { transform: 'rotateY(180deg) translateZ(100px)' }, text: 4 },
    { style: { transform: 'rotate(0deg) translateZ(100px)' }, text: 4 },
]

const startList = ref([])
onMounted(() =>{
    let setStartList = []
    for (let i = 0; i < 100; i++) {
        setStartList.push({style: {
            backgroundColor: `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`,
            left: Math.floor(Math.random()*window.innerWidth) + 'px',
            top: Math.floor(Math.random()*window.innerHeight) + 'px',
            width: Math.floor((Math.random() * 10) + 4) + 'px',
            height: Math.floor((Math.random() * 10) + 4) + 'px',
            animationDelay: Math.random().toFixed(2) + 's',
        }})
    }
    console.log(setStartList);
    startList.value = setStartList
})
</script>

<style scoped>
.error-page {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.error-page .error-content {
    position: relative;
    z-index: 10;
}

.error-page .cube-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 500px;
    transform-style: preserve-3d;
    flex-wrap: wrap;
}

.error-page .cube-shadow {
    width: 100%;
    height: 40px;
    background-color: var(--text-color);
    margin-top: 40px;
    border-radius: 20px;
    transform: skew(332deg) scale(1.2);
    box-shadow: 0px 0px 100px var(--text-color);
    filter: blur(20px);
}

.error-page .cube-box .cube {
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transition: 0.3s;
    animation: cubeRun 4s infinite;
}

@keyframes cubeRun {
    25% {
        transform: translateZ(-100px) rotateY(-90deg);
    }

    50% {
        transform: translateZ(-100px) rotateY(-180deg);
    }

    75% {
        transform: translateZ(-100px) rotateX(-90deg);
    }

    85% {
        transform: translateZ(-100px) rotateX(-90deg);
    }
}

.error-page .cube li {
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 120px;
    font-weight: bold;
    background-color: var(--text-color);
    color: var(--box-bgc);
}

.error-page .start-item {
    position: absolute;
    animation: setrtRun 2s infinite;
}

@keyframes setrtRun {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.4);
    }
    100% {
        transform: scale(1);
    }
}
</style>