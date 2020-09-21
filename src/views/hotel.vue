<template>
  <div class="hotel-container df j-center">
    <div class="hotel-box">
      <div>
        <a-breadcrumb>
          <a-breadcrumb-item>酒店</a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>成都市酒店预定</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <div class="df">
        <div class="hotel-inp-box">
          <a-input v-model:value="value" placeholder="切换城市" />
        </div>
        <!-- <div>
          <a-range-picker
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"
            :show-time="{
      hideDisabledOptions: true,
      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
    }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import moment from "moment";

interface Data {
  msg: string;
  value: string;
  value3: string;
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "hotel",
      value: "",
      value3: "",
    });

    // const range = (start: any, end: any) => {
    //   const result = [];
    //   for (let i = start; i < end; i++) {
    //     result.push(i);
    //   }
    //   return result;
    // };

    // const disabledDate = (current: any) => {
    //   return current && current <= moment().endOf("day");
    // };

    // const disabledRangeTime = (_: any, type: any) => {
    //   if (type === "start") {
    //     return {
    //       disabledHours: () => range(0, 60).splice(4, 20),
    //       disabledMinutes: () => range(30, 60),
    //       disabledSeconds: () => [55, 56],
    //     };
    //   }
    //   return {
    //     disabledHours: () => range(0, 60).splice(20, 4),
    //     disabledMinutes: () => range(0, 31),
    //     disabledSeconds: () => [55, 56],
    //   };
    // };
    return {
      ...toRefs(data),
      // disabledRangeTime,
      // range,
      // disabledDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.hotel-inp-box {
  width: 200px;
  height: 40px;
}

.container-box {
  width: 400px;
  height: 400px;
}

.hotel-container {
  width: 100%;
}

.hotel-box {
  width: 1000px;
}
</style>
