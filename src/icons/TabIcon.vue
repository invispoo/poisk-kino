<template>
    <svg v-if="isOnMainPage" @click="$emit('switch')"
    fill="#FFFFFF" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" stroke-width="65" style="padding-top: 5px;">
        <path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
    </svg>
    <svg v-else @click="$emit('manage')"
    width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
        v-if="!isAddedToTabs"
        stroke="#FFFFFF"
        fill="none"
        />
        <path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" 
        v-else
        stroke="#FFFFFF"
        fill="#FFFFFF"
        />
    </svg>
</template>

<script>
    export default {
        emits: ['switch', 'manage'],
        props: {
            isOnMainPage: Boolean,
            isAddedToTabs: Boolean
        },
    }
</script>