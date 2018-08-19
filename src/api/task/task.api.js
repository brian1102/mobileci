import { httpGet, httpPut, uploadPhoto, httpPost } from '../BaseApi'
import * as c from '../../state/constants'

export const getTasks = (page = 1, pageSize) =>
  httpGet(
    `/api/v3/worker/tasks/ongoing?page_size=${pageSize}&page=${page}`
  )

// TODO: replace it with another api
export const getTasksCountAndLatLongForMapOverview = () =>
  httpGet(`/api/v3/worker/tasks/ongoing?page_size=1000000`)

export const completeTask = ({ taskId, completedAt, location }) =>
  httpPut(`/api/v3/worker/tasks/${taskId}/complete`, {
    completion_time: completedAt,
    location
  })

export const uploadPOD = ({ task, condition, image, completedAt, meta }) => {
  const data = {
    task_id: task.id,
    sub_task_rule_id: condition.id,
    event: 'pickup_completed',
    completion_time: completedAt,
    action: condition.action,
    meta: {
      photo_type: 'Proof of delivery',
      photo_title: meta
    }
  }

  return uploadPhoto(
    '/api/v3/worker/sub_tasks',
    `file:///${image}`,
    'photo',
    data
  )
}

// TODO add paginator
export const getUnacceptedTaskgroup = () =>
  httpGet(
    '/api/v3/worker/task_groups?status[]=assigned&status[]=broadcasted&page=1&page_size=100000'
  )

export const acceptTaskGroup = id =>
  httpPut(`/api/v3/worker/task_groups/${id}/accept`)

export const rejectTaskGroup = id =>
  httpPut(`/api/v3/worker/task_groups/${id}/reject`)

export const reportTask = ({ id, params }) => {
  httpPost(`/api/v3/worker/task/${id}/mark_as_failed`, params)
}

// TODO add paginator
export const getHistory = (type, page, pageSize) => {
  const params = {
    range: type === c.HISTORY_TODAY
      ? 'today'
      : type === c.HISTORY_LAST7DAY ? 'last_week' : 'last_four_weeks',
    page,
    page_size: pageSize
  }

  return httpGet('/api/v3/worker/tasks/history', params)
}

export const bulkComplete = data => {
  return httpPut('/api/v3/worker/tasks/bulk_complete', data)
}

export const bulkCheckProgress = id => {
  return httpGet(`/api/v3/worker/tasks/batches/${id}/status`)
}
