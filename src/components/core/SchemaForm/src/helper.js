import dayjs from 'dayjs';
import { isNumber } from '@/utils/is';

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function setComponentRuleType(
  rule,
  component,
  valueFormat,
) {
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

export function processDateValue(attr, component) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    // attr.value = isObject(value) ? dayjs(value).format(valueFormat) : value
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dayjs(attr.value);
  }
}

export function handleInputNumberValue(component, val) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();
