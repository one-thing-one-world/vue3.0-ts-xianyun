<template>
  <div>
    <div>
      <div class="str-inp-box">
        <input v-model="value" @keyup.enter="enter" autofocus placeholder="请输入城市搜索酒店" />

        <div @click="onSearch" class="icon-search ccc">
          <SearchOutlined />
        </div>
      </div>
    </div>
    <div class="recommend-text df">
      <div>推荐:</div>
      <div class="df m-l-3 titleCityList-box">
        <div
          @mouseleave="leaveItem()"
          @mouseenter="enterItem(index)"
          @click="choseSomeCity(item)"
          class="m-l-10 titleCityList-item"
          :class="{'curs-pointer':num===index}"
          v-for="(item,index) in titleCityList"
          :key="index"
        >
          {{item.name}}
          <div :class="{'line':num===index}"></div>
        </div>
      </div>
    </div>

    <div class="reconmend-catagory df j-bettween">
      <div class="reconmend-text ccc">
        推荐攻略
        <div class="line"></div>
      </div>
      <div class="write-btn ccc">
        <a-button type="primary">
          <EditOutlined />写游记
        </a-button>
      </div>
    </div>
  </div>

  <div>
    <div v-for="(item,index) in resItem.dataItem" :key="index">
      <div class="content-item1" v-if="index % 2 === 0">
        <div @click="goToDetail(item)" class="item1-text cur-pointer">{{item.title}}</div>
        <div @click="goToDetail(item)" class="item1-summary cur-pointer points">{{item.summary}}</div>

        <div @click="goToDetail(item)" class="df img-box cur-pointer j-bettween">
          <div class="item-img" v-for="(items,indexs) in item.images.slice(0,3)" :key="indexs">
            <img :src="items" />
          </div>
        </div>

        <div class="df j-bettween">
          <div class="df account-box">
            <div class="df">
              <div class="icon-position">
                <EnvironmentOutlined />
              </div>
              <div class="m-l-5 cur-pointer">{{item.cityName}}</div>
            </div>
            <div class="account cur-pointer m-l-10">
              <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`" alt />
              by {{item.account.nickname}}
            </div>
            <div class="m-l-10 cur-pointer df">
              <div>
                <EyeOutlined />
              </div>
              <div class="m-l-5 cur-pointer">{{item.watch}}</div>
            </div>
          </div>
          <div class="lickIt cur-pointer">79赞</div>
        </div>
      </div>

      <div class="content-item2 df j-bettween" v-if="index % 2 === 1">
      
        <div class="df img-box j-bettween">
          <div class="item-img" v-for="(items,indexs) in item.images.slice(0,3)" :key="indexs">
            <img :src="items" />
          </div>

        </div>

        <div class="right-box m-t-20">

          <div @click="goToDetail(item)" class="item2-text">{{item.title}}</div>
          <div class="item1-summary points">{{item.summary}}</div>

          <div class="df bottom-box j-bettween">
            <div class="df account-box">
              <div class="df">
                <div class="icon-position">
                  <EnvironmentOutlined />
                </div>
                <div class="m-l-5">{{item.cityName}}</div>
              </div>

              <div class="account m-l-10">
                <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`" alt />
                by {{item.account.nickname}}
              </div>
              <div class="m-l-10 df">
                <div>
                  <EyeOutlined />
                </div>
                <div class="m-l-5">{{item.watch}}</div>
              </div>

            </div>
            <div class="lickIt">79赞</div>

          </div>
        </div>
      </div>

      <div class="item-underline"></div>
    </div>
  </div>
  <div class="m-b-20">
    <a-pagination
      v-model:current="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      show-quick-jumper
      :page-size="pageSize"
      @showSizeChange="onShowSizeChange"
      @change="change"
      :show-total="total => `总共 ${total} 条`"
    >
      <template v-slot:buildOptionText="props">
        <span v-if="props.value !== '00'">{{ props.value }}条/页</span>
      </template>
    </a-pagination>
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
import { useRouter } from "vue-router";
interface Data {
  titleCityList: TitleCityList[];
  arrLength: number;
  num: number;
  value: string;
  city: string;
  resItem: Resitem;
  list: Resitem;
  pageSizeOptions: string[];
  current: number;
  pageSize: number;
  total: number;
}
interface Resitem {
  dataItem: DataItem[];
  total: string;
}

interface ChoseCiTyItem {
  name: string;
}

interface TitleCityList {
  name: string;
}
interface DataItem {
  title?: string;
  summary?: string;
  cityName: string;
  images: Images[];
  account: Account;
  watch: string;
  defaultAvatar: string;
  id: number;
}
interface Images {
  num: string;
}
interface Account {
  nickname: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      titleCityList: [
        {
          name: "广州",
        },
        {
          name: "上海",
        },
        {
          name: "北京",
        },
      ],
      arrLength: 0,

