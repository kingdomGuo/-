<template>
  <div class="detail-wrapper">
    <div class="bg-image" ref="bgImage">
      <div class="filter"></div>
      <img
        class="song-img"
        src="https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000"
      />
      <div class="song-title">拇指姑娘（卉卉阿姨）</div>
    </div>
    <div class="song-wrapper">
      <div class="all-song">
        <div class="left">全部播放</div>
        <div class="right">32首</div>
      </div>
      <div class="song-list">
        <div class="song-item" v-for="index in 10" :key="index">
          <div class="left">{{ index }}</div>
          <div class="right">
            <div class="top">城南花已开</div>
            <div class="bottom">三亩地>城南花已开</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
  .bg-image {
    width: 100%;
    height: 218px;
    position: relative;
    background-image: url(https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000);
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
  .song-wrapper {
    padding: 0 20px;
    .all-song {
      width: 100%;
      height: 54px;
      border-bottom: 1px solid #ccc;
      .left {
        width: 100px;
        float: left;
        margin-top: 10px;
        background: #ccc;
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
    .song-list {
      .song-item {
        padding: 14px 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          flex: 0 0 30px;
          width: 30px;
          text-align: left;
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
}
</style>
