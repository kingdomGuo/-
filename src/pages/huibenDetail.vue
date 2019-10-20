<template>
  <div class="huibenDetail-wrapper">
    <audio
      ref="audio"
      style="display:none"
      :src="songUrl"
      @play="ready"
      @error="error"
      @ended="end"
    ></audio>
    <scroll ref="suggest" class="child-content" :data="content.picBookList">
      <div>
        <div class="intruduce-wrapper">
          <div class="pawsesssssyy-img img-left" v-if="isPlaying">
            <img
              src="../assets/btn_pause2_child@2x.png"
              alt=""
              @click.prevent.stop="playbar"
            />
          </div>
          <div
            class="play-img img-left"
            v-if="!isPlaying"
            @click.prevent="playbar"
          >
            <img src="../assets//btn_play2_child@2x.png" alt="" />
          </div>
          <div class="img-left img-right" @click="showBtn">
            <img src="../assets//btn_full_screen_child@2x.png" alt="" />
          </div>
          <div class="img-left text-img">
            {{ bookIndex }}/{{ content.picBookList.length }}
          </div>
          <div class="img-first">
            <van-swipe
              :height="swiperHeigt"
              :show-indicators="showIndicators"
              @change="changeSwiper"
            >
              <van-swipe-item
                ><img
                  :src="content.imageUrl"
                  class="previewer-demo-img"
                  style="width:auto;height:100%;"
              /></van-swipe-item>
              <van-swipe-item
                class="swiper-demo-img"
                v-for="(item, index) in picBookList"
                :key="index"
              >
                <img
                  class="previewer-demo-img"
                  :src="item.imageUrl"
                  style="width:auto;height:100%;"
                />
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <div class="huiben-content">
          <div class="intruduce-content">
            <div class="ablum-huiben">
              <img :src="content.imageUrl" @click.stop />
            </div>
            <div class="basic-content">
              <div class="title">{{ content.picBookName }}</div>
              <div class="author">{{ content.author }}</div>
              <span class="tag">
                {{ content.typeName }}
              </span>
            </div>
          </div>
          <div class="chart-title">
            推荐理由
          </div>
          <div class="reason-text">
            {{ content.recommendReason }}
          </div>
          <div class="chart-title">
            <div class="line-text">
              内容介绍
            </div>
          </div>
          <div class="reason-text">
            {{ content.description }}
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { aiGetMiniProgramBookInfo } from "@/api/api.index.js";
import Scroll from "@components/Scroll/Scroll.vue";
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    Scroll: Scroll,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      content: { picBookList: [] },
      picBookList: [],
      firstPlay: false,
      swiperHeigt: 246,
      showIndicators: false,
      songReady: false,
      firstLoad: true,
      bookIndex: 1,
      playIndex: 0,
      songUrl: "",
      isPlaying: false,
      query: {}
    };
  },
  methods: {
    changeSwiper(index) {
      this.playIndex = index;
      if (this.firstLoad && index === 1) {
        this.firstLoad = false;
        this.bookIndex = 2;
      }
      if (!this.firstLoad) {
        this.bookIndex = index + 1;
      }
      this.bookIndex = index + 1;
      if (this.firstPlay) {
        this.$refs.audio.pause();
        this.play();
      }
    },
    pause() {
      this.isPlaying = false;
      this.$refs.audio.pause();
    },
    showBtn() {
      // this.$refs.previewer.show(this.playIndex);
    },
    play() {
      this.isPlaying = true;
      this.songUrl = this.content.picBookList[this.playIndex].audioUrl;
      clearTimeout();
      setTimeout(() => {
        this.$refs.audio.play();
      }, 100);
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    end() {
      this.$refs.audio.currentTime = 0;
      this.pause();
    },
    playbar() {
      this.firstPlay = !this.firstPlay;
      this.isPlaying ? this.pause() : this.play();
      return false;
    },
    // 绘本详情接口
    _aiGetMiniProgramBookInfo() {
      aiGetMiniProgramBookInfo({
        picBookId: this.query.picBookId,
        recommendId: this.query.recommendId
      }).then(res => {
        this.content = res.data.content;
        let picBookList = JSON.parse(
          JSON.stringify(res.data.content.picBookList)
        );
        for (let i of this.content.picBookList) {
          i.msrc = i.imageUrl;
          i.src = i.imageUrl;
          i.w = 1200;
          i.h = 900;
        }
        this.picBookList = picBookList.splice(1);
      });
    }
  },
  created() {
    this.query = this.$route.query;
    this._aiGetMiniProgramBookInfo();
  }
};
</script>

<style lang="scss" scoped>
.huibenDetail-wrapper {
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
  .child-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    .intruduce-wrapper {
      width: 100%;
      background: rgba(247, 247, 247, 0.6);
      text-align: center;
      position: relative;
      overflow: visible;
      height: 246px;
      .img-left {
        position: absolute;
        left: 15px;
        bottom: 10px;
        width: 38px;
        height: 38px;
        z-index: 200;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img-right {
        left: auto;
        right: 15px;
        bottom: 10px;
      }
      .text-img {
        width: 60px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: white;
        line-height: 20px;
        left: 50%;
        bottom: 16px;
        margin-left: -30px;
        z-index: 200;
      }
      .img-first {
        width: 100%;
        height: 246px;
        overflow: visible;
      }
    }
    .huiben-content {
      background: white;
      padding-bottom: 80px;
      .intruduce-content {
        padding-top: 26px;
        text-align: left;
        display: flex;
        .ablum-huiben {
          width: 58px;
          height: 66px;
          display: inline-block;
          flex: 0 0 58px;
          margin-left: 19px;
          margin-right: 14px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .basic-content {
          flex: 1;
          display: inline-block;
          height: 66px;
          line-height: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .title {
            height: 25px;
            font-size: 18px;
            color: #141727;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .author {
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #8e8e92;
            line-height: 17px;
            margin-bottom: 4px;
          }
          .tag {
            padding: 0 10px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            font-weight: 400;
            display: inline-block;
            color: white;
            background: #eb5f58;
            border-radius: 14px;
          }
        }
      }
      .chart-title {
        margin-top: 30px;
        padding-left: 20px;
        line-height: 21px;
        text-align: left;
        height: 21px;
        font-size: 15px;
        color: #46464a;
      }
      .reason-text {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #8e8e92;
        line-height: 22px;
        text-align: left;
        text-indent: 2em;
        padding: 0 20px;
      }
    }
  }
}
</style>
