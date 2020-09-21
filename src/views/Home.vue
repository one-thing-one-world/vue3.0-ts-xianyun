<template>
  <div>
    <div class="home-box df j-center">
      
      <div class="routater">
        <a-carousel autoplay>
          <div v-for="(item,index) in bannerList" :key="index">
            <div class="bannerList-box">
              <img :src="`http://157.122.54.189:9095${item.url}`" alt />
            </div>
          </div>
        </a-carousel>
      </div>

      <div class="search-box  df j-center ">
        <div>
          <div class="headerList-box df ">
            <div @click="choseItem(item,index)" :class="{'choseItemColor':numbs===index}" class="one" v-for="(item,index) in headerList" :key="index">
              <div class="item-text ccc">{{item.name}}</div>
            </div>
          </div>

          <div v-if="numbs===0" class="df a-center">
            <div class="inp-box">
              <a-input autofocus placeholder="搜索城市" />
            </div>
            <div class="search-text ccc "><a-icon type="search" /></div>
          </div>
          <div v-if="numbs===1" class="df a-center">
            <div class="inp-box">
              <a-input  autofocus placeholder="请输入城市搜索酒店" />
            </div>
            <div class="search-text ccc "><a-icon type="search" /></div>
          </div>
        </div>
      </div>

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
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";

interface Data {
  numbs: number;
  headerList: HeaderList[];
  bannerList: BannerList[];
}
interface HeaderList {
  name: string;
}
interface BannerList {
  url: string;
  desc: string;
}
interface Items {
  name: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      numbs: 0,
      headerList: [
        {
          name: "攻略",
        },
        {
          name: "酒店",
        },
        {
          name: "机票",
        },
      ],
      bannerList: [],
    });

    onMounted(() => {
      api
        .getBanner()
        .then((res: any) => {
          console.log(res);
          data.bannerList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const router = useRouter()
    const choseItem = (item: Items,index: number) => {
          data.numbs = index
          if(item.name==="机票"){
              router.push({name:"ariportTicket"})
          }
    }

    return {
      ...toRefs(data),
      choseItem,
    };
  },
});
</script>

<style lang="scss" scoped>

.bannerList-box {
  width: 100%;
}
.search-text {
  background: white;
  width: 44px;
  height: 46px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  

}

.inp-box {
  width: 508px;
}

.home-box {
  width: 100%;
  height: 600px;
  position: relative;
}

.routater {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 600px;
}

.search-box {
  width: 1000px;
  height: 90px;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.item-text {
  height: 40px;
  opacity: 1;
}
img {
  width: 100%;
  height: 600px;
}
.one {
  height: 0;
  width: 82px;
  border-bottom: 40px solid rgba($color: #000000, $alpha: 0.5);
  border-left: 0px solid transparent;
  border-right: 15px solid transparent;
  color: white;
  margin-bottom: -1px;
 
  
}
.choseItemColor{
   height: 0;
  width: 82px;
  border-bottom: 40px solid rgba($color:#EEEEEE, $alpha: 1);
  border-left: 0px solid transparent;
  border-right: 15px solid transparent;
  color: black;
}
.one:hover{
  cursor: pointer;
}
</style>
