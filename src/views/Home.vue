<template>
  <div class="home">
    <header class="header">header</header>
    <div class="main">
      <section class="left">
        <div class="components-list">
          <component
            style="width: 100px"
            v-for="(item, index) in list"
            :is="item.name"
            :key="index"
            :data-key="item.id"
            :data="item"
            draggable="true"
            @dragstart.native="dragstartHandler"
          ></component>
        </div>
      </section>
      <section class="center">
        <div class="content" @drop="dropHandler" @dragover="dragoverHandler">
          <qxCanvas :dataList="canvasList"></qxCanvas>
        </div>
      </section>
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <qxAttrList
              v-if="currentIndex !== undefined"
              :attrCur="currentComponent"
            ></qxAttrList>
            <div v-else>请选择组件</div>
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation">
            <div v-if="currentIndex !== undefined">动画</div>
            <div v-else>请选择组件</div>
          </el-tab-pane>
          <el-tab-pane label="事件" name="event">
            <div v-if="currentIndex !== undefined">事件</div>
            <div v-else>请选择组件</div>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import List from '../components/basic-components/components-list'
import qxButton from '../components/basic-components/qxButton.vue'
import qxCanvas from '../components/canvas.vue'
import qxAttrList from '../components/attrList.vue'
import Vue from 'vue'
import { mapState } from 'vuex'
import { IComponents } from '@/store'

export default Vue.extend({
  name: 'Home',
  components: {
    qxButton,
    qxCanvas,
    qxAttrList,
  },
  data: () => {
    return {
      list: [],
      activeName: 'attr',
    } as {
      list: IComponents[]
      activeName: string
    }
  },
  created() {
    this.list = List
  },
  updated() {
    // console.log(this.currentIndex)
  },
  computed: mapState(['canvasList', 'currentIndex', 'currentComponent']),
  methods: {
    dragstartHandler(evt: DragEvent) {
      console.log('开始拖拽')
      evt.dataTransfer?.setData('text/plain', (evt.target as any)?.dataset.key)
    },
    dragoverHandler(evt: DragEvent) {
      evt.preventDefault()
      evt.stopPropagation()
      if (!evt.dataTransfer) return
      //copy属性，拖拽时鼠标样式不同，会有个加号
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // console.log('拖拽', evt.offsetX, evt.offsetY, evt.layerX, evt.layerY, evt)

      evt.dataTransfer!.dropEffect = 'copy'
    },
    dropHandler(evt: DragEvent) {
      evt.preventDefault()
      evt.stopPropagation()
      const data = evt.dataTransfer?.getData('text/plain')
      if (!data) return
      const cloneDdata = JSON.parse(JSON.stringify(this.list[Number(data)]))
      if (!evt.currentTarget) return
      const rect = evt.currentTarget?.getBoundingClientRect()
      const offsetX = evt.clientX - rect.left
      const offsetY = evt.clientY - rect.top
      console.log('rect', offsetX, offsetY, rect)
      cloneDdata.style.left = offsetX
      cloneDdata.style.top = offsetY

      this.$store.commit('addCanvasList', cloneDdata)
      console.log('拖拽结束', data, offsetX, offsetY)
    },
  },
})
</script>
<style scoped lang="less">
.home {
  .header {
    width: 100%;
    height: 10vh;
    text-align: center;
    border-bottom: 1px solid #888;
  }
  .main {
    display: flex;
    height: 88vh;
    .left,
    .right {
      width: 25%;
      height: 100%;
      .components-list {
        display: flex;
      }
      /deep/ .el-tabs {
        height: 100%;
        .el-tabs__nav-scroll {
          padding-left: 20px;
        }
        .el-tabs__content {
          height: ~'calc(100% - 45px)';
          overflow-y: scroll;
        }
      }
    }
    .center {
      width: 50%;
      display: flex;
      justify-content: center;
      .content {
        position: relative;
        border: 1px solid red;
        // width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
