<template>
  <div class="title-bar" :class="{'title-bar-small': titleBar}">
    <div class="menu-icon" @click="titleBarClick">
      <span class="iconfont cursor-p">&#xe61f;</span>
    </div>
    <div class="search"></div>
    <div class="bars">
      <div class="light-b cursor-p" :class="{ 'light-d': !theme }" @click="themeCheack">
        <div class="b-icon">
          <span v-if="theme" class="iconfont">&#xe635;</span>
          <span v-else class="iconfont">&#xe70f;</span>
        </div>
      </div>
      <span class="iconfont cursor-p">&#xe885;</span>
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

<style scoped>
.title-bar {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1024;
}

.title-bar .search {
  flex: 1;
}

.title-bar .bars {
  display: flex;
  align-items: center;
}

.title-bar .bars .light-b {
  height: 28px;
  width: 70px;
  background-color: var(--box-bgc);
  border-radius: 14px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
  user-select: none;
}

.title-bar .light-b .b-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fdd66b;
  left: 4px;
  transition: all 0.5s;
}

.title-bar .b-icon .iconfont {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: var(--text-color);
}

.title-bar .bars .light-d {
  box-shadow: 0 2px 6px 0 rgba(232, 236, 243, 0.2), 0 24px 20px -24px rgba(163, 189, 250, 0.1);
}

.title-bar .light-d .b-icon {
  left: 46px !important;
  background-color: #8f9dac;
}

.title-bar .bars .light-d {
  box-shadow: none !important;
}

.title-bar-small {
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: block;
}
.menu-icon {
  transform: rotate(0deg);
  transition: all 0.4s ease-in-out;
}
.title-bar-small .menu-icon {
  width: 28px;
  height: 50px;
  line-height: 50px;
  user-select: none;
  transform: rotate(180deg);
}
</style>
