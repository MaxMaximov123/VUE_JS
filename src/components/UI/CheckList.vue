<template>
    <div container>
        <check-box
            v-show="item.show"
            v-for="item in items"
            :key="item.id" @change="update_checked" :data_status="item"></check-box>
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
        update_checked(status){
            this.statuses[status.id] = status;
            this.$emit('update', status);
        }
    },
}
</script>
<style>
.container{
    margin: 20px;
}
</style>