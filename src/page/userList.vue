<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名:
            <el-input v-model="nameSearch" placeholder="请输入姓名" style="width:150px"></el-input>
            &nbsp;&nbsp;&nbsp;用户状态:
            <el-select v-model="stateSearch" placeholder="">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="doFilter">搜索</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="loginName"
                  label="登录名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="registerClient"
                  label="注册客户端">
                </el-table-column>
                <el-table-column
                  property="registerIp"
                  label="注册ip">
                </el-table-column>
                <el-table-column
                    label="是否会员">
                    <template scope="scope">
                        <div v-if="scope.row.vipState==undefined">无状态值</div>
                        <div v-if="scope.row.vipState==1">会员</div>
                        <div v-if="scope.row.vipState==0">非会员</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户状态">
                    <template scope="scope">
                        <div v-if="scope.row.state==1">启用</div>
                        <div v-if="scope.row.state==2">禁用</div>
                    </template>
                </el-table-column>
                <el-table-column
                  property="createTime"
                  label="注册日期">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template scope="scope">
                        <div style="display: flex">
                            <div v-if="scope.row.state==1"> <el-button
                                size="small"
                                type="danger"
                                @click="handleEdit(scope.row)">冻结</el-button></div>
                            <div v-if="scope.row.state==2"> <el-button
                                size="small"
                                type="info"
                                @click="handleEdit(scope.row)">启用</el-button></div>
                            <div v-if="scope.row.vipState==1"> <el-button
                                size="small"
                                type="danger"
                                @click="userEdit(scope.row)">非会员</el-button></div>
                            <div v-if="scope.row.vipState==0"> <el-button
                                size="small"
                                type="info"
                                @click="userEdit(scope.row)">会员</el-button></div>
                        </div>
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
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {userList,userUpdate} from '../api/getData'
    import {mapActions, mapState} from 'vuex'
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
            this.getAdminData();
            this.initData();
        },
        mounted() {

        },
        methods: {
            ...mapActions(["getAdminData"]),
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
                        searchParams: JSON.stringify({loginName:this.nameSearch,state:this.stateSearch}),
                        pageSize: this.pageSize,
                        current: this.currentPage
                    }
                    this.getUsers(param);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleEdit(row){
                try{
                    let state = 1;
                    if(row.state == 1){
                        state = 2;
                    } else {
                        state = 1;
                    }
                    userUpdate({id:row.id,state:state}).then(result => {
                        if (result.code == 200) {
                            const params = {
                                searchParams: "",
                                pageSize: this.pageSize,
                                current: this.currentPage
                            }
                            this.getUsers(params);
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.msg
                            });
                        }
                    })
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                }
            },
            userEdit(row){
                try{
                    let vipState = 1;
                    if(row.vipState == 1){
                        vipState = 0;
                    } else {
                        vipState = 1;
                    }
                    userUpdate({id:row.id,vipState:vipState}).then(result => {
                        if (result.code == 200) {
                            const params = {
                                searchParams: "",
                                pageSize: this.pageSize,
                                current: this.currentPage
                            }
                            this.getUsers(params);
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.msg
                            });
                        }
                    })
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                }
            },
            handleCurrentChange(val) {
                const params = {
                    searchParams: JSON.stringify({loginName:this.nameSearch,state:this.stateSearch}),
                    pageSize: this.pageSize,
                    current: val
                }
                this.getUsers(params)
            },
            getUsers(params = {}) {
                userList(params).then(result => {
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
