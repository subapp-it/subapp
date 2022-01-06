<template>
  <q-page v-if="userLogged">
    <div class="q-pa-lg">
      <table-availment @openModal="openModal('load-availment', 'Offri Avvalimento', true, loadAvailmentClassObj, false)"></table-availment>
    </div>
    <modal :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import TableAvailment from 'components/TableAvailment'
import Modal from 'components/Modal'

export default {
  name: 'UserAvailment',
  components: { Modal, TableAvailment },
  data () {
    return {
      loadAvailmentClassObj: {
        'q-pa-none': true
      },
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      modal: false,
      selectedRdo: null,
      classObj: {}
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  methods: {
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    }
  }
}
</script>

<style scoped>

</style>
