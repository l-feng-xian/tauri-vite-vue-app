<template>
  <div class="menu-bar" :class="{ 'menu-bar-small': titleBar }">
    <div class="menu-bar-bg">
      <div></div>
    </div>
    <div class="menu-bar-i-box">
      <div class="menu-bar-i" @click="titleBarClick">
        <span class="iconfont cursor-p rotate">&#xe61f;</span>
      </div>
      <div class="menu-bar-i">
        <span class="iconfont cursor-p" style="font-size: 26px;">&#xe601;</span>
      </div>
      <div class="menu-bar-i" style="font-size: 24px;font-weight: 500;">
        H5
      </div>
      <div class="menu-bar-i" style="font-size: 24px;font-weight: 500;">
        CSS
      </div>
      <div class="menu-bar-i" @click="themeCheack">
        <span v-if="theme" class="iconfont cursor-p">&#xe62a;</span>
        <span v-else class="iconfont cursor-p" style="font-size: 38px;">&#xe635;</span>
      </div>
      <div class="menu-bar-i">
        <span class="iconfont cursor-p">&#xe6b0;</span>
      </div>
      <div class="menu-bar-i" style="border: none;">
        <span class="iconfont cursor-p">&#xe885;</span>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia"

const { theme, titleBar } = storeToRefs(useStore())
const themeCheack = () => {
  theme.value = !theme.value
  document.body.classList.toggle("dark-theme");
}

onMounted(() => {
  if (theme.value) {
    document.body.classList.remove("dark-theme");
  } else {
    document.body.classList.add("dark-theme");
  }
})

const titleBarClick = () => {
  titleBar.value = !titleBar.value
}
</script>

<style scoped lang="scss">
@keyframes bgcRun {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }
}

@keyframes radiusRun {
  0% {
    border-radius: 88% 46% 86% 60%;
  }
  25% {
    border-radius: 49% 82% 50% 85%;
  }
  50% {
    border-radius: 64% 40% 64% 31%;
  }
  75% {
    border-radius: 50% 90% 60% 93%;
  }
  100% {
    border-radius: 88% 46% 86% 60%;
  }
}

@keyframes scaleRun {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}

.menu-bar {
  position: fixed;
  left: 10px;
  top: 50%;
  width: 60px;
  transform: translateY(-50%);
  border-radius: 6px;
  z-index: 9999;

  .menu-bar-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(45deg, #67C23A, #E6A23C, #F56C6C, #dcf56c, #6cf5ec, #6c97f5, #d36cf5, #E6A23C, #67C23A);
    border-radius: 6px;
    background-size: 5000%;
    animation: bgcRun 8s linear infinite;
  }

  .menu-bar-bg::after {
    content: " ";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(45deg, #67C23A, #E6A23C, #F56C6C, #dcf56c, #6cf5ec, #6c97f5, #d36cf5, #E6A23C, #67C23A);
    filter: blur(20px);
    background-size: 5000%;
    animation: bgcRun 8s linear infinite;
  }
  .menu-bar-i-box {
    width: 100%;
    height: 424px;
    overflow: hidden;
    transition: height 0.5s;
  }

  .menu-bar-i {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: var(--text-color);
    cursor: pointer;
    transform: scale(0.8);
    border-bottom: 1px solid var(--text-color);
    transition: color 0.5s, border-color 0.5s;
    text-shadow: 1px 1px var(--shadow-c);

    .iconfont {
      font-size: 30px;
      transition: color 0.5s, transform 0.5s;
      font-weight: 500;
      user-select: none;
    }
  }
  .menu-bar-i:hover {
      animation: scaleRun 0.8s ease-in;
    }
}

.menu-bar-small {
  .rotate {
    transform: rotate(180deg);
    text-shadow: -1px -1px var(--shadow-c);
  }

  .menu-bar-i-box {
    height: 60px;
    overflow: hidden;
    .menu-bar-i {
      border: none;
    }
  }

  .menu-bar-bg {
    // border-radius: 50%;
    // transition: border-radius 0.5s 0.4s;
    animation:bgcRun 8s linear infinite, radiusRun 6s linear infinite;
  }
}
</style>
