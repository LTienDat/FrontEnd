<template>
    <div class="container-fluid">
        <div class="row" >
            <aside class="col-lg-9">
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-borderless table-shopping-cart">
                            <thead class="text-muted">
                                <tr class="small text-uppercase">
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col" width="120">Số lượng</th>
                                    <th scope="col" width="120">Đơn giá</th>
                                    <th scope="col" width="120">Chọn</th>
                                    <th scope="col" width="120">Xóa</th>
                                </tr>
                            </thead>
                            <tbody v-for='product in user.profile.cart'>
                                <tr class="showItem">
                                    <td>
                                        <router-link :to='`/detail/${product.item._id}`'>
                                            <figure class="itemside align-items-center">
                                                <div class="aside">
                                                    
                                                	   <img :src="product.item.image" class="img-sm"/>
                                                    
                                                </div>
                                                <figcaption class="info"> 
                                                	<a href="#" class="title text-dark" data-abc="true">		{{product.item.name}}
                                                	</a>
                                                    <p class="text-muted small">
                                                    	Kích thước: {{product.item.size}}<br> Brand: {{product.item.brand}}
                                                    </p>
                                                </figcaption>
                                            </figure>
                                        </router-link>
                                    </td>
                                    <td>
                                        <div class="col-xs-6" style="margin-left: 1px;">
                                            <div class="product_quantity">
                                                <div class="quantity">{{product.quantityBuy}}</div>
                                                <div class="upAndDown">
                                                    <div id="pre" @click='increaseQuantity(product.item._id)'>
                                                        <i class="bi bi-caret-up-fill"></i>
                                                    </div>
                                                    <div id="nex" @click='reduceQuantity(product.item._id)'>
                                                        <i class="bi bi-caret-down-fill" ></i>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="price-wrap"> <var class="price">{{formatPrice(product.item.price)}}</var></div>
                                        <div class="price-wrap"> <var class="discount">{{formatPrice(product.item.price * product.item.discount)}}</var></div>
                                    </td>
                                    <td class="text-right d-none d-md-block">
                                        <span data-original-title="Save to Wishlist" title="" class="btn" data-toggle="tooltip" data-abc="true">
                                            <input type="checkbox" v-model='product.checkBuy' @click='selectProduct(product.item._id)'/>
                                        </span>
                                        <span class="btn btn-danger" data-abc="true"  @click='deleteItemInCart(product.item)'>Xóa</span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </aside>
            <aside class="col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <dl class="dlist-align">
                            <dt>Tổng giá: {{totalPay}}</dt>
                            <dd class="text-right ml-3"> {{formatPrice(pay)}}</dd>
                        </dl>
                        <dl class="dlist-align">
                            <dt>Phí vận chuyển:</dt>
                            <dd class="text-right text-danger ml-3">{{formatPrice(shipping)}}</dd>
                        </dl>
                        <dl class="dlist-align">
                            <dt>Tổng thanh toán:</dt>
                            <dd class="text-right text-dark b ml-3"><strong>{{formatPrice(countPay)}}</strong></dd>
                        </dl>
                        <hr>
                        <router-link to="/buy" class="btn btn-out btn-primary btn-square btn-main" data-abc="true">Đặt hàng </router-link>
                        <router-link to="/home" class="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Tiếp tục mua hàng</router-link>
                    </div>
                </div>
            </aside>
        </div>
    </div>	
</template>

<script>
	import { userStore } from '@/stores/userStore.js'
	import { productStore } from '@/stores/productStore.js'
	import API from '@/services/index.js'
    import shareMethods from '@/services/shareMethods.js'
	export default {
		data(){
			return{
                countPay: 0,
				pay : 0,
                shipping: 0,
			}
		},
		setup(){
			const user = userStore()
			const product = productStore()
			return { user ,product}
		},
		methods:{
			formatPrice(pri){
                return shareMethods.formatPrice(pri)
            },

            deleteAllItemInCart(){
                const { _id } = this.user.profile
                API('put', `/${_id}/cart/deleteAll`)
                .then((res)=>{
                    // console.log("Delete All Cart Success")
                    this.user.profile = res.data
                    localStorage.setItem('user', JSON.stringify(res.data));
                }).catch((err)=>{
                    console.log(err.response.data)
                })
            },

			deleteItemInCart(item){
				if(!this.user.profile){
					console.log("Vui long dang nhap")
				}else{
					const { _id } = this.user.profile
					API('put',`/${_id}/cart/delete`, {item:item})
					.then((res)=>{
            			localStorage.setItem('user', JSON.stringify(res.data));
						// console.log(res.data)
						this.user.profile = res.data
					}).catch((err)=>{
						console.log(err)
					})
				}
			},
            increaseQuantity(id){
                const {profile} = this.user
                for( var i = 0;i<profile.cart.length; i++){
                    if(profile.cart[i].item._id === id){
                        if(profile.cart[i].item.quantity >= profile.cart[i].quantityBuy)
                            this.user.profile.cart[i].quantityBuy+=1
                    }
                }
                    
            },
            reduceQuantity(id){
                const {profile} = this.user
                for( var i = 0;i<profile.cart.length; i++){
                    if(profile.cart[i].item._id === id){
                        if(1 < profile.cart[i].quantityBuy)
                            this.user.profile.cart[i].quantityBuy-=1
                    }
                }
            },
            selectProduct(id){
                const {profile} = this.user
                for( var i = 0;i<profile.cart.length; i++){
                    if(profile.cart[i].item._id === id){
                        if(profile.cart[i].checkBuy === true){
                            this.user.profile.cart[i].checkBuy = false
                        }
                        if(profile.cart[i].checkBuy === false){
                            this.user.profile.cart[i].checkBuy = true
                        }
                    }
                }
            },                
		},
		computed:{
			totalPay(){
				if(!this.user.profile){
					this.pay = 0
                    this.countPay = 0
				}else{
                    const { cart } = this.user.profile
                    this.pay = 0
					for (var i = 0; i < cart.length; i++) {
                        if(cart[i].checkBuy === true){
                            this.pay += cart[i].item.price * cart[i].item.discount * cart[i].quantityBuy
                        }
					}
                    this.shipping = this.pay * 0.01
                    this.countPay = this.pay + this.shipping
				}
			},

		}
	}
</script>

<style type="text/css" scoped>
.img-sm {
    width: 80px;
}

.itemside .info {
    padding-left: 15px;
    padding-right: 7px
}

.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 0px
}

.itemside {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%
}


.btn.btn-out {
    /* outline: 1px solid #fff; */
    outline-offset: -5px
}

.btn-main {
    border-radius: 2px;
    text-transform: capitalize;
    font-size: 15px;
    padding: 10px 19px;
    cursor: pointer;
    color: #fff;
    width: 100%
}


.product_quantity .quantity {
    display:flex;
    width: 30px;
    height: 40px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    color: black;
    text-align: center;
    padding-left: 9px;
    line-height: 50px;
    float: left
}
.bi{
	color: red;
}
.btn-apply[data-v-224fab74] {
    font-size: 16px;
}
.deleteItem{
	cursor: pointer;
}
.quantity{
    float: left;
}
.upAndDown{
    position: relative;
    top: -0.8rem;
}

</style>