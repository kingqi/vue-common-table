<template>
  <el-table-column
    v-if="column.slot"
    v-bind="elAttrs"
  >
    <slot
      slot-scope="scope"
      v-bind="scope"
    >
      {{ scope.row[scope.column.property] }}
    </slot>
    <slot
      slot="header"
      slot-scope="scope"
      name="header"
      v-bind="scope"
    >
      {{ scope.column.label }}
    </slot>
  </el-table-column>
  <el-table-column
    v-else
    v-bind="elAttrs"
  />
</template>

<script>
import { deepClone } from '../utils/util'
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
      const copy = deepClone(this._column)
      for (const key in copy) {
        if (
          Object.hasOwnProperty.call(copy, key) &&
          !elTableColumnAttrs.includes(key)
        ) {
          delete copy[key]
        }
      }
      return copy
    }
  }
}
</script>

<style></style>
