<template>
  <div>
    <div class="albulmlist-wrapper" v-if="albumData && type != '绘本'">
      <div class="album-title">
        <div class="left">
          {{ albumData.mouldName }}
          <div></div>
        </div>
        <div class="right" @click="clickMuch(albumData)">
          更多 <van-icon name="arrow" size="12" />
        </div>
      </div>
      <div class="album-list" v-if="albumData">
        <div
          class="album-item"
          v-for="item in albumData.data"
          :key="item.id"
          @click="clickAlbum(item, albumData)"
        >
          <div class="album-padding">
            <div class="top-img">
              <img fit="cover" v-lazy="item.front_url" />
            </div>
            <div class="bottom-title">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="albulmlist-wrapper" v-if="albumData && type == '绘本'">
      <div class="album-title">
        <div class="left">
          {{ albumData.themeValue }}
          <div></div>
        </div>
        <div class="right" @click="clickMuch(albumData)">
          更多 <van-icon name="arrow" size="12" />
        </div>
      </div>
      <div class="album-list" v-if="albumData">
        <div
          class="album-item"
          v-for="item in albumData.recommendBooksList"
          :key="item.id"
          @click="clickAlbum(item, albumData)"
        >
          <div class="album-padding">
            <div class="top-img huiben-img">
              <img fit="cover" v-lazy="item.imageUrl" />
            </div>
            <div class="bottom-title">{{ item.picBookName }}</div>
          </div>
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
    },
    type: {
      type: String,
      default: "歌单"
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
    clickAlbum(item, albumData) {
      this.$emit("clickAlbum", item, albumData);
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
      padding: 0 10px;
      position: relative;
      div {
        position: absolute;
        bottom: -2.5px;
        width: 100%;
        height: 8px;
        background: #eb5f58;
        border-radius: 5px;
        opacity: 0.6;
        left: 0px;
      }
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
            border-radius: 6px !important;
            min-height: 105px !important;
            max-width: 105px !important;
            max-height: 105px !important;
            display: block;
          }
        }
        .huiben-img {
          img {
            object-fit: cover;
            width: 100%;
            border-radius: 6px !important;
            min-height: 141px !important;
            max-width: 105px !important;
            max-height: 141px !important;
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
