<template>
  <div class="top-container df j-bettween a-center">
    <div>
      <div class="box df a-center">
        <div class="pic">
          <img src="../../assets/logo.jpg" />
        </div>

        <div class="df m-l-30 a-center">
          <div
            class="hoverChangeColor item-loop ccc"
            @mouseenter="enterItem(index)"
            @mouseleave="leaveItem(index)"
            :class="{'changeColor':index===num,'changeItemStyle':numFlag===index&&num!==index, 'changeColor': $route.path===item.path}"
            @click="changeColor(item,index)"
            v-for="(item,index) in list"
            :key="index"
          >
            <div class="item-text">{{item.name}}</div>
            <div :class="{'loop-item-style':numFlag===index}"></div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div @click="goToLoginPage" class="login-hover">登陆 / 注册</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "@/http/api";
import router from "@/router";

interface Data {
  msg: string;
  list: List[];
  num: number;
  numFlag: number;
}

interface List {
  name: string;
  path: string;
}
interface Item {
  name: string;
  path: string;
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "top",
      num: -1,
      numFlag: -1,
      list: [
        {
          name: "首页",
          path: "/",
        },
        {
          name: "旅游攻略",
          path: "/stratege",
        },
        {
          name: "酒店",
          path: "/hotel",
        },
        {
          name: "国内机票",
          path: "/ariportTicket",
        },
      ],
    });

    const router = useRouter();
    const route = useRoute();

    const changeColor = (item: Item, index: number): void => {
      data.num = index;

      router.push({ path: `${item.path}` });
    };
    const enterItem = (index: number): void => {
      data.numFlag = index;
      console.log(666);
    };
    const leaveItem = (): void => {
      data.numFlag = -1;
    };

    const goToLoginPage = (): void => {
      router.push({
        name: "Login",
      });
    };

    const autoGetfocus = (): void => {
      data.list.map((item: Item, index: number) => {
        if (item.path === route.path) {
          data.num = index;
        }
      });
    };

    onMounted(() => {
      autoGetfocus();
    });

    return {
      ...toRefs(data),
      changeColor,
      enterItem,
      leaveItem,
      goToLoginPage,
      autoGetfocus,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-hover {
  font-size: 14px;
}
.login-hover:hover {
  cursor: pointer !important;
  color: #409eff !important;
}

.changeItemStyle {
  color: #409eff !important;
  cursor: pointer !important;
}

.loop-item-style {
  width: 100%;
  height: 6px;
  background: #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 66;
}

.changeColor {
  background: #409eff;
  color: white;
  cursor: pointer;
}

.item-loop {
  height: 60px;
  padding: 20px;
  position: relative;
}

.top-container {
  width: 1000px;
  height: 60px;
}

.pic {
  width: 150px;
  height: 42px;
}

.pic img {
  width: 100%;
  height: 100%;
}
</style>
