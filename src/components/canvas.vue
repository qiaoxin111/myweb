<template>
  <div id="qx-canvas" @click="blurPage">
    <div>
      <component
        v-for="(item, index) in dataList"
        class="qx-component"
        :class="{ active: currentIndex === index }"
        :style="getShapeStyle(item.style, index)"
        :is="item.name"
        :key="index"
        :data-index="index"
        :data="item"
        @click.native="changeCurComp(item, index, $event)"
        @mousedown.native="handleMousedown(item, index, $event)"
      >
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import qxButton from '../components/basic-components/qxButton.vue'
import { mapState } from 'vuex'
import { IComponents } from '@/store'
export default Vue.extend({
  name: 'Home',
  props: ['dataList'],
  components: {
    qxButton,
    draggable,
  },
  data() {
    return {}
  },
  computed: mapState(['currentIndex']),
  updated() {
    // console.log(this.dataList)
  },
  methods: {
    dragstart(evt: Event) {
      console.log('开始')
      console.log(evt)
    },
    dragend(evt: Event) {
      console.log('结束')
      console.log(evt)
    },
    changeCurComp(curComp: IComponents, index: number, evt: Event) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$store.commit('setCurrent', curComp)
      this.$store.commit('setCurrentIndex', index)
    },
    blurPage() {
      this.$store.commit('setCurrentIndex', undefined)
    },
    getShapeStyle(
      style: IComponents['style'],
      index: number,
    ): IComponents['style'] {
      let curStyle = Object.assign({}, style)
      if (curStyle.width) {
        curStyle.width = curStyle.width + 'px'
      }
      if (curStyle.height) {
        curStyle.height = curStyle.height + 'px'
      }
      if (curStyle.left) {
        curStyle.left = curStyle.left + 'px'
      }
      if (curStyle.top) {
        curStyle.top = curStyle.top + 'px'
      }
      if (curStyle.fontSize) {
        curStyle.fontSize = curStyle.fontSize + 'px'
      }
      if (curStyle.borderWidth) {
        curStyle.borderWidth = curStyle.borderWidth + 'px'
      }
      if (curStyle.borderRadius) {
        curStyle.borderRadius = curStyle.borderRadius + 'px'
      }

      curStyle.zIndex = index
      return curStyle
    },
    handleMousedown(component: IComponents, index: number, evt: Event) {
      // evt.preventDefault()
      evt.stopPropagation()
      const context = this
      const mouseStartX = evt.offsetX
      const mouseStartY = evt.offsetY
      const canvasbox = document.getElementById('qx-canvas')
      const boxRect = canvasbox.getBoundingClientRect()
      const move = function (evt: Event) {
        const offsetX = evt.clientX - boxRect.left - mouseStartX
        const offsetY = evt.clientY - boxRect.top - mouseStartY
        context.getShapeStyle(
          {
            ...component.style,
            left: offsetX,
            top: offsetY,
          },
          index,
        )
        context.$store.commit('changeComponent', {
          index,
          component: {
            ...component,
            style: {
              ...component.style,
              left: offsetX,
              top: offsetY,
            },
          },
        })
      }
      const up = function () {
        console.log('鼠标抬起')

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
  },
})
</script>
<style scoped lang="less">
#qx-canvas {
  position: relative;
  width: 375px;
  height: 700px;
  border: 1px solid #888;
  .qx-component {
    position: absolute;
    &.active {
      outline: 1px solid red;
    }
  }
}
</style>
