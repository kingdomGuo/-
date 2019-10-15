<template>
  <div id="app">
    <tab-bar
      v-if="currentPath == '/ucIndex' || currentPath == '/home'"
    ></tab-bar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import TabBar from "@components/TabBar/TabBar.vue";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      currentPath: ""
    };
  },
  beforeUpdate() {
    // console.log(this.$route.path == "/ucIndex");
    this.currentPath = this.$route.path;
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tabBar-wrapper .van-tab .van-ellipsis {
  display: inline-block !important;
  line-height: 44px !important;
}
.ucIndex-wrapper .van-tab span {
  display: inline-block !important;
}
.ucIndex-wrapper .stickyWrapper .van-tab--active {
  font-size: 16px !important;
}
.ucIndex-wrapper .stickyWrapper .van-sticky--fixed {
  position: static !important;
}

.ucIndex-wrapper .stickyWrapper .van-hairline--top-bottom::after,
.ucIndex-wrapper .stickyWrapper .van-hairline-unset--top-bottom::after {
  border-bottom-color: #ccc !important;
}
.detail-wrapper .all-wrapper .van-hairline--bottom::after,
.detail-wrapper .song-list .van-hairline--bottom::after {
  border-bottom-color: #ccc !important;
}
.detail-wrapper .song-list .van-hairline--bottom:last-child::after {
  border-bottom-color: #fff !important;
}

.albulmlist-wrapper .van-icon-arrow {
  margin-top: 2px !important;
  margin-left: 3px !important;
  float: right !important;
}
.albulmlist-wrapper .album-list img {
  border-radius: 10px !important;
  min-height: 105px !important;
  max-width: 105px !important;
  max-height: 105px !important;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  body,
  .tabBar-wrapper .van-tabbar {
    height: 56px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.tabBar-wrapper .van-tabbar .van-tabbar-item .van-tabbar-item__icon img {
  width: 22px !important;
  height: 22px !important;
}
.ucIndex-wrapper .bannerBox {
  height: 160px;
}
.ucIndex-wrapper .swiper-container {
  width: 100%;
  height: 100%;
}
.ucIndex-wrapper .swiper-container .swiper-wrapper .swiper-slide {
  width: 85% !important;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.ucIndex-wrapper .swiper-container .swiper-wrapper .swiper-slide img {
  width: 100%;
  height: 160px;
  border-radius: 10px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev,
.swiper-container .swiper-wrapper .swiper-slide-next {
  height: 120px !important;
  border-radius: 10px;
  margin-top: 20px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev img,
.swiper-container .swiper-wrapper .swiper-slide-next img {
  width: 100%;
  border-radius: 10px;
  height: 100%;
}
</style>
