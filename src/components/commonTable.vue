<template>
  <div>
    <!--批量操作栏，勾选行时显示-->
    <div
      v-if="_config.enableMultiSelect && selection.length > 0"
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
        @click="clearSelection"
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
        v-if="_config.enableMultiSelect"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="_config.showIndexColumn"
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
        v-if="_config.showHandler"
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
      v-if="_config.enablePagination"
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
        showIndexColumn: true,
        uniqueKey: 'id',
        tooltipEffect: 'dark'
      })
    },
    pageConfig: { type: Object, default: () => ({}) },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        size: 3,
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
    _config() {
      return Object.assign(
        {
          enableMultiSelect: false,
          showHandler: false,
          handlerColumn: {},
          enablePagination: false,
          highlightSelect: true,
          showIndexColumn: true,
          uniqueKey: 'id',
          tooltipEffect: 'dark'
        },
        this.config
      )
    },
    // 操作列配置
    handlerColumn() {
      return Object.assign(
        {
          label: '操作',
          minWidth: 100,
          fixed: 'right'
        },
        this._config.handlerColumn
      )
    },
    // el-table组件属性
    elAttrs() {
      const copy = deepClone(this._config)
      for (const key in copy) {
        if (
          Object.hasOwnProperty.call(copy, key) &&
          !elTableAttrs.includes(key)
        ) {
          delete copy[key]
        }
      }
      if (this._config.highlightSelect) {
        Object.assign(copy, {
          'row-class-name': this.rowClassName
        })
      }
      return copy
    },
    // el-table监听事件
    listeners() {
      return Object.assign({}, this.$listeners, {
        select: this.handleSelect,
        'select-all': this.handleSelectAll
      })
    }
  },
  watch: {
    // 如果当前数据有已被选中的则设置为已勾选
    data: function(val) {
      this.$nextTick(() => {
        if (val.length > 0 && this.selection.length > 0) {
          val.forEach((row) => {
            if (
              this.selection.findIndex(
                (item) => item[this._config.uniqueKey] === row[this._config.uniqueKey]
              ) >= 0
            ) {
              this.$refs['table'].toggleRowSelection(row, true)
            }
          })
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-page-change', val)
    },
    handleSizeChange(val) {
      this.$emit('page-size-change', val)
    },
    handleSelect(selection, row) {
      if (selection.includes(row)) {
        this.selection.push(row)
      } else {
        this.selection.splice(this.selection.indexOf(row), 1)
      }
    },
    handleSelectAll(selection) {
      let index
      this.data.forEach((row) => {
        index = this.selection.findIndex(
          (item) => item[this._config.uniqueKey] === row[this._config.uniqueKey]
        )
        // 全选时
        if (selection.length > 0 && index < 0) {
          this.selection.push(row)
          // 全不选时
        } else if (selection.length === 0 && index >= 0) {
          this.selection.splice(index, 1)
        }
      })
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
    clearSelection() {
      this.selection = []
      this.$refs['table'].clearSelection()
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
