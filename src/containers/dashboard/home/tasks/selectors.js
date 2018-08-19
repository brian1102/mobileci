import { createSelector } from 'reselect'

const getState = state => (state.task ? state.task : state)

export const getTask = createSelector([getState], state => {
  const task = state.get('tasks')
  return task && task.filter ? task.filter(t => !t.completedTime) : task
})

export const getCurrentTaskIndex = createSelector([getState], state =>
  state.get('currentTask')
)

export const getCurrentTask = createSelector(
  [getTask, getCurrentTaskIndex],
  (tasks, i) => {
    return tasks[i]
  }
)

export const getTaskGroupTimeRequirement = taskgroup => {
  if (!taskgroup || !taskgroup.tasks || !taskgroup.tasks.length) return ''
  return taskgroup.tasks.map(task => task.timeDescription).join('\n')
}
