<template>
    <label class="container"><slot></slot>
        <input v-model="status" type="checkbox" @change="selected">
        <span class="checkmark"></span>
    </label>
</template>
<script>
export default {
  name: 'check-box',
  props: {
        id: {
          required: true
        },
        base_status: {
          required: true
        }
    },
  data() {
      return {
        status: true || true,
      }
  },
  methods: {
        selected() {
          console.log(this.status)
          /* this.$emit('change', this.status, this.id); */
        }
    },
    
}
</script>
<style>
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select: none;
  }
  
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>