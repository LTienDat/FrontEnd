<template>
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p class="lead fw-normal mb-0 me-3"><h2>Sign in</h2></p>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0"></p>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" v-model='username'/>
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" v-model='password' />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;"
              @click='handelSubmitLogin()'
            >
                Login
            </button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            	<router-link to='/register' class="link-danger">Register</router-link>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/services/index.js'
  import { userStore } from '@/stores/userStore.js'
	export default {
    data(){
      return{
        username: "admin1",
        password: "admin1",
      }
    },

    setup(){
      const user = userStore()
      return { user }
    },

    methods:{
      handelSubmitLogin(){
        const username = this.username
        const password = this.password
        API('post','/login',{username,password})
        .then((res)=>{
            this.user.profile = res.data
            localStorage.setItem('acceptToken', JSON.stringify(res.data.acceptToken));
            localStorage.setItem('user', JSON.stringify(res.data));
            this.$router.push('/')
        }).catch((err)=>{
            console.log(err.response.data)
        })
      },
    },
    computed:{

    }
  }
</script>

<style type="text/css">
	
</style>