import Vue from 'vue';
import App from './App';
import VueApexCharts from 'vue-apexcharts';


Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
