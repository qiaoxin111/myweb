<template>
  <div class="home">
    <section class="left">
      <div class="components-list" @dragstart="handleDragStart">
        <qxButton draggable='true' :data='list[0]'></qxButton>
        <div class="haha" @drop="handleDrop" style='width: 100px; height: 100px; background: red'></div>
      </div>
    </section>
    <section class="center">
      <div class="content" @drop="handleDrop">
        <qxCanvas ></qxCanvas>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import List  from '../components/basic-components/components-list'
import qxButton from '../components/basic-components/qxButton'
import qxCanvas from '../components/canvas'
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    qxButton,
    qxCanvas
  },
  data: ()=>{
    return {
      list:[]
    }
  },
  created(){
    this.list = List
  },
  methods:{
    handleDragStart(e: any) {
      console.log('拖拽信息',e.target, e.target.dataset.index, e.dataTransfer)
      e.dataTransfer.setData('index', e.target.dataset.index)
    },
    handleDrop(e){
      console.log('drop事件', e)
    }
  }
});
</script>
<style scoped lang='less'>
.home{
  display: flex;
  .left, .right{
    width: 20%;
  }
  .center{
    width: 60%;
    display: flex;
    justify-content: center;
    .content{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
