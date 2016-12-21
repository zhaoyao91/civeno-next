import React, {Component} from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import {RaisedButton, List, ListItem, IconButton, Checkbox} from 'material-ui'
import {ActionDelete} from 'material-ui/svg-icons'
import {red500} from 'material-ui/styles/colors'

class TaskList extends Component {
  state = {
    tasks: [
      { _id: 1, content: 'eat food', complete: false },
      { _id: 2, content: 'sleep well', complete: true }
    ]
  };

  render() {
    const { tasks } = this.state;

    return <div>
      <CreateTaskButton createTask={this.createTask}/>
      <InnerTaskList
        tasks={tasks}
        removeTask={this.removeTask}
        updateTaskContent={this.updateTaskContent}
        updateTaskCompletion={this.updateTaskCompletion}
      />
    </div>
  }

  createTask = (task) => {
    this.setState({
      tasks: [ Object.assign({}, task, { complete: false }) ].concat(this.state.tasks)
    })
  };

  removeTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task._id !== id)
    })
  };

  updateTaskContent = (id, content) => {
    this.updateTask(id, (task) => Object.assign({}, task, { content }))
  };

  updateTaskCompletion = (id, complete) => {
    this.updateTask(id, (task) => Object.assign({}, task, { complete }))
  };

  updateTask = (id, update) => {
    this.setState({
      tasks: this.state.tasks.map(task => {
        return task._id === id ?
          update(task)
          :
          task
      })
    })
  }
}

export default TaskList;

const CreateTaskButton = ({ createTask }) => {
  const onClick = (e) => {
    const content = _.trim(prompt('请输入任务内容'));
    if (content) {
      createTask({
        _id: uuid(),
        content: content
      })
    }
  };

  return <RaisedButton label="创建任务" primary onClick={onClick}/>
};

const InnerTaskList = ({ tasks = [], removeTask, updateTaskContent, updateTaskCompletion }) => {
  return <List>
    {
      tasks.map(task => <TaskListItem
        key={task._id}
        task={task}
        removeTask={removeTask}
        updateTaskContent={updateTaskContent}
        updateTaskCompletion={updateTaskCompletion}
      />)
    }
  </List>
};

const TaskListItem = ({ task, removeTask, updateTaskContent, updateTaskCompletion }) => {
  const onCheck = (e, checked) => {
    updateTaskCompletion(task._id, checked);
  };

  const onClickText = (e) => {
    e.preventDefault();
    const content = _.trim(prompt('请输入任务内容'));
    if (content) {
      updateTaskContent(task._id, content);
    }
  };

  return <ListItem
    primaryText={<div onClick={onClickText}>{task.content}</div>}
    rightIconButton={<RemoveTaskButton task={task} removeTask={removeTask}/>}
    leftCheckbox={<Checkbox checked={task.complete} onCheck={onCheck}/>}
  />
};

const RemoveTaskButton = ({ task, removeTask, ...props }) => {
  const onClick = (e) => {
    if (confirm('确定要删除任务？')) {
      removeTask(task._id);
    }
  };

  return <IconButton {...props} onClick={onClick}>
    <ActionDelete color={red500}/>
  </IconButton>
};