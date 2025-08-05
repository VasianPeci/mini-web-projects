<template>
    <div class="bg-info rounded p-1 pb-4 m-2">
        <div class="row">
            <div class="col-5">
                <h1 class="mb-3">Contact</h1>
                <h3>My name is : {{ name }}</h3>
                <p class="mt-3">My email is : {{ email }}.</p>
                <p>My phone number is : {{ phone }}.</p>
            </div>
            <div class="col-4">
                <button @click="toggleFavorite()" :class="[isFavorite ? 'btn btn-warning form-control' : 'btn btn-success form-control']">
                    {{ isFavorite ? 'Remove from ' : 'Add to '}}favorite
                </button>
            </div>
            <div class="col-3">
                <LuckyNumber></LuckyNumber>
            </div>
            <span class="float-end small mt-3" v-if="owner !== ''">* This info belongs to {{ owner }}.</span>
        </div>
    </div>
</template>

<script setup>

import {ref} from 'vue';
import LuckyNumber from './LuckyNumber.vue';
const props = defineProps({name: String, phone: String, owner: {type: String, required: true, default: 'Vasian'}, email: String, isFavorite: Boolean});

const emit = defineEmits(["update-favorite"]);

function toggleFavorite() {
    emit("update-favorite", props.isFavorite);
}

</script>