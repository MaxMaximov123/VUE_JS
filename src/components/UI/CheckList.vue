<template>
    <div container>
        <check-box
            v-for="item in items"
            :key="item.id" @change="update_checked" :id="item.id" :base_status="item.status">{{ item.name }}</check-box>
    </div>
</template>
<script>
import CheckBox from '@/components/UI/CheckBox';

export default {
    name: 'check-list',
    props: {
        items: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            statuses: this.items,
        }
    },
    components: { CheckBox },

    methods: {
        update_checked(status, id){
            this.statuses[id].status = status;
            this.$emit('update', this.statuses);
        }
    },
}
</script>
<style>
.container{
    margin: 20px;
}
</style>