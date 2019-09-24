<template>
  <div align="center">
    <img src="../assets/img_loading@3x.png" class="img" />

    <div class="buttons">
      <button
        v-if="iOS || (!android && !iOS)"
        class="button-ios"
        type="primary"
        @click="installiOSApp"
      >
        <img
          src="../assets/ico_ios@3x.png"
          height="24"
          width="24"
          slot="icon"
          class="mid-img"
        />
        iOS版下载
      </button>

      <button
        v-if="android || (!android && !iOS)"
        class="button-android"
        type="primary"
        @click="installAndroidApp"
      >
        <img
          src="../assets/ico_android@3x.png"
          height="24"
          width="24"
          slot="icon"
          class="mid-img"
        />
        安卓版下载
      </button>
    </div>

    <div
      id="shadowPicture"
      v-show="blockPic"
      @click="blockPic = false"
      class="prompt_open_in_browser"
    >
      <img src="../assets/bg_black.png" style="width:100%; height:100%;" />
      <img src="../assets/bg_arrow@3x.png" class="prompt_open_in_browser_img" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockPic: false,
      iOSAppUrl:
        "https://apps.apple.com/cn/app/%E6%99%93%E5%90%AC/id1467150461",
      androidAppUrl:
        "http://sma-resource.duiopen.com/app/xiaoting/product-latest.apk",
      weiXin: false,
      qq: false,
      android: false,
      iOS: false
    };
  },
  computed: {},

  created() {
    this.weiXin = this.isWeiXin();
    this.qq = this.isQQ();
    this.android = this.isAndroid();
    this.iOS = this.isiOS();
    console.log("android " + this.android + " iOS " + this.iOS);
    console.log("isWeiXin " + this.weiXin + " qq " + this.qq);
  },
  beforeMount() {
    document.title = "晓听+";
  },
  methods: {
    installAndroidApp() {
      if (this.weiXin || this.qq) {
        this.blockPic = true;
      } else {
        window.location.href = this.androidAppUrl;
      }
    },
    installiOSApp() {
      if (this.weiXin || this.qq) {
        this.blockPic = true;
      } else {
        window.location.href = this.iOSAppUrl;
      }
    },

    isWeiXin() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    isQQ() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/QQ\/[0-9]/i)) {
        return true;
      } else {
        return false;
      }
    },
    isAndroid() {
      var u = window.navigator.userAgent;
      return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    },
    isiOS() {
      var u = window.navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  width: 50%;
  height: auto;
  margin-top: 60px;
}

.buttons {
  width: 68%;
  margin: 100px 16% 0 16%;
  outline: 0;
}

.button-ios {
  width: 100%;
  height: 44px;
  line-height: 44px;
  margin: 20px 0 0 0;
  border-radius: 6px;
  align-items: center;
  background: rgba(44, 104, 255, 1);
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
  position: relative;
  text-align: center;
  border: 0;
  box-sizing: border-box;
  font-size: 16px;
}

.button-android {
  width: 100%;
  height: 44px;
  line-height: 44px;
  margin: 20px 0 0 0;
  border-radius: 6px;
  align-items: center;
  vertical-align: center;
  background: rgba(240, 240, 244, 1);
  color: rgba(44, 104, 255, 1);
  overflow: hidden;
  position: relative;
  text-align: center;
  border: 0;
  box-sizing: border-box;
  font-size: 16px;
}

.prompt_open_in_browser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.prompt_open_in_browser_img {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 54px;
  margin-right: 25px;
}
.mid-img {
  margin-bottom: 7.5px;
  line-height: 0;
  vertical-align: middle;
}
</style>
