<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>管理后台</el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>用户管理</template>
					    <el-menu-item index="userList">用户列表</el-menu-item>
					    <el-menu-item index="blackList">冻结用户列表</el-menu-item>
                    </el-submenu>
					<el-menu-item index="system"><i class="el-icon-document"></i>系统参数设置</el-menu-item>
					<el-menu-item index="orderList"><i class="el-icon-document"></i>订单管理</el-menu-item>
					<el-menu-item index="chargeList"><i class="el-icon-document"></i>充值管理</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
