<template>
  <div class=" stratege-box df j-center">
    <div class="stratege m-t-20 df j-bettween">
      <div class="stratege-left">
        <div>
          <div
            @mouseleave="leaveItem(index)"
            @mouseenter="enterItem(index)"
            v-for="(item,index) in cityNameList"
            :key="index"
            class="loop-item df a-center"
            :class="{'borderColor':num !== -1}"
          >
            <div :class="{'textColor':num===index}" class="loop-item-box df a-center j-bettween">
              <div class="item-text">{{item.type}}</div>
              <div class="item-arrow">
                <RightOutlined />
              </div>
              <div class="whiteBoxPosition" :class="{'whiteBox':num===index}"></div>
            </div>

            <div class="item-expand" v-if="num===index">
              <div class="children-loop df" v-for="(item1,index1) in item.children" :key="index1">
                <div class="index1 commonStyle">
                  <i>{{index1}}</i>
                </div>
                <div class="item1-city commonStyle">{{item1.city}}</div>
                <div class="item1-desc commonStyle">
                  {{item1.desc}}
                  <div class="desc-line line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="recomend-box">
            <div class="reconmendCity">推荐城市</div>
          </div>
          <div class="sea-box">
            <img src="../assets/sea.jpg" alt />
          </div>
        </div>
      </div>

      <div class="stratege-right">
        <rightStratege></rightStratege>
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
import rightStratege from "@/components/stratege/rightStratege.vue";

interface Data {
  msg: string;
  num: number;
  cityNameList: CityNameList[];
}
interface CityNameList {
  type: string;
  children: Children[];
}
interface Children {
  city: string;
  desc: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {
    rightStratege,
  },
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "home",
      cityNameList: [],
      num: -1,
    });
    const enterItem = (index: number) => {
      data.num = index;
    };
    const leaveItem = (index: number) => {
      data.num = -1;
      console.log(index);
    };
    onMounted(() => {
      api
        .getCities()
        .then((res: any) => {
          data.cityNameList = res.data;
          console.log(res);
          console.log(66);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      enterItem,
      leaveItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.stratege-box{
  width: 100%;


}

.stratege {
  width: 1000px;
}

.reconmendCity {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddddd;
}

.recomend-box {
  margin-top: 14px;
  height: 40px;
  margin-bottom: #dddddd;
}

.desc-line {
  position: absolute;
  z-index: 88;
  width: 100%;
  height: 1px;
  bottom: 24%;
}

.commonStyle {
  cursor: pointer;
}

.loop-item:last-child {
  border-bottom: 1px solid #dddddd !important;
}

.item-text {
  margin-left: 20px;
  font-size: 14px;
}

.item-arrow {
  margin-right: 20px;
}
.sea-box {
  margin-top: 10px;
  width: 260px;
  height: 173px;
}
.sea-box img {
  width: 100%;
  height: 100%;
}
.loop-item-box {
  height: 40px;
  width: 260px;
  position: relative;
}

.whiteBoxPosition {
  position: absolute;
  z-index: -1;
  background: white;
}

.whiteBox {
  z-index: 9999999 !important;
  height: 38px;
  width: 10px;
  right: -5px;
  top: 1px;
}

.loop-item {
  width: 260px;
  height: 40px;
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}

.borderColor {
  border-right: 1px solid white !important;
}

.textColor {
  color: orange !important;
}

.item-expand {
  padding: 10px 0px 10px 20px;
  width: 350px;
  height: 190px;
  position: absolute;
  z-index: 99999;
  background: white;
  top: 0;
  right: -348px;
  line-height: 34px;
  border: 1px solid #dddddd;
}

.index1 {
  margin-right: 15px;
  font-size: 21px;
  font-weight: 600;
  color: #ffa500;
}

.item1-city {
  margin-right: 15px;
  color: #ffa500;
}

.item1-desc {
  margin-right: 15px;
  color: #999999;
  position: relative;
}

.item1-desc:hover > .line {
  background: rgb(172, 172, 172);
}


.stratege-left {
  width: 260px;
  height: 1058px;
  position: relative;
}

.stratege-right {
  width: 700px;
}
</style>
