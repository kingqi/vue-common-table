<template>
  <div :class="['page-wrap', customClassName ]">
    <el-pagination
      :current-page="page.currentPage"
      :page-size="page.size"
      :total="page.total"
      :page-sizes="pageSizes"
      :layout="layout"
      v-bind="elAttrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div class="page-button">
      <el-button
        size="mini"
        type="primary"
      >
        跳转
      </el-button>
    </div>
  </div>
</template>

<script>
import { deepClone } from '../utils/util'
import { elPageAttrs } from '../utils/config'

export default {
  props: {
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        size: 10,
        total: 0
      })
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    pageSizes() {
      return this.pageConfig.pageSizes || [10, 20, 30, 50, 100]
    },
    layout() {
      return this.pageConfig.layout || 'total,sizes,prev,pager,next,jumper,->'
    },
    customClassName() {
      return this.pageConfig.customClassName || ''
    },
    elAttrs() {
      const copy = deepClone(this.pageConfig)
      for (const key in copy) {
        if (
          Object.hasOwnProperty.call(copy, key) &&
          !elPageAttrs.includes(key)
        ) {
          delete copy[key]
        }
      }
      return copy
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    },
    handleSizeChange(val) {
      this.$emit('size-change', val)
    }
  }
}
</script>

<style scoped>
.page-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
}
.page-button {
  margin-left: 12px;
}
</style>
