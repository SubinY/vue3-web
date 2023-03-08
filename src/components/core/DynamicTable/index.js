import DynamicTable from './src/dynamic-table.vue';
export { DynamicTable };

export * from './src/hooks';
export * from './src/dynamic-table';

// export type ./src/hooksRef = Ref<DynamicTableInstance>;

// TODO 暂时是为了解决ts error(如果你有解决方法 请务必联系我~): JSX element type 'DynamicTable' does not have any construct or call signatures.
export default DynamicTable;