      value: "",
      city: "北京市",
      num: -1,
      list: {
        total: "",
        dataItem: [],
      },

      resItem: {
        total: "",
        dataItem: [],
      },
      pageSizeOptions: ["3", "5", "10", "15", "00"],
      current: 1,
      //pagesieze就是控制第一页默认的条数
      pageSize: 3,
      total: 0,
    });
    const router = useRouter();
    const autoGetArticalList = (a: string) => {
      api
        .getArticalList({
          city: a,
        })
        .then((res: any) => {
          data.list.dataItem = res.data.slice(0, 5);
          data.resItem.dataItem = res.data.slice(0, 5);
          data.total = res.total;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const onSearch = (): void => {
      autoGetArticalList(data.value);
    };
    const enter = () => {
      autoGetArticalList(data.value);
    };
    const getAllList = () => {
      api
        .getAllList()
        .then((res: any) => {
          data.list.dataItem = res.data.slice(0, 5);
          data.resItem.dataItem = res.data.slice(0, 3);
          data.arrLength = res.data.length;
          data.total = 4;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize);
      data.pageSize = pageSize;

      if (data.arrLength > pageSize) {
        data.resItem.dataItem = data.list.dataItem.slice(0, pageSize);
      } else {
        data.resItem.dataItem = data.list.dataItem;
      }
    };
    const change = (page: number, pageSize: number) => {
      if (data.arrLength > page * 3) {
        data.resItem.dataItem = data.list.dataItem.slice(
          (page - 1) * 3,
          page * 3
        );
      }
      if (data.arrLength > page * 3 && data.arrLength < (page + 1) * 3) {
        data.resItem.dataItem = data.list.dataItem.slice((page - 1) * 3);
      }
    };

    const leaveItem = () => {
      data.num = -1;
    };
    const enterItem = (index: number) => {
      data.num = index;
    };

    const choseSomeCity = (item: ChoseCiTyItem) => {
      data.value = item.name;
      autoGetArticalList(data.value);
    };
    const goToDetail = (item: DataItem) => {
      console.log(item);
      const strategeDetailData = JSON.stringify(item);

      router.push({
        name: "strategeDetail",
        query: {
          id: item.id,
        },
      });

      localStorage.setItem("strategeDetailData", strategeDetailData);
    };

    onMounted(() => {
      getAllList();
    });
    return {
      ...toRefs(data),
      onSearch,
      enter,
      autoGetArticalList,
      getAllList,
      onShowSizeChange,
      change,
      leaveItem,
      enterItem,
      choseSomeCity,
      goToDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.titleCityList-item {
  position: relative;
}

.bottom-box {
  margin-top: 15px;
}

.right-box {
  margin-left: 20px;
  width: 490px;
  height: 150px;
}

.item-underline {
  width: 700px;
  height: 1px;
  border-bottom: 1px solid #eeeeee;
  margin: 20px 0;
}

.account-box {
  font-size: 12px;
}

.lickIt {
  color: orange;
}

.account img {
  width: 20px;
  height: 20px;
}

.img-box {
  margin-top: 18px;
  margin-bottom: 18px;
}

.item-img {
  width: 220px;
  height: 150px;
}

.item-img img {
  width: 100%;
  height: 100%;
}

.points {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; //行数
  -webkit-box-orient: vertical;
}

.item1-summary {
  height: 62px;
}

.item1-text {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  width: 700px;
  height: 24px;
}

.item2-text {
  margin-bottom: 20px;
  font-size: 18px;
  white-space: nowrap;

  height: 24px;
}

.item1-text:hover {
  color: orange;
  cursor: pointer;
}

.line {
  position: absolute;
  z-index: 999;
  bottom: 20%;
  background: orange;
  height: 2px;
  width: 100%;
}

.reconmend-text {
  position: relative;
  font-size: 18px;
  color: orange;
}

.reconmend-catagory {
  padding-bottom: 4px;
  width: 700px;
  height: 50px;
  border-bottom: 1px solid rgb(221, 220, 220);
}

.recommend-text {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}

input {
  width: 660px;
  height: 40px;
  outline: none;
  padding-left: 20px;
  border: 3px solid orange !important;
  border-right: 0px !important;
}

.str-inp-box {
  width: 660px;
  position: relative;
}

.icon-search {
  position: absolute;
  right: -40px;
  top: 0;
  z-index: 999;
  width: 40px;
  height: 40px;
  border: 3px solid orange !important;
  border-left: 0px !important;
}

.curs-pointer {
  cursor: pointer;
  color: orange;
}

.cur-pointer {
  cursor: pointer;
}
</style>
