<template>
  <div class="maps">
    <div id="container"></div>
  </div>
</template>

<script>

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // eslint-disable-next-line no-var

    // var map = new AMap.Map("container", {
    //   zoom: 11, //级别
    //   center: [116.397428, 39.90923], //中心点坐标
    //   viewMode: "3D", //使用3D视图
    // });
    // console.log(map, "map");
  },
  watch: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.maps {
  width: 100%;
  height: 100%;
}

#container {
  width: 500px;
  height: 500px;
}
</style>
