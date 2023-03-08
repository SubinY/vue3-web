<template>
  <div id="Software" class="container">
    <!-- <DynamicTable
      size="small"
      bordered
      :data-request="loadData"
      :columns="columns"
      row-key="id"
      @resize-column="handleResizeColumn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          {{ record.name }} <a class="text-red-500">[测试bodyCell]</a>
        </template>
      </template>
    </DynamicTable> -->
  </div>
</template>

<script setup name="Demo">
import { onMounted } from 'vue'

// const columns = [
//   {
//     title: '姓名',
//     align: 'center',
//     dataIndex: 'name',
//     sorter: true,
//     resizable: true,
//     formItemProps: {
//       defaultValue: '李白',
//       required: true
//     }
//   },
//   {
//     title: '性别',
//     align: 'center',
//     dataIndex: 'gender',
//     width: 120,
//     resizable: true,
//     formItemProps: {
//       component: 'Select',
//       componentProps: ({ formInstance, formModel, tableInstance }) => ({
//         options: [
//           {
//             label: '男',
//             value: 1
//           },
//           {
//             label: '女',
//             value: 0
//           }
//         ]
//       })
//     },
//     customRender: ({ record }) => ['女', '男'][record.gender]
//   },
//   {
//     title: '衣服',
//     align: 'center',
//     dataIndex: 'clothes',
//     formItemProps: {
//       component: 'Select',
//       componentProps: ({ formInstance, formModel, tableInstance }) => ({
//         options: [
//           {
//             label: '西装',
//             value: 1
//           },
//           {
//             label: '领带',
//             value: 0
//           }
//         ]
//       })
//     }
//   }
// ]

// const tableData = Array.from({ length: 30 }).map((_, i) => {
//   const gender = ~~(Math.random() * 2)
//   const names = ['王路飞', '王大蛇', '李白', '刺客伍六七']
//   return {
//     id: i + 1,
//     date: new Date().toLocaleString(),
//     name: names[~~(Math.random() * 4)],
//     clothes: '男',
//     price: ~~(Math.random() * 1000),
//     gender
//   }
// })

// const loadData = async (params, onChangeParams) => {
//   console.log('params', params)
//   console.log('onChangeParams', onChangeParams)

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         list: tableData,
//         ...params
//       })
//       // 手动设置搜索表单的搜索项
//       dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
//         {
//           field: 'price',
//           componentProps: {
//             options: [
//               {
//                 label: '0-199',
//                 value: '0-199'
//               },
//               {
//                 label: '200-999',
//                 value: '200-999'
//               }
//             ]
//           }
//         }
//       ])
//     }, 500)
//   })
// }

// onMounted(() => {})

// const handleResizeColumn = (w, col) => {
//   // console.log('w', w, col);
//   col.width = w
// }
</script>

<style lang="less" scoped></style>
