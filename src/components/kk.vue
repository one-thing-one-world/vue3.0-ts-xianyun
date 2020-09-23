<template>
  <div class="container">
    <div style="width: 1000px;" class="flex">
      <div style="width: 750px;" class="left m-r-30">
        <div class="text1">发表新攻略</div>
        <div class="text2">分享你的个人游记，让更多人看到哦！</div>
        <input type="text" placeholder="请输入标题" class="el-input__inner m-b-20 w100p" v-model="title" />
        
        <div>
          <div class="ql-toolbar ql-snow">
            <div
              v-for="(item,index) in icons"
              :key="index"
              class="m-r-20"
              :class="{'blueHov':num===index}"
              @click="execCommand(item,index)"
              @mouseenter="enter(index)"
            >
              <component :is="item" style="width:20px;"></component>
            </div>
          </div>
          <div
            contenteditable
            id="textbox"
            class="text"
            ref="text"
            :class="{'fw-900':bold,'italic':italic,'underline':underline,'through':through,'h1':h1,'h2':h2}"
          ></div>
        </div>

        <div class="flex a-center m-tb-20">
          <div class="el-form-item__label">选择城市</div>
          <a-input v-model:value="city" placeholder="请搜索游玩城市" />
        </div>
        <div class="m-b-20">
          <a-button type="primary" size="small" @click="release">发布</a-button>
          <span class="button">
            或者
            <span class="textOne m-l-5" @click="save">保存到草稿</span>
          </span>
        </div>

      </div>
      <div>
        <div class="right">
          <div>草稿箱（{{drafts.length}}）</div>
          <div v-if="drafts.length!==0">
            <div v-for="(item,index) in drafts" :key="index">
              <div class="m-tb-10">标题：{{item.title}}</div>
              <div class="flex j-end">
                <EditOutlined class="m-r-10" @click="edit(item)" />
                <DeleteOutlined class="m-l-10" @click="del(item,index)" />
              </div>
            </div>
          </div>
          <div v-else class="m-t-10">
            <div>草稿箱是空的噢！</div>
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
  ref,
  onMounted,
  watch,
  computed,
} from "vue";
import api from "../../http/api";
import { Modal } from "ant-design-vue";
import { Store, useStore } from "vuex";
interface Data {
  value: any;
  icons: string[];
  num: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  through: boolean;
  h1: boolean;
  h2: boolean;
  city: string;
  title: string;
  content: any;
  drafts: any;
  obj: ObjItem;
  idx: number;
}
interface ObjItem {
  city: string;
  title: string;
  content: string;
  text?: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let text = ref<HTMLDivElement | null>(null);
    let store = useStore();
    let data: Data = reactive<Data>({
      value: "",
      icons: [
        "BoldOutlined",
        "ItalicOutlined",
        "UnderlineOutlined",
        "StrikethroughOutlined",
        "SortAscendingOutlined",
        "SortDescendingOutlined",
        "PictureOutlined",
      ],
      num: -1,
      bold: false, //加粗
      italic: false, //斜体
      underline: false, //下划线
      through: false, //中间线
      h1: false, //H1
      h2: false, //H2
      city: "",
      title: "",
      content: "",
      drafts: [], //草稿箱
      obj: {
        city: "",
        title: "",
        content: "",
        text: "",
      },
      idx: -1,
    });
    const enter = (index: number) => {
      data.num = index;
    };
    //富文本操作
    const execCommand = (item: string, index: number) => {
      if (index === 0) {
        data.bold = !data.bold;
      } else if (index === 1) {
        data.italic = !data.italic;
      } else if (index === 2) {
        data.underline = !data.underline;
      } else if (index === 3) {
        data.through = !data.through;
      } else if (index === 4) {
        data.h1 = !data.h1;
      } else if (index === 5) {
        data.h2 = !data.h2;
      }
    };
    //发布文章
    const release = () => {
      // console.dir(typeof text.value!.outerHTML); //标签变成字符串
      //获取ref内容
      // console.log(text.value!.innerHTML);
      // console.log(text.value!.textContent);
      data.content = text.value!.outerHTML;
      if (data.city !== "" && data.title !== "" && data.content !== "") {
        api
          .getAddArticle({
            content: data.content,
            title: data.title,
            city: data.city,
          })
          .then((res) => {
            if (res.status === 0) {
              Modal.success({ title: "发表成功" });
              text.value!.textContent = "";
              data.title = "";
              data.city = "";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Modal.warning({ title: "请正确输入" });
      }
    };
    //保存到草稿
    const save = () => {
      data.content = text.value!.outerHTML;
      if (data.city !== "" && data.title !== "" && data.content !== "") {
        data.obj.city = data.city;
        data.obj.title = data.title;
        data.obj.content = data.content;
        data.obj.text = text.value!.innerHTML;
        if (localStorage.getItem("drafts")) {
          let arr = JSON.parse(localStorage.getItem("drafts") as any);
          arr.unshift(data.obj);
          localStorage.setItem("drafts", JSON.stringify(arr));
          store.commit("setDrafts", arr);
          text.value!.textContent = "";
          data.title = "";
          data.city = "";
        } else {
          let arr = [];
          arr.unshift(data.obj);
          localStorage.setItem("drafts", JSON.stringify(arr));
          store.commit("setDrafts", arr);
          text.value!.textContent = "";
          data.title = "";
          data.city = "";
        }
      } else {
        Modal.warning({ title: "请正确输入" });
      }
    };
    const drafts = computed(() => store.state.drafts);
    const edit = (item: any) => {
      data.city = item.city;
      data.title = item.title;
      text.value!.innerHTML = item.text;
    };
    const del = (item: any, index: number) => {
      Modal.confirm({
        title: "确定要删除吗?",
        onOk() {
          let idx = index;
          data.drafts.splice(idx, 1);
          let historyDrafts = JSON.parse(localStorage.getItem("drafts") as any);
          historyDrafts.splice(idx, 1);
          localStorage.setItem("drafts", JSON.stringify(historyDrafts));
          store.commit("setDrafts", data.drafts);
        },
        onCancel() {},
      });
    };
    onMounted(() => {
      data.drafts = drafts;
      // console.log(drafts);
    });
    return {
      ...toRefs(data),
      text,
      execCommand,
      enter,
      release,
      save,
      edit,
      del,
      drafts,
    };
  },
});
</script>

<style scoped lang="scss">
.editButtons span {
  display: inline-block;
  white-space: nowrap;
}
[data-edit] {
  float: left;
  border: 0;
  font: 12px/1 monospace;
  background: #ddd;
  padding: 4px 8px;
}
[contenteditable] {
  padding: 4px 16px;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  color: #606266;
  height: 400px;
  outline: none;
}
.text1 {
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 10px;
}
.text2 {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-input__inner:hover {
  border-color: #c0c4cc;
}
.ql-toolbar.ql-snow {
  height: 58px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.blueHov {
  &:hover {
    color: rgb(0, 102, 204);
    cursor: pointer;
  }
}
.iuput1 {
  background: none;
  outline: none;
  border: none;
  width: 100%;
  height: 400px;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 8px;
}
.el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.ant-input {
  width: 190px;
}
.textOne {
  color: rgb(255, 165, 0);
}
.button {
  margin-left: 16px;
}

.right {
  width: 280px;
  border: 1px solid rgb(204, 204, 204);
  margin-bottom: 10px;
  font-weight: 400;
  color: #666;
  padding: 10px;
  border-radius: 2px;
}
</style>