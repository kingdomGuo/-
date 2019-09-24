<template>
  <div id="app">
    <tab-bar v-if="currentPath !== '/login'"></tab-bar>
    <router-view />
  </div>
</template>
<script>
import TabBar from "@components/TabBar/TabBar.vue";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      currentPath: ""
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tabBar-wrapper .van-tab .van-ellipsis {
  display: inline-block !important;
  line-height: 44px !important;
}
.ucIndex-wrapper .van-tab span {
  display: inline-block !important;
}
</style>
