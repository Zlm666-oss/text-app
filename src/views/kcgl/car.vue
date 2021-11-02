<template>
  <div id="page-cart" class="device">
    <header class="header">
     
      <router-link class="back" to="kcgl">返回</router-link>
        <span class="header-edit">
            <span>编辑</span> <span style="display: none">完成</span>
        </span>
    </header>
    <div class="page">
      <ul class="goods-list cart-list">
        <li class="goods-item" v-for="item in cartData" :key="item.id">
          <div class="item-selector">
            <div
              class="icon-selector"
              :class="{ 'selector-active': item.select }"
            >
              <input type="checkbox" @change="setSelect(item)" />
            </div>
          </div>
          <div class="goods-img">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="goods-info">
            <p class="goods-title">{{ item.name }}</p>
            <div class="goods-price">
              <span
                >¥<b>{{ item.price }}</b></span
              >
            </div>
            <span class="des">库存{{ item.stock }}件</span>
            <div class="goods-num">
              <div class="num-btn" @click="handle('PLUS', item.price, item.id)">
                +
              </div>
              <div class="show-num">{{ item.mount }}</div>
              <div
                class="num-btn"
                @click="handle('REDUCE', item.price, item.id)"
              >
                -
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="action-bar">
      <div class="g-selector">
        <div class="item-selector">
          <div
            class="icon-selector"
            :class="{ 'selector-active': totalSelect }"
          >
            <input type="checkbox" v-model="tSelect" />
          </div>
        </div>
        <span>全选</span>
      </div>
      <div class="action-btn buy-btn">去结算({{ totalMount }})</div>
      <div class="action-btn del-btn">删除(0)</div>
      <div class="total">
        合计：<span
          >¥<b>{{ totalPrice }}</b></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["totalMount", "totalPrice", "totalSelect", "cartData"]),
    tSelect: {
      get() {
        // return this.totalSelect
        return this.cartData.every((item) => item.select);
      },
      set(value) {
        this.$store.dispatch("setTotalSelect", value);
      },
    },
  },
  created() {
    this.$store.dispatch("setData");
  },
};
</script>
<style lang="scss" scoped>
.device {
  position: relative;
  float: left;
  width: 100%;
  height: 548px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  .header {
        padding: 0 4%;
        position: relative;
        height: 44px;
        line-height: 44px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        text-align: center;
        .back{
            float: left;
        }
        .cart{
            float: left;
        }
        .header-edit {
            float: right;
            padding: 0 10px;
            cursor: pointer;
        }
    }
  
  .empty-states {
    padding-top: 60px;
    font-size: 18px;
    color: #aeb0b7;
    text-align: center;
  }
  .cart-list .goods-info {
    width: 68%;
  }

  .goods-list {
    padding-top: 8px;
    height: 513px;
    overflow-y: scroll;
  }

  .cart-list {
    height: 560px;
  }
  .action-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 52px;
    font-size: 15px;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }

  .g-selector {
    float: left;
    width: 70px;
    margin-left: 4%;
    height: 502px;
    cursor: pointer;
  }
  .item-selector {
    width: 12%;
  }

  .item-selector {
    width: 12%;
  }

  .icon-selector {
    position: relative;
    margin: 16px auto 0 auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    input {
      opacity: 0;
      width: 18px;
      height: 18px;
    }
  }

  .selector-active {
    background-color: #7a45e5;
    border-color: #7a45e5;
  }
  .g-selector .item-selector {
    position: relative;
    display: inline-block;
  }

  .g-selector span {
    position: absolute;
    margin-left: 20px;
    color: #5f646e;
    top: 15px;
  }

  .total {
    float: right;
    color: #363636;
    font-size: 14px;
    line-height: 50px;
    margin-right: 20px;
  }

  .total span {
    color: #7a45e5;
  }

  .total b {
    font-size: 17px;
    margin-left: 4px;
  }

  .action-btn {
    float: right;
    width: 120px;

    height: 100%;
    color: #fff;
    text-align: center;
    font-weight: 300;
    line-height: 52px;
    cursor: pointer;
  }

  .buy-btn {
    background-color: #7a45e5;
  }

  .del-btn {
    display: none;
    background-color: #ff4069;
  }

  .del-box .total {
    display: none;
  }

  .del-box .buy-btn {
    display: none;
  }

  .del-box .del-btn {
    display: block;
  }

  .goods-list {
    padding-top: 8px;
    height: 513px;
    overflow-y: scroll;
  }

  .cart-list {
    height: 560px;
  }

  .goods-item {
    display: flex;
    margin-bottom: 8px;
    padding: 10px 6px;
    min-height: 62px;
    background: #fff;
  }

  .goods-img {
    position: relative;
    margin-right: 4%;
    display: block;
    width: 16%;
  }

  .goods-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .goods-item .flag {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    background-color: #fc5951;
    border-radius: 50%;
  }

  .goods-info {
    position: relative;
    width: 80%;
  }

  .goods-title {
    width: 80%;
    height: 38px;
    color: #363636;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goods-price {
    margin-top: 6px;
    line-height: 1;
  }

  .goods-price span {
    font-size: 15px;
    color: #7a45e5;
  }
}
</style>
