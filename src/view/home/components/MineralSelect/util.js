
export function calcList(arr, row = 5) {
  const length = arr.length
  const result = []
  const maxRowLength = Math.ceil(length / row)

  for (let i = 1, lastLength = 0; i <= row; ++i) {
    result.push(arr.slice(lastLength, i * maxRowLength))
    lastLength = i * maxRowLength
  }

  return result
}
