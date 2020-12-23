
<template>
  <div class="app-container">
    <div class="xianshi">
      <!-- 轮播图 -->
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
          <el-table-column label="ID" prop="date"> </el-table-column>
          <el-table-column label="图片" prop="name"> </el-table-column>
          <el-table-column label="地址" prop="address"> </el-table-column>
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
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜单内容">
              <el-input
                type="text"
                placeholder="请输入大标题内容（长度不能超过5个字符）"
                v-model="text"
                maxlength="5"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="cancle">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      textarea: '',
      tableData: [],
      search: "",
      labelPosition: "left",
      form: {
        type: []
      },

      tanchuang: false
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
      this.$message({
        message: "恭喜你，这是一条成功消息",
        top: 300,
        type: "success"
      });
      this.tanchuang = false;
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
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
</style>