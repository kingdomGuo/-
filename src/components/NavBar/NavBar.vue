<template>
  <div class="nav-wrapper">
    <div class="nav-item" v-for="(item, index) in data" :key="index">
      {{ item.mouldName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      key: "value"
    };
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .nav-item {
    // flex: 1;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    margin: 0 5px;
    width: 76px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: NotoSansHans-Regular, NotoSansHans;
    font-weight: 400;
    background: #f4f4f4;
    margin-bottom: 15px;
    color: rgba(70, 70, 74, 1);
    border-radius: 14px;
  }
}
</style>
