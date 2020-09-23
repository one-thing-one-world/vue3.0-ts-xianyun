<template>
  <div class="ticket-container df j-center">
    <div class="w1000 df j-bettween">
      <div class="left-box df f-column a-center">
        <div class="option-container df j-bettween">
          <div v-if="res.info" class="singleDistance df a-center">
            单程:
            <span class="m-l-10">{{res.info.departCity}}</span>
            <span class="m-l-r-5">-</span>
            <span class="m-r-10">{{res.info.destCity}}</span>
            <span class="m-l-r-5">/</span>
            <span class="m-r-10">{{res.info.departDate}}</span>
          </div>

          <div class="option-box">
            <div class="df">
              <div class="options-item">
                <a-select
                  v-model:value="value1"
                  style="width: 118px"
                  @focus="focus"
                  ref="select"
                  @change="handleChange1"
                  placeholder="起飞机场"
                >
                  <template v-if="res.options">
                    <template v-for="(item,index) in res.options.airport" :key="index">
                      <a-select-option :value="item">{{item}}</a-select-option>
                    </template>
                  </template>
                </a-select>
              </div>

              <div class="options-item">
                <a-select
                  v-model:value="value2"
                  style="width: 118px"
                  @focus="focus"
                  ref="select"
                  @change="handleChange2"
                  placeholder="起飞时间"
                >
                  <template v-if="res.options">
                    <template v-for="(item,index) in res.options.flightTimes" :key="index">
                      <a-select-option
                        :value="item.from+'iii'+item.to"
                      >{{item.from}}:00-{{item.to}}:00</a-select-option>
                    </template>
                  </template>
                </a-select>
              </div>

              <div class="options-item">
                <a-select
                  placeholder="航空公司"
                  v-model:value="value3"
                  style="width: 118px"
                  @focus="focus"
                  ref="select"
                  @change="handleChange3"
                >
                  <template v-if="res.options">
                    <template v-for="(item,index) in res.options.company" :key="index">
                      <a-select-option :value="item">{{item}}</a-select-option>
                    </template>
                  </template>
                </a-select>
              </div>

              <div class="options-item">
                <a-select
                  placeholder="机型"
                  v-model:value="value4"
                  style="width: 118px"
                  @focus="focus"
                  ref="select"
                  @change="handleChange4"
                >
                  <template v-if="res">
                    <template v-for="(item,index) in flightSize" :key="index">
                      <a-select-option :value="item.name">{{item.name}}</a-select-option>
                    </template>
                  </template>
                </a-select>
              </div>
            </div>
          </div>
        </div>

        <div class="df revoke-box">
          <div class="ccc">筛选:</div>
          <div class="revoke ccc m-l-10" @click="revoke">撤销</div>
        </div>

        <div class="ticket-box m-t-20 df">
          <div class="ticket-box-text f1 ccc">航空信息</div>
          <div class="ticket-box-text f1 ccc">起飞时间</div>
          <div class="ticket-box-text f1 ccc">到达时间</div>
          <div class="ticket-box-text f1 ccc">价格</div>
        </div>

        <div>
          <div
            class="m-t-b-10 nav-box"
            v-for="(item,index) in res.flights.slice((current-1)*pageSize, current*pageSize)"
            :key="index"
          >
            <a-card style="width: 745px">
              <div @click="expendSeatInfo(item)" class="df w00">
                <div class="card-name ccc fw7 f1">{{item.airline_name}}{{item.flight_no}}</div>

                <div class="card-time f3 df j-center">
                  <div class="middle-box df j-bettween">
                    <div class>
                      <div class="flights-time">{{item.dep_time}}</div>
                      <div class="flights-region">{{item.org_airport_name}}{{item.org_airport_quay}}</div>
                    </div>

                    <div class="time-line-box df f-column a-center j-center">
                      <div class="during-time">
                        2小时{{item.durationMinutes}}分
                        <div class="time-line"></div>
                      </div>
                    </div>

                    <div class>
                      <div class="flights-time">{{item.arr_time}}</div>
                      <div class="flights-region">{{item.dst_airport_name}}{{item.dst_airport_quay}}</div>
                    </div>
                  </div>
                </div>

                <div class="card-price ccc f1 df">
                  <div class>
                    <span class="fs14 fw7">￥</span>
                    <span class="card-price-number">810</span>
                    <span class="fs14 fw7">起</span>
                  </div>
                </div>
              </div>
            </a-card>

            <div v-if="item.flag" class="seat-container">
              <a-card style="width: 745px">
                <div class="df seat-bg-box">
                  <div class="low-price w200 ccc">低价推荐</div>
                  <div class="low-detail">
                    <div
                      class="seat_infos-box w585 h74 df a-center j-bettween"
                      v-for="(item1,index1) in item.seat_infos"
                      :key="index1"
                    >
                      <div class="df">
                        <div class="fs12 green">{{item1.name}}</div>
                        <div class="one-line m-l-r-5 fs12">|</div>
                        <div class="fs12">{{item1.supplierName}}</div>
                      </div>

                      <div class="df">
                        <div class="ccc">
                          <div class="settle_price_coupon">￥{{item1.settle_price_coupon}}</div>
                        </div>

                        <div class="chose-btn-box">
                          <div @click="goToOderTicketPage" class="btn ccc m-b-2">选定</div>
                          <div class="ccc m-t-2">剩余:{{item1.discount}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a-card>
            </div>
          </div>
        </div>

        <div class="page-box">
          <a-pagination
            v-model:current="current"
            :page-size-options="pageSizeOptions"
            :total="res.flights.length"
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
      </div>
      <div class="right-box df f-column">
        <a-card style="width: 240px;">
          <div class="df m-t-15">
            <div class="f1 df f-column a-center">
              <div class="img-box">
                <img src="../assets/hui.png" alt />
              </div>
              <div>航行认证</div>
            </div>

            <div class="f1 df f-column a-center">
              <div class="img-box">
                <img src="../assets/dun.png" alt />
              </div>
              <div>出行保证</div>
            </div>

            <div class="f1 df f-column a-center">
              <div class="img-box">
                <img src="../assets/dianhua.png" alt />
              </div>
              <div>7x24</div>
            </div>
          </div>

          <div class="tel ccc">
            <div>免费客服电话：4006345678转2</div>
          </div>
        </a-card>

        <div class="history">
          <a-card style="width: 240px;">
            <div>历史查询</div>
            <div class="history-line"></div>
          </a-card>
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
import { useRouter } from "vue-router";
import dayjs from "dayjs";

interface SeatInfos {
  discount: number;
  name: string;
  par_price: string;
  supplierName: string;
}
interface Flights {
  flight_no: string;
  dep_time: string;
  arr_time: string;
  seat_infos: SeatInfos[];
  flag: boolean;
  plane_size: string;
  size: string;
  durationMinutes: string;
}
interface Res {
  total: number;
  flights: Flights[];
  info: Info;
  options: Options;

  flights2: Flights[];
}
interface FlightSize {
  name: string;
}

interface Info {
  departCity: string;
  departDate: string;
  destCity: string;
}

interface Options {
  airport?: string[];
  company?: string[];
  flightTimes?: FlightTimes[];
}

interface FlightTimes {
  from: number;
  to: number;
}
interface Obj {
  nav?: string;
  time?: string;
  city?: string;
  size?: string;
}
interface Data {
  res: Res;
  pageSizeOptions: string[];
  current: number;
  pageSize: number;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  arr: string[];
  obj: Obj;
  flightSize: FlightSize[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    console.log(ctx);

    const data: Data = reactive<Data>({
      pageSizeOptions: ["5", "10", "15", "20", "00"],
      current: 1,
      arr: [],
      //pagesieze就是控制第一页默认的条数
      pageSize: 5,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      obj: {},
      flightSize: [],

      res: {
        flights2: [],
        total: 0,
        flights: [],

        info: {
          departCity: "",
          departDate: "",
          destCity: "",
        },
        options: {},
      },
    });
    const router = useRouter();

    const autoGetallTicket = () => {
      const itemsObj = localStorage.getItem("ticketDetail") as string;
      const item = JSON.parse(itemsObj);
      console.log(item);
      api
        .getTicketDetail({
          departCity: item.departCity,
          departCode: item.departCode,
          destCity: item.destCity,
          destCode: item.destCode,
          departDate: item.departDate,
        })
        .then((res: any): void => {
          data.res = res;
          data.res.total = res.total;
          console.log(res.total);

          data.res.flights!.map((item: Flights, index: number) => {
            item.flag = false;
            if (item.plane_size === "L") {
              item.size = "大";
            } else if (item.plane_size === "S") {
              item.size = "小";
            } else if (item.plane_size === "M") {
              item.size = "中";
            }
          });
          res.flightSize = [];
          data.res.flights2 = data.res.flights;

          data.flightSize = [
            {
              name: "大",
            },
            {
              name: "中",
            },
            {
              name: "小",
            },
          ];

          data.res.flights.map((item: any) => {
            // 将起飞时间转换成Unix 时间戳 (秒)
            const startTime = dayjs(item.dep_datetime).unix();
            // 将到达时间转换成Unix 时间戳 (秒)
            const endTime = dayjs(item.arr_datetime).unix();
            const duration = endTime - startTime;

            if (duration > 0) {
              // 计算出小时数差
              item.durationHour = Math.floor(duration / 60 / 60);
              // 计算出小时数后剩余的秒钟数
              const durationSeconds = duration % 3600;
              // 计算分钟数
              item.durationMinutes = Math.floor(durationSeconds / 60);
            }
            if (duration < 0) {
              // 计算出小时数差
              item.durationHour = Math.floor(duration / 60 / 60) + 24;
              // 计算出小时数后剩余的秒钟数
              const durationSeconds = duration % 3600;
              // 计算分钟数
              item.durationMinutes = Math.floor(durationSeconds / 60) + 60;
            }
          });

          console.log(data.res);
          console.log(res, 2222);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const expendSeatInfo = (item: Flights) => {
      item.flag = !item.flag;
    };
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize, "onShowSizeChange");
      data.pageSize = pageSize;
      data.current = current;
    };
    const change = (page: number, pageSize: number) => {
      console.log(page, pageSize, "change");
      data.pageSize = pageSize;
    };
    const focus = () => {
      console.log("focus");
    };

    const handleChange1 = (value: string) => {
      console.log(value);
      data.obj.nav = value;

      data.res.flights = data.res.flights2;

      if (data.value1 || data.value2 || data.value3 || data.value4) {
        if (data.value2) {
          const from = data.value2.split("iii")[0];
          const to = data.value2.split("iii")[1];
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              Number(item2.dep_time.split(":")[0]) >= Number(from) &&
              Number(item2.dep_time.split(":")[0]) <= Number(to) &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        } else {
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        }
      }
    };
    const handleChange2 = (value: string) => {
      // data.value2 = value;
      // data.arr.push(value);
      data.res.flights = data.res.flights2;
      data.obj.time = value;
      console.log(value);
      data.value2 = value;
      console.log(data.value2);

      if (data.value1 || data.value2 || data.value3 || data.value4) {
        if (data.value2) {
          const from = data.value2.split("iii")[0];
          const to = data.value2.split("iii")[1];
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              Number(item2.dep_time.split(":")[0]) >= Number(from) &&
              Number(item2.dep_time.split(":")[0]) <= Number(to) &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        } else {
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        }
      }
    };
    const handleChange3 = (value: string) => {
      // data.value3 = value;
      // data.arr.push(value);
      data.obj.city = value;
      data.res.flights = data.res.flights2;

      if (data.value1 || data.value2 || data.value3 || data.value4) {
        if (data.value2) {
          const from = data.value2.split("iii")[0];
          const to = data.value2.split("iii")[1];
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              Number(item2.dep_time.split(":")[0]) >= Number(from) &&
              Number(item2.dep_time.split(":")[0]) <= Number(to) &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        } else {
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        }
      }
    };
    const handleChange4 = (value: string) => {
      // data.value4 = value;
      // data.arr.push(value);
      data.obj.size = value;

      data.res.flights = data.res.flights2;
      if (data.value1 || data.value2 || data.value3 || data.value4) {
        if (data.value2) {
          const from = data.value2.split("iii")[0];
          const to = data.value2.split("iii")[1];
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              Number(item2.dep_time.split(":")[0]) >= Number(from) &&
              Number(item2.dep_time.split(":")[0]) <= Number(to) &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        } else {
          data.res.flights = data.res.flights.filter(
            (item2) =>
              JSON.stringify(item2).includes(data.value1) === true &&
              JSON.stringify(item2).includes(data.value3) === true &&
              JSON.stringify(item2.size).includes(data.value4) === true
          );
        }
      }
    };
    const goToOderTicketPage = () => {
      router.push({
        name: "orderTicket",
      });
    };
    const revoke = () => {
      
          data.value1 = ""
          data.value2 = ""
          data.value3 = ""
          data.value4 = ""
          data.res.flights = data.res.flights2
         
    }
    onMounted(() => {
      autoGetallTicket();
      revoke()
    });
    return {
      ...toRefs(data),
      autoGetallTicket,
      expendSeatInfo,
      onShowSizeChange,
      change,
      focus,
      handleChange1,
      handleChange2,
      handleChange3,
      handleChange4,
      goToOderTicketPage,
      revoke,
    };
  },
});
</script>

<style lang="scss" scoped>
.revoke:hover{
  cursor: pointer;
}
.options-item {
  margin-left: 10px;
}

.page-box {
  margin-top: 10px;
  margin-bottom: 20px;
}

.history-line {
  background: #dddddd;
  width: 100%;
  height: 1px;
  margin-top: 10px;
}

.tel {
  height: 32px;
  background: #f6f6f6;
}

.img-box {
  width: 40px;
  height: 43px;
}

.img-box img {
  width: 100%;
  height: 100%;
}

.right-box {
  width: 240px;
}

.middle-box {
  width: 240px;
}

.nav-box:hover {
  cursor: pointer;
}

.m-t-2 {
  margin-top: 2px;
}

.m-b-2 {
  margin-bottom: 2px;
}

.chose-btn-box {
  margin-right: 20px;
}

.seat-bg-box {
  background: #f6f6f6;
}

.settle_price_coupon {
  color: orange;
  font-size: 20px;
  width: 122px;
}

.seat_infos-box {
  border-top: 1px solid rgb(236, 234, 234);
}

.seat_infos-box:nth-child(1) {
  border-top: 0px solid white;
}

.btn {
  width: 74px;
  height: 28px;
  background: #e6a23c;
  color: white;
  border-radius: 4px 4px;
}

.card-price-number {
  font-size: 24px;
  margin: 0 4px;
  color: orange;
}

.during-time {
  position: relative;
}

.time-line {
  position: absolute;
  background: #d1d0d0;
  width: 100%;
  height: 1px;
  bottom: -12%;
}

.left-box {
  width: 745px;
}

.revoke-box {
  width: 745px;
}

.option-container {
  margin: 12px 0px 5px 0px;
  width: 745px;
}

.revoke {
  width: 56px;
  height: 28px;
  border: 1px solid #409eff;
  color: #409eff;
  background: #ecf5ff;
  border-radius: 50px 50px;
}

.revoke:hover {
  background: #409eff;
  color: white;
}

.ticket-box-text {
  height: 38px;
  background: #f6f6f6;
}

.ticket-box {
  width: 745px;
  font-size: 12px;
  border: 1px solid #e2e0e0;
}

.flights-time {
  font-weight: 600;
  font-size: 24px;
}

.flights-region {
  font-size: 12px;
  letter-spacing: 1px;
}

.during-time {
  font-size: 14px;
}
</style>
