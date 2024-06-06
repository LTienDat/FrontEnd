import { defineStore } from 'pinia'

export const userStore = defineStore("user",{
	state:()=>{
		return {
			profile : null,
			carts: [],
			pay: 0,
		}
	},
	actions:{
		
	}
})