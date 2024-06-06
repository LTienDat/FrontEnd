<template>
    <header>
        <div class="header-container">
            <div class="row">
                <div class="col">
                    <router-link to="/" class="logo">
                        <h1>MEGA STORE</h1>
                    </router-link>
                </div>
                <div class="cart col-sm-1 col-lg-1">
                    <router-link to='/cart' >
                        <span  class="btn position-relative">
                          <i class="bi bi-cart-fill"></i>
                          <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                            {{
                                user.profile !== null 
                                ?
                                    user.profile.cart !== null 
                                    ? 
                                    user.profile.cart.length
                                    : 
                                    0
                                :0
                            }}
                            <span class="visually-hidden"></span>
                          </span>
                        </span>
                        
                    </router-link>
                </div>
                <div class="user col-sm-2 col-lg-1">
                    <router-link to='/login'>
                        <span  class="btn position-relative">
                            <i class="bi bi-person-fill"></i>
                            {{
                                user.profile !==null ? 
                                    user.profile.lastName !== "" 
                                    ? 
                                    user.profile.lastName 
                                    :
                                    "Anonymus"  
                                :
                                ""
                            }} 
                        </span>
                    </router-link>
                </div>
                <div class="logout col-sm-2 col-lg-1" v-if='user.profile' @click='handelLogout()'>
                    <i class="bi bi-box-arrow-right"></i>Logout
                </div>
            </div>
        </div>

        <!-- navbar-menu------------------------>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 "
                    v-for='item in pageUrl'
                >
                    <li class="nav-item ">
                        <router-link :to='`/${item.url}`' class="nav-link ">{{item.name}}</router-link>
                    </li>
                </ul>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <Search />
            </div>
        </nav>
        <div v-for='item in resultQuery'>
            <div>{{item}}</div>
        </div>
    </header>
</template>

<script>
    import  Search from '@/components/Search.vue'
    import { userStore } from '@/stores/userStore.js'
    import { productStore } from '@/stores/productStore.js'
    import API from '@/services/index.js'
    export default {
        data(){
            return {
                pageUrl : [
                    {url: 'phong-ngu', name: "Phòng ngủ"},
                    {url: "phong-an", name: "Phòng ăn"},
                    {url: "phong-khach", name: "Phòng khách"},
                    {url: "tu-go", name: "Tủ gỗ"},
                    {url: "cua-go", name: "Cửa gỗ"},
                ]
            }
        },
        setup(){
            const user = userStore()
            const product = productStore()
            return { user, product}
        },
        methods:{
            handelLogout(){
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('acceptToken');
                localStorage.removeItem('user');    
                this.user.profile = null
                this.user.carts = null
            }
        },
        components:{
            Search,
        }
    }
</script>

<style type="text/css">
.header-container {
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.bi{
    font-size: 25px;
} 
.logo {
    width: 100%;
    align-items: center;
    color: black;

}

.logo h1 {
    font-size: 35px;
    font-weight: 700;
    text-align: center;
}
.cart {
    text-align: right;
    padding-right: 25px;
    text-decoration: none;
}

.cart h1 {
    font-size: 18px;
    margin-top: 15px;
    text-decoration: none;
}
ul li a {
    font-size: 18px;
    font-weight: 400;
}    
a {
    color: black;
    text-decoration: none;
    text-shadow: 2px 2px 2px #ddd;  
}
a:hover,.logout:hover{
    color: black;
    text-shadow: 2px 2px 2px #aaa;
}
.position-absolute{
    font-size: 10px;
    color: white;
    font-weight: both;
}
.p-2{
    padding: 0.2rem!important;
}
.translate-middle{
    transform: translate(-80%,-0%)!important;
}

.logout{
    color: black;
    text-shadow: 2px 2px 2px #ddd;  
    cursor: pointer;
}
</style>
