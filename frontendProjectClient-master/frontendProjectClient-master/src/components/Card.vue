<template>
    <div class="card">
        <div class="content">
                <router-link :to='`/detail/${item._id}`'>
                    <img v-bind:src="item.image" class="card-img-top" alt="item.image" />
                </router-link>
                <div class="card-body">
                    <h5 class="card-title">{{item.name}}</h5>
                    <div class="row">
                        <div class="col-10">
                            <div class="card-content col-10">Price: {{formatPrice(item.price)}}</div>
                            <div class="card-content col-10">Discount: {{item.discount*100}}%</div>
                            <div class="card-content col-10">Quantity: {{item.quantity}}</div>
                        </div>
                        <div class="col-2"><i class="bi bi-cart-fill" @click='addProductToCart(item)'></i></div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
    import API from '@/services/index.js'
    import { userStore } from '@/stores/userStore.js'
    import shareMethods from '@/services/shareMethods.js'

	export default {
        props:['product'],
        data(){
            return{
                item: this.product,
            }
        },
        setup(){
            const user = userStore()
            return { user}
        },
        methods:{
            formatPrice(pri){
                return shareMethods.formatPrice(pri)
            },
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
                        // console.log(this.user.profile.cart)
                    }).catch((err)=>{
                        alert(err.response.data)
                    })                    
                }
    
            },
        },

    }
</script>
<style type="text/css" scoped>
/*.card {
    float: left;
}*/

</style>