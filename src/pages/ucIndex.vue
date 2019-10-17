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
        <!-- 轮播图 -->
        <!-- <div class="swiper-wrapper" ref="swiperWrapper">
          <van-swipe :autoplay="3000" indicator-color="blue">
            <van-swipe-item
              v-for="(image, index) in images"
              :key="index"
              @touchstart.prevent="middleTouchStart($event, image.redirection)"
              @touchmove.prevent="middleTouchMove($event, image.redirection)"
              @touchend="middleTouchEnd($event, image.redirection)"
            >
              <img :src="image.imgUrl" />
            </van-swipe-item>
          </van-swipe>
        </div> -->
        <!-- 吸顶 -->
        <div class="top-bg" ref="topWrapper">
          <div class="setter-bg">
            <div class="icon-wrapper" ref="iconWrapper">
              <div class="left"></div>
              <div class="middle">
                {{ deviceType
                }}<span
                  style="width: 13px;display:inline-block;height:10px"
                ></span>
                <van-icon
                  class="icon-down"
                  name="arrow-down"
                  size="17"
                  color="#fff"
                />
              </div>
              <div class="right">
                <van-icon
                  @click="linkSearch"
                  name="search"
                  size="24"
                  color="#fff"
                />
              </div>
            </div>
          </div>
          <div ref="swiperWrapper" class="swiperWrapper">
            <slide :banners="images"></slide>
          </div>
        </div>

        <div ref="container">
          <div class="stickyWrapper first-stickTb van-hairline--bottom">
            <van-tabs
              @click="onTabClick"
              v-model="active"
              color="#eb5f58"
              title-active-color="#eb5f58"
            >
              <van-tab
                v-for="(item, index) in tabData"
                :title="item.name"
                :key="index"
              >
              </van-tab>
            </van-tabs>
          </div>
        </div>
        <div>
          <div class="nav-list">
            <nav-bar :data="otherALlData" @clickItem="clickItem"></nav-bar>
          </div>
          <div class="albumList" v-for="item in otherALlData" :key="item.id">
            <album-list
              :albumData="item"
              @clickMuch="clickMuch"
              @clickAlbum="clickAlbum"
            ></album-list>
          </div>
          <!-- longding加载 -->
          <div v-show="!otherALlData.length" class="loading-container">
            <loading></loading>
          </div>
        </div>
      </div>
      <div
        class="swiper-wrapper-fix second-stickTb swiperWrapperFix"
        v-show="show"
      >
        <div class="stickyWrapper" ref="stickyWrapper">
          <van-tabs
            @click="onTabClick"
            v-model="active"
            color="#eb5f58"
            title-active-color="#eb5f58"
            swipeable
          >
            <van-tab
              v-for="(item, index) in tabData"
              :title="item.name"
              :key="index"
            >
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Tab, Tabs, Sticky } from "vant";
import { ERR_CODE } from "@/utils/config.js";
import { carousel, batchIndexList } from "@/api/api.index.js";
import Scroll from "@components/Scroll/Scroll.vue";
import loading from "@components/loading/loading.vue";
import NavBar from "@components/NavBar/NavBar.vue";
import AlbumList from "@components/AlbumList/AlbumList.vue";
import slide from "@components/slide/slide.vue";
export default {
  name: "ucIndex",
  data() {
    return {
      active: 0,
      scrollY: -1,
      deviceType: "未绑定设备",
      show: false,
      deltaX: 0,
      container: null,
      otherALlData: [],
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
      albumData: [],
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
    loading: loading,
    slide: slide,
    NavBar: NavBar,
    AlbumList: AlbumList
  },
  beforeCreate() {
    document.title = "精选社区";
  },
  activated() {
    document.title = "精选社区";
  },
  mounted() {
    this.getBatchIndexList();
    this.getCarousel();
  },
  watch: {
    scrollY(newY) {
      if (newY > 0) {
        return;
      }
      if (
        document.querySelector(".first-stickTb .van-tabs__line") &&
        document.querySelector(".first-stickTb .van-tabs__line").style
      ) {
        const first = document.querySelector(".first-stickTb .van-tabs__line")
          .style.backgroundColor;
        const second = document.querySelector(".first-stickTb .van-tabs__line")
          .style.width;
        const third = document.querySelector(".first-stickTb .van-tabs__line")
          .style.transform;
        document.querySelector(
          ".second-stickTb .van-tabs__line"
        ).style.width = second;
        document.querySelector(
          ".second-stickTb .van-tabs__line"
        ).style.backgroundColor = first;
        document.querySelector(
          ".second-stickTb .van-tabs__line"
        ).style.transform = third;
      }
      if (Math.abs(newY) > this.$refs.topWrapper.clientHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  created() {
    this.listenScroll = true;
    this.touch = {};
    this.probeType = 3; // better-scroll 滚动组件 不截留
  },
  methods: {
    // // 轮播图判断是点击还是左右滑动
    // middleTouchEnd(e, url) {
    //   if (this.deltaX === 0) {
    //     window.location.href = url;
    //   }
    // },
    // middleTouchMove(e) {
    //   if (!this.touch.initiated) {
    //     return;
    //   }
    //   const touch = e.touches[0];
    //   const deltaX = touch.pageX - this.touch.startX;
    //   const deltaY = touch.pageY - this.touch.startY;
    //   if (Math.abs(deltaY) > Math.abs(deltaX)) {
    //     return;
    //   }
    //   this.deltaX = deltaX;
    //   if (!this.touch.moved) {
    //     this.touch.moved = true;
    //   }
    // },
    // middleTouchStart(e) {
    //   this.touch.initiated = true;
    //   // 用来判断是否是一次移动
    //   this.touch.moved = false;
    //   this.deltaX = 0;
    //   const touch = e.touches[0];
    //   this.touch.startX = touch.pageX;
    // },
    refresh() {
      this.$refs.scroll.refresh();
    },
    clickItem(item) {
      this.$router.push({
        path: `/ucIndex/muchAlbum`,
        query: {
          moduleTitle: item.mouldName,
          moduleId: item.id,
          albumType: item.albumType
        }
      });
    },
    clickMuch(item) {
      this.$router.push({
        path: `/ucIndex/muchAlbum`,
        query: {
          moduleTitle: item.mouldName,
          moduleId: item.id,
          albumType: item.albumType
        }
      });
    },
    clickAlbum(item, albumData) {
      this.$router.push({
        path: `/ucIndex/songDetail`,
        query: {
          front_url: item.front_url,
          id: item.id,
          name: item.name,
          source: item.source,
          type: item.type,
          information: albumData.albumType
        }
      });
    },
    linkSearch() {
      console.log("33");
      this.$router.push({ path: `/ucIndex/search` });
    },
    // 获取轮播图
    async getCarousel() {
      let { data } = await carousel({ page: "index" });
      if (data.errcode === ERR_CODE) {
        this.images = data.data;
      }
    },
    // 获取不同类型的专辑list
    async getBatchIndexList() {
      let { data } = await batchIndexList({ page: 1, count: 60 });
      if (data.errcode === ERR_CODE) {
        this.otherALlData = data.data;
      }
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
  bottom: 0px;
  // bottom: calc(56px + constant(safe-area-inset-bottom));
  // bottom: calc(56px + env(safe-area-inset-bottom));
  right: 0;
  width: 100%;
  margin: 0 auto;
  max-width: 540px;
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .top-bg {
    position: relative;
    padding-bottom: 14px;
    padding-top: 56px;
    .setter-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: rgba(235, 95, 88, 1);
      .icon-wrapper {
        height: 56px;
        display: flex;
        .left {
          height: 32px;
          flex: 0 0 32px;
          background: gray;
          margin-left: 16px;
          margin-top: 6px;
          border-radius: 50%;
        }
        .middle {
          flex: 1;
          text-align: center;
          margin-left: -17px;
          // margin-top: 10px;
          // .deviceType-wrapper {
          font-size: 17px;
          height: 17px;
          line-height: 17px;
          // display: inline-block;
          // margin: 0;
          margin-top: 15px;
          color: rgba(255, 255, 255, 1);

          //}
          .icon-down {
            // margin-top: 2px;
            position: absolute;
            // margin-left: 13px;
            top: 14px;
          }
        }
        .right {
          flex: 0 0 24px;
          height: 24px;
          margin: 0px;
          line-height: 0px;
          margin-right: 12px;
          margin-top: 12px;
          .van-icon-search {
            height: 100%;
          }
        }
      }
    }
    .swiperWrapper {
    }
  }
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
  .nav-list {
    padding: 0 15px;
    padding-top: 36px;
    margin-bottom: 13px;
  }
  // .bannerBox {
  //   position: relative;
  //   height: 300px;
  // }
  // .swiper-container {
  //   width: 1000px;
  //   height: 100%;
  // }
  // .swiper-container .swiper-wrapper .swiper-slide {
  //   width: 80% !important;
  //   overflow: hidden;
  //   display: flex;
  //   align-items: center;
  // }
  // .swiper-container .swiper-wrapper .swiper-slide img {
  //   width: 100%;
  //   height: 300px;
  //   border-radius: 5px;
  // }
  // .swiper-container .swiper-wrapper .swiper-slide-prev,
  // .swiper-container .swiper-wrapper .swiper-slide-next {
  //   height: 260px !important;
  //   margin-top: 20px;
  // }
  // .swiper-container .swiper-wrapper .swiper-slide-prev img,
  // .swiper-container .swiper-wrapper .swiper-slide-next img {
  //   width: 100%;
  //   height: 100%;
  // }
  .albumList {
    padding: 0 15px;
    overflow: hidden;
  }
  // .swiper-wrapper {
  //   padding: 14px 15px 14px;
  //   cursor: pointer;
  //   .van-swipe img {
  //     display: block;
  //     box-sizing: border-box;
  //     width: 100%;
  //     border-radius: 10px;
  //     background-color: #fff;
  //     pointer-events: none;
  //   }
  // }
  .stickyWrapper {
    box-sizing: border-box;
  }
  .swiper-wrapper-fix {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 90;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
