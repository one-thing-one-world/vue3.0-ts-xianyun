<template>
  <div>
    <div class="container">
      <div class="pic-img">
        <img src="http://157.122.54.189:9095/assets/images/th03.jfif" alt />
      </div>

      <div v-if="flag === 0" class="box-login">
        <div class="df choseHover m-b-20">
          <div
            class="loginList-loop ccc"
            :class="{ choseBg: num === index }"
            @click="choseItem(index)"
            v-for="(item, index) in loginList"
            :key="index"
          >
            <div class="ccc loginList-loop-item">{{ item.name }}</div>
            <div :class="{ clickLine: num === index }"></div>
          </div>
        </div>

        <div class="form-container-login">
          <a-form
            ref="ruleForm1"
            :model="form"
            :rules="rules"
            :wrapper-col="wrapperCol"
          >
            <div class="username">
              <a-form-item ref="username" name="username">
                <a-input
                  placeholder="用户名/手机"
                  v-model:value="form.username"
                />
              </a-form-item>
            </div>
            <div class="password">
              <a-form-item ref="password" name="password">
                <a-input placeholder="密码" v-model:value="form.password" />
              </a-form-item>
            </div>

            <div class="df fs12 j-end">
              <div class="text">忘记密码</div>
            </div>

            <div class="btn">
              <a-form-item>
                <a-button type="primary" @click="onLogin">登录</a-button>
              </a-form-item>
            </div>
          </a-form>
        </div>
      </div>

      <div v-if="flag === 1" class="box-register">
        <div class="df choseHover m-b-20">
          <div
            class="loginList-loop ccc"
            :class="{ choseBg: num === index }"
            @click="choseItem(index)"
            v-for="(item, index) in loginList"
            :key="index"
          >
            <div class="ccc loginList-loop-item">{{ item.name }}</div>
            <div :class="{ clickLine: num === index }"></div>
          </div>
        </div>

        <div class="form-container-login">
          <a-form
            ref="ruleForm2"
            :model="formRegister"
            :rules="rules"
            :wrapper-col="wrapperCol"
          >
            <div class="userPhone">
              <a-form-item ref="userPhone" name="userPhone">
                <a-input
                  placeholder="用户名手机"
                  v-model:value="formRegister.userPhone"
                />
              </a-form-item>
            </div>
            <div class="captcha df j-center">
              <div class="captcha-box">
                <a-form-item ref="captcha" name="captcha">
                  <a-input
                    placeholder="验证码"
                    v-model:value="formRegister.captcha"
                  />
                </a-form-item>
              </div>
              <div class="ccc captcha-text">
                <div @click="getCaptcha">验证码</div>
              </div>
            </div>
            <div class="nickname">
              <a-form-item ref="nickname" name="nickname">
                <a-input
                  placeholder="昵称"
                  v-model:value="formRegister.nickname"
                />
              </a-form-item>
            </div>
            <div class="password">
              <a-form-item ref="password" name="password">
                <a-input
                  placeholder="密码"
                  v-model:value="formRegister.password"
                />
              </a-form-item>
            </div>
            <div class="confirmPassword">
              <a-form-item ref="confirmPassword" name="confirmPassword">
                <a-input
                  placeholder="确认密码"
                  v-model:value="formRegister.confirmPassword"
                />
              </a-form-item>
            </div>

            <div class="btn">
              <a-form-item>
                <a-button type="primary" @click="onRegister">注册</a-button>
              </a-form-item>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, SetupContext } from "vue";
import { useRouter } from "vue-router";
import api from "@/http/api";
import { message } from "ant-design-vue";

