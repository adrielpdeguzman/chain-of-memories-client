<template lang="pug">
transition(name='fade')
  .Modal(
    :class='[{ "Modal--large": large }]'
    v-if='show'
    @click.self="close"
    @keyup.esc="close"
  )
    .Modal__container
      .Modal__header
        slot(name='header') Modal Header
      .Modal__body
        slot(name='body') Modal Body
      .Modal__footer
        slot(name='footer')
          button.Modal__button(type='submit', @click='callback') {{ okText }}
          button.Modal__button(type='button', @click='close') {{ cancelText }}
</template>

<script>
export default {
  name: 'Modal',

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },

    large: {
      type: Boolean,
      default: false,
    },

    okText: {
      type: String,
      default: 'Ok',
    },

    cancelText: {
      type: String,
      default: 'Cancel',
    },

    callback: {
      type: Function,
      default() {},
    },
  },

  methods: {
    /**
     * Close the modal (emit modal-close event).
     */
    close() {
      this.$emit('modal-close');
    },
  },

  watch: {
    /**
     * Toggle body scrolling when displaying the modal.
     */
    show() {
      window.document.querySelector('body').classList.toggle('body-no-scroll');
    },
  },
};
</script>

<style lang="stylus">
.Modal
  align-items: flex-start
  background: rgba(33, 33, 33, 0.5)
  display: flex
  height: 100%
  justify-content: center
  overflow-y: scroll
  position: fixed
  top: 0
  width: 100%
  z-index: 3

  &__container
    background: #fff
    border: 1px solid #eee
    display: flex
    flex-flow: wrap column
    margin: 32px
    width: 480px

    .Modal--large &
      width: 720px

    > div
      padding: 10px

  &__header
    font-size: 16px
    font-weight: bold

  &__body
    border-bottom: 1px solid #eee
    border-top: 1px solid #eee

  &__footer
    text-align: right

.fade-enter-active
.fade-leave-active
  transition: opacity .25s

.fade-enter
.fade-leave-active
  overflow-y: hidden
  opacity: 0

.body-no-scroll
  overflow-y: hidden
  padding-right: 15px
</style>
