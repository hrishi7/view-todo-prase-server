
<template>
    <q-table :rows="props.rows" :columns="cols" :filter="searchQuery" :filter-method="filter" :row-key="props.rowKey"
        :class="[{ 'sticky-virtual-scroll-table': props.stickyHeader }, 'col']" :rows-per-page-options="[10, 25, 50, 0]"
        :pagination="{ rowsPerPage: 0 }" v-bind="$attrs">
        <template #top>
            <div class="full-width row q-gutter-sm">
                <slot name="title" />
                <q-space />
                <v-input v-if="$props.filterable" v-model="searchQuery" dense rounded style="width:240px">
                    <template #prepend>
                        <q-icon name="search" />
                    </template>

                </v-input>
                <slot name="actions" />
            </div>
        </template>
        <template #header="slotProps">
            <q-tr :props="slotProps" class="secondary-7">
                <q-th v-if="$attrs.selection === 'single' || $attrs.selection === 'multiple'" auto-width>
                    <q-checkbox v-model="slotProps.selected" />
                </q-th>
                <q-th v-for="col in slotProps.cols" :key="col.name" :props="slotProps">
                    {{ col.label }}
                </q-th>
            </q-tr>
        </template>
        <template #body="slotProps">
            <q-tr :props="slotProps" @mouseenter="rowsHoverState[slotProps.rowIndex] = true"
                @mouseleave="rowsHoverState[slotProps.rowIndex] = false"
                @click="emit('row-click', $event, slotProps.row)">
                <!-- Checkbox for selection of a row -->
                <q-td v-if="$attrs.selection === 'single' || $attrs.selection === 'multiple'"
                    :class="{ 'bg-primary-1': slotProps.selected }">
                    <q-checkbox v-model="slotProps.selected" />
                </q-td>
                <!-- Iterate through columns to set custom styles  -->
                <template v-for="{ name, format: _format, field } in cols" :key="name">
                    <q-td :props="slotProps" :class="[{ 'bg-primary-1': slotProps.selected }]" class="secondary-10"
                        style="font-size: 14px">
                        <template v-if="name !== 'actions'">
                            <!-- Expose slot with column name for column customization -->
                            <slot :name="name" :row="slotProps.row" :row-index="slotProps.rowIndex">
                                {{ _format?.(columnValue(field, slotProps.row), slotProps.row) ?? columnValue(field,
                                        slotProps.row)
                                }}
                            </slot>
                        </template>
                        <!-- show actions only if the user hovers on the row -->
                        <!-- TODO: actions should be persistent on mobile platform as hover will translates to 'tap to see'. only
            after a tap to focus the row, can the user sees actions  -->
                        <template v-else-if="rowsHoverState[slotProps.rowIndex]">
                            <slot name="row-actions" :row="slotProps.row" :row-index="slotProps.rowIndex" />
                        </template>
                    </q-td>
                </template>
            </q-tr>
        </template>
    </q-table>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import vInput from 'src/components/custom/VInput.vue'
import { Except } from 'type-fest';

type QTableProps = import('quasar').QTableProps;
type QTableInputProps = Except<QTableProps, 'rows' | 'columns' | 'filter' | 'filterMethod' | 'rowKey'>;

interface Props extends QTableInputProps {
    rows: QTableProps['rows'];
    columns: NonNullable<QTableProps['columns']>;
    filterable?: boolean;
    filterableColumns?: string[];
    rowKey?: string;
    stickyHeader?: boolean
}

interface Emits {
    (event: 'row-click', jsEvent: MouseEvent, row: NonNullable<Props['rows']>[number]): void
}

const props = withDefaults(defineProps<Props>(), {
    filterable: false,
    filterableColumns: () => [],
    rowKey: 'id',
    stickyHeader: false
});

const emit = defineEmits<Emits>();

const cols = ref<Props['columns']>([...props.columns, {
    name: 'actions',
    label: '',
    align: 'right',
    field: () => '',
    sortable: false,
    style: 'width:100px'
}])

const searchQuery = ref('');
const rowsHoverState = ref<boolean[]>([]);

const colsMap = computed(() => {
    return cols.value.reduce<Record<string, Props['columns'][number]>>((acc, col) => {
        acc[col.name] = col;
        return acc;
    }, {});
});

function columnValue(field: Props['columns'][number]['field'], row: NonNullable<Props['rows']>[number]) {
    if (typeof field === 'function') {
        return field(row);
    }
    return row[field];
}

function filter(rows: NonNullable<Props['rows']>, search: string) {
    return rows.filter(row => {
        return props.filterableColumns.reduce<boolean>((acc, col) => {
            return acc || columnValue(colsMap.value[col].field, row)?.toLowerCase().includes(search.toLowerCase());
        }, false);
    });
}


</script>

<style lang="sass">
.sticky-virtual-scroll-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>