import Vue from 'vue'
import App from './App.vue'
import loadUi from './components/LoadingUi.vue'

Vue.config.productionTip = false
Vue.component('LoadingUi', loadUi)

Vue.mixin({
  mounted() {
  },
  methods: {
    formatPrice: function (amount, currency='Rp', decimalCount = 0, decimal = ",", thousands = ".") {
      try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount
    
        const negativeSign = amount < 0 ? "-" : ""
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0
    
        return currency + ' ' + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
