<template>
  <div id="app">
    <div class="filter-data">
      <div>
        <input
          type="text"
          v-model="searchValue"
          class="search"
          placeholder="Search Furniture"
        />
      </div>
      <div class="row-flex">
        <MultiSelect :name="'Furniture Styles'" :valueoptions="furniture_styles" @updateSelected="filterByStyle" />
        <MultiSelect :name="'Delivery Time'" :valueoptions="delivery_time" @updateSelected="filterByDelivery"/>
      </div>
    </div>
    <LoadingUi :loaded="loaded">
      <div class="products">
        <div class="card" v-for="(p,index) of products" :key="index">
          <div class="product-item">
            <h3 class="product-name">{{p.name.substring(0,50)}} <span class="price">{{formatPrice(p.price,'Rp')}}</span></h3>
            <p>{{p.description.substring(0,114)}}..</p>
            <span class="product-style" >{{p.furniture_style.join(', ')}}</span>
            <div class="delivery">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="truck" class="svg-inline--fa fa-truck fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path></svg>
              <span class="label"> {{ p.delivery_time }} Hari </span>
            </div>
          </div>
        </div>
      </div>
    </LoadingUi>
  </div>
</template>

<script>
import axios from 'axios'
import MultiSelect from './components/ui/MultiSelect.vue'
export default {
  name: 'app',
  components: {
    MultiSelect
  },
  data () {
    return {
      loaded: false,
      searchValue: '',
      products: [],
      furniture_styles:[],
      selected_furniture_styles:[],
      delivery_time:[
        { value: '7', name: '1 Weeks'},
        { value: '14', name: '2 Weeks'},
        { value: '31', name: '1 Month'},
        { value: 'more', name: '& More'},
      ],
      selected_delivery_time:[],
      error: '',
    }
  },
  created: function () {
    this.fetchData()
  },
  computed: {
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    searchValue: function(val) {
        this.searchByName(val)
    }
    
  },
  methods: {
    fetchData (params) {
      axios.post('https://www.mocky.io/v2/5c9105cb330000112b649af8', params)
        .then(response => {
          this.loaded = true
          this.products = response.data.products
          this.furniture_styles = response.data.furniture_styles
        })
    },
    searchByName(params) {
      this.loaded = false
      axios.post('https://www.mocky.io/v2/5c9105cb330000112b649af8', params)
        .then(response => {
          this.loaded = true
          this.products = response.data.products.filter(product => {
            return product.name.toLowerCase().includes(this.searchValue.toLowerCase())
          })
        })
    },
    filterByStyle (params) {
      var vm = this
      this.selected_furniture_styles = params
        this.loaded = false
        axios.post('https://www.mocky.io/v2/5c9105cb330000112b649af8', params)
          .then(response => {
            this.loaded = true
            if ( params.length > 0 ) {
              this.products = response.data.products.filter(function (product) {
                return product.furniture_style.find(style => params.includes(style))
              })
            } else {
              this.products = response.data.products
            }
          })
    },
    filterByDelivery (params) {
      this.loaded = false
        params = Math.max.apply(Math, params);
        axios.post('https://www.mocky.io/v2/5c9105cb330000112b649af8', params)
          .then(response => {
            this.loaded = true
            if ( params.length > 0 && !params.includes("more") ) {
              this.products = response.data.products.filter(function (product) {
                return parseInt(product.delivery_time) <= parseInt(params);
              })
            } else {
              this.products = response.data.products
            }
       })
    }
    
  }
}
</script>
