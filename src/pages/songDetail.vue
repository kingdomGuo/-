<template>
  <div class="detail-wrapper">
    <div class="detail-top" ref="bgImage">
      <div class="bg-image" :style="bgStyle" ref="bgImageHeight">
        <div class="filter"></div>
        <img class="song-img" :src="query.front_url" />
        <div class="song-title">{{ query.name }}</div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>

    <scroll
      class="list"
      ref="list"
      :data="songList"
      @scroll="scroll"
      :pullup="pullup"
      :beforeScroll="beforeScroll"
      @beforeScroll="listScroll"
      @scrollToEnd="getSongList"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
    >
      <div>
        <div class="all-wrapper" ref="allHeight">
          <div class="all-song van-hairline--bottom">
            <div class="left">全部播放</div>
            <div class="right">{{ songList.length }}集</div>
          </div>
        </div>
        <div class="song-list">
          <div
            class="song-item van-hairline--bottom"
            v-for="(item, index) in songList"
            :key="index"
          >
            <div class="left">{{ index + 1 }}</div>
            <div class="right">
              <div class="top">{{ item.musicTitle }}</div>
              <div class="bottom">{{ item.duration | formatTime }}</div>
            </div>
          </div>
        </div>
        <loading v-show="hasMore" title=""></loading>
      </div>
      <div v-show="!songList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@components/Scroll/Scroll.vue";
import loading from "@components/loading/loading.vue";
import { albumsBrowse } from "@/api/api.index.js";
import { ERR_CODE } from "@/utils/config.js";
export default {
  components: {
    Scroll: Scroll,
    loading: loading
  },
  data() {
    return {
      scrollY: 0,
      hasMore: false,
      beforeScroll: true,
      songList: [],
      pullup: true,
      page: 1,
      count: 20,
      query: {}
    };
  },
  filters: {
    formatTime: seconds => {
      if (!seconds) return "00:00";
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length === 1 ? "0" + m : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length === 1 ? "0" + s : s;
      return m + ":" + s;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.query = this.$route.query;
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.query.front_url})`;
    }
  },
  methods: {
    async init() {
      this.page = 1;
      this.hasMore = true;
      this.songList = [];
      this.$refs.list.scrollTo(0, 0);
      const postData = {
        album_source: this.query.source,
        album_id: this.query.id,
        page: this.page,
        count: this.count,
        album_type: this.query.type,
        information: this.query.information
      };
      let { data } = await albumsBrowse(postData);
      if (data.errcode === ERR_CODE) {
        this.songList = data.data.data;
        this._checkMore(data.data);
      }
    },
    async getSongList() {
      if (!this.hasMore) {
        return;
      }
      this.page = this.page + 1;
      const postData = {
        album_source: this.query.source,
        album_id: this.query.id,
        page: this.page,
        count: this.count,
        album_type: this.query.type,
        information: this.query.information
      };
      let { data } = await albumsBrowse(postData);
      if (data.errcode === ERR_CODE) {
        this.songList = this.songList.concat(data.data.data);
        this._checkMore(data.data);
      }
    },
    _checkMore(data) {
      if (data.data.length <= 0 || data.data.length < this.count) {
        this.hasMore = false;
      }
    },
    refresh() {
      this.$refs.suggest.refresh();
    },
    listScroll() {
      this.$emit("listScroll");
    },
    scroll(pos) {
      this.scrollY = pos.y;
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImageHeight.clientHeight;
    this.allHeight = this.$refs.allHeight.clientHeight;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    this.init();
  },
  watch: {
    scrollY(newVal) {
      // if (newVal === 0) {
      //   return;
      // }
      this.$refs.bgImage.style["transform"] = `translate3d(0,${newVal}px,0)`;
      let height = parseInt(this.imageHeight) + parseInt(newVal);
      if (newVal >= 0) {
        this.$refs.bgImageHeight.style.height = `${height}px`;
        this.$refs.bgImage.style.height = `${height}px`;
        this.$refs.list.$el.style.top = `${this.imageHeight}px`;
        if (this.$refs.layer) {
          this.$refs.bgImage.style["transform"] = `translate3d(0,0,0)`;
          this.$refs.bgImage.style.zIndex = 10;
        }
      } else {
        this.$refs.bgImage.style.zIndex = 0;
        this.$refs.list.$el.style.top = `${this.imageHeight}px`;
        if (this.$refs.bgImage.style.height) {
          this.$refs.list.$el.style.top = this.$refs.bgImage.style.height;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-top {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  // height: 100%;
}
.detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 130;
  overflow-y: hidden;
  background-color: #fff;
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .bg-image {
    width: 100%;
    height: 218px;
    position: relative;
    background-image: url(http://img.ilisten.idaddy.cn/b/7/gd537l54.jpg);
    transform-origin: top;
    background-size: cover;
    .filter {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(7, 17, 27, 0.4);
      transform: none;
    }
    .song-img {
      width: 124px;
      height: 124px;
      z-index: 2;
      position: absolute;
      left: 20px;
      top: 76px;
      border-radius: 15px;
    }
    .song-title {
      width: 198px;
      z-index: 2;
      position: absolute;
      top: 82px;
      right: 20px;
      font-size: 18px;
      line-height: 18px;
      font-family: NotoSansHans-Regular, NotoSansHans;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: left;
    }
  }
  .all-wrapper {
    padding: 0 20px;
    .all-song {
      width: 100%;
      height: 54px;
      border-color: #ccc;
      .left {
        width: 100px;
        float: left;
        margin-top: 10px;
        background: #f2f2f2;
        border-radius: 4px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        color: rgba(44, 104, 255, 1);
      }
      .right {
        float: left;
        line-height: 54px;
        margin-left: 9px;
        font-size: 13px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        color: rgba(142, 142, 146, 1);
      }
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: #fff;
  }

  .all-song {
    width: 100%;
    height: 54px;
    // border-bottom: 1px solid #ccc;
    .left {
      width: 100px;
      float: left;
      margin-top: 10px;
      background: #f2f2f2;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      font-family: NotoSansHans-Regular, NotoSansHans;
      font-weight: 400;
      color: rgba(44, 104, 255, 1);
    }
    .right {
      float: left;
      line-height: 54px;
      margin-left: 9px;
      font-size: 13px;
      font-family: NotoSansHans-Regular, NotoSansHans;
      font-weight: 400;
      color: rgba(142, 142, 146, 1);
    }
  }
  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .song-list {
    padding: 0 20px;
    .song-item {
      padding: 14px 0;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        flex: 0 0 30px;
        width: 30px;
        text-align: center;
        margin-right: 10px;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        color: rgba(105, 105, 108, 1);
      }
      .right {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        text-align: left;
        font-size: 16px;
        .top {
          font-family: NotoSansHans-Regular, NotoSansHans;
          font-weight: 400;
          font-size: 16px;
          color: rgba(20, 23, 39, 1);
          padding-bottom: 8px;
        }
        .bottom {
          font-size: 12px;
          font-family: NotoSansHans-Regular, NotoSansHans;
          font-weight: 400;
          color: rgba(142, 142, 146, 1);
        }
      }
    }
    :last-child {
      border: none;
    }
  }
}
</style>
