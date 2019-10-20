<template>
  <div class="appType-wrapper">
    <div class="appType-list">
      <nav-bar :data="otherALlData" @clickItem="clickItem"></nav-bar>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { navlistMixin } from "@/common/js/mixin.js";
export default {
  mixins: [navlistMixin],
  methods: {
    clickItem(item) {
      this.$router.push({
        path: `/ucIndex/allType/muchAlbum`,
        query: {
          moduleTitle: item.mouldName,
          moduleId: item.id,
          albumType: item.albumType
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appType-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
  .appType-list {
    padding: 20px 15px 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
