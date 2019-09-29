<template>
  <div class="child-muchAlbul">
    <div
      class="muchAlbum-wrapper muchAlbum-content"
      :style="{ height: contentHeight }"
    >
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :loading-text="loadText"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="我是有底线的"
          @load="onLoad"
        >
          <album-much
            :albumData="albumList"
            :moduleTitle="query.moduleTitle"
          ></album-much>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Icon, PullRefresh, List } from "vant";
import { ERR_CODE } from "@/utils/config.js";
import AlbumMuch from "@components/AlbumMuch/AlbumMuch";
// import Scroll from "@components/Scroll/Scroll.vue";
import { albumsListAllDetail } from "@/api/api.index.js";
export default {
  components: {
    [Icon.name]: Icon,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    AlbumMuch: AlbumMuch
    // Scroll: Scroll
  },
  data() {
    return {
      key: "value",
      isLoading: false,
      page: 1,
      count: 10,
      totalPage: 0,
      query: {},
      total: 0,
      contentHeight: 0,
      loading: false,
      loadText: "加载中...",
      albumList: [],
      finished: false
    };
  },
  created() {
    // this.query = this.$route.query;
  },
  activated() {
    this.page = 1;
    this.totalPage = 0;
    this.query = this.$route.query;
    this.albumList = [];
    this.isLoading = false;
    this.finished = false;
    this.loading = true;
    let winHeight = document.documentElement.clientHeight; //视口大小
    document.querySelector(".child-muchAlbul .muchAlbum-content").style.height =
      winHeight + "px"; //调整上拉加载框高度
    this.contentHeight = winHeight + "px";
    this.getAlbumList();
  },
  methods: {
    onLoad() {
      this.page++;
      this.loading = true;
      this.getAlbumList();
    },
    // 上拉加载
    onRefresh() {
      setTimeout(() => {
        this.loading = false;
        this.isLoading = false;
      }, 500);
    },
    async getAlbumList() {
      const postData = {
        page: this.page,
        count: this.count,
        module_id: this.$route.query.moduleId
      };
      let { data } = await albumsListAllDetail(postData);
      if (data.errcode === ERR_CODE) {
        this.totalPage = data.data.total_page;
        this.loading = false;
        this.isLoading = false; //关闭下拉刷新效果
        this.albumList = this.albumList.concat(data.data.data);
        if (data.data.data == null || data.data.data.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        if (data.data.data.length < this.count) {
          // 最后一页不足count条的情况
          this.finished = true;
        }
        if (this.page >= this.totalPage) {
          this.finished = true;
        }
      } else {
        this.finished = false;
      }
    },
    clickMuch(item) {
      this.$emit("clickMuch", item);
    },
    clickAlbum(item) {
      this.$emit("clickAlbum", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.child-muchAlbul {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow-y: scroll;
  background-color: #fff;
  .child-content {
    position: relative;
    width: 100%;
    height: 100%;
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
        padding-right: 3px;
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
