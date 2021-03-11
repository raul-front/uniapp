/*
 * @Descripttion: 使用示例
 * @Author: pujianguo
 * @Date: 2021-03-11 09:17:11
 */
import { _get, _post, _put, _delete } from '../utils/request'

// eg: task
export const listTask = (params, loading = true) => _get('oa/task', params, loading)
export const addTask = params => _post('oa/task', params)
export const updateTask = (id, params) => _put(`oa/task/${id}`, params)
export const deleteTask = id => _delete(`oa/task/${id}`)
