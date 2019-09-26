<template>
  <div class="tabBar-wrapper">
    <van-tabbar v-model="active" route :z-index="zIndex">
      <van-tabbar-item replace to="/ucIndex">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item replace to="/home">
        <span>设备</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active1 : icon.normal1"
        />
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  data() {
    return {
      active: 0,
      border: true,
      zIndex: 10000,
      icon: {
        normal:
          "https://ama-mobile-app.oss-cn-hangzhou.aliyuncs.com/server/api//tab_home@3x.png ",
        active:
          "https://ama-mobile-app.oss-cn-hangzhou.aliyuncs.com/server/api//tab_home_s@3x.png",
        normal1:
          "https://ama-mobile-app.oss-cn-hangzhou.aliyuncs.com/server/api//tab_device@3x.png",
        active1:
          "https://ama-mobile-app.oss-cn-hangzhou.aliyuncs.com/server/api//tab_device_s@3x.png"
      }
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
