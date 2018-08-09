import {axiosPost,axiosGet} from "../config/fetch"
/**
 * 登陆
 */
export const login = data => axiosPost('/system/user/login.htm', data);
/**
 * 退出
 */
export const loginOut = () => axiosGet('/system/user/loginOut.htm');
/**
 * 获取订单列表
 */
export const orderList = data => axiosPost('/manage/order/search/list.htm', data);
/**
 * 修改订单信息
 */
export const orderSave = data => axiosPost('/manage/order/search/save.htm', data);
/**
 * 充值记录列表
 */
export const chargeList = data => axiosPost('/manage/charge/search/list.htm', data);
/**
 * 保存充值记录
 */
export const chargeSave = data => axiosPost('/manage/charge/search/save.htm', data);
/**
 * 获取管理员用户信息
 */
export const getAdminInfo = () => axiosGet('/system/user/find.htm');

/**
 * 获取用户列表
 */
export const userList = data => axiosPost('/manage/user/search/list.htm', data);
/**
 * 冻结用户操作
 */
export const userUpdate = data => axiosPost('/manage/user/search/update.htm', data);
/**
 * 系统参数设置
 */
export const systemConfig = data => axiosPost('/modules/manage/system/config/list.htm', data);
/**
 * 刷新缓存
 */
export const refreshCache = data => axiosPost('/modules/manage/system/config/reload.htm', data);

/**
 * 保存系统参数
 */
export const saveCache = data => axiosPost('/modules/manage/system/config/save.htm', data);


