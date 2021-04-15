<template>
  <div class="qx-button">
    <el-button v-cloak>{{data.propValue}}</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "qx-button",
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  components: {
  },
});
</script>
<style scoped lang="less">

</style>
