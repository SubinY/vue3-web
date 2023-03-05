<template>
  <div class="mineral-select-wrap" @click="visible = true">
    <el-input v-model="data" readonly placeholder="Mineral" />
    <el-icon
      v-if="data.length"
      class="mineral-select-close"
      @click.stop="handleClear"
      ><CircleClose
    /></el-icon>
  </div>
  <el-dialog v-model="visible" width="80%" top="5vh" destroy-on-close>
    <div class="select-show">
      已选择：
      <el-tag
        v-for="d in data"
        class="select-tag"
        :key="d"
        closable
        type="info"
        @close="handleClose(tag)"
      >
        {{ d }}
      </el-tag>
    </div>
    <el-tabs
      tab-position="left"
      style="height: 65vh; overflow-y: scroll"
      class="demo-tabs"
    >
      <el-tab-pane
        v-for="panelItem in mineralData"
        :label="panelItem.label"
        :key="panelItem.label"
      >
        <div
          class="mineral-list"
          v-for="(group, groupIndex) in panelItem.options"
          :key="groupIndex"
        >
          <span
            class="mineral-item"
            :class="data.includes(item.value) && 'actived'"
            v-for="item in group"
            :key="item.value"
            @click="() => handleSelect(item.value)"
            >{{ item.label }}</span
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  getCurrentInstance
} from 'vue'
import { MineralData } from '../../data'
import { cloneDeep } from 'lodash'
import { calcList } from './util'

const props = defineProps({
  modelValue: []
})

const mineralData = cloneDeep(MineralData).map((item) => {
  item.options = calcList(item.options)
  return item
})

const visible = ref(false)
let data = reactive([])

watchEffect(() => {
  data = props.modelValue
})

const emit = defineEmits(['update:modelValue'])

function handleSelect(e) {
  if (data.includes(e)) {
    return handleClose(e)
  }
  data.push(e)
  emit('update:modelValue', data)
}

const handleClose = (tag) => {
  data.splice(data.indexOf(tag), 1)
  emit('update:modelValue', data)
}

const handleClear = () => {
  data = []
  emit('update:modelValue', data)
}
</script>

<style lang="less" scoped>
.mineral-select-wrap {
  width: 100%;
  position: relative;
  :deep(.el-input__wrapper) {
    padding-right: 20px;
  }
  .mineral-select-close {
    position: absolute;
    right: 4px;
    top: 11px;
    color: #aaa;
    cursor: pointer;
  }
}
.select-show {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  .select-tag {
    margin-right: 4px;
  }
}
.el-tab-pane {
  display: flex;
}
.mineral-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  > span {
    flex: 1;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      color: @color-blue;
    }
    &.actived {
      color: @color-blue;
    }
  }
}
</style>
