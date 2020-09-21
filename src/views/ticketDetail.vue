<template>
  <div>{{msg}}--this is ticketDetail</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext,onMounted } from "vue";
import api from "@/http/api";
interface Data {
  msg: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      msg: "home",
    });
    const autoGetallTicket = () => {
      const itemsObj = localStorage.getItem('ticketDetail') as string
        const item = JSON.parse(itemsObj)
        console.log(item);
          api
        .getTicketDetail({
          departCity: item.departCity,
          departCode: item.departCode,
          destCity: item.destCity,
          destCode: item.destCode,
          departDate: item.departDate,
        })
        .then((res: any) => {
          console.log(res,2222);
        })
        .catch((err: Error) => {
          console.log(err)
        });
    }

    

      onMounted(() => {
        
        autoGetallTicket()
      
    });
    return {
      ...toRefs(data),
      autoGetallTicket,
    };
  },
});
</script>

<style scoped lang='scss'>
</style>


