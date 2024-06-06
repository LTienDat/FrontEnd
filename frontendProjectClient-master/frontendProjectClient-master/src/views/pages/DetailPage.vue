<template>
	
	{{getDetailProduct()}}
	<div class="khoangtrang"><h2 >Chi tiết sản phẩm</h2></div>
    <div class="row container detail" v-if='item'>
        <div class="col-lg-7 order-lg-2 order-1">
        	<div class="img">
                <img v-bind:src="item.image" class="card-img-top" alt="..." />
            </div>
           	<div class="">
	                <div class="row" style="margin-top: 15px;">
	                    <div class="col-xs-6" style="margin-left: 5x;"> 
	                    	<span class="product_options">Tình trạng sản phẩm: {{item.state}}</span><br> 
	                    	<button class="btn btn-primary btn-sm ">Mới 100%</button> 
	                    	<button class="btn btn-primary btn-sm">Hàng đổi trả còn mới 95%</button>
	                    </div>
	                </div>
	        </div>
        	<div class="row">
                <div class="col-xs-6" style="margin-left: 1px;">
                    <div class="product_quantity"> 
                    	<span>Số lượng: 1</span> 
                    </div>
                </div>
                <div class="col-xs-6"> 
                	<button type="button" class="btn btn-primary shop-button" 
                			@click='addProductToCart(item)'>
                		Thêm vào giỏ hàng
                	</button> 
                	<button type="button" class="btn btn-success shop-button">Mua ngay</button>
                </div>
            </div>
        </div>

        <div class="col-lg-5 order-3">
            <div class="product_description">
                <nav>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                        <li class="breadcrumb-item active">Phòng ăn</li>
                    </ol>
                </nav>
                <div class="product_name">{{item.name}}</div>
                <div> 
                	<span class="product_price">Giá: {{formatPrice()}}</span>
                </div>

                <hr class="singleline"/>
                <div> 
                	<span class="product_info">Màu sắc: {{item.color}}</span><br/> 
                	<span class="product_info">Kích thước: {{item.size}}</span><br/> 
                	<span class="product_info">Chất liệu: {{item.stuff}}</span><br/> 
                	<span class="product_info">Xuất xứ: {{item.origin}}</span><br/> 
                	<span class="product_info">Bảo hành: 36 tháng</span> 
                </div>

	            <hr class="singleline"/>
	            <div>
	            	Mô tả sản phẩm: {{item.detail}}
	            </div>

        </div>
    </div>
</div>
<div class="khoangtrang"></div>
</template>

<script>
	import { productStore } from '@/stores/productStore.js'
	import { userStore } from '@/stores/userStore.js'
	import API from '@/services/index.js'
	export default {
		data(){
			return {
				item: null,
			}
		},
		setup(){
			const user = userStore()
			const product = productStore()
			return {product, user}
		},
		methods:{
			// Thêm sản phẩm vào giỏ hàng
			addProductToCart(item){
                if(!this.user.profile){
                    alert("Đăng ký trước khi sử dụng")
                    this.$router.push('/login')
                }else{
                    const { _id,cart } = this.user.profile
                    API('put',`/${_id}/cart`,{item})
                    .then((res)=>{
                        this.user.profile = res.data
                        localStorage.setItem('user', JSON.stringify(res.data));
                    }).catch((err)=>{
                        alert(err.response.data)
                    })                    
                }
            },
            // Xem Chi tiết sản phẩm bằng cách lấy thông tin từ params
			getDetailProduct(){
				const id = this.$route.params.id
				if(id){
					const { listItem } = this.product
					for (var i = 0; i < listItem.length ; i++) {
						if(id === listItem[i]._id){
							this.item = listItem[i]
						}
					}
				}
			},
			// format giá của sản phẩm
			formatPrice(){
                const price =  this.item.price.toLocaleString('de-DE', {
                  style: 'currency',
                  currency: 'VND',
                  maximumFractionDigits: 0
                });
                return price
            }

		},

	}
</script>

<style type="text/css" scoped>
.khoangtrang{
	margin: 1rem;
}
.detail{
	margin: 0 auto;
	border: 1px solid #aaa;
	padding: 1rem;
	box-shadow: 5px 7px 5px #bbb;
	border-radius: 5px;
	background-color: #ddd;
}
button{
	margin: 0.5rem;
}
.img{
	width: 100%;
	border: 1px solid #ddd;
	box-shadow: 5px 7px 5px #bbb;
	border-radius: 2px;
}
.product_name {
    font-size: 35px;
    font-weight: 500;
}
</style>