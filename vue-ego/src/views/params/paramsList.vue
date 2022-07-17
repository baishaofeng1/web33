<template>
  <div>
    <ParamsHead />
    <el-table :data="paramsData">
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="itemCatId"
        label="产品规格ID"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="paramData"
        label="规格参数"
      ></el-table-column>
       <el-table-column label="操作" width="100%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogParmasVisible"
      width="65%"
      :before-close="handleClose"
    >
      <ParamsTree @onTree="getTreeData"/>

      <!-- 子弹出框 -->
      <el-dialog
        title="添加参数"
        :visible.sync="dialogInnerParamsVisible"
        width="60%"
        :before-close="handleClose"
        append-to-body
      >
        <el-button @click="addMainParamsHandle">添加主结构</el-button>
        <el-form :model="paramsDoMain" ref="paramsDoMain">
          <el-form-item
            label="规格参数"
            v-for="(item, index) in paramsDoMain.domains"
            :key="index"
          >
            <el-input placeholder="添加主结构" v-model="item.value" style="width: 90%"></el-input>
            <el-button @click="delMainParamsHandle(index)">删除主结构</el-button>
            <el-button @click="addChildParamsHandle(index)">添加子结构</el-button>
           <div v-for="(childItem, childIndex) in item.children" :key="childIndex">
              <el-input v-model="childItem.childValue" style="width: 60%" placeholder="添加子结构"></el-input>
              <el-button @click="delChildParamsHandle(index,childIndex)">删除子结构</el-button>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInnerParamsVisible = false">取 消</el-button>
        <el-button type="primary" @click="finshHandle">确 定</el-button>
      </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParmasVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogInnerParamsVisible = true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
import ParamsHead from "../../components/PunHead";
import { mapState } from "vuex";
import ParamsTree from "../product/productTree.vue";

export default {
  data() {
    return {
      paramsData: [],
      dialogParmasVisible: false,
      dialogInnerParamsVisible: false,
      treeData:{},
      paramsDoMain: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                //value并不是在这里添加，这里只是添加一个结构，具体数据，有商品添加的时候处理
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    ParamsHead,
    ParamsTree,
  },
  computed: {
    ...mapState("pubModule", ["search"]),
  },
  watch: {
    //监听vuex中search的变化
    search(newVal) {
      api
        .paramsSearch({
          search: newVal,
        })
        .then((res) => {
          if (res.status === 200) {
            this.paramsData = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    /**
     * 添加主结构
     */
    addMainParamsHandle() {
      this.paramsDoMain.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },
    /**
     * 添加子结构
     */
    addChildParamsHandle(index){
      this.paramsDoMain.domains[index].children.push({
                childValue: "",
                value: "",
         })
    },
    /**
     * 删除主结构
     */
    delMainParamsHandle(index){
      this.paramsDoMain.domains.splice(index,1);
    },
    /**
     * 删除子结构
     */
    delChildParamsHandle(index,childIndex){
      this.paramsDoMain.domains[index].children.splice(childIndex,1);
    },
    /**
     * 获取类目选择
     */
    getTreeData(data){
      this.treeData = data
    },
    /**
     * 添加规格参数
     */
    finshHandle(){
      api.insertItemParam({
        itemCatId:this.treeData.cid,  //规格参数
        paramData:JSON.stringify(this.paramsDoMain)//输入的数据,这里paramsDoMain不是基本数据类型，后台插入不进去，要转换
      }).then(res =>{
        if(res.data.status === 200){
          this.dialogParmasVisible = false;
          this.dialogInnerParamsVisible = false;
          //视图重绘
          this.http(1) 
        }
      }).catch(error =>{
        console.log(error);
      })
    },
    http(page){
      api.selectItemParamAll({ page })
      .then((res) => {
        if (res.data.status === 200) {
          this.paramsData = res.data.result;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //删除功能
    handleDelete(index,row){
      api.paramsDelet({
        id:row.id
      }).then(res =>{
        if(res.data.status === 200){
          this.http(1);
        }
      }).catch(error =>{
        console.log(error);
      })
    }
  },
  mounted() {
    this.$bus.$on("onAdd", (flag) => {
        this.dialogParmasVisible = flag;
    });

    this.http(1)
  },
};
</script>

<style>
</style>