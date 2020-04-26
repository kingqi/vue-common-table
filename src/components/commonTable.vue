<template>
  <div>
    <!--批量操作栏，勾选行时显示-->
    <div
      v-if="enableMultiSelect && selection.length > 0"
      class="multi-menu"
    >
      <span style="margin-left:12px;">已选中{{ selection.length }}项</span>
      <el-divider direction="vertical" />
      <slot
        name="multiSelectMenu"
        :selection="selection"
      />
      <i
        class="el-icon-close btn-close"
        @click="selectionClear"
      />
    </div>
    <!--顶部操作栏占位，勾选行时不显示-->
    <div
      v-else
      class="top-menu"
    >
      <slot name="topMenu" />
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      v-bind="elAttrs"
      v-on="listeners"
    >
      <el-table-column
        v-if="enableMultiSelect"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="50"
      />
      <table-column
        v-for="column in columns"
        :key="column.prop"
        :column="column"
      >
        <template
          v-if="column.slot"
          slot-scope="props"
        >
          <slot
            :name="column.prop"
            v-bind="props"
          />
        </template>
        <template
          v-if="column.slot"
          slot="header"
          slot-scope="props"
        >
          <slot
            :name="column.prop + '-header'"
            v-bind="props"
          />
        </template>
      </table-column>
      <el-table-column
        v-if="showHandler"
        v-bind="handlerColumn"
      >
        <slot
          slot-scope="{ row }"
          name="handler"
          :row="row"
        />
      </el-table-column>
    </el-table>
    <table-pagination
      :page="page"
      :page-config="pageConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { deepClone } from '../utils/util'
import { elTableAttrs } from '../utils/config'

export default {
  components: {
    tableColumn: () => import('./tableColumn'),
    tablePagination: () => import('./tablePagination')
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    config: {
      type: Object,
      default: () => ({
        enableMultiSelect: false,
        showHandler: false,
        handlerColumn: {},
        enablePagination: false,
        highlightSelect: true,
        showIndexColumn: true
      })
    },
    pageConfig: { type: Object, default: () => ({}) },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        size: 10,
        total: 0
      })
    }
  },
  data() {
    return {
      selection: []
    }
  },
  computed: {
    // 是否启用多选
    enableMultiSelect() {
      return this.config.enableMultiSelect || false
    },
    // 是否展示操作列
    showHandler() {
      return this.config.showHandler || false
    },
    // 是否高亮勾选行
    highlightSelect() {
      return this.config.highlightSelect !== false ? true : false
    },
    // 是否展示序号列
    showIndexColumn() {
      return this.config.showIndexColumn !== false ? true : false
    },
    // 操作列配置
    handlerColumn() {
      return Object.assign(
        {
          label: '操作',
          minWidth: 100,
          fixed: 'right'
        },
        this.config.handlerColumn
      )
    },
    enablePagination() {
      return this.config.enablePagination || false
    },
    // el-table组件属性
    elAttrs() {
      const copy = deepClone(this.config)
      for (const key in copy) {
        if (
          Object.hasOwnProperty.call(copy, key) &&
          !elTableAttrs.includes(key)
        ) {
          delete copy[key]
        }
      }
      if (this.highlightSelect) {
        Object.assign(copy, {
          'row-class-name': this.rowClassName
        })
      }
      return copy
    },
    // el-table监听事件
    listeners() {
      return Object.assign({}, this.$listeners, {
        'selection-change': this.handleSelectionChange
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentPageChange', val)
    },
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
    },
    handleSelectionChange(selection) {
      this.selection = selection
      this.$listeners['selection-change'].call(this, selection)
    },
    // 高亮当前选中行
    rowClassName({ row }) {
      for (let index = 0; index < this.selection.length; index++) {
        if (this.selection[index] === row) {
          return 'row__active'
        }
      }
      return ''
    },
    selectionClear() {
      this.selectionList = []
      this.$refs['table'].clearSelection()
    },
    clearSelection() {
      return this.$refs['table'].clearSelection(...arguments)
    },
    toggleRowSelection() {
      return this.$refs['table'].toggleRowSelection(...arguments)
    },
    toggleAllSelection() {
      return this.$refs['table'].toggleAllSelection(...arguments)
    },
    toggleRowExpansion() {
      return this.$refs['table'].toggleRowExpansion(...arguments)
    },
    setCurrentRow() {
      return this.$refs['table'].setCurrentRow(...arguments)
    },
    clearSort() {
      return this.$refs['table'].clearSort(...arguments)
    },
    clearFilter() {
      return this.$refs['table'].clearFilter(...arguments)
    },
    doLayout() {
      return this.$refs['table'].doLayout(...arguments)
    },
    sort() {
      return this.$refs['table'].sort(...arguments)
    }
  }
}
</script>
<style scoped>
/deep/ .row__active {
  background: #f7fcff;
}
.multi-menu {
  display: inline-block;
  width: 100%;
  line-height: 40px;
  height: 40px;
  margin-bottom: 12px;
}
.multi-menu .el-button {
  padding-top: 0;
  padding-bottom: 0;
}
.btn-close {
  line-height: 40px;
  margin-right: 10px;
  float: right;
  cursor: pointer;
}
.top-menu {
  height: 40px;
  margin-bottom: 12px;
}
</style>
