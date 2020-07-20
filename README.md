# vue-common-table

基于 elementUI 封装的 table 组件，支持所有 elementUI table 组件配置项 [文档](https://element.eleme.cn/2.12/#/zh-CN/component/table)，另外多选功能做了跨分页多选

### Attributes

| 参数       | 说明                                                    |  类型   | 默认值 |
| :--------- | :------------------------------------------------------ | :-----: | :----: |
| data       | 表格数据                                                |  Array  |   -    |
| columns    | 列配置,详情见下方 Column 属性                           |  Array  |   -    |
| loading    | 加载状态                                                | Boolean | false  |
| config     | 表格配置项，详情见下方 Config 属性                      | Object  |   -    |
| page       | 分页参数,包括:size,total,currentPage,不传时不显示分页器 | Object  |  null  |
| pageConfig | 分页器配置项，详情见下方 PageConfig 属性                | Object  |   -    |

### Column Attributes 

除此之外支持所有 el-table-column attributes

| 参数 | 说明                         |  类型   | 默认值 |
| :--- | :--------------------------- | :-----: | :----: |
| slot | 开启 slot 支持，用于自定义列 | Boolean | false  |

### Config Attributes

除此之外支持所有 el-table attributes

| 参数              | 说明                                                                                                                                                                                     |         类型         |                    默认值                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------: | :------------------------------------------: |
| enableMultiSelect | 是否支持多选                                                                                                                                                                             |       Boolean        |                    false                     |
| showHandler       | 是否显示操作列                                                                                                                                                                           |       Boolean        |                    false                     |
| handlerColumn     | 操作列配置，showHandler 为 true 时有效                                                                                                                                                   |        Objext        | {label: '操作',minWidth: 100,fixed: 'right'} |
| highlightSelect   | 是否高亮选中行，仅多选时有效                                                                                                                                                             |       Boolean        |                     true                     |
| showIndexColumn   | 是否显示序号列                                                                                                                                                                           |       Boolean        |                    false                     |
| rowKey            | 行数据的 Key，用来优化 Table 的渲染；在使用 多选 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 | Function(row)/String |                      --                      |


### PageConfig Attributes

除此之外支持所有 el-pagination attributes

| 参数            | 说明                   |  类型  | 默认值 |
| :-------------- | :--------------------- | :----: | :----: |
| customClassName | 自定义分页器 className | String |   -    |

### Slot

| name                     | 说明                                                                 |           参数           |
| :----------------------- | :------------------------------------------------------------------- | :----------------------: |
| 列的 prop 值             | 自定义列的内容,当列的 slot 属性设置为 true 时有效                    | { row, column, \$index } |
| 列的 prop 值 + '-header' | 自定义表头的内容,当列的 slot 属性设置为 true 时有效                  |   { column, \$index }    |
| handler                  | 自定义操作栏的内容                                                   | { row, column, \$index } |
| multiSelectMenu          | 自定义多选操作列内容，enableMultiSelect 为 true 时有效，勾选行时显示 |      { selection }       |
| topMenu                  | 自定义顶部操作，勾选行时不显示                                       |            -             |

### Events

除此之外支持所有 el-table events

注： 因为添加了跨分页多选的功能，selection-change会在切换分页设置勾选状态时调用多次

| 事件名称            | 说明                     |   参数   |
| :------------------ | :----------------------- | :------: |
| current-page-change | currentPage 改变时会触发 |  当前页  |
| page-size-change    | pageSize 改变时会触发    | 每页条数 |

### Methods

支持所有 el-table 的 methods
