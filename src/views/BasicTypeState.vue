<template>
    <ul class="puppet-ul" v-if="basicTypeStateStore.readonlyProjectId">
        <li>
            ProjectId：<input v-model="basicTypeStateStore.readonlyProjectId" />
            <button @click="basicTypeStateStore.increaseProjectId">Increase</button>
        </li>
    </ul>
    <ul class="puppet-ul" v-if="basicTypeStateStore.readonlyProjectName">
        <li>ProjectName：<input v-model="basicTypeStateStore.readonlyProjectName" /></li>
    </ul>
    <ul class="puppet-ul" v-if="basicTypeStateStore.readonlyProjectName">
        <li>ProjectNameShadow：<input v-model="projectNameShadow" /></li>
        <li>
            <button @click="commitProjectName">Commit Project Name</button>
            <button @click="resetProjectName">Reset Project Name</button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { basicTypeStateStore } from '@/stores/stores';
const [projectNameShadow, commitProjectName, resetProjectName] = basicTypeStateStore.projectNameShadow;

setTimeout(() => {
    projectNameShadow.value = 'Project!!';
}, 1000);
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
