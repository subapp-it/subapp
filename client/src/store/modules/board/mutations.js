export default {
  SET_BOARD_RDOS (state, payload) {
    state.boardRdos = payload.rdos
  },
  SET_BOARD_AVAILMENTS (state, payload) {
    state.boardAvailments = payload.availments
  },
  SET_BOARD_CONTRACTS (state, payload) {
    state.boardContracts = payload.contracts
  },
  SET_BOARD_FILTERED_RDOS (state, payload) {
    state.boardFilteredRdos = payload.rdos
  },
  SET_RDO (state, payload) {
    state.rdo = payload.rdo
  },
  SET_AVAILMENT (state, payload) {
    state.availment = payload.availment
  }
}
