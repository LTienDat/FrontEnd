<script>
    import API from '@/services/index.js'
    import { userStore } from '@/stores/userStore.js'
    export default {
        setup(){
            const user = userStore()
            return { user }
        },
        methods:{
            parseJwt () {
                const user = JSON.parse(localStorage.getItem('user'));
                if(!user){
                    this.user.profile = null
                }else{
                    this.user.profile = user
                }
            },
        },
    }
</script>

<template>
    {{parseJwt()}}
    <router-view></router-view>
</template>

<style>

</style>
