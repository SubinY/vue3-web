<template>
  <Tooltip placement="top">
    <template #title>
      <span>密度</span>
    </template>

    <Dropdown placement="bottom" :trigger="['click']">
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu v-model:selectedKeys="selectedKeysRef" selectable @click="handleMenuClick">
          <Menu.Item key="large">
            <span>默认</span>
          </Menu.Item>
          <Menu.Item key="middle">
            <span>中等</span>
          </Menu.Item>
          <Menu.Item key="small">
            <span>紧凑</span>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
<script setup>
import { ref, unref } from 'vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { Tooltip, Dropdown, Menu } from 'ant-design-vue'
import { useTableContext } from '../../hooks/useTableContext'

// type SizeType = NonNullable<TableProps['size']>;

const table = useTableContext()

const selectedKeysRef = ref([unref(table.getProps)?.size || 'large'])

function handleMenuClick({ key }) {
  selectedKeysRef.value = [key]
  table.setProps({
    size: key
  })
}
</script>
