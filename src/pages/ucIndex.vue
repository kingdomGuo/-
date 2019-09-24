<template>
  <div class="ucIndex-wrapper">
    <div class="swiper-wrapper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div ref="container">
      <van-sticky>
        <van-tabs @click="onTabClick" v-model="active" swipeable>
          <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
            <!-- <div class="">ljgdlg';k';k {{ active }}</div> -->
          </van-tab>
        </van-tabs>
      </van-sticky>
    </div>
    <div>
      <div class="ceshi" v-for="index in 4" :key="index"></div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Tab, Tabs, Sticky } from "vant";
export default {
  data() {
    return {
      key: "首页",
      active: 0,
      container: null,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg"
      ]
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky
  },
  mounted() {
    console.log("ddd");
    this.container = this.$refs.container;
  },
  methods: {
    onTabClick(name, title) {
      console.log(name, title);
    }
  }
};
</script>

<style lang="scss" scoped>
.ucIndex-wrapper {
  margin-bottom: 50px;
  .role {
    height: 80px;
    background: red;
  }
  .swiper-wrapper {
    // height: 400px;
    .van-swipe img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .ceshi {
    height: 50px;
    background: blue;
  }
}
</style>
