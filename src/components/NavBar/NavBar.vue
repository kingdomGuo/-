<template>
  <div class="nav-wrapper" v-if="type != '绘本'">
    <div
      class="nav-item"
      :class="{ activeWisth: !moreData }"
      v-for="(item, index) in navData"
      :key="index"
      @click="clickItem(item)"
    >
      {{ item.mouldName }}
    </div>
    <div
      class="nav-item"
      :class="{ activeWisth: !moreData }"
      v-if="moreData"
      @click="clickAll"
    >
      全部
    </div>
  </div>
  <div v-else class="nav-wrapper">
    <div
      class="nav-item"
      :class="{ activeWisth: !moreData }"
      v-for="(item, index) in navData"
      :key="index"
      @click="clickItem(item)"
    >
      {{ item.themeValue }}
    </div>
    <div
      class="nav-item"
      :class="{ activeWisth: !moreData }"
      v-if="moreData"
      @click="clickAll"
    >
      全部
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "歌单"
    },
    moreData: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    navData() {
      let data = [];
      if (this.moreData && this.data.length >= 4) {
        for (let i = 0; i < 3; i++) {
          data.push(this.data[i]);
        }
      } else {
        data = this.data;
      }
      return data;
    }
  },
  data() {
    return {
      key: "value"
    };
  },
  methods: {
    clickItem(item) {
      this.$emit("clickItem", item);
    },
    clickAll() {
      this.$emit("clickAll");
    }
  }
};
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
  .activeWisth {
    width: 105px;
  }
}
</style>
