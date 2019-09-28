<template>
  <div class="child-muchAlbul">
    <div class="muchAlbum-wrapper" v-if="albumData">
      <!-- <div class="album-list" v-if="albumData && albumData.data.length > 0">
        <div
          class="album-item"
          v-for="(item, index) in albumData.data"
          :key="index"
          @click="clickAlbum(item)"
        >
          <div class="album-padding">
            <div class="top-img">
              <img fit="cover" v-lazy="item.front_url" />
            </div>
            <div class="bottom-title">{{ item.name }}</div>
            <div class="bottom-introduce">贝瓦儿歌</div>
          </div>
        </div>
      </div> -->
      <album-much :albumData="albumData"></album-much>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import AlbumMuch from "@components/AlbumMuch/AlbumMuch";
export default {
  components: {
    [Icon.name]: Icon,
    AlbumMuch: AlbumMuch
  },
  props: {
    albumData: {
      type: Object,
      default: () => {
        return {
          albumType: "8",
          id: "84",
          data: [
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/4/kfizoizs.jpg",
              id: "ADYGP1A0DTE",
              name: "一千零一夜1",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/5/69hjkmql.jpg",
              id: "ADYGP1A0DTA",
              name: "一千零一夜2",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/7/5vjm6m1r.jpg",
              id: "ADYGP1A0DTI",
              name: "少儿版西游记（上）",
              source: "breeze",
              type: "breeze"
            },
            {
              author: null,
              description: "",
              duration: 0,
              front_url: "http://img.ilisten.idaddy.cn/b/8/lwbb0upy.jpg",
              id: "ADYGMFA9DT0",
              name: "成语故事-第1季",
              source: "breeze",
              type: "breeze"
            }
          ],
          mouldName: "口袋故事",
          mouldType: "专辑"
        };
      }
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
.child-muchAlbul {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow-y: scroll;
  background-color: #fff;
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
