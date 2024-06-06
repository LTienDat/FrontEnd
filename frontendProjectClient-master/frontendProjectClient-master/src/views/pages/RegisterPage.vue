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
            <p class="lead fw-normal mb-0 me-3"><h2>Register</h2></p>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0"></p>
          </div>
          <div class="form-row">
            <div class="form-outline mb-3 form-group col-lg-6">
              <input type="text" class="form-control form-control-lg"
                placeholder="First Name"  v-model='formRegister.firstName' required />
              <label class="form-label" for="form3Example5">First Name</label>
            </div>

            <div class="form-outline mb-3  form-group col-lg-6">
              <input type="text" class="form-control form-control-lg"
                placeholder="Last Name"  v-model='formRegister.lastName' required />
              <label class="form-label" for="form3Example5">Last Name</label>
            </div>
          </div>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="text" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" v-model='formRegister.username' required />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" v-model='formRegister.password' required />
            <label class="form-label" for="form3Example4">Password</label>
          </div>
          <!-- Password again -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example5" class="form-control form-control-lg"
              placeholder="Again password"  v-model='formRegister.rePassword' required />
            <label class="form-label" for="form3Example5">Again password</label>
          </div>
          <div class="form-outline mb-3">
            <input type="text" class="form-control form-control-lg"
              placeholder="Address"  v-model='formRegister.address' required />
            <label class="form-label" for="form3Example5">Address</label>
          </div>
          <div class="form-outline mb-3">
            <input type="text" class="form-control form-control-lg"
              placeholder="Phone Number"  v-model='formRegister.phoneNumber' required />
            <label class="form-label" for="form3Example5">Phone Number</label>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                @click='handelSubmitRegister()'
            >Register</button>
          </div>
          <div class="text-center text-lg-start mt-4 pt-2">
          	<span>
          		<router-link to='/login'>Login</router-link>
          	</span>

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
        formRegister:{        
          username: "",
          password: "",
          rePassword: "",
          phoneNumber: "",
          address: "",
          firstName: "",
          lastName: "",
        },
      }
    },
    methods:{
      handelSubmitRegister(){
        const { username,password,rePassword,phoneNumber,address,firstName,lastName} = this.formRegister
        if(password !== rePassword || !username || !password || !phoneNumber || !address || !firstName || !lastName){
          alert("Mật khẩu không khớp")
        }else{
          API("post","/register",this.formRegister)
          .then((res)=>{
            console.log(res.data)
            this.$router.push('/login')
          }).catch((err)=>{
              alert(err.response.data)
          })
        }
        
      },
    },
  }
</script>

<style type="text/css" scoped>
.form-row{
  display: flex;
}
.form-group{
  padding: 0.5rem;
}
</style>