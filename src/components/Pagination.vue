<template>
    <div class="card">
        <Paginator :rows="12" :totalRecords="totalRecords" :rowsPerPageOptions="[12, 16, 20]" @page="onPageChange">
        </Paginator>
    </div>
</template>

<script setup>
import Paginator from 'primevue/paginator';

const props = defineProps({
    totalRecords: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['updatePagination']);

const onPageChange = (event) => {
  const skip = event.first;
  const limit = event.rows;

  emit('updatePagination', { limit, skip });
};
</script>