interface Data {
  flag: number;
  num: number;
  msg: string;
  labelCol: LabelCol;
  wrapperCol: WrapperCol;
  form: Form;
  rules: Rules;
  loginList: LoginList[];
  formRegister: FormRegister;
}
interface LoginList {
  name: string;
}
interface LabelCol {
  span: number;
}
interface WrapperCol {
  span: number;
}
interface Form {
  username: string;
  password: string;
}
interface FormRegister {
  userPhone: string;
  captcha: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
interface RulesItem {
  required?: boolean;
  message?: string;
  trigger?: string[] | string;
  min?: number;
  max?: number;
  pattern?: any;
}
interface RegisterRes {
  code: string;
  id: number;
  tel: string;
}

interface Rules {
  username: RulesItem[];
  password: RulesItem[];
  userPhone: RulesItem[];
  captcha: RulesItem[];
  nickname: RulesItem[];
  confirmPassword: RulesItem[];
}

export default defineComponent({
  name: "",
  num: 0,
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      num: 0,
      msg: "Login",
      flag: 0,
      loginList: [
        {
          name: "登录",
        },
        {
          name: "注册",
        },
      ],
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 22,
      },
      formRegister: {
        userPhone: "",
        captcha: "",
        nickname: "",
        password: "",
        confirmPassword: "",
      },
      form: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 0,
            max: 11,
            message: "长度应该是 11",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度应该是 6 到12",
            trigger: "blur",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "长度应该是 11",
            trigger: "blur",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: "手机号格式不对",
            trigger: ["blur", "change"],
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 6,
            message: "长度应该是 6",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度应该是 3 到 5",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "请确认确认密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度应该是 6 到12",
            trigger: "blur",
          },
        ],
      },
    });
    const ruleForm1 = ref();
    const ruleForm2 = ref();
    const router = useRouter();

    const onLogin = (): void => {
      ruleForm1.value
        .validate()
        .then(() => {
          api
            .login({
              username: data.form.username,
              password: data.form.password,
            })
            .then((res: any) => {
              
              localStorage.setItem("token", res.token);
              localStorage.setItem("user", JSON.stringify(res.user));
              ruleForm1.value.resetFields();
              router.push("/");
              router.push({
                name: "Home",
              });
            })
            .catch((err: Error) => {
              console.log(err);
            });

          console.log("values", data.formRegister);
        })
        .catch((error: Error) => {
          console.log("error", error);
        });
    };

    const getCaptcha = (): void => {
      message.success("验证码为:000000");
      api
        .capture({
          tel: data.formRegister.userPhone,
        })
        .then((res: any) => {
          data.formRegister.userPhone = res.tel;
          data.formRegister.captcha = res.code;
          console.log(res);
          console.log(777);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };

    const onRegister = (): void => {
      ruleForm2.value
        .validate()
        .then(() => {
          api
            .register({
              username: data.formRegister.userPhone,
              nickname: data.formRegister.nickname,
              captcha: data.formRegister.captcha,
              password: data.formRegister.password,
            })
            .then((res2: any): void => {
              localStorage.setItem("token", res2.token);
              router.push({
                name: "Home",
              });
            })
            .catch((err: Error) => {
              console.log(err);
            });

          console.log("values", data.formRegister);
        })
        .catch((error: Error) => {
          console.log("error", error);
        });
    };

    const choseItem = (index: number): void => {
      data.num = index;
      data.flag = index;
      console.log(data.num);
    };

    return {
      ...toRefs(data),
      onRegister,
      choseItem,
      ruleForm1,
      ruleForm2,
      onLogin,
      getCaptcha,
    };
  },
});
</script>

<style lang="scss" scoped>
.captcha-text {
  width: 101px;
  height: 40px;
  background: #f5f7fa;
  border: 1px solid rgb(207, 204, 204);
  margin-left: -1px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

.captcha-box {
  width: 268px;
}

.choseHover:hover {
  cursor: pointer;
}

.clickLine {
  width: 100%;
  height: 2px;
  background: orange;
  position: absolute;
  top: 0;
}

.choseBg {
  background: white !important;
  color: orange;
}

.text {
  color: rgb(7, 149, 149);
  margin-right: 15px;
  margin-bottom: 5px;
  margin-top: -10px;
}

.container {
  position: relative;
}

.box-login {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 260px;
}

.box-register {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 460px;
}

.pic-img {
  position: relative;
  z-index: -1;
  width: 100%;
  height: 700px;
}

.pic-img img {
  width: 100%;
}

.loginList-loop {
  position: relative;
  width: 200px;
  height: 50px;
  background: #eeeeee;
}
</style>
