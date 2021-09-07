<template>
    <div class="login-wrap">
        <div class="ms-login">
          
           <el-form ref="form"  label-width="160px">
                <el-form-item label="NSSDC用户登录:">
                  
                     <span><a href="http://10.0.88.161/api/login?way=ump" class="btn1" v-show="username ==''">NSSDC用户登录</a></span>
                </el-form-item>
                  <el-form-item label="科技云用户登录:">
                 
                     <span><a href="http://10.0.88.161/api/login?way=ump" class="btn1" v-show="username ==''">科技云用户登录</a></span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            username:'',
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted(){
           var cookie = document.cookie;
          
            if (cookie.indexOf('nssc-user') == 0) {
            // let regex = /\=(.+?)\&/g;
            // this.username = cookie.match(regex);
            this.username = cookie.split('=')[1].split('&')[0]
            }

    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 800px;
    background-image: url(../../assets/images/bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.7);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
<style >
 .login-wrap .el-form-item{
      margin: 10px 0;
  }
   .login-wrap .el-form-item span{
       border-bottom: 1px solid #3366cc;
       cursor: pointer;
   }
</style>