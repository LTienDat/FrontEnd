<template>
	{{getProductAPI()}}
	<Carousell />
	<div class="khoangtrang"></div>
	<Layout21 />
	<div class="khoangtrang"></div>
	<LayoutImageContent />
	<div class="khoangtrang"></div>

</template>

<script>
	import API from '@/services/index.js'
	import Carousell from '@/components/Carousell.vue'
	import Card from '@/components/Card.vue'
	import Layout21 from '@/components/Layout21.vue'
	import LayoutImageContent from '@/components/LayoutImageContent.vue'
	export default {
		data(){
			return{

			}
		},
		methods:{
			getProductAPI(){
				API("get","/")
				.then((res)=>{
					//console.log(res)
				})
			}
		},
		components:{
			Carousell,
			Card,
			Layout21,
			LayoutImageContent,
		}
	}
</script>

<style type="text/css">
.khoangtrang{
    margin: 1rem;
}
.card-title-box {
    align-items: center;
    justify-content: center;
}

</style>