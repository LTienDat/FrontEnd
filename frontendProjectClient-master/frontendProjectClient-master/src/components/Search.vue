<template>
<form class="d-flex ">
    <input 
        class="form-control me-2 "

        placeholder='Search ' 
        v-model="searchQuery"
    />
    {{resultQuery()}}
    <button class="btn btn-outline-success" >Search</button>
</form>
</template>
<script>
    import { productStore } from '@/stores/productStore.js'
	export default {
		data(){
			return {
				searchQuery : "",
			}
		},
		setup(){
			const product = productStore()
			return { product }
		},
		methods:{
		    resultQuery() {
	            if (this.searchQuery) {
	            	const { listItem } = this.product
	                this.product.listSearch = listItem.filter(item => {
	                    return this.searchQuery
	                        .toLowerCase()
	                        .split(" ")
	                        .every(v => item.name.toLowerCase().includes(v));
	                });
	            }
	            else{
	                this.product.listSearch= [];
	          	}
	        }
		},
		computed:{
    	},
	}
</script>
<style type="text/css"></style>