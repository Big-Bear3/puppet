<template>
    <ul class="puppet-ul" v-if="animals.get('aaa')?.redAnimals?.monkey">
        <li>{{ testStore.animals.get('aaa') }}</li>
        <li>{{ testStore.fruit }}</li>
        <input v-model="animals.get('aaa').redAnimals.monkey" />
        <input v-model="testStore.fruit" />
    </ul>
</template>

<script lang="ts" setup>
import { testStore } from '@/stores/stores';

const { animals, fruit } = testStore;
</script>
<style lang="less">
.puppet-ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .event-btn {
        margin-left: 10px;
    }
}
</style>
