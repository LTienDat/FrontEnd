<template>
<!-- 	<div 
		class="container " 
		v-for='item in product.listSearch'
	>
		<Card class='' :product='item' />
	</div>
	<h1>Hello</h1> -->
	
	<div class="container">
		<div 
			v-for='item in getProductFromParams'
		>
			<Card 
				class='card' 
				:key='item._id' 
				:product='item' 
				v-if='item.kind === $route.params.slug'/>
		</div>
	</div>
</template>

<script>
	import Card from '@/components/Card.vue'
	import API from '@/services/index.js'
	import { productStore } from '@/stores/productStore.js'
	export default {
		data(){
			return {
				namePage: "",
				items: [],
			}
		},
		setup(){
			const product = productStore()
			return { product }
		},
		components:{
			Card,
		},
		methods:{
		},
		computed:{
			getProductFromParams(){
				var items = []
				for (var i = 0; i < this.product.listItem.length; i++) {
					if (this.product.listItem[i].kind === this.$route.params.slug) {
						items.push(this.product.listItem[i])
					}
				}
				return items
			}
		}
	}
</script>

<style type="text/css" scoped>
.container{
	/*display: flex;*/
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    background-color: #2196F3;
    align-items: center;
    justify-items: center;
  }
</style>