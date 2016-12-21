import React, {Component} from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import {RaisedButton, List, ListItem, IconButton} from 'material-ui'
import {ActionDelete} from 'material-ui/svg-icons'
import {red500} from 'material-ui/styles/colors'

class TaskList extends Component {
  state = {
    tasks: [
      { _id: 1, content: 'eat food' },
      { _id: 2, content: 'sleep well' }
    ]
  };

  render() {
    const { tasks }=this.state;

    return <div>
      <CreateTaskButton createTask={this.createTask}/>
      <InnerTaskList tasks={tasks} removeTask={this.removeTask}/>
    </div>
  }

  createTask = (task) => {
    this.setState({
      tasks: [ task ].concat(this.state.tasks)
    })
  };

  removeTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task._id !== id)
    })
  };
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

const InnerTaskList = ({ tasks = [], removeTask }) => {
  return <List>
    {
      tasks.map(task => <ListItem
        key={task._id}
        primaryText={task.content}
        rightIconButton={<RemoveTaskButton/>}
      />)
    }
  </List>
};

const RemoveTaskButton = ({ task, removeTask }) => {
  return <IconButton>
    <ActionDelete color={red500}/>
  </IconButton>
};