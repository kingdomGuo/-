<template>
  <div class="loading">
    <!-- <img width="24" height="24" src="./loading.gif"/> -->
    <van-loading size="24px" type="spinner" />
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
import { Loading } from 'vant'
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  },
  components:{
    [Loading.name]: Loading,
  }
}
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 24px;
    font-size: 14px;
    color: #969799;
  }
}
</style>
