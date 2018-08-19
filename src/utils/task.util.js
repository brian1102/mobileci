import { cloneObject, formatDateBasedOnDeviceTimezone } from './index'
import Config from '../config/index'
import tr from '../i18n/i18n'
import { getWorkerMarker, getPreviewMarker } from '../components/task-map/markers'

const getTaskTimeRequirement = task => {
  if (!task) return ''
  return tr(
    'task_time_requirement',
    tr(task.type),
    formatDateBasedOnDeviceTimezone(task.from),
    formatDateBasedOnDeviceTimezone(task.to)
  )
}

export const getPackageSizeDescription = task => {
  if (!task) return ''
  const { item } = task
  const packageDimensionText = item.length && item.width && item.height
    ? `${tr(
      'dimension'
    )}: L(${item.length}cm) x W(${item.width}cm) x H(${item.height}cm)`
    : null
  const weightText = item.weight ? `${tr('weight')}: ${item.weight}kg` : null

  return packageDimensionText && weightText
    ? `\n${packageDimensionText}\n${weightText}`
    : // eslint-disable-next-line
    packageDimensionText ? packageDimensionText : weightText ? weightText : ''
}

const getDeliveryDate = task => {
  return Config().SHOW_SERVICE_TYPE && task.serviceType
    ? tr(`job.delivery_${task.serviceType}`)
    : null
}

export const convertTaskOnCompleteJobFlow = task => ({
  id: task.id,
  type: task.type,
  state: task.state
})

export const convertTasksData = (tasks, companyRules) => {
  if (!tasks || !tasks.length) return []
  return tasks.map(task => ({
    workerId: task.worker_id,
    unitNumber: task.unit_number,
    type: task.type,
    to: task.to,
    taskGroupId: task.task_group_id,
    state: task.state,
    startTime: task.start_time,
    position: task.position,
    longitude: task.lng,
    latitude: task.lat,
    packageSizeDescription: getPackageSizeDescription(task),
    deliveryDate: getDeliveryDate(task),
    rules: companyRules ? cloneObject(companyRules[task.type]) : [],
    item: task.item
      ? {
        width: task.item.width,
        weight: task.item.weight,
        volumetricWeight: task.item.volumetric_weight,
        trackingNumber: task.item.global_tracking_number,
        length: task.item.length,
        height: task.item.height
      }
      : {},
    id: task.id,
    from: task.from,
    description: task.description,
    timeDescription: getTaskTimeRequirement(task),
    contact: task.contact,
    completionTime: task.completion_time,
    address: task.address,
    serviceType: task.service_type
  }))
}

export const convertTaskgroup = taskGroups => {
  const sorted = []
  taskGroups.forEach(taskgroup => {
    // 1: filter out repeated taskGroup
    // 2: reject taskGroups with 0 tasks
    const index = sorted.findIndex((ele) => ele.id === taskgroup.id);
    if (index >= 0 || taskgroup.tasks.length < 1) {
      return
    }
    const newElement = {
      state: taskgroup.state,
      price: taskgroup.price,
      id: taskgroup.id,
      assignedTime: taskgroup.assigned_time,
      acceptedTime: taskgroup.accepted_time,
      tasks: convertTasksData(taskgroup.tasks)
    }
    if(taskgroup.state === 'broadcasted' ) {
      sorted.unshift(newElement)
    } else {
      sorted.push(newElement)
    }
  })
  return {
    taskGroups: sorted,
    total: sorted.length
  }
}

export const createMarkers = (taskGroup, currentLocation) => {
  const latlong = []
  const min = 0.999998
  const max = 1.000003
  if (taskGroup.length !== 0) {
    for (let i = 0; i < taskGroup.length; i++) {
      const posExistingMarker = taskGroup[i]
      // update the position of the coincident marker by applying a small multipler to its coordinates
      // TODO find a better method
      const newLat =
        posExistingMarker.latitude * (Math.random() * (max - min) + min)
      const newLng =
        posExistingMarker.longitude * (Math.random() * (max - min) + min)
      latlong.push({
        ...posExistingMarker,
        latitude: newLat,
        longitude: newLng
      })
    }
  }
  if (currentLocation) {
    const workerMarker = getWorkerMarker(currentLocation)
    if (workerMarker) latlong.push(workerMarker)
  }
  return latlong
    .map(item => getPreviewMarker(item))
    .filter(item => item !== null)
}
