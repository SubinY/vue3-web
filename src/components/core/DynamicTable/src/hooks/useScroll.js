import { computed, getCurrentInstance, ref, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash-es'

// type UseScrollParams = {
//   props: DynamicTableProps;
// };

// export type UseScrollType = ReturnType<typeof useScroll>;

// 获取元素到顶部距离-通用方法
export const getPositionTop = (node) => {
  let top = node.offsetTop
  let parent = node.offsetParent
  while (parent !== null) {
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return top // 所有的父元素top和
}

export const useScroll = ({ props }) => {
  const currIns = getCurrentInstance()
  const scrollY = ref()

  const scroll = computed(() => {
    return {
      y: scrollY.value,
      ...props.scroll
    }
  })

  const getScrollY = debounce(() => {
    if (!props.autoHeight) return
    const compRootEl = currIns?.proxy?.$el
    const el = compRootEl?.querySelector('.ant-table-body') || compRootEl?.querySelector('.ant-table-tbody')
    if (el) {
      const y = document.documentElement.offsetHeight - getPositionTop(el)
      // 简单粗糙的实现
      scrollY.value = y - 30
    }
    // console.log('innerScroll.value', el, scrollY.value);
  })

  setTimeout(getScrollY)
  window.addEventListener('resize', getScrollY)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getScrollY)
  })

  return {
    scroll
  }
}
