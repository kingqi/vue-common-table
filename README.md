# vue-common-table

基于 elementUI 封装的 table 组件，支持所有 elementUI table 组件配置项 [文档](https://element.eleme.cn/2.12/#/zh-CN/component/table)

### Attributes

| 参数       | 说明                                     |  类型   |              默认值               |
| :--------- | :--------------------------------------- | :-----: | :-------------------------------: |
| data       | 表格数据                                 |  Array  |                 -                 |
| columns    | 列配置,详情见下方 Column 属性            |  Array  |                 -                 |
| loading    | 加载状态                                 | Boolean |               false               |
| config     | 表格配置项，详情见下方 Config 属性       | Object  |                 -                 |
| page       | 分页参数,包括:size,total,currentPage     | Object  | {currentPage:1,size: 10,total: 0} |
| pageConfig | 分页器配置项，详情见下方 PageConfig 属性 | Object  |                 -                 |

### Column Attributes

除此之外支持所有el-table-column attributes

| 参数 | 说明     |  类型   | 默认值 |
| :--- | :------- | :-----: | :----: |
| slot | 自定义列 | Boolean | false  |

### Config Attributes

除此之外支持所有el-table attributes

| 参数              | 说明                                |  类型   |                    默认值                    |
| :---------------- | :---------------------------------- | :-----: | :------------------------------------------: |
| enableMultiSelect | 是否支持多选                        | Boolean |                    false                     |
| showHandler       | 是否显示操作列                      | Boolean |                    false                     |
| handlerColumn     | 操作列配置，showHandler为true时有效 | Objext  | {label: '操作',minWidth: 100,fixed: 'right'} |
| enablePagination  | 是否显示分页器                      | Boolean |                    false                     |
| highlightSelect   | 是否高亮选中行，仅多选时有效        | Boolean |                     true                     |

### PageConfig Attributes

除此之外支持所有el-pagination attributes

| 参数            | 说明                  |  类型  | 默认值 |
| :-------------- | :-------------------- | :----: | :----: |
| customClassName | 自定义分页器className | String |   -    |
