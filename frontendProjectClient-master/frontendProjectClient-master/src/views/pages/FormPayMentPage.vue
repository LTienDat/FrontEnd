<template>
<div class="container col-7">
	<div class="invoice">
		<h2>MEGA Store</h2>
		<h5>http://localhost:3000</h5>
		 <div class="khoangcach"></div>
		<div class="info row col-10">
			<div class="col-5">Họ tên: {{info.firstName}} {{info.lastName}}</div>
			<div class="col-5">Số điện thoại: {{info.phoneNomber}}</div>
		</div>
		<div class="address">Địa chỉ: {{info.address}}</div>
		<div class="khoangcach"></div>

		<thead class="text-muted">
            <tr class="small text-uppercase">
                <th scope="col-3">Sản phẩm</th>
                <th scope="col-3" width="120">Số lượng</th>
                <th scope="col-3" width="120">Giá bán</th>
                <th scope="col-3" width="120">Thành tiền</th>
            </tr>
        </thead>
	    <tbody  v-for='product in info.cart'>
	    	<tr v-if='product.checkBuy'>
		    	<td>
			        <figure class="itemside align-items-center">
			            <div class="aside">
			            	<img :src="product.item.image" class="img-sm"/>
			            </div>
			            <figcaption class="info"> 
			            	<a href="#" class="title text-dark" data-abc="true">		
			            		{{product.item.name}}
			            	</a>
			                <p class="text-muted small">
			                	Kích thước: {{product.item.size}}<br> Brand: {{product.item.brand}}
			                </p>
			            </figcaption>
			        </figure>
		        </td>
		        <td>
	                <div class="col-xs-6" style="margin-left: 1px;">
	                    <div class="product_quantity">
	                        {{product.quantityBuy}}
	                    </div>
	                </div>
	            </td>
	            <td>
	                <div class="price-wrap"> <var class="price">{{formatPrice(product.item.price)}}</var></div>
	                <div class="price-wrap"> <var class="discount">{{formatPrice(product.item.price * product.item.discount)}}</var></div>
	            </td>
	            <td>
	            	 <div class="price-wrap"> <var class="price">{{formatPrice(product.item.price*product.item.discount * product.quantityBuy)}}</var></div>
	            </td>
            </tr>
	    </tbody>
	    <div class="khoangcach"></div><br/>
	    <div class="info row col-10">
			<div class="col-5">Tổng tiền hàng:</div>
			<!-- <div class="col-5">(Đã làm tròn): {{info.phoneNomber}}</div> -->
			<div class="address col-5">{{totalPay}}{{formatPrice(pay)}}</div>
		</div><br/>
	    <div class="khoangcach"></div><br/>
	    <button class="btn btn-success" @click='confirmPayment()'>Xác nhận thanh toán</button>
	</div>
</div>
</template>
<script>
	import shareMethods from '@/services/shareMethods.js'
	import API from '@/services/index.js'
	import { userStore } from '@/stores/userStore.js'
	export default{
		setup(){
			const user = userStore()
			return { user }
		},
		data(){
			return {
				info : this.user.profile,
				pay: 0,
				countPay: 0,
				shipping: 0,
			}
		},
		methods:{
			formatPrice(pri){
				return shareMethods.formatPrice(pri)
			},
			confirmPayment(){
				const { cart,address,phoneNumber } = this.user.profile
				var name = `${this.user.profile.firstName} ${this.user.profile.lastName}`
				var listItem = []
				for(var i= 0; i< cart.length ; i++){
					if(cart[i].checkBuy === true){
						listItem.push({quantityBuy: cart[i].quantityBuy, item: cart[i].item})
						var quantity = cart[i].item.quantity - cart[i].quantityBuy
						// Cap nhat lai so luong sp
						API('put', `/product/${cart[i].item._id}` , {quantity:quantity})
						.then((res)=>{
							// console.log()
						}).catch((err)=>{
							console.log(err)
						})
						// Xoa sp trong gio hang
						var item = cart[i].item
						console.log(this.user.profile._id)
						API('put', `/${this.user.profile._id}/cart/delete` , {item:item})
						.then((res)=>{
							this.user.profile = res.data
						}).catch((err)=>{
							console.log(err)
						})						
					}

				}
				var req = {name: name, address: address, totalPrice: this.pay, listItem: listItem}
				API('post', '/cart/buy' , req)
				.then((res)=>{
					console.log(res.data)
					alert("Mua hàng thành công")
					this.$router.push('/cart')
				}).catch((err)=>{
					console.log(err)
				})
			}
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
                    console.log(this.pay)
				}
			},			
		}
	}
</script>
<style type="text/css" scoped>
.invoice{
	margin: 0 auto;
}
.img-sm {
    width: 80px;
    /*height: 80px*/
}

.itemside .info {
    padding-left: 15px;
    padding-right: 7px
}

.itemside {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%
}
.khoangcach{
	border-bottom: 2px solid black;
}
.container{
	padding: 10px;
}
h2{
	margin: 0 auto;
}
</style>