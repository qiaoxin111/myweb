<template>
  <el-button class="qx-button">{{ data.propValue }}</el-button>
</template>

<script lang="ts">
import { IButton } from '@/store'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'qx-button',
  props: {
    data: {
      type: Object as PropType<IButton>,
      required: true,
    },
  },

  data: function () {
    return {} as IButton
  },
})
</script>
<style scoped lang="less">
/deep/ .el-button {
  padding: 0px;
}
</style>
