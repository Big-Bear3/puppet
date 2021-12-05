<template>
    <ul class="puppet-ul">
        <li>姓名：{{ exampleStore.name }}</li>
        <br />
        <li>出生日期</li>
        <li>年：{{ dateOfBirth.year }}</li>
        <li>月：{{ dateOfBirth.month }}</li>
        <li>日：{{ dateOfBirth.day }}</li>
    </ul>
    <ul class="puppet-ul">
        <button @click="exampleStore.setName('Lisi')">设置姓名</button>
        <button @click="exampleStore.setDateOfBirth({ year: 2000, month: 12, day: 5 })">设置出生日期</button>
        <button @click="exampleStore.setYearOfBirth(2021)">设置出生年份</button>
    </ul>
    <ul class="puppet-ul">
        <li>姓名：<input v-model="exampleStore.name" /></li>
        <br />
        <li>出生日期</li>
        <li>年：<input v-model="changeableDateOfBirth.year" /></li>
        <li>月：<input v-model="changeableDateOfBirth.month" /></li>
        <li>日：<input v-model="changeableDateOfBirth.day" /></li>
    </ul>
    <ul class="puppet-ul">
        <li>出生年份：<input v-model="dateOfBirthShadow.year" /></li>
        <li><button @click="commitDateOfBirthShadow">提交出生年份</button></li>
        <li><button @click="resetDateOfBirthShadow">重置出生年份</button></li>
        <li>出生月份：<input v-model="monthOfBirthShadow" /></li>
        <li><button @click="commitMonthOfBirthShadow">提交出生月份</button></li>
        <li><button @click="resetMonthOfBirthShadow">重置出生月份</button></li>
    </ul>
</template>

<script lang="ts" setup>
import { exampleStore } from '@/stores/index';
const { dateOfBirth, changeableDateOfBirth } = exampleStore;
const [dateOfBirthShadow, commitDateOfBirthShadow, resetDateOfBirthShadow] = exampleStore.dateOfBirthShadow;
const [monthOfBirthShadow, commitMonthOfBirthShadow, resetMonthOfBirthShadow] = exampleStore.monthOfBirthShadow;
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
