<template>
   <div class="modal-window" @click.self="close">
       <div class="modal-window__outer">
            <button class="modal-window__close-button" @click="close">
               &times;
            </button>
            <slot class="modal-window__inner"/>
       </div>
    </div>
</template>

<script>

export default {
    name: 'ModalWindow',

    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style>
    .modal-window {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: '';
        display: flex;
        background-color: rgba(49, 49, 49, 0.5);
    }
    .modal-window__outer {
        padding: 2rem 3rem;
        margin: auto;
        position: relative;
        display: flex;
        background-color: white;
    }
    .modal-window__inner {
        margin: auto;
    }
    .modal-window__close-button {
        position: absolute;
        top: 0;
        right: 0;
    }

</style>

