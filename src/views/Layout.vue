<template>
  <div>
    <div class="top-container df j-center">
      <top></top>
    </div>
    <div class="">
      <router-view></router-view>
    </div>
    <div class="bottom-container">
      <bottom></bottom>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import top from "@/components/Layout/top.vue";
import bottom from "@/components/Layout/bottom.vue";

interface Data {
  msg: string;
}
export default defineComponent({
  name: "Layout",
  props: {},
  components: {
    top,
    bottom,
  },
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "layout",
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>
