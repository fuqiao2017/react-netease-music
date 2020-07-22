import React from 'react'

export default class MyForm extends React.Component {
  render () {
    return (
      <div>
        <h3>select 多选，value 数组</h3>
        <label>
          选择你喜欢的风味:
          <select multiple={true} value={['grapefruit', 'coconut']} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
      </div>
    )
  }
}