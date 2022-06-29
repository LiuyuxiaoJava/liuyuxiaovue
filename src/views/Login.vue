<template>
  <div class="login">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系統登錄</h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="loginForm.name" placeholder="請輸入用戶名"></el-input>
      </el-form-item>
      <el-form-item prop="password" >
        <el-input type="password" v-model="loginForm.password" auto-complete="false"
                  placeholder="請輸入密碼"></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="codeImage"
        >
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">記住我</el-checkbox>
      <el-button type="primary" :loading="loading" style="width: 100%" @click.native.prevent="submitLogin">
        <span v-if="!loading">登錄</span>
        <span v-else>登錄中……</span>
      </el-button>
    </el-form>
  </div>
</template>

<script>
import {login,getCodeImg} from "@/api/login";

export default {
  name: "Login",
  data(){
    return{
      codeUrl: "",
      loginForm:{
        name:'',
        password:'',
        code:''
      },
      checked:false,
      loading:false,
      captchaOnOff:true,
      rules:{
        name: [{required:true,message:'請輸入用戶名',trigger:'blur'}],
        password: [{required:true,message:'請輸入密碼',trigger:'blur'}],
        code: [{required:true,message:'请输入code',trigger:'blur'}]
      }
    }
  },
  created() {
    this.getCode();
    // this.getCookie();
  },
  methods:{
    getCode(){
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          console.log(res);
          console.log(res.img);
          this.codeUrl = "data:image/jpeg;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    /* updateCaptcha(){
       this.captchaUrl='/captcha?time='+new Date();
     },*/
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading=true;
          login(this.loginForm).then(resp=>{
            console.log(JSON.stringify(resp))
            console.log(resp.code)
            if (resp.code===1){
              this.$message.success("登陸成功！")
              this.$router.push("/pages/Home")
            }else {
              this.loading=false;
              this.$router.push("/")
              this.$message.error("用戶名，或密碼輸入錯誤")
              if (this.captchaOnOff){
                this.getCode();
              }
            }
          })
        } else {
          this.$message.error('這是一條錯誤的信息');
          return false;
        }
      });
    }
  }

}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.login{
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url("../img/background/wallhaven-e7glyw.png");
  /*background-size: cover;*/
  background-size: 100%;
}
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background:#fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin: 0px auto 40px auto;
  text-align: center;
}
.loginRemember{
  text-align: left;
  margin: 8px 8px 15px 8px;
}

</style>