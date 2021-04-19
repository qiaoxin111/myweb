<template>
  <div class="qx-attrList">
    <el-form :model="attrCur.style" label-width="100px" class="demo-ruleForm">
      <el-form-item
        v-for="(item, index) in styles"
        :key="index"
        :label="map[item]"
        :prop="item"
      >
        <el-color-picker
          v-if="item === 'color'"
          v-model="attrCur.style[item]"
        ></el-color-picker>
        <el-color-picker
          v-else-if="item === 'backgroundColor'"
          v-model="attrCur.style[item]"
        ></el-color-picker>
        <el-select
          v-else-if="item === 'textAlign'"
          v-model="attrCur.style[item]"
          placeholder="请选择"
        >
          <el-option
            v-for="(align, i) in textAlignOptions"
            :key="i"
            :label="align.label"
            :value="align.value"
          ></el-option>
        </el-select>
        <el-select
          v-else-if="item === 'borderStyle'"
          v-model="attrCur.style[item]"
          placeholder="请选择"
        >
          <el-option
            v-for="(align, i) in borderStyleOptions"
            :key="i"
            :label="align.label"
            :value="align.value"
          ></el-option>
        </el-select>
        <el-input v-else v-model="attrCur.style[item]"></el-input>
      </el-form-item>

      <!-- <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IComponents } from '@/store'

export default Vue.extend({
  name: 'qx-attrList',
  props: ['attrCur'],
  computed: {
    styles() {
      return Object.keys(this.attrCur.style).map(item => item)
    },
  },
  components: {},
  watch: {
    attrCur(newAttrCur: IComponents): void {
      this.$store.commit('setCurrent', newAttrCur)
    },
  },
  updated() {
    // console.log('attr', this.attrCur)
  },
  data() {
    return {
      textAlignOptions: [
        {
          label: '左对齐',
          value: 'left',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'right',
        },
      ],
      borderStyleOptions: [
        {
          label: '点线边框',
          value: 'dotted',
        },
        {
          label: '虚线边框',
          value: 'dashed',
        },
        {
          label: '实线边框',
          value: 'solid',
        },
      ],
      map: {
        width: '宽',
        height: '高',
        color: '颜色',
        fontSize: '字体大小',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        borderStyle: '边框样式',
        textAlign: '对齐方式',
        backgroundColor: '背景颜色',
        left: 'x坐标',
        top: 'y坐标',
      },
    }
  },
})
</script>
<style scoped lang="less">
/deep/ .el-form {
  .el-form-item {
    .el-form-item__label {
      text-align: center !important;
    }
    .el-form-item__content {
      margin-left: 20px !important;
      margin-right: 15px;
    }
  }
}
</style>
