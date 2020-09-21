<template>
 <div>
    {{msg}}--this is home
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'

interface Data {
  msg: string;

}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){
  console.log(ctx);

const data: Data = reactive<Data>({
  msg:"home",
  
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>

</style>


