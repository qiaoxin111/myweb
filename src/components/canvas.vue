<template>
  <div id="qx-canvas" @mousedown="blurPage">
    <div v-for="(item, index) in dataList" :key="index">
      <div
        class="qx-component"
        :class="{ activeEle: currentIndex === index }"
        :data-index="index"
        style=""
        :style="[
          getBoxShapeStyle(item.style, index),
          { transform: `rotate(${item.style.rotate}deg)` },
        ]"
      >
        <span
          class="icon"
          v-show="currentIndex === index"
          @mousedown="turnHandleMousedown(item, index, $event)"
        ></span>
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
    <qxMarkLine />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import qxButton from '../components/basic-components/qxButton.vue'
import qxMarkLine from '../components/markLine.vue'
import { mapState } from 'vuex'
import { IComponents } from '@/store'
export default Vue.extend({
  name: 'Home',
  props: ['dataList'],
  components: {
    qxButton,
    draggable,
    qxMarkLine,
  },
  data() {
    return {
      pointList: ['tl', 'tc', 'tr', 'lc', 'rc', 'bl', 'bc', 'br'],
    }
  },
  computed: mapState(['currentIndex']),
  methods: {
    changeCurComp(curComp: IComponents, index: number, evt: Event) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$store.commit('setCurrent', curComp)
      this.$store.commit('setCurrentIndex', index)
    },
    blurPage() {
      console.log('blurPage')
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
      // evt.preventDefault()
      evt.stopPropagation()
      const context = this
      const mouseStartX = evt.offsetX
      const mouseStartY = evt.offsetY
      const canvasbox = document.getElementById('qx-canvas')
      const boxRect = canvasbox.getBoundingClientRect()
      const move = function (evt: Event) {
        evt.preventDefault()
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
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    getPointStyle(item: string) {
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
        evt.stopPropagation()
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
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    // 获取旋转角度
    getAngle(x1: number, y1: number, x2: number, y2: number) {
      let rect = document
        .getElementsByClassName('activeEle')[0]
        .getBoundingClientRect()
      let { x, y, width, height } = rect
      // 当前选中元素中心点的位置
      let cx = x + width / 2
      let cy = y + height / 2
      //2个点之间的角度获取
      let c1 = (Math.atan2(y1 - cy, x1 - cx) * 180) / Math.PI
      let c2 = (Math.atan2(y2 - cy, x2 - cx) * 180) / Math.PI
      let angle
      angle = Math.floor(c2 - c1)
      return angle
    },
    turnHandleMousedown(component: IComponents, index: number, evt: Event) {
      evt.stopPropagation()
      const context = this
      const startX = evt.clientX
      const startY = evt.clientY
      const move = function (evt: Event) {
        const currentX = evt.clientX
        const currentY = evt.clientY
        evt.preventDefault()
        const angle = context.getAngle(startX, startY, currentX, currentY)

        const startAngle = component.style.rotate
        const deg = startAngle + angle
        context.$store.commit('changeComponent', {
          index,
          component: {
            ...component,
            style: {
              ...component.style,
              rotate: deg,
            },
          },
        })
      }
      const up = function () {
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
    .icon {
      position: absolute;
      display: inline-block;
      width: 18px;
      height: 18px;
      left: 50%;
      transform: translate(-50%);
      top: -30px;
      background: url(../assets/images/turnRight.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
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
    &.activeEle {
      outline: 1px solid red;
    }
  }
}
</style>
