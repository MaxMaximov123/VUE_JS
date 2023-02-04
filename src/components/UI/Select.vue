<template lang="">
    <select v-model="current_item" @change="selected">
        <option v-for="item in items" :key="item">{{item}}</option>
    </select>
</template>
<script>
export default {
    name: 'default-select',
    props: {
        items: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            current_item: this.items[0]
        }
    },

    methods: {
        selected() {
            this.$emit('create', this.current_item);
        }
    },
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