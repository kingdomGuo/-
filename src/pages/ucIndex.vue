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
        <div v-show="type != '绘本'">
          <div class="nav-list">
            <nav-bar
              :data="otherALlData"
              @clickItem="clickItem"
              :type="type"
              @clickAll="clickAll"
              :moreData="moreData"
            ></nav-bar>
          </div>
          <div class="albumList" v-for="item in otherALlData" :key="item.id">
            <album-list
              :albumData="item"
              :type="type"
              @clickMuch="clickMuch"
              @clickAlbum="clickAlbum"
            ></album-list>
          </div>
          <!-- longding加载 -->
          <div v-show="!otherALlData.length" class="loading-container">
            <loading></loading>
          </div>
        </div>
        <div v-show="type == '绘本'">
          <div class="nav-list">
            <nav-bar
              :data="recommendList"
              :type="type"
              @clickItem="clickItem"
              @clickAll="clickAll"
              :moreData="moreData"
            ></nav-bar>
          </div>
          <div class="albumList" v-for="item in huiReconmmend" :key="item.id">
            <album-list
              :albumData="item"
              :type="type"
              @clickMuch="clickMuch"
              @clickAlbum="clickAlbum"
            ></album-list>
          </div>
          <!-- longding加载 -->
          <div v-show="!recommendList.length" class="loading-container">
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

import {
  carousel,
  aiGetCompleteSystemRecommend,
  aiGetRecommendDetailed
} from "@/api/api.index.js";
import { ERR_CODE } from "@/utils/config.js";
import Scroll from "@components/Scroll/Scroll.vue";
import loading from "@components/loading/loading.vue";
import AlbumList from "@components/AlbumList/AlbumList.vue";
import slide from "@components/slide/slide.vue";
import { navlistMixin } from "@/common/js/mixin.js";
export default {
  mixins: [navlistMixin],
  name: "ucIndex",
  data() {
    return {
      active: 0,
      scrollY: -1,
      deviceType: "未绑定设备",
      type: "歌单",
      show: false,
      deltaX: 0,
      container: null,
      huiReconmmend: [],
      huibenList: [],
      recommendList: [],
      birthDate: "2岁",
      moreData: true,
      tabData: [
        {
          name: "儿童"
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
    AlbumList: AlbumList
  },
  beforeCreate() {
    document.title = "精选社区";
  },
  activated() {
    document.title = "精选社区";
  },
  mounted() {
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
    get_aicarousel() {
      this.huiReconmmend = [];
      this.huibenList = [];
      aiGetCompleteSystemRecommend({
        age: this.birthDate,
        pageNum: 1,
        pageSize: 1
      }).then(response => {
        this.recommendList = response.data.content[0].recommendList;
        for (let i = 0; i < this.recommendList.length; i++) {
          this._aiGetRecommendDetailed(
            i,
            this.recommendList[i].recommendId,
            this.recommendList[i].type
          );
        }
      });
    },
    _aiGetRecommendDetailed(index, recommendId, type) {
      aiGetRecommendDetailed({ recommendId: recommendId, type: type }).then(
        res => {
          let recommendBooksList = res.data.content.recommendBooksList;
          if (res.data.content.recommendBooksSize > 3) {
            recommendBooksList = res.data.content.recommendBooksList.slice(
              0,
              3
            );
          }
          this.huibenList.push({
            recommendBooksList: recommendBooksList,
            recommendId: this.recommendList[index].recommendId,
            type: this.recommendList[index].type,
            themeValue: this.recommendList[index].themeValue
          });
          if (this.recommendList.length === this.huibenList.length) {
            for (let i = 0; i < this.recommendList.length; i++) {
              for (let j = 0; j < this.huibenList.length; j++) {
                if (
                  this.recommendList[i].recommendId ===
                  this.huibenList[j].recommendId
                ) {
                  this.huiReconmmend.push(this.huibenList[j]);
                }
              }
            }
          }
        }
      );
    },
    refresh() {
      this.$refs.scroll.refresh();
    },
    clickItem(item) {
      if (this.type == "绘本") {
        this.$router.push({
          path: `/ucIndex/muchAlbum`,
          query: {
            moduleTitle: item.themeValue,
            moduleId: item.recommendId,
            moduleType: item.type,
            type: "huiben"
          }
        });
      } else {
        this.$router.push({
          path: `/ucIndex/muchAlbum`,
          query: {
            moduleTitle: item.mouldName,
            moduleId: item.id,
            albumType: item.albumType
          }
        });
      }
    },
    clickMuch(item) {
      console.log(item);
      if (this.type == "绘本") {
        this.$router.push({
          path: `/ucIndex/muchAlbum`,
          query: {
            moduleTitle: item.themeValue,
            moduleId: item.recommendId,
            moduleType: item.type,
            type: "huiben"
          }
        });
      } else {
        this.$router.push({
          path: `/ucIndex/muchAlbum`,
          query: {
            moduleTitle: item.mouldName,
            moduleId: item.id,
            albumType: item.albumType
          }
        });
      }
    },
    clickAlbum(item, albumData) {
      console.log(item);
      if (this.type == "绘本") {
        this.$router.push({
          path: `/ucIndex/huibenDetail`,
          query: {
            picBookId: item.picBookId,
            recommendId: item.recommendId
          }
        });
      } else {
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
      }
    },
    clickAll() {
      this.$router.push({ path: `/ucIndex/allType` });
    },
    linkSearch() {
      this.$router.push({ path: `/ucIndex/search` });
    },
    // 获取轮播图
    async getCarousel() {
      let { data } = await carousel({ page: "index" });
      if (data.errcode === ERR_CODE) {
        this.images = data.data;
      }
    },
    onTabClick(name, title) {
      this.type = title;
      if (title !== "绘本") {
        this.getBatchIndexList();
      } else {
        this.get_aicarousel();
      }
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
          font-size: 17px;
          height: 17px;
          line-height: 17px;
          margin-top: 15px;
          color: rgba(255, 255, 255, 1);
          .icon-down {
            position: absolute;
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
