<template>
    <div class="border p-6 border-black">
        <button @click="showAnswer = !showAnswer" class="flex justify-between w-full text-left">
            <span class="font-bold">{{ question }}</span>
            <span>{{ showAnswer ? '−' : '+' }}</span>
        </button>
        <div v-if="showAnswer" class="mt-6">
            <p>{{ answer }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const showAnswer = ref(false);
</script>
