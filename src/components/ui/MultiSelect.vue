<template>
  <div class="multiselect">
    <div class="selectBox" v-on:click="showBox">
      <select>
        <option>{{name}}</option>
      </select>
      <div class="overSelect"></div>
    </div>

    <transition name="fade">
      <div id="checkboxes" v-if="isActive" >
        <div class="filter-multicheckbox" v-for="(val,index) of valueoptions" :key="index">
        <label v-if="val.value">
          <input type="checkbox" class="filled-in" v-model="dataCheked" :id="val.value" :value="val.value" v-on:change="updateValue(dataCheked)"/>
          <span>{{val.name}} </span>
         </label>
        <label v-else>
          <input type="checkbox" class="filled-in" v-model="dataCheked" :id="val" :value="val" v-on:change="updateValue(dataCheked)"/>
          <span>{{val}}</span>
        </label>
        </div>
      </div>
    </transition>
    
  </div>
</template>
<script>
export default {
  name: 'MultiSelect',
  props: {
    name: undefined,
    valueoptions: undefined
  },
  data() {
    return {
      dataCheked: [],
      isActive: false,
    }
  },
  methods: {
    showBox() {
      this.isActive = !this.isActive;
    },
    objKeys(obj) {
      return Object.keys(obj);
    },
    updateValue: function (value) {
      if (value.length < 1) {
        this.isActive = false;
      }
      this.$emit('updateSelected', value);
    }
  
  }
}
</script>
<style>
/*-- --*/
.multiselect {
  margin:15px;
  position: relative;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-size: 15px;
  background-color: rgba(255,255,255,0.9);
  width: 100%;
  padding: 5px;
  border: 1px solid #f2f2f2;
  border-radius: 2px;
  height: 3rem;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: all  1s ease;
  opacity: 0;
}

#checkboxes {
  border: 1px #dadada solid;
  position: absolute;
  background: #fff;
  width: 100%;
  z-index: 5;
  padding-top: 5px;
  margin-top: -2px;
  max-height: 180px;
  overflow-x: scroll;
}

#checkboxes.active {
  display: block;
}

#checkboxes label {
  text-align: left;
  display: block;
  padding:10px;
  font-size: 14px;
}

#checkboxes label:hover {
  background-color: #1e90ff;
}
[type="checkbox"]:not(:checked), [type="checkbox"]:checked {
    position: absolute;
    right: 10px;
    opacity: 0;
    pointer-events: none;
}

[type="checkbox"], [type="radio"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
}
[type="checkbox"]+span:not(.lever) {
    width: 100%;
    position: relative;
    cursor: pointer;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
[type="checkbox"].filled-in:not(:checked)+span:not(.lever):before {
    width: 0;
    height: 0;
    border: 3px solid transparent;
    right: 13px;
    top: 10px;
    -webkit-transform: rotateZ(37deg);
    transform: rotateZ(37deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in+span:not(.lever):before, [type="checkbox"].filled-in+span:not(.lever):after {
    content: '';
    right: 0;
    position: absolute;
    -webkit-transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;
    transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;
    z-index: 1;
}
[type="checkbox"]+span:not(.lever):before, [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
    content: '';
    position: absolute;
    top: 0;
    right: 13px;
    width: 18px;
    height: 18px;
    z-index: 0;
    border: 2px solid #5a5a5a;
    border-radius: 1px;
    margin-top: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}
[type="checkbox"].filled-in:checked+span:not(.lever):before {
    top: -1px;
    right: 13px;
    width: 6px;
    height: 13px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 3px solid #fff;
    border-bottom: 3px solid #fff;
    -webkit-transform: rotateZ(37deg);
    transform: rotateZ(37deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}
[type="checkbox"].filled-in:not(:checked)+span:not(.lever):after {
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: 2px solid #5a5a5a;
    top: 0px;
    z-index: 0;
}
[type="checkbox"].filled-in+span:not(.lever):after {
    border-radius: 2px;
}
[type="checkbox"].filled-in:checked+span:not(.lever):after {
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #26a69a;
    background-color: #26a69a;
    z-index: 0;
}
</style>
