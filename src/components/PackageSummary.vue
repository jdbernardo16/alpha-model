<template>
    <div class="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 class="text-lg font-bold mb-2">Package Summary</h3>
        <p>
            <strong>Package:</strong>
            {{ packageName }}
        </p>
        <p>
            <strong>Price:</strong>
            {{ packagePrice }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    packageName: {
        type: String,
        required: true,
    },
    packagePrice: {
        type: String,
        required: true,
    },
});
</script>
