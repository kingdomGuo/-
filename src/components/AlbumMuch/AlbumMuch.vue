<template>
  <div class="album-list van-clearfix" v-if="albumData && albumData.length > 0">
    <div
      class="album-item van-clearfix"
      v-for="(item, index) in albumData"
      :key="index"
      @click="clickAlbum(item)"
    >
      <div class="album-padding">
        <div class="top-img">
          <img fit="cover" v-lazy="item.front_url" />
        </div>
        <div class="bottom-title">{{ item.name }}</div>
        <div class="bottom-introduce">{{ moduleTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    albumData: {
      type: Array,
      default: () => []
    },
    moduleTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      key: "value"
    };
  },
  mounted() {
    console.log(this.albumData);
  },
  methods: {
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
</style>
