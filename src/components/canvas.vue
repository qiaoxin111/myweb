<template>
  <div class="qx-canvas">
    中间位置
    <component :is='qxButton'></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
  },
  data: ()=>{
    return {
    }
  },
 
});
</script>
<style scoped lang='less'>
.qx-canvas{
  width: 375px;
  height: 700px;
  border: 1px solid #888;
}
</style>
