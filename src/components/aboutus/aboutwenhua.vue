
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
          style="width: 100%;"
        >
          <el-table-column label="id" prop="imgo.id"> </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope"
              ><img class="list-img" v-lazy="scope.row.imgo.path" alt=""
            /></template>
          </el-table-column>
          <el-table-column label="序列号" prop="imgo.serial_number">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true"  label="文章内容" prop="text"> </el-table-column>
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
                @click="handleEdit(scope.$index, scope.row)"
                >查看</el-button
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
            <p class="p-size">选择图片</p>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="`${baseURL}/setGraphicsAndText`"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              :data="{ tag, content }"
              :before-upload="beforeAvatarUpload"
              :on-success="uploadsuccess"
              :on-error="handerror"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-input
                type="text"
                placeholder="输入内容必须在300个字符以上"
                v-model="content"
                minlength="300"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
              <div class="botton">
                <el-button type="primary" @click="onSubmit">完成</el-button
                ><el-button @click="cancle">取消</el-button>
              </div>
            </el-upload>
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
      tag: 10,
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      baseURL:this.Globle.baseURL,
      tableData: [],
      search: "",
      labelPosition: "left",
      tanchuang: false,
      fileList: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    deleteRow(index, row) {
      console.log(row.imgo.id);
      const id = row.imgo.id;
      this.axios.post(this.Globle.baseURL+"deleteImg", { ids: id }).then(res => {
        console.log(res);
        if (res.status == 200) {
        //   this.tableData=[];
        this.listinfo();
          this.$message({
            message: "删除成功",
            top: 30,
            type: "success"
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJpg = /image\/(png|jpe?g|gif)$/.test(file.type);
      return isJpg;
    },
    onSubmit() {
      this.$refs.upload.submit();
    },
    uploadsuccess(response, file, fileList) {
      this.content = "";
      this.tanchuang = false;
      this.$refs.upload.clearFiles();
      this.listinfo();
      this.$message({
        message: "上传成功",
        top: 300,
        type: "success"
      });
    },
    anniu() {
      this.tanchuang = true;
    },
    cancle() {
      if (this.tanchuang == true) {
        this.tanchuang = false;
      }
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
      this.axios.get(this.Globle.baseURL+"getImgAndTxt?tag=10").then(res => {
        // console.log(res);
        let imgo = res.data.datas.img;
        imgo.path = `${this.Globle.baseURLs}` + res.data.datas.img.path;
        let text = res.data.datas.txt;
        this.tableData.push({ imgo, text });
        // console.log(this.tableData);
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
  width: 150px;
  height: 50px;
}
.p-size {
  margin-bottom: 15px;
}
.bottonimg {
  margin-bottom: 15px;
}
.label-text{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>