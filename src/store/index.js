import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    goodsData:[],
    cartData:[],
    totalPrice:0,
    totalMount:0,
    type:0,
    source:'normal',
    totalSelect:false
  },
  mutations: {
    SET_DATA(state,data){
      const {goodsData,cartData,totalPrice,totalMount,totalSelect}=data;
      state.goodsData=goodsData;
      state.cartData=cartData;
      state.totalPrice=totalPrice;
      state.totalMount=totalMount;
      state.totalSelect=totalSelect;
    },
    SET_TYPE(state,type){
      state.type=type;
    },
    SET_SOURCE(state,source){
      state.source=source;
    },
    SET_TOTAL(state,data){
      const {select,mount,price}=data;
      // if(_type=='PLUS'){
      //   state.totalMount+=1;
      //   state.totalPrice+=price;

      // }else if(_type=="REDUCE"){
      //   state.totalMount-=1;
      //   state.totalPrice-=price;
      // }   
      if(select){
        state.totalMount+=mount;
        state.totalPrice+=price;
      }else{
        state.totalMount-=mount;
        state.totalPrice-=price;
      }
      localStorage.setItem('totalMount',state.totalMount);
      localStorage.setItem('totalPrice',state.totalPrice);
    },
    SET_CART(state,data){
      const {id,name,price,img,_type,stock}=data;
      let index = state.cartData.findIndex(item=>item.id==id);
      if(index==-1){
        state.cartData.push({
          id,name,price,img,_type,stock,
          mount:1,
          tPrice:price
        })
      }else{
        if(_type=='PLUS'){
          state.cartData[index].mount+=1;
          state.cartData[index].tPrice+=price;
        }else if(_type=="REDUCE"){
          state.cartData[index].mount-=1;
          state.cartData[index].tPrice-=price;
          if(!state.cartData[index].mount){
            state.cartData.splice(index,1);
            // state.cartData=state.cartData.filter(item=>item.id!=id)
          }
        }
      }

      
      localStorage.setItem('totalMount',state.totalMount);
      localStorage.setItem('totalPrice',state.totalPrice);
      localStorage.setItem('cartData',JSON.stringify(state.cartData));
     
    },
    
    // 实现元素选中时 使vuex的数据发生改变
    SET_SELETE(state,id){
      console.log(123);
      let index = state.cartData.findIndex((item)=>item.id==id);
      state.cartData[index].select=!state.cartData[index].select;

      localStorage.setItem('cartData',JSON.stringify(state.cartData));
    },

     // 实现元素选中时 使vuex的数据发生改变
    SET_CAETDATA(state,data){
      state.cartData=data;

      localStorage.setItem('cartData',JSON.stringify(state.cartData));
    },
    SET_TOTALSELECT(state,boo){
      state.totalSelect=boo;
      if(boo){
        state.totalMount=0;
        state.totalPrice=0;
        state.cartData.map(item=>{
          item.select=true;
          state.totalMount+=item.mount;
          state.totalPrice+=item.price;
        })
      }else{
        state.cartData.map(item=>{
          item.select=false;
          state.totalMount=0;
          state.totalPrice=0;
        })
      }

      localStorage.setItem('totalSelect',JSON.stringify(state.totalSelect));
      localStorage.setItem('cartData',JSON.stringify(state.cartData));
      localStorage.setItem('totalMount',state.totalMount);
      localStorage.setItem('totalPrice',state.totalPrice);
    }
  },
  actions: {
    setData({commit}){
      const goodsData=JSON.parse(localStorage.getItem('goods'))||[];
      const totalSelect=JSON.parse(localStorage.getItem('totalSelect'))||false;
      console.log(goodsData);
      commit('SET_DATA',{
        goodsData,
        cartData:JSON.parse(localStorage.getItem('cartData'))||[],
        totalPrice:JSON.parse(localStorage.getItem('totalPrice'))||0,
        totalMount:JSON.parse(localStorage.getItem('totalMount'))||0,
        totalSelect
      })
    },
    setTotal({commit},data){
      commit('SET_TOTAL',data)
    },
    setCart({commit},data){
      commit('SET_CART',data)
    },
    setSelect({commit},id){
      commit('SET_SELETE',id)
    },
    setCartData({commit},data){
      commit('SET_CAETDATA',data);
    },

    setTotalSelect({commit},boo){
      commit('SET_TOTALSELECT',boo)
    }
  },
  modules: {
  }
})
