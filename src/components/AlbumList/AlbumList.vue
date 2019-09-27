<template>
  <div class="albulmlist-wrapper" v-if="albumData">
    <div class="album-title">
      <div class="left">{{ albumData.mouldName }}</div>
      <div class="right" @click="clickMuch(albumData)">
        更多 <van-icon name="arrow" size="12" />
      </div>
    </div>
    <div class="album-list" v-if="albumData && albumData.data.length > 0">
      <div
        class="album-item"
        v-for="item in albumData.data"
        :key="item.id"
        @click="clickAlbum(item)"
      >
        <div class="album-padding">
          <div class="top-img">
            <img fit="cover" v-lazy="item.front_url" />
          </div>
          <div class="bottom-title">{{ item.name }}</div>
          <!-- <div class="bottom-introduce"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Image } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image
  },
  props: {
    albumData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      key: "value"
    };
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
.albulmlist-wrapper {
  .album-title {
    margin-bottom: 17px;
    padding-top: 17px;
    height: 18px;
    font-size: 18px;
    font-family: NotoSansHans-Medium, NotoSansHans;
    font-weight: 500;
    color: rgba(20, 23, 39, 1);
    line-height: 18px;
    .left {
      float: left;
      margin-left: 5px;
      line-height: 18px;
    }
    .right {
      float: right;
      margin-right: 5px;
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      color: rgba(142, 142, 146, 1);
      height: 18px;
    }
  }
  .album-list {
    text-align: left;
    width: 100%;
    .album-item {
      float: left;
      width: 33.33333333%;
      margin-bottom: 29px;
      .album-padding {
        padding: 0 5px;
        .top-img {
          line-height: 0;
          width: 100%;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .bottom-title {
        text-align: left;
        font-size: 13px;
        font-family: NotoSansHans-Regular, NotoSansHans;
        font-weight: 400;
        padding-right: 3px;
        height: 38px;
        color: rgba(70, 70, 74, 1);
        line-height: 20px;
        margin-top: 8px;
        display: -webkit-box;
        display: box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
