<template>
  <div class="qx-markLine">
    <div v-for="(line, index) in lines" :key="index">
      <span class="lineContent" :class="lineTyle(line)"> </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  data() {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'],
    }
  },
  computed: mapState(['canvasList', 'currentIndex', 'currentComponent']),
  methods: {
    lineTyle(lineName: string): string {
      return lineName.indexOf('x') !== -1 ? 'xLine' : 'yLine'
    },
  },
})
</script>

<style scoped lang="less">
.qx-markLine {
  width: 100%;
  height: 100%;
  .lineContent {
    width: 100%;
    height: 100%;
    display: inline-block;
    background: #1597db;
    background: #1597db;
  }
  .xLine {
    width: 100%;
    height: 1px;
  }
  .yLine {
    height: 100%;
    width: 1px;
  }
}
</style>
