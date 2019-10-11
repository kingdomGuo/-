<template>
  <div class="child-muchAlbul">
    <album-detail :query="query"></album-detail>
  </div>
</template>

<script>
import AlbumDetail from "@components/AlbumDetail/AlbumDetail";
export default {
  components: {
    AlbumDetail: AlbumDetail
  },
  data() {
    return {
      query: {}
    };
  },
  created() {
    this.query = this.$route.query;
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
  z-index: 120;
  overflow-y: hidden;
  background-color: #fff;
}
</style>
