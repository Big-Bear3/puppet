<template>
    <ul class="animal-ul">
        <li>======================================shallow object=========================================</li>
        <br />
        <li>
            <span>shallowDog：</span>
            <input v-model="shallowAnimals.dog" />
            <button class="event-btn" @click="animalStore.setShallowDog">Change Dog</button>
        </li>
        <li>
            <span>shallowCat：</span>
            <input v-model="shallowAnimals.cat" />
            <button class="event-btn" @click="animalStore.removeShallowCat">Remove Cat</button>
        </li>
        <li>
            <span>shallowPigs：</span>
            <input v-for="(shallowPig, index) in shallowPigs" :key="index" v-model="shallowPigs[index]" style="width: 70px" />
            <button class="event-btn" @click="animalStore.pushShallowPig">Push Pig</button>
            <button class="event-btn" @click="animalStore.removeShallowPig">Remove Pig</button>
        </li>
        <br />
        <li>======================================shallow array=========================================</li>
        <br />
        <li>
            <span>shallowDucksArray：</span>
            <input
                v-for="(shallowDuck, index) in shallowDucksArray"
                :key="index"
                v-model="shallowDucksArray[index]"
                style="width: 70px"
            />
            <button class="event-btn" @click="animalStore.insertDuck">Insert Duck</button>
            <button class="event-btn" @click="animalStore.setThirdDuck">Change Third Duck</button>
        </li>
        <br />
        <li>======================================deep object=========================================</li>
        <br />
        <li>
            <span>deepMonkey：</span>
            <input v-model="deepAnimals.redAnimals.monkey" />
            <button class="event-btn" @click="animalStore.setMonkey">Change Monkey</button>
        </li>
        <li>
            <span>deepFish：</span>
            <span>{{ fishes }}</span>
            <button class="event-btn" @click="animalStore.addFish">Add Fish</button>
            <button class="event-btn" @click="animalStore.setCarp">Change Carp</button>
        </li>
        <li>
            <span>deepLion（shallow watch）：</span>
            <input v-model="deepLionShallowWatch" />
            <button class="event-btn" @click="animalStore.setLion">Change Lion</button>
        </li>
        <li>
            <span>deepLion（deep watch）：</span>
            <input v-model="deepLionDeepWatch" />
            <button class="event-btn" @click="animalStore.setLion">Change Lion</button>
        </li>
        <li>
            <span>deepLion（effect watch）：</span>
            <input v-model="deepLionEffectWatch" />
            <button class="event-btn" @click="animalStore.setLion">Change Lion</button>
        </li>
        <li>
            <span>deepCamel：</span>
            <input v-model="deepCamel.camel" />
            <button class="event-btn" @click="animalStore.setCamel">Change Camel</button>
        </li>
        <br />
        <li>======================================deep array=========================================</li>
        <br />
        <li>
            <span>deepFirstDolphins：</span>
            <input
                v-for="(dolphin, index) in firstDolphins.dolphin"
                :key="index"
                v-model="firstDolphins.dolphin[index]"
                style="width: 70px"
            />
            <button class="event-btn" @click="animalStore.setFirstDolphin">Change First Dolphins</button>
        </li>
        <li>
            <span>deepSecondDolphins：</span>
            <input v-for="(dolphin, index) in secondDolphins" :key="index" v-model="secondDolphins[index]" style="width: 70px" />
            <button class="event-btn" @click="animalStore.changeSecondDolphin(1)">Change Second Dolphin</button>
            <button class="event-btn" @click="animalStore.changeSecondDolphins(0, 2)">Change Second Dolphins</button>
            <button class="event-btn" @click="animalStore.changeSecondDolphins2(0, 1, 2)">Change Second Dolphins2</button>
            <button class="event-btn" @click="animalStore.changeSecondDolphinsArray([1, 2])">Change Second Dolphins Array</button>
        </li>
        <br />
        <li>======================================动态数据=========================================</li>
        <br />
        <li>
            <span>dynamicTiger：</span>
            <span>{{ dynamicDeepAnimals }}</span>
            <button class="event-btn" @click="animalStore.toggleTiger">Toggle Tiger</button>
        </li>
        <li>
            <span>dynamicAnimalsArray：</span>
            <div>{{ dynamicDeepAnimalsArray }}</div>
            <div>{{ dynamicDeepAnimalsArray }}</div>
            <button class="event-btn" @click="animalStore.toggleDeepAnimalsArray">Toggle Animals Array</button>
            <button class="event-btn" @click="animalStore.toggleTiger2">Toggle Tiger2 Log Error</button>
        </li>
    </ul>
    <!-- <button @click="commit">提交</button> -->
</template>

<script lang="ts" setup>
import { animalStore } from '@/stores/index';
import { computed, ref, watch, watchEffect } from 'vue';
const { shallowAnimals, shallowDucksArray, deepAnimals, firstDolphins, dynamicDeepAnimals, dynamicDeepAnimalsArray } = animalStore;
const shallowPigs = shallowAnimals.pigs;

const fishes = computed(() => {
    const fishesObj = deepAnimals.redAnimals.fish;
    const fishesArray = [];
    for (const key of Object.keys(fishesObj)) {
        fishesArray.push(fishesObj[key]);
    }
    return fishesArray;
});

const deepLionShallowWatch = ref();
watch(
    () => deepAnimals.yellowAnimals[0],
    () => {
        deepLionShallowWatch.value = deepAnimals.yellowAnimals[0];
    },
    { immediate: true }
);

const deepLionDeepWatch = ref();
watch(
    () => deepAnimals,
    () => {
        deepLionDeepWatch.value = deepAnimals.yellowAnimals[0];
    },
    { immediate: true, deep: true }
);

const deepLionEffectWatch = ref();
watchEffect(() => {
    deepLionEffectWatch.value = deepAnimals.yellowAnimals[0];
});

const deepCamel = deepAnimals.yellowAnimals[1];

const secondDolphins = animalStore.getSecondDolphins();
</script>
<style lang="less">
.animal-ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .event-btn {
        margin-left: 10px;
    }
}
</style>
