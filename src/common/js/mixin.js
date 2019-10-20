import { ERR_CODE } from "@/utils/config.js";
import { batchIndexList } from "@/api/api.index.js";
import NavBar from "@components/NavBar/NavBar.vue";

export const navlistMixin = {
  data() {
    return {
      otherALlData: []
    };
  },
  components: {
    NavBar: NavBar
  },
  methods: {
    // 获取不同类型的专辑list
    async getBatchIndexList() {
      let { data } = await batchIndexList({ page: 1, count: 60 });
      if (data.errcode === ERR_CODE) {
        this.otherALlData = data.data;
      }
    }
  },
  mounted() {
    this.getBatchIndexList();
  }
};
