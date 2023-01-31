<template lang="">
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'default-button'
}
</script>
<style scoped>
.btn {
    padding: 6px 9px;
    background: none;
    color: #1ddada;
    border: solid #1ddada;
}
</style>