<template>
  <el-table-column
    v-if="column.slot"
    v-bind="elAttrs"
  >
    <slot
      slot-scope="scope"
      v-bind="scope"
    >
      <!-- slot用于展开行时column为空 -->
      {{ scope.column && scope.row[scope.column.property] }}
    </slot>
    <slot
      slot="header"
      slot-scope="scope"
      name="header"
      v-bind="scope"
    >
      {{ scope.column && scope.column.label }}
    </slot>
  </el-table-column>
  <el-table-column
    v-else
    v-bind="elAttrs"
  />
</template>

<script>
import { elTableColumnAttrs } from '../utils/config'

export default {
  props: {
    column: {
      type: Object,
      default: () => ({ showOverflowTooltip: true })
    }
  },
  computed: {
    _column() {
      return Object.assign({ showOverflowTooltip: true }, this.column)
    },
    elAttrs() {
      const copy = {}
      for (const key in this._column) {
        if (elTableColumnAttrs.includes(key)) {
          copy[key] = this._column[key]
        }
      }
      return copy
    }
  }
}
</script>

<style></style>
