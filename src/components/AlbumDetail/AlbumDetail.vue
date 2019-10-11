<template>
  <!-- <transition name="slide"> -->
  <div :class="['child-muchAlbul']" @touchmove.prevent>
    <scroll
      ref="suggest"
      class="child-content"
      :data="albumList"
      :pullup="pullup"
      :beforeScroll="beforeScroll"
      @scrollToEnd="getAlbumList"
      @beforeScroll="listScroll"
    >
      <div class="muchAlbum-wrapper muchAlbum-content">
        <div style="height:24px;"></div>
        <album-much
          :albumData="albumList"
          :moduleTitle="query.moduleTitle"
        ></album-much>
        <loading v-show="hasMore" title=""></loading>
      </div>
    </scroll>
  </div>
  <!-- </transition> -->
</template>

<script>
import { ERR_CODE } from "@/utils/config.js";
import AlbumMuch from "@components/AlbumMuch/AlbumMuch";
import Scroll from "@components/Scroll/Scroll.vue";
import { albumsListAllDetail } from "@/api/api.index.js";
import loading from "@components/loading/loading.vue";
export default {
  components: {
    AlbumMuch: AlbumMuch,
    Scroll: Scroll,
    loading: loading
  },
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      key: "value",
      pullup: true,
      contentHeight: 0,
      beforeScroll: true,
      hasMore: true,
      albumList: [],
      page: 1,
      totalPage: 0,
      count: 10
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    _checkMore(data) {
      if (this.page >= data.total_page || data.data.length < this.count) {
        this.hasMore = false;
      }
    },
    async init() {
      this.page = 1;
      this.hasMore = true;
      this.albumList = [];
      const postData = {
        page: this.page,
        count: this.count,
        module_id: this.query.moduleId
      };
      let { data } = await albumsListAllDetail(postData);
      if (data.errcode === ERR_CODE) {
        this.totalPage = data.data.total_page;
        this.albumList = data.data.data;
        this.$refs.suggest.scrollTo(0, 0);
        this._checkMore(data.data);
      }
    },
    listScroll() {
      this.$emit("listScroll");
    },
    async getAlbumList() {
      if (!this.hasMore) {
        return;
      }
      this.page = this.page + 1;
      const postData = {
        page: this.page,
        count: this.count,
        module_id: this.query.moduleId
      };
      let { data } = await albumsListAllDetail(postData);
      if (data.errcode === ERR_CODE) {
        this.totalPage = data.data.total_page;
        this.albumList = this.albumList.concat(data.data.data);
        this._checkMore(data.data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.child-muchAlbul {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 120;
  overflow-y: hidden;
  background-color: #fff;
  .child-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }
}
.muchAlbum-wrapper {
  padding: 0 14.5px;
  .album-list {
    text-align: left;
    width: 100%;
    margin-top: 24px;
    .album-item {
      float: left;
      width: 50%;
      margin-bottom: 26px;
      .album-padding {
        padding: 0 5.5px;
        .top-img {
          line-height: 0;
          width: 100%;
          height: 162px;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 10px;
          }
        }
      }
      .bottom-title {
        text-align: left;
        font-size: 14px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        height: 14px;
        color: rgba(70, 70, 74, 1);
        line-height: 14px;
        margin-top: 12px;
        display: -webkit-box;
        display: box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .bottom-introduce {
        line-height: 12px;
        height: 12px;
        font-size: 12px;
        margin-top: 6px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        color: rgba(142, 142, 146, 1);
        display: -webkit-box;
        display: box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
