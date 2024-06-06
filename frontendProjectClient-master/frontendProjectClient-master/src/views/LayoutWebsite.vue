<template>

    <div class="container-fluid">
        {{getProductAPI()}}
        <Menu />
        <router-view />  
        <Footer />
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue'
    import Footer from '@/components/Footer.vue'
    import API from '@/services/index.js'
    import { productStore } from '@/stores/productStore.js'
    export default {
        components:{
            Menu,
            Footer,
        },
        setup(){
            const product = productStore()
            return { product }
        },
        methods:{
            getProductAPI(){
                window.onload = ()=>{
                    API('get', '/')
                    .then((res)=>{
                        this.product.listItem = res.data
                        console.log(res.data)
                    }).catch((err)=>{
                        console.log(err.response.data)
                    })                    
                }
            }
        },
    }
</script>

<style type="text/css">

</style>