
<template>
  <div class="app-container">
    <div class="xianshi">
      <!-- 四组图文 -->
      <div class="anniu">
        <el-row>
          <el-button @click="anniu" type="primary" plain>添加分类</el-button>
        </el-row>
      </div>
      <!-- 列表 -->
      <div>
        <el-table
          :data="
            tableData.filter(
              data =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column label="id" prop="ids"> </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope"
              ><img class="list-img" v-lazy="scope.row.paths" alt=""
            /></template>
          </el-table-column>
          <el-table-column label="大标题" prop="titles"> </el-table-column>
          <el-table-column label="小标题" prop="contents"> </el-table-column>
          <el-table-column label="序列号" prop="serial_numbers">
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit1(scope.$index, scope.row)"
                >修改内容</el-button
              >
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >修改整行</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        >
        </el-pagination>
      </div> -->
    </div>
    <!-- 点击插入 -->
    <div class="tanchuang" v-show="tanchuang">
      <div class="biaoge">
        <!-- 图片上传 -->
        <div>
          <div>
            <p class="p-size">图片尺寸(135*135)</p>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="`${baseURL}/setHomeLabel`"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              :data="{ tag, title, content }"
              :before-upload="beforeAvatarUpload"
              :on-success="uploadsuccess"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="title"
                maxlength="4"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="content"
                maxlength="10"
                show-word-limit
              >
              </el-input>
              <div class="botton">
                <el-button type="primary" @click="onSubmit">完成</el-button
                ><el-button @click="cancle">取消</el-button>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击修改 -->
    <div class="tanchuang" v-show="tanchuangupdate">
      <div class="biaoge">
        <!-- 图片上传 -->
        <div>
          <div>
            <p class="p-size">修改图片内容</p>
            <p class="p-size">图片尺寸(135*135)</p>
            <el-upload
              class="upload-demo"
              ref="ref"
              :action="`${baseURL}/updataHomeLableAndImg`"
              :auto-upload="false"
              :file-list="fileList"
              :data="{ ids, titles, contents }"
              :before-upload="beforeAvatarUpload"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-input
                class=""
                type="text"
                placeholder="请输入内容"
                v-model="titles"
                maxlength="4"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="contents"
                maxlength="10"
                show-word-limit
              >
              </el-input>
              <div class="botton">
                <el-button type="primary" @click="xiugai()">完成</el-button
                ><el-button @click="cancle">取消</el-button>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击修改内容 -->
    <div class="tanchuang" v-show="tanchuangupdates">
      <div class="biaoge">
        <!-- 图片上传 -->
        <div>
          <div>
            <p class="p-size">修改图片内容</p>
            <p class="p-size">图片尺寸(135*135)</p>

            <el-input
              class=""
              type="text"
              placeholder="请输入内容"
              v-model="titlees"
              maxlength="4"
              show-word-limit
            >
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="contentes"
              maxlength="10"
              show-word-limit
            >
            </el-input>
            <div class="botton">
              <el-button type="primary" @click="genggai(ids)">完成</el-button
              ><el-button @click="cancle">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: 18,
      title: "",
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      baseURL: this.Globle.baseURL,
      tableData: [],
      search: "",
      labelPosition: "left",
      tanchuang: false,
      tanchuangupdate: false,
      fileList: [],
      ids: "",
      titles: "",
      contents: "",
      ides: "",
      titlees: "",
      contentes: "",
      tanchuangupdates: false
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      // console.log(row.ids)
      this.ids = row.ids;
      this.ides = row.ids;
      this.tanchuangupdate = true;
    },
    handleEdit1(index, row) {
      // console.log(index, row);
      // console.log(row.ids)
      this.ids = row.ids;
      this.tanchuangupdates = true;
    },
    deleteRow(index, row) {
      const id = row.ids;
      console.log(id);
      console.log(row);
      this.axios
        .post(this.Globle.baseURL + "deleteImg", { ids: id })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.$message({
              message: "删除成功",
              top: 30,
              type: "success"
            });
          } else {
            this.$message({
              message: "删除失败",
              top: 30,
              type: "error"
            });
          }
          this.listinfo();
        });
    },
    beforeAvatarUpload(file) {
      const isJpg = /image\/(png|jpe?g|gif)$/.test(file.type);
      // const isLt2M = file.size / 255 / 255 < 2;
      if (!isJpg) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 2MB!");
      // }
      // const isSize = new Promise(function(resolve, reject) {
      //   let width = 255;
      //   let height = 255;
      //   let _URL = window.URL || window.webkitURL;
      //   let img = new Image();
      //   img.onload = function() {
      //     let valid = img.width == width && img.height == height;
      //     valid ? resolve() : reject();
      //   };
      //   img.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     this.$message.error("上传图片的尺寸不对");
      //     return Promise.reject();
      //   }
      // );

      // return isJpg && isLt2M && isSize;
      return isJpg;
    },
    onSubmit() {
      this.$refs.upload.submit();
    },
    uploadsuccess(response, file, fileList) {
      this.listinfo();
      this.tanchuang = false;
      this.$refs.upload.clearFiles();
    },
    anniu() {
      this.tanchuang = true;
    },
    handsuccess() {
      this.$message({
        message: "创建成功",
        top: 30,
        type: "success"
      });
    },
    cancle() {
      if (this.tanchuang == true) {
        this.tanchuang = false;
      }
      if (this.tanchuangupdate == true) {
        this.tanchuangupdate = false;
      }
      if (this.tanchuangupdates == true) {
        this.tanchuangupdates = false;
      }
      this.title = "";
      this.titles = "";
      this.titlees = "";
      this.content = "";
      this.contents = "";
      this.contentes = "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handerror() {
      this.$message({
        message: "上传失败，请重新上传",
        top: 300,
        type: "error"
      });
    },

    // 获取列表信息
    listinfo() {
      this.axios.get(this.Globle.baseURL + "getHomeLables?tag=18").then(res => {
        // console.log(res);
        this.tableData = res.data.datas;
        // console.log(this.tableData);
        let arr = this.tableData;
        let banners = [];
        for (let i = 0; i < arr.length; i++) {
          // console.log(i, arr[i]);
          let path = `${this.Globle.baseURLs}` + arr[i].path;
          // console.log(path);
          let id = arr[i].id;
          // console.log(id);
          let serial_number = arr[i].serial_number;
          let title = arr[i].title;
          let content = arr[i].content;
          // let ban = { paths: path, ids: id };
          // console.log(ban);
          banners.push({
            paths: path,
            ids: id,
            serial_numbers: serial_number,
            titles: title,
            contents: content
          });
          // console.log(banners);
        }
        this.tableData = banners;
        // console.log(this.tableData);
      });
    },
    // 修改图片
    xiugai() {
      this.$refs.ref.submit();
      this.tanchuangupdate = false;
    },
    uploadsuccess(response, file, fileList) {
      this.listinfo();
      this.tanchuang = false;
      this.$refs.upload.clearFiles();
    },
    // 更改图片
    genggai(ids) {
      // console.log(ids);
      this.ides = ids;
      // console.log(this.ides);
      this.axios
        .post(this.Globle.baseURL + "updataHomeLable", {
          ids: this.ides,
          titlees: this.titlees,
          contentes: this.contentes
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "修改成功",
              top: 30,
              type: "success"
            });
          } else {
            this.$message({
              message: "修改失败，请重新修改",
              top: 300,
              type: "error"
            });
          }
          this.listinfo();
          this.tanchuangupdates = false;
          this.titlees = "";
          this.contentes = "";
        });
    }
  },
  mounted() {
    this.listinfo();
  }
};
</script>
<style lang='scss' scoped>
.lunbo-one {
  margin-top: 40px;
}
.app-container,
.el-upload {
  width: 100%;
  min-width: 756px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 20px;
  height: 100%;
}
.anniu {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 20px;
}
.lunbo-one-title {
  padding: 20px;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 3px !important;
}
.biaoge {
  position: fixed;
  z-index: 1000;
  width: 50%;
  min-width: 750px;
  margin: 0 auto;
  border: 1px solid #e8e8e8;
  box-shadow: 10px 10px 5px 5px #9999;
  padding: 35px 10px;
  background-color: #ffffff;
  top: 300px;
  left: 500px;
  text-align: left;
}
.el-form-item__label {
  width: 150px;
}
.fenye {
  margin-top: 20px;
}
.botton {
  margin-top: 20px;
}
.el-table__body-wrapper {
  text-align: center;
}
.list-img {
  width: 50px;
  height: 50px;
}
.p-size {
  margin-bottom: 15px;
}
.bottonimg {
  margin-bottom: 15px;
}
</style>