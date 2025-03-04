<!-- src/components/PayPalButton.vue -->
<template>
    <div ref="paypalButtonContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { loadScript } from "@paypal/paypal-js";

const props = defineProps({
    amount: {
        type: String,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["payment-success", "payment-error"]);
const paypalButtonContainer = ref(null);

// Function to load PayPal and render buttons
const renderPayPalButton = async () => {
    try {
        // Load the PayPal SDK
        const paypal = await loadScript({
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD",
        });

        // Clear existing buttons first
        if (paypalButtonContainer.value) {
            paypalButtonContainer.value.innerHTML = "";
        }

        // Render the PayPal button
        paypal
            .Buttons({
                // Set up the transaction
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: `${props.packageName} Sponsorship Package`,
                                amount: {
                                    value: props.amount
                                        .replace("$", "")
                                        .replace(",", ""),
                                },
                            },
                        ],
                    });
                },
                // Handle successful payment
                onApprove: (data, actions) => {
                    return actions.order.capture().then(function (details) {
                        emit("payment-success", {
                            orderID: data.orderID,
                            details: details,
                        });
                    });
                },
                // Handle errors
                onError: (err) => {
                    console.error(err);
                    emit("payment-error", err);
                },
            })
            .render(paypalButtonContainer.value);
    } catch (error) {
        console.error("Failed to load PayPal JS SDK:", error);
    }
};

// Initial render
onMounted(renderPayPalButton);

// Re-render if amount changes
watch(() => props.amount, renderPayPalButton);
</script>
