import { ApiFactory } from 'src/common/api/apiFactory'
import querystring from 'query-string'
const BoardService = ApiFactory.get('board')

export default {
  async createRdo ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.post('/rdo/' + pathParam, body)
    return data
  },
  async createAvailment ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.post('/availment/' + pathParam, body)
    return data
  },
  async createContract ({ commit }, { body }) {
    const { data } = await BoardService.post('/contract', body)
    return data
  },
  async updateRdo ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.put('/rdo/' + pathParam, body)
    return data
  },
  async updateAvailment ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.put('/availment/' + pathParam, body)
    return data
  },
  async updateContract ({ commit }, { pathParam, body }) {
    const { data } = await BoardService.put('/contract/' + pathParam, body)
    return data
  },
  async fetchAllRdos ({ commit }) {
    const { data } = await BoardService.get('/rdo/all')
    commit('SET_BOARD_RDOS', data)
    return data
  },
  async fetchAllAvailments ({ commit }) {
    const { data } = await BoardService.get('/availment/all')
    commit('SET_BOARD_AVAILMENTS', data)
    return data
  },
  async fetchAllContracts ({ commit }) {
    const { data } = await BoardService.get('/contract/all')
    commit('SET_BOARD_CONTRACTS', data)
    return data
  },
  async fetchFilteredRdos ({ commit }, { queryparams }) {
    const { data } = await BoardService.get('/rdo?' + querystring.stringify(queryparams))
    commit('SET_BOARD_FILTERED_RDOS', data)
    return data
  },
  async fetchRdo ({ commit }, { pathParam }) {
    const { data } = await BoardService.get('/rdo/' + pathParam)
    commit('SET_RDO', data)
    return data
  },
  async fetchAvailment ({ commit }, { pathParam }) {
    const { data } = await BoardService.get('/availment/' + pathParam)
    commit('SET_AVAILMENT', data)
    return data
  },
  async deleteRdo ({ commit }, { pathParam }) {
    const { data } = await BoardService.delete('/rdo/' + pathParam)
    commit('SET_RDO', data)
    return data
  },
  async deleteAvailment ({ commit }, { pathParam }) {
    const { data } = await BoardService.delete('/availment/' + pathParam)
    // commit('SET_AVAILMENT', data)
    return data
  },
  async deleteContract ({ commit }, { pathParam }) {
    const { data } = await BoardService.delete('/contract/' + pathParam)
    return data
  }
}
