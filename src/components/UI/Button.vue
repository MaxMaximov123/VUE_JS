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
<style scoped lang="scss">
.btn {
    margin: 5px;
    padding: 6px 9px;
    background: none;
    color: rgb(255, 255, 255);
    font-size: 18px;
    border: none;
}

.btn:hover{
    border-radius: 15px;
    background:#818181;
}
</style>