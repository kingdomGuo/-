<template>
  <div class="ucIndex-wrapper">
    <scroll
      ref="scroll"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="listAlbum-content"
      :data="images"
    >
      <div>
        <div class="swiper-wrapper" ref="swiperWrapper" indicator-color="blue">
          <van-swipe :autoplay="3000">
            <van-swipe-item
              @click="linkUrl(image.redirection)"
              v-for="(image, index) in images"
              :key="index"
            >
              <img :src="image.imgUrl" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div ref="container">
          <van-sticky class="stickyWrapper">
            <van-tabs @click="onTabClick" v-model="active" color="#g666gg" title-active-color="#ee0a24" swipeable>
              <van-tab
                v-for="(item, index) in tabData"
                :title="item.name"
                :key="index"
              >
              </van-tab>
            </van-tabs>
          </van-sticky>
        </div>
        <div>
          <div
            v-show="images.length"
            class="ceshi"
            v-for="index in 20"
            :key="index"
          >
            {{ index }}
          </div>
          <div v-show="!images.length" class="loading-container">
            <loading></loading>
          </div>
        </div>
      </div>
      <div class="swiper-wrapper-fix swiperWrapperFix" v-if="show">
        <van-sticky class="stickyWrapper" ref="stickyWrapper">
          <van-tabs @click="onTabClick" v-model="active" color="#g666gg" title-active-color="#ee0a24" swipeable>
            <van-tab
              v-for="(item, index) in tabData"
              :title="item.name"
              :key="index"
            >
            </van-tab>
          </van-tabs>
        </van-sticky>
      </div>
    </scroll>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Tab, Tabs, Sticky } from "vant";
import { ERR_CODE } from "@/utils/config.js";
import { carousel } from "@/api/api.index.js";
import Scroll from "@components/Scroll/Scroll.vue";
import loading from "@components/loading/loading.vue";
export default {
  data() {
    return {
      key: "首页",
      active: 0,
      scrollY: -1,
      probeType: 3,
      listenScroll: true,
      show: false,
      container: null,
      tabData: [
        {
          name: "儿童"
        },
        {
          name: "有声"
        },
        {
          name: "绘本"
        }
      ],
      images: []
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    Scroll: Scroll,
    loading: loading
  },
  beforeCreate() {
    document.title = "首页";
  },
  mounted() {
    this.getCarousel();
    this.container = this.$refs.container;
  },
  watch: {
    scrollY(newY) {
      if (Math.abs(newY) > this.$refs.swiperWrapper.clientHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    async getCarousel() {
      let { data } = await carousel({ page: "index" });
      if (data.errcode === ERR_CODE) {
        this.images = [data.data[0], ...data.data];
      }
    },
    linkUrl(url) {
      window.location.href = url;
    },
    onTabClick(name, title) {
      this.getCarousel();
      console.log(name, title);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    }
  }
};
</script>

<style lang="scss" scoped>
.ucIndex-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 50px;
  right: 0;
  width: 100%;
  .listAlbum-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .role {
    height: 80px;
    background: red;
  }
  .activeHeight {
    height: 375px;
  }
  .swiper-wrapper {
    padding: 10px;
    padding-top: 0px;
    .van-swipe img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .ceshi {
    height: 50px;
    background: blue;
  }
  .swiper-wrapper-fix {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
