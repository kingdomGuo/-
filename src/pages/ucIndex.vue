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
          <van-sticky class="stickyWrapper van-hairline--bottom">
            <van-tabs
              @click="onTabClick"
              v-model="active"
              color="#2C68FF"
              title-active-color="#2C68FF"
              swipeable
            >
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
          <div v-show="!otherALlData.length" class="loading-container">
            <loading></loading>
          </div>
        </div>
      </div>
      <div class="swiper-wrapper-fix swiperWrapperFix" v-show="show">
        <van-sticky class="stickyWrapper" ref="stickyWrapper">
          <van-tabs
            @click="onTabClick"
            v-model="active"
            color="#2C68FF"
            title-active-color="#2C68FF"
            swipeable
          >
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
    <router-view></router-view>
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
export default {
  name: "ucIndex",
  data() {
    return {
      key: "首页",
      active: 0,
      scrollY: -1,
      probeType: 3,
      listenScroll: true,
      show: false,
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
    NavBar: NavBar,
    AlbumList: AlbumList
  },
  beforeCreate() {
    document.title = "首页";
  },
  activated() {
    document.title = "首页";
  },
  mounted() {
    this.getCarousel();
    this.getBatchIndexList();
    this.container = this.$refs.container;
  },
  watch: {
    scrollY(newY) {
      if (newY > 0) {
        return;
      }
      if (Math.abs(newY) > this.$refs.swiperWrapper.clientHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    clickItem(item) {
      console.log(item);
    },
    clickMuch(item) {
      // this.$router.push(`/detail/${item.id}`);
      this.$router.push({
        path: `/muchAlbum`
      });
      console.log(this.$router, this.$route);
      console.log(item);
    },
    clickAlbum(item) {
      console.log(item);
    },
    // 获取轮播图
    async getCarousel() {
      let { data } = await carousel({ page: "index" });
      if (data.errcode === ERR_CODE) {
        this.images = [data.data[0], ...data.data];
      }
    },
    // 获取不同类型的专辑list
    async getBatchIndexList() {
      let { data } = await batchIndexList({ page: 1, count: 60 });
      if (data.errcode === ERR_CODE) {
        this.otherALlData = data.data;
        console.log(this.otherALlData);
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
  bottom: 56px;
  bottom: calc(56px + constant(safe-area-inset-bottom));
  bottom: calc(56px + env(safe-area-inset-bottom));
  right: 0;
  width: 100%;
  margin: 0 auto;
  max-width: 540px;
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
  .albumList {
    padding: 0 15px;
    overflow: hidden;
  }
  .swiper-wrapper {
    padding: 14px 15px 14px;
    cursor: pointer;
    .van-swipe img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .stickyWrapper {
    box-sizing: border-box;
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
