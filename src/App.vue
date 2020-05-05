<template>
  <div id="app">
    <common-table
      :columns="columns"
      :data="tableData"
      :config="tableConfig"
      :page="page"
      :page-config="pageConfig"
      @selection-change="handleSelectionChange"
      @current-page-change="handleCurrentPageChange"
    >
      <template
        slot="multiSelectMenu"
        slot-scope="{ selection }"
      >
        <el-button
          type="text"
          @click="handleSelectionClick(selection)"
        >
          删除
        </el-button>
      </template>
      <template slot="topMenu">
        <el-input
          placeholder="请输入名称"
          style="width:200px; "
        />
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
const list = [
  [
    {
      id: '1',
      date: '2016-05-02',
      name: '王小虎1',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      id: '2',
      date: '2016-05-04',
      name: '王小虎2',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      id: '3',
      date: '2016-05-01',
      name: '王小虎3',
      address: '上海市普陀区金沙江路 1519 弄'
    }
  ],
  [
    {
      id: '4',
      date: '2016-05-02',
      name: '王小虎4',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      id: '5',
      date: '2016-05-04',
      name: '王小虎5',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      id: '6',
      date: '2016-05-01',
      name: '王小虎6',
      address: '上海市普陀区金沙江路 1519 弄'
    }
  ]
]
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
      tableData: list[0],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true,
        enablePagination: true
      },
      page: {
        size: 3,
        total: 6,
        currentPage: 1
      },
      pageConfig:{
        pageSizes:[3,6]
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    },
    handleSelectionClick(selection) {
      console.log('selection:', selection)
    },
    handleCurrentPageChange(current) {
      this.tableData = list[current - 1]
    }
  }
}
</script>

<style>
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
