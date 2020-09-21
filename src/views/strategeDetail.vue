<template>
  <div class="df j-center">
    <div class="strategeDetail df j-bettween">
      <div class="strategeDetail-left">
        
        <div class>
          <span class="stratege-text">旅游攻略</span>
          <span class="irace-line">/</span>
          <span class="gray-text">攻略详情</span>
        </div>

        <div v-if="dataItem.length>0" class="title">{{dataItem[0].title}}</div>
        <div class="title-line"></div>
        <div class="df m-t-10 m-b-10 gray j-end" v-if="dataItem.length>0">
          <div>
            <span>攻略:{{dataItem[0].updated_at}}</span>
            <span>阅读:{{dataItem[0].watch}}</span>
          </div>
        </div>
        <div v-if="dataItem.length>0">
          <div class="HTMLcontent">
            <div v-html="dataItem[0].content"></div>
          </div>
        </div>
        <div class="df j-center">
          <div class="m-r-10 df f-column a-center j-center">
            <div class="iconEditOutlined">
              <EditOutlined />
            </div>
            <div>评论（3）</div>
          </div>
          <div class="m-l-10 df f-column a-center j-center">
            <div class="iconShareAltOutlined">
              <ShareAltOutlined />
            </div>
            <div>分享</div>
          </div>
        </div>

        <div class="comment-text">评论</div>
        <div>
          <textarea
            :class="{'focusStyle':flag===true}"
            class="area-box"
            @focus="focusTextArea"
            @blur="blurTextArea"
            v-model="textAreaValue"
            placeholder="说点什么吧..."
          ></textarea>
        </div>

        <div class="df m-t-15 j-bettween">
          <div class="upload-box">
            <div class="clearfix">
              <a-upload
                action="/upload/upload"
                list-type="picture-card"
                name="file"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 8">
                  <plus-outlined />
                  <div class="ant-upload-text">请上传</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </div>

          <div class="submit-btn">
            <a-button value="small" type="primary">提交</a-button>
          </div>
        </div>
        <div class>
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
        </div>
      </div>

      <div class="strategeDetail-right r1"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
import api from "@/http/api";

interface Data {
  pageSizeOptions: string[];
  current: number;
  pageSize: number;
  total: number;

  previewVisible: boolean;
  previewImage: string;
  fileList: FileList[];

  flag: boolean;
  id: number;
  msg: string;
  dataItem: DataItem[];
  strategeDetailData: string;
  textAreaValue: string;
}
interface FileList {
  uid: string;
  name: string;
  status: string;
  url: string;
}

interface DataItem {
  title?: string;
  summary?: string;
  cityName?: string;
  images?: Images[];
  account?: Account;
  watch?: string;
  defaultAvatar?: string;
  content?: string;
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
  components: {
    PlusOutlined,
  },
  setup(props, ctx: SetupContext) {
    console.log(ctx);
    const route = useRoute();

    const data: Data = reactive<Data>({
      pageSizeOptions: ["5", "10", "15", "20", "00"],
      current: 1,
      //pagesieze就是控制第一页默认的条数
      pageSize: 5,
      total: 18,

      previewVisible: false,
      previewImage: "",
      fileList: [],

      textAreaValue: "",
      id: 0,
      dataItem: [],
      msg: "home",
      strategeDetailData: "",
      flag: false,
    });
    const focusTextArea = () => {
      data.flag = true;
    };
    const blurTextArea = () => {
      data.flag = false;
    };

    const getArticalDetail = (id: number) => {
      api
        .getArticalDetail({
          id,
        })
        .then((res: any) => {
          console.log(res);
          data.dataItem = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };

    const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    const handleCancel = () => {
      data.previewVisible = false;
    };
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      data.previewImage = file.url || file.preview;
      data.previewVisible = true;
    };
    const handleChange = ({ fileList }: { fileList: any }) => {
      data.fileList = fileList;
      console.log(fileList, 1);
    };
    const getRecommend = (id: number) => {
      api
        .getRecommend(id)
        .then((res: any) => {
          console.log(res, 9999);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };

    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize);
      data.pageSize = pageSize;

   
    };
    const change = (page: number, pageSize: number) => {
     console.log(page);
    };

    onMounted(() => {
      const id = route.query.id as string;
      data.id = Number(id);
      getArticalDetail(data.id);
      getRecommend(data.id);
    });

    return {
      ...toRefs(data),
      getArticalDetail,
      focusTextArea,
      blurTextArea,
      handleChange,
      handlePreview,
      handleCancel,
      getBase64,
      onShowSizeChange,
      change,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-text {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.title-line {
  margin-top: 20px;
  margin-bottom: 20px;
}
.title {
  margin-top: 10px;
  font-weight: 700;
  font-size: 32px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.upload-box {
  width: 580px;
}

.area-box {
  width: 700px;
  height: 54px;
  resize: none;
  outline: none;
  border: 1px solid #dddddd;
  padding: 10px;
}

.focusStyle {
  border: 1px solid skyblue !important;
}

.title-line {
  width: 100%;
  height: 1px;
  background: rgb(180, 180, 180);
}

.stratege-text {
  font-weight: 700;
}

.stratege-text:hover {
  color: #409eff;
  cursor: pointer;
}

.gray-text {
  color: gray;
}

.strategeDetail-right {
  width: 280px;
}

.strategeDetail-left {
  width: 700px;
}

.strategeDetail {
  width: 1000px;
}

span {
  font-size: 14px;
}

.irace-line {
  margin: 0 10px;
}
</style>
