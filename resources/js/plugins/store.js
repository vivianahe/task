import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //modals boardControl
        createIndicatorModal: false,
        createDirectiveModal: false,
        //dataModel boardControl
        directives: [],
        indicators: [],
        periodicity: [],
        typeIndicator: [],
        process: [],
        responsable: [],
        //boardControl -> indicator
        meta: '',
        comparativeGraphyear: new Date().getFullYear(),
        detailIndicator: [],
        fullCompliance: [],
        //searchingEmployee
        employee: '',

        //Cam - tracing
        camActionId: '',
        userPermissions: [],
        stateFindingTab: false,
        findingId: 0,
        findActions: [],
        dataPending: [],
        tabCamUpload: {
            tab: false,
            active: false
        },
        tabCamTracing: {
            tab: false,
            active: false
        },
        tabCamPending: {
            tab: true,
            active: false
        },
        tabCamPendingFilter: {
            tab: false,
            active: false
        }
    },
    mutations: {
        //modals boardControl
        changeCreateIndicatorModal(state, newVal) {
            state.createIndicatorModal = newVal;
        },
        changeCreateDirectiveModal(state, newVal) {
            state.createDirectiveModal = newVal;
        },
        changeDirective(state, newVal) {
            state.directives = newVal;
        },
        changeIndicators(state, newVal) {
            state.indicators = newVal;
        },
        changePeriodicity(state, newVal) {
            state.periodicity = newVal;
        },
        changeTypeIndicator(state, newVal) {
            state.typeIndicator = newVal;
        },
        changeProcess(state, newVal) {
            state.process = newVal;
        },
        changeResponsable(state, newVal) {
            state.responsable = newVal;
        },
        changeMeta(state, newVal) {
            state.meta = newVal;
        },
        changeComparativeGraphyear(state, newVal) {
            state.comparativeGraphyear = newVal;
        },
        changeDetailIndicator(state, newVal) {
            state.detailIndicator = newVal;
        },
        changeFullCompliance(state, newVal) {
            state.fullCompliance = newVal;
        },
        changeEmployee(state, newVal){
            state.employee = newVal;
        },

        //CAM
        changeCamActionId(state, newVal) {
            state.camActionId = newVal;
        },
        changeUserPermissions(state, newVal) {
            state.userPermissions = newVal;
        },
        changeStateFindingTab(state, newVal) {
            state.stateFindingTab = newVal;
        },
        changeFindingId(state, newVal) {
            state.findingId = newVal;
        },
        changeDataPending(state, newVal) {
            state.dataPending = newVal;
        },
        changeFindActions(state, newVal) {
            state.findActions = newVal;
        },
        changeTabCamUpload(state, newVal) {
            state.tabCamUpload.tab = newVal.tab;
            state.tabCamUpload.active = newVal.active;
        },
        changeTabCamTracing(state, newVal) {
            state.tabCamTracing.tab = newVal.tab;
            state.tabCamTracing.active = newVal.active;
        },
        changeTabCamPending(state, newVal) {
            state.tabCamPending.tab = newVal.tab;
            state.tabCamPending.active = newVal.active;
        },
        changeTabCamPendingFilter(state, newVal) {
            state.tabCamPendingFilter.tab = newVal.tab;
            state.tabCamPendingFilter.active = newVal.active;
        }
    },
    getters: {
        getDirectives: state => {
            return state.directives
        },
        indicators: state => {
            return state.indicators
        },
        detailIndicator: state => {
            return state.detailIndicator
        },
    },
    actions: {
        getIndicators(context) {
            axios.get('/resource-indicators').then((response) => {
                context.commit('changeIndicators', response.data);
            }).catch((error) => {
                console.log(error.response);
            });
        },
        getDetailIndicators(context, payload) {
            axios.get('/resource-indicators/'+payload.id+'/edit').then((response) => {
                let formData = {
                    id: response.data.id,
                    objective_indicator: response.data.name_objective,
                    periodicity_indicator: response.data.name_periodicity,
                    responsable_indicator: response.data.name_responsable,
                    formula_month_indicator: response.data.formula_month_indicator,
                    num_indicator: response.data.num_indicator,
                    name_indicator: response.data.name,
                    meta_indicator: response.data.meta,
                    numerator: response.data.numerator,
                    denominator: response.data.denominator,
                    symbol_numerator: response.data.symbol_numerator,
                    symbol_denominator: response.data.symbol_denominator,
                    years: response.data.years
                };
                context.commit('changeDetailIndicator', formData);
            }).catch((error) => {
                console.log(error);
            });
        },
        loadDirectives(context, payload) {
            axios.get('/resource-directives').then((response) => {
                context.commit('changeDirective', response.data);
            }).catch((error) => {
                console.log(error.response);
            });
        },

        //CAM
        getActionsByFinding(context, payload) {
            axios.get('/getActionsByFinding/'+payload.id+'/'+payload.type).then((response) => {
                context.commit('changeFindActions', response.data);
            }).catch((error) => {
                console.log(error.response);
            });
        }
    }
})
