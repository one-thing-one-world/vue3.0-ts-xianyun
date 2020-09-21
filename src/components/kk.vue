<template>
<div>

  <div class="login-box">
<!--
    <div class="pic-img">
      <img src="http://157.122.54.189:9095/assets/images/th03.jfif" alt />
    </div>

    -->

    <div>
      <a-form ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item ref="username" label="Activity name" name="username">
          <a-input v-model:value="form.username" />
        </a-form-item>
        <a-form-item ref="password" label="Activity password" name="password">
          <a-input v-model:value="form.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div>dddd</div>

  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext } from "vue";

interface Data {
  msg: string;
  labelCol: LabelCol;
  wrapperCol: WrapperCol;
  form: Form;
  rules: Rules;
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
interface RulesItem {
  required?: boolean;
  message?: string;
  trigger?: string;
  min?: number;
  max?: number;
}

interface Rules {
  username: RulesItem[];
  password: RulesItem[];
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "Login",
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
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
            min: 3,
            max: 5,
            message: "长度应该是 3 到 5",
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
            message: "长度应该是 3 到 5",
            trigger: "blur",
          },
        ],
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  position: relative;
}

.pic-img {
  position: absolute;
  z-index: -1;
  width: 100vw;
}

.pic-img img {
  width: 100%;
}
</style>
