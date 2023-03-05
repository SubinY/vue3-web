<template>
  <div class="container" @click="modelValue = []">
    <table>
      <tbody>
        <tr v-for="(row, index) in tags" :key="index">
          <td
            v-for="(col, nums) in row"
            :key="nums"
            :style="col.symbol && { border: '1px solid #ccc' }"
          >
            <div
              :class="data.includes(col.symbol) && 'actived'"
              class="elements"
              v-if="col.symbol"
              @click="() => handleSelect(col)"
            >
              <div class="element">
                <p>
                  {{ col.id }}
                </p>
                <p>
                  {{ col.symbol }}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { tags } from './tags'
import { colorInfo } from './color'
import { ref, reactive } from 'vue'

const props = defineProps({
  modelValue: []
})
const data = reactive(props.modelValue || [])

const emit = defineEmits(['update:modelValue'])

function handleSelect(v) {
  const { symbol } = v
  if (data.includes(symbol)) {
    data.splice(data.indexOf(symbol), 1)
    emit('update:modelValue', data)
    return
  }
  data.push(symbol)
  emit('update:modelValue', data)
}

function classHandle(index) {
  const T_CLASS = [
    'rootval',
    'metascriptval',
    'documentval',
    'groupval',
    'textval',
    'embedval',
    'tableval',
    'formval',
    'interactiveval'
  ]
  if (T_CLASS[index]) {
    this.classType = T_CLASS[index]
  }
}
</script>

<style lang="less" scoped>
.container {
  text-align: left;
  font-size: 0.8rem;
  position: relative;
  margin-bottom: 2rem;
}

table {
  margin: 0 auto;
}

th,
td {
  width: 3.5rem;
  height: 3.5rem;
  // padding: 0.02rem;
}

.elements {
  background: #fff;
  color: #000;
  cursor: pointer;
  display: block;
  font-size: 0.6rem;
  width: 3.5rem;
  height: 3.5rem;
  // line-height: 3.5rem;
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
  text-align: center;
  position: relative;
  // border-radius: 5%;
  > .element {
    display: flex;
    flex-direction: column;
    > p {
      margin: 0;
    }
  }
  &.actived {
    background-color: @color-blue;
    color: #fff;
  }
}

.elements:hover {
  background-color: @color-blue;
  color: #fff;
}

.elements .info {
  opacity: 1;
  box-sizing: border-box;
  position: absolute;
  top: 3.5rem;
  left: 0;
  z-index: 100;
  text-align: left;
  padding: 0.5rem;
  width: 20vw;
  border-radius: 5%;
  line-height: 1.5rem;
  background: #fff;
  cursor: initial;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25);
}

.elements .info a {
  line-height: 0;
  margin: 0 0.2rem;
  color: #fff;
  text-decoration: none;
  padding: 0.1rem 0.2rem;
  text-align: center;
  border-radius: 5%;
  background: #74bedb;
}

.color-select {
  width: 90%;
  margin: 0 auto;
  /* position: absolute;
  left: 50%;
  transform: translate(-50%, 0); */
}

.only-color {
  position: absolute;
  width: 20%;
  left: 20vw;
  top: 6vh;
}

.color-select .icon,
.only-color .icon {
  display: inline-block;
  margin: 0 0.5rem;
  vertical-align: middle;
  width: 1rem;
  height: 1rem;
  border-radius: 10%;
  cursor: pointer;
}

.color-select ul li,
.only-color ul li {
  float: left;
  width: 20vw;
  font-size: 0.8rem;
  padding: 0.125rem 0;
}

.only-color ul li {
  width: auto;
}

.rootval {
  background: #73f69c;
}
.metaval {
  background: #3d97f7;
}
.documentval {
  background: #ec5445;
}
.blockval {
  background: #b85f29;
}
.embedval {
  background: #b265ea;
}
.textval {
  background: #f9d448;
}
.tableval {
  background: #64ff64;
}
.formval {
  background: #8a96d1;
}
.interactiveval {
  background: #d4d4d4;
}
</style>
