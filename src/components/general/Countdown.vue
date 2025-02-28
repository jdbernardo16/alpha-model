<template>
    <div v-if="timeRemaining">
        <div class="flex items-center space-x-5 lg:space-x-10">
            <div class="text-center">
                <p class="text-3xl lg:text-[4rem] font-bold font-serif text-primary-pink">
                    {{ timeRemaining.days }}
                </p>
                <p class="lg:text-3xl">Days</p>
            </div>
            <div class="text-center">
                <p class="text-3xl lg:text-[4rem] font-bold font-serif text-primary-pink">
                    {{ timeRemaining.hours }}
                </p>
                <p class="lg:text-3xl">Hours</p>
            </div>
            <div class="text-center">
                <p class="text-3xl lg:text-[4rem] font-bold font-serif text-primary-pink">
                    {{ timeRemaining.minutes }}
                </p>
                <p class="lg:text-3xl">Minutes</p>
            </div>
            <div class="text-center">
                <p class="text-3xl lg:text-[4rem] font-bold font-serif text-primary-pink">
                    {{ timeRemaining.seconds }}
                </p>
                <p class="lg:text-3xl">Seconds</p>
            </div>
        </div>
    </div>
    <p v-else>Event has passed.</p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
    targetDate: {
        type: String,
        required: true,
    },
});

const timeLeft = ref<number | null>(null);
let intervalId: number;

onMounted(() => {
    calculateTimeLeft();
    intervalId = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

const calculateTimeLeft = () => {
    const target = new Date(props.targetDate).getTime();
    const now = new Date().getTime();
    timeLeft.value = target - now;
};

const timeRemaining = computed(() => {
    if (timeLeft.value === null || timeLeft.value <= 0) {
        return null;
    }

    const days = Math.floor(timeLeft.value / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft.value % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
});
</script>
