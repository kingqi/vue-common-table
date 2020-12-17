import { Pagination, TableColumn } from 'element-ui'
import Vue from 'vue'

export type Page = {
  currentPage: number
  size: number
  total: number
}

export type Config = {
  /* 是否支持多选 */
  enableMultiSelect: boolean
  /** 是否显示操作列 */
  showHandler: boolean
  /** 操作列配置 */
  handlerColumn: TableColumn
  /* 是否高亮选中行，仅多选时有效 */
  highlightSelect: boolean
  /* 是否显示序号列 */
  showIndexColumn: boolean
}

export class PageConfig extends Pagination {
  /* 是否支持多选 */
  customClassName?: string
}

export class Column extends TableColumn {
  /** 开启 slot 支持，用于自定义列 */
  slot: boolean
}

export declare class CommonTable extends Vue {
  /* table data source */
  data: object[]
  /* config for every column */
  columns: Column[]
  /* if table is loading */
  loading: boolean
  /* config for table */
  config: Config
  /* config for pagination */
  pageConfig: PageConfig
  /* datasource of pagination */
  page: Page
}
