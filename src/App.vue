<template>
  <div id="app">
    <common-table
      :columns="columns"
      :data="tableData"
      :config="tableConfig"
      @selection-change="handleSelectionChange"
    >
      <template
        slot="multiSelectMenu"
        slot-scope="{ selection }"
      >
        <el-button
          type="text"
          @click="handleSelectionClick(selection)"
        >
          确定
        </el-button>
      </template>
      <template
        slot="name"
        slot-scope="{ row }"
      >
        <el-tag>{{ row.name }}</el-tag>
      </template>
      <template
        slot="name-header"
        slot-scope="{ column }"
      >
        <el-tag>{{ column.label }}</el-tag>
      </template>
      <template slot="handler">
        <el-button type="text">
          编辑
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import commonTable from './components/commonTable.vue'

export default {
  name: 'App',
  components: {
    commonTable
  },
  data() {
    return {
      columns: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name',
          slot: true
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true
      },
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    },
    handleSelectionClick(selection){
      console.log('selection:',selection)
    }
  }
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.test-page {
  margin-right: 10px;
}
</style>
