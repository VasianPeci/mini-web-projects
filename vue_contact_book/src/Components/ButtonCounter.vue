<template>
    <button @click="increment()">Clicked button {{ count }} times.</button>
</template>

<script setup>
    import {ref} from "vue";

    const count = ref(0);
    const increment = () => {
            count.value++;
        }
</script>