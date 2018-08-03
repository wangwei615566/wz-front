<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参数编号:
            <el-input v-model="nameSearch" placeholder="请输入参数编号" style="width:150px"></el-input>
            &nbsp;&nbsp;&nbsp;参数名称:
            <el-input v-model="stateSearch" placeholder="请输入参数编号" style="width:150px"></el-input>
            <el-button type="primary" @click="doFilter">搜索</el-button>
            <el-button type="primary" @click="handleInsert">新增</el-button>
            <el-button type="primary" @click="doCache">刷新缓存</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="code"
                  label="参数编号"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="参数名称">
                </el-table-column>
                <el-table-column
                  property="value"
                  label="参数值">
                </el-table-column>
                <el-table-column
                  property="typeStr"
                  label="参数类型">
                </el-table-column>
                <el-table-column
                  property="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template scope="scope">
                        <div v-if="scope.row.status==1">启用</div>
                        <div v-if="scope.row.status==0">禁用</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template scope="scope">
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleEdit(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="新增参数信息" v-model="visible">
                <el-form :model="selectTable">
                    <el-form-item label="参数编号" label-width="100px">
                        <el-input v-model="selectTable.code" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="参数名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="参数值" label-width="100px">
                        <el-input v-model="selectTable.value" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="参数类型" label-width="100px">
                        <el-input v-model="selectTable.typeStr" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input v-model="selectTable.remark" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="save()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {systemConfig,refreshCache,saveCache} from '../api/getData'
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                pageSize: 10,
                count: 0,
                currentPage: 1,
                selectTable: {},
                visible:false,
                nameSearch:'',
                stateSearch:'',
                options: [{
                    value: '',
                    label: '全选'
                },{
                    value: '1',
                    label: '启用'
                },{
                    value: '2',
                    label: '禁用'
                }],
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        mounted() {

        },
        methods: {
            initData() {
                try {
                    const params = {
                        searchParams: "",
                        pageSize: this.pageSize,
                        current: this.currentPage
                    }
                    this.getUsers(params);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            doFilter(){
                try {
                    const param = {
                        searchParams: JSON.stringify({code:this.nameSearch,name:this.stateSearch}),
                        pageSize: this.pageSize,
                        current: this.currentPage
                    }
                    this.getUsers(param);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            save(params = {}){
                try {
                    params = {
                        json:JSON.stringify(this.selectTable),
                        status:"update"
                    }
                    saveCache(params).then(result => {
                        if (result.code == 200) {
                            this.$message({
                                type: 'success',
                                message: result.msg
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.msg
                            });
                        }
                    })
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            doCache(params = {}){
                try {
                    refreshCache(params).then(result => {
                        if (result.code == 200) {
                            this.$message({
                                type: 'success',
                                message: result.msg
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.msg
                            });
                        }
                    })
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleInsert(){
                this.selectTable={};
                this.visible = true;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleEdit(row){
                this.selectTable = row;
                this.visible = true;
            },
            handleCurrentChange(val) {
                const params = {
                    searchParams: JSON.stringify({code:this.nameSearch,name:this.stateSearch}),
                    pageSize: this.pageSize,
                    current: val
                }
                this.getUsers(params)
            },
            getUsers(params = {}) {
                systemConfig(params).then(result => {
                    if (result.code == 200) {
                        this.count = result.page.total;
                        this.$message({
                            type: 'success',
                            message: result.msg
                        });
                        this.tableData = result.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: result.msg
                        });
                    }
                })
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
