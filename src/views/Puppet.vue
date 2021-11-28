<template>
    <ul class="puppet-ul" v-if="animals.get('aaa')?.redAnimals?.monkey">
        <li>{{ testStore.animals.get('aaa') }}</li>
        <li>{{ testStore.fruit }}</li>
        <input v-model="animals.get('aaa').redAnimals.monkey" />
        <input v-model="testStore.fruit" />
    </ul>
    <ul class="puppet-ul">
        <li>{{ testStore.fruitObj }}</li>
        <li><input v-model="fruitShadow.apple" /></li>
        <li><input v-model="fruitShadow.peach" /></li>
        <li><input v-model="fruitShadow" /></li>
        <li><button @click="commit">Commit</button></li>
        <li><button @click="reset">Reset</button></li>
    </ul>
</template>

<script lang="ts" setup>
import { testStore } from '@/stores/stores';

const { animals, fruitObj } = testStore;
const [fruitShadow, commit, reset] = testStore.fruitShadow;
(fruitShadow.value = 11111), commit();
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
