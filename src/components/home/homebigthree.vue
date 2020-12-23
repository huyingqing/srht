
<template>
  <div class="app-container">
    <div class="xianshi">
      <!-- 首页宣言 -->
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
          <el-table-column label="id" prop="id"> </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope"
              ><img class="list-img" v-lazy="scope.row.path" alt=""
            /></template>
          </el-table-column>
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
            <p class="p-size">图片尺寸(1210*569)</p>
            <el-upload
              :action="`${baseURL}/setSingleImg`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :data="{ tag }"
              ref="upload"
              :on-error="handerror"
              :on-success="handsuccess"
              :before-upload="beforeAvatarUpload"
              accept="image/*"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" v-lazy="dialogImageUrl" alt="" />
            </el-dialog>
          </div>

          <div class="botton">
            <el-button type="primary" @click="onSubmit">完成</el-button
            ><el-button @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
      <!-- 背景图片 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      tag: 13,
      baseURL: this.Globle.baseURL,
      tableData: [],
      search: "",
      labelPosition: "left",
      tanchuang: false
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    deleteRow(index, row) {
      const id = row.id;
      // console.log(id);
      // console.log(row);
      this.axios.post(this.Globle.baseURL+"deleteImg", { ids: id }).then(res => {
        console.log(res);
        if (res.status == 200) {
          // this.listinfo();
          this.tableData=[]
          this.$message({
            message: "删除成功",
            top: 30,
            type: "success"
          });
        }
      });
    },
    onSubmit() {
      this.tanchuang = false;
      this.$refs.upload.clearFiles();
      this.listinfo();
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
    handlePictureCardPreview(file) {
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
      return isJpg  ;
    },
    // 获取合规宣言列表信息
    listinfo() {
      this.axios.get(this.Globle.baseURL+"getImg?tag=13").then(res => {
        // console.log(res);
        let table = res.data.datas;
        // console.log(table);
        table.path =  `${this.Globle.baseURLs}`  + res.data.datas.path;
        // console.log(table);
        this.tableData.push(table);
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
</style>