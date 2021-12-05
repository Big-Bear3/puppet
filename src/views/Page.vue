<template>
    <ul class="puppet-ul" v-if="pageStore">
        <li>pageCode：<input v-model="readonlyPageData.pageCode" /></li>
        <li>pageName：<input v-model="readonlyPageData.pageName" /></li>
    </ul>
    <ul class="puppet-ul" v-if="componentStore.readonlyComponentsData">
        <li v-for="(component, index) in readonlyComponentsData" :key="index">
            <!-- <li v-for="(component, index) in readonlyPageData.components" :key="index"> -->
            <input v-model="component.componentName" />
            <span> ------子组件：</span>
            <span v-for="(childComponent, childIndex) in component.children" :key="childIndex">
                <input v-model="childComponent.componentName" />
            </span>
        </li>
    </ul>
    <ul class="puppet-ul" v-if="pageStore">
        <li>shadow：</li>
        <li>pageCode：<input v-model="pageDataShadowData.pageCode" /></li>
        <li>pageName：<input v-model="pageDataShadowData.pageName" /></li>
        <li>
            <button @click="commitPageData">Commit Page Data</button>
            <button @click="resetPageData">Reset Page Data</button>
        </li>
    </ul>
    <ul class="puppet-ul" v-if="pageStore">
        <li>shadow：</li>
        <li v-for="(component, index) in componentDataShadowData" :key="index">
            <input v-model="component.componentName" />
            <span> ------子组件：</span>
            <span v-for="(childComponent, childIndex) in component.children" :key="childIndex">
                <input v-model="childComponent.componentName" />
            </span>
        </li>
        <li>
            <button @click="commitComponentData">Commit Component Data</button>
            <button @click="resetComponentData">Reset Component Data</button>
        </li>
    </ul>
    <ul class="puppet-ul" v-if="pageStore">
        <li>shadow：</li>
        <li>
            <input v-model="firstComponentDataShadowData.componentName" />
            <span> ------子组件：</span>
            <span v-for="(childComponent, childIndex) in firstComponentDataShadowData.children" :key="childIndex">
                <input v-model="childComponent.componentName" />
            </span>
        </li>
        <li>
            <button @click="commitFirstComponentData">Commit Component Data</button>
            <button @click="resetFirstComponentData">Reset Component Data</button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { pageStore, componentStore } from '@/stores/stores';

const { readonlyPageData } = pageStore;

const [pageDataShadowData, commitPageData, resetPageData] = pageStore.pageDataShadow;

const { readonlyComponentsData } = componentStore;

const [componentDataShadowData, commitComponentData, resetComponentData] = componentStore.componentsDataShadow;
const [firstComponentDataShadowData, commitFirstComponentData, resetFirstComponentData] = componentStore.firstComponentsDataShadow;

// setInterval(() => {
//     console.log(cloneDeep(pageStore.readonlyPageData.components));
// }, 1555);
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
