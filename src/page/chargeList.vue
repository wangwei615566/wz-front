<template>
    <div class="fillcontain">
        <head-top>
        </head-top>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;充值状态:
            <el-select v-model="state" placeholder="">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;付款账号:
            <el-input v-model="orderSearch" placeholder="请输入付款帐号" style="width:200px"></el-input>
            <el-button type="primary" @click="doFilter">搜索</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="收款账户"
                    prop="recAccount">
                </el-table-column>
                <el-table-column
                    label="付款账户"
                    prop="payAccount">
                </el-table-column>
                <el-table-column
                    label="付款金额"
                    prop="amount">
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="remark">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template scope="scope">
                        <div v-if="scope.row.state==1">成功</div>
                        <div v-if="scope.row.state==0">失败</div>
                        <div v-if="scope.row.state==2">等待</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime">
                </el-table-column>
                <el-table-column label="操作" show-tooltip-when-overflow>
                    <template scope="scope">
                       <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            <el-dialog title="修改充值信息" v-model="visible">
                <el-form :model="selectTable">
                    <el-form-item label="收款账户" label-width="100px">
                        <el-input v-model="selectTable.recAccount" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="付款账户" label-width="100px">
                        <el-input v-model="selectTable.payAccount" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="付款金额" label-width="100px">
                        <el-input v-model="selectTable.amount" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input v-model="selectTable.remark" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="100px">
                        <el-select v-model="selectTable.state" placeholder="">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="updateOrder">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {chargeList,chargeSave} from '../api/getData'
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
                options: [{
                    value: 1,
                    label: '成功'
                },{
                    value: 0,
                    label: '失败'
                },{
                    value: 2,
                    label: '等待'
                }],
                state:'',
                orderSearch:''
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
                    this.getOrders(params);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            doFilter(){
                try {
                    const param = {
                        searchParams: JSON.stringify({payAccount:this.orderSearch,state:this.state}),
                        pageSize: this.pageSize,
                        current: this.currentPage
                    }
                    this.getOrders(param);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                const params = {
                    searchParams: JSON.stringify({payAccount:this.orderSearch,state:this.state}),
                    pageSize: this.pageSize,
                    current: val
                }
                this.getOrders(params)
            },
            getOrders(params = {}) {
                chargeList(params).then(result => {
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
            handleEdit(index, row) {
                this.selectTable = row;
                this.visible = true;
            },
            updateOrder(){
                this.visible = false;
                try{
                    Object.assign(this.selectTable);
                    let searchParams = {searchParams:JSON.stringify(this.selectTable)}
                    chargeSave(searchParams).then(result => {
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
                }catch(err){
                    console.log('更新订单信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container {
        padding: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
