<template>
  <div id="qx-canvas" @click="blurPage">
    <div>
      <div v-for="(item, index) in dataList" :key="index">
        <div
          class="qx-component"
          :class="{ active: currentIndex === index }"
          :data-index="index"
          :style="getBoxShapeStyle(item.style, index)"
        >
          <div class="pointList" v-show="currentIndex === index">
            <span
              class="point"
              v-for="(point, i) in pointList"
              :key="i"
              :style="getPointStyle(point)"
              @mousedown="pointHandleMousedown(item, point, index, $event)"
            ></span>
          </div>
          <component
            :is="item.name"
            :data="item"
            :style="getShapeStyle(item.style, index)"
            @click.native="changeCurComp(item, index, $event)"
            @mousedown.native="handleMousedown(item, index, $event)"
          ></component>
        </div>
      </div>
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
    return {
      pointList: ['tl', 'tc', 'tr', 'lc', 'rc', 'bl', 'bc', 'br'],
    }
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
    getBoxShapeStyle(
      style: IComponents['style'],
      index: number,
    ): IComponents['style'] {
      let curStyle = {}
      const styleArr = ['width', 'height', 'left', 'top']
      styleArr.forEach(element => {
        curStyle[element] = style[element] + 'px'
      })
      curStyle.zIndex = index
      return curStyle
    },
    getShapeStyle(style: IComponents['style']): IComponents['style'] {
      let curStyle = Object.assign({}, style)
      const styleArr = ['fontSize', 'borderWidth', 'borderRadius']
      styleArr.forEach(element => {
        curStyle[element] = curStyle[element] + 'px'
      })
      curStyle.width = '100%'
      curStyle.height = '100%'
      return curStyle
    },
    handleMousedown(component: IComponents, index: number, evt: Event) {
      console.log('鼠标按下事件')
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
    getPointStyle(item: string) {
      // console.log(item)
      let left, top, right, bottom, marginLeft, marginTop, cursor
      switch (item) {
        case 'tl':
          left = '-4px'
          top = '-4px'
          cursor = 'nw-resize'
          break
        case 'tc':
          left = '50%'
          top = '-4px'
          marginLeft = '-4px'
          cursor = 'n-resize'
          break
        case 'tr':
          right = '-4px'
          top = '-4px'
          cursor = 'ne-resize'
          break
        case 'lc':
          left = '-4px'
          top = '50%'
          marginTop = '-4px'
          cursor = 'w-resize'
          break
        case 'rc':
          right = '-4px'
          top = '50%'
          marginTop = '-4px'
          cursor = 'w-resize'
          break
        case 'bl':
          left = '-4px'
          bottom = '-4px'
          cursor = 'sw-resize'
          break
        case 'bc':
          left = '50%'
          marginLeft = '-4PX'
          bottom = '-4px'
          cursor = 's-resize'
          break
        case 'br':
          right = '-4px'
          bottom = '-4px'
          cursor = 'se-resize'
          break
      }
      return {
        left,
        right,
        top,
        bottom,
        marginLeft,
        marginTop,
        cursor,
      }
    },
    pointHandleMousedown(
      component: IComponents,
      point: string,
      index: number,
      evt: Event,
    ) {
      evt.stopPropagation()
      const context = this
      const canvasbox = document.getElementById('qx-canvas')
      const boxRect = canvasbox.getBoundingClientRect()
      const move = function (evt: Event) {
        let height = component.style.height
        let width = component.style.width
        let left = component.style.left
        let top = component.style.top
        const borderRightPosition = left + width
        const borderBottomPosition = top + height
        if (point.indexOf('r') !== -1) {
          let curwidth = evt.clientX - boxRect.left - component.style.left
          width = curwidth > 0 ? curwidth : 0
        }
        if (point.indexOf('b') !== -1) {
          let curheight = evt.clientY - boxRect.top - component.style.top
          height = curheight >= 0 ? curheight : 0
        }
        if (point.indexOf('l') !== -1) {
          const offsetX = evt.clientX - boxRect.left
          let temp = left
          left = offsetX
          left = left < borderRightPosition ? left : borderRightPosition
          let distance = temp - left
          let curwidth = width + distance
          width = curwidth > 0 ? curwidth : 0
        }
        if (point.indexOf('t') !== -1) {
          const offsetY = evt.clientY - boxRect.top
          let temp = top
          top = offsetY
          top = top < borderBottomPosition ? top : borderBottomPosition
          let distance = temp - top
          let curheight = height + distance
          height = curheight > 0 ? curheight : 0
        }

        context.$store.commit('changeComponent', {
          index,
          component: {
            ...component,
            style: {
              ...component.style,
              height,
              width: width,
              left,
              top,
            },
          },
        })
      }
      const up = function () {
        console.log('移动停止，鼠标松开')
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
  overflow: hidden;
  width: 375px;
  height: 700px;
  border: 1px solid #888;
  .qx-component {
    position: absolute;
    .pointList {
      .point {
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        border: 1px solid #3a8ee6;
        border-radius: 50%;
        background: #fff;
      }
    }
    &.active {
      outline: 1px solid red;
    }
  }
}
</style>
