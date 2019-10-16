<template>
  <div class="search-wrapper">
    <div class="search-bar">
      <van-search
        v-model="value"
        placeholder="歌曲/歌手/专辑/有声音频"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="search-list">
      <div class="search-history">
        <div class="left">历史搜索</div>
        <div class="right">清除</div>
      </div>
      <div class="search-item" v-for="index in 10" :key="index">
        周接口周r1d
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    onSearch() {}
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
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
  .search-bar {
    height: 46px;
    width: 100%;
    background: #eb5f58;
  }
  .search-list {
    padding: 0 20px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .search-history {
      margin-bottom: 17px;
      font-size: 15px;
      font-family: NotoSansHans-Regular, NotoSansHans;
      font-weight: 400;
      line-height: 15px;
      height: 15px;
      margin-top: 17px;
      color: rgba(20, 23, 39, 1);
      .left {
        float: left;
        font-weight: 550;
      }
      .right {
        float: right;
      }
    }
    .search-item {
      float: left;
      margin-right: 10px;
      margin-bottom: 15px;
      font-size: 13px;
      font-family: NotoSansHans-Regular, NotoSansHans;
      font-weight: 400;
      color: rgba(70, 70, 74, 1);
      height: 30px;
      line-height: 30px;
      background: rgba(244, 244, 247, 1);
      padding: 0 12px;
      border-radius: 18px;
    }
  }
}
</style>
