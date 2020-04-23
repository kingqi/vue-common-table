<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      v-bind="elAttrs"
      v-on="$listeners"
    >
      <el-table-column
        v-if="enableMultiSelect"
        type="selection"
        width="55"
      />
      <table-column
        v-for="column in columns"
        :key="column.prop"
        :column="column"
      >
        <template
          v-if="column.slot"
          slot-scope="row"
        >
          <slot
            :name="column.prop"
            :row="row"
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
        enablePagination: false
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
    return {}
  },
  computed: {
    enableMultiSelect() {
      return this.config.enableMultiSelect || false
    },
    showHandler() {
      return this.config.showHandler || false
    },
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
      return copy
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentPageChange', val)
    },
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
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
<style scoped></style>
