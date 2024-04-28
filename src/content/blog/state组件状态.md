---
title: 'Satte组件状态'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
---
- #react
- 在react中尽量少操作原生dom操作, 能不操作就不操作
- 状态(state):
  background-color:: yellow
	- > 状态就是描述某种显示情况的数据, 由组件自己设置和更改, 也是由组件自己维护, 使用状态的目的就是为了在不同的环境状态下使用组件显示不同的数据
	- 在类中定义 `state`属性, 这里是固定的, state对象中存放当前组件的所有状态
	- 获取状态值直接用 `this.state`获取
	- 设置状态值使用 `this.setState({里面跟修改状态的属性与值})`
	- ```jsx
	  import React, { Component } from 'react'
	  
	  export default class App extends Component {
	      state = {
	          favoriteState: false
	      }
	      render() {
	          return (
	              <div>
	                  <h1> react 天下第一</h1>
	                  <button onClick={()=>{
	                      this.setState({
	                          favoriteState:!this.state.favoriteState
	                      })
	                      if (this.state.favoriteState) {
	                          console.log('取消收藏后的逻辑');
	                      } else {
	                          console.log('收藏后的逻辑');
	                      }
	                  }}>{this.state.favoriteState?'取消收藏':'收藏'}</button>
	              </div>
	          )
	      }
	  }
	  ```
	- 记住, 这里state属性是固定的, 写成其他react不能识别, 这里没有vue一样的响应式, 直接使用赋值操作state里面的值是不会刷新页面, 只能是react底层给我们写好的逻辑使用
	- 还有种方式, 就是将 state 写在 constructor里面一样的  :
		- ```jsx
		  import React, { Component } from 'react'
		  
		  export default class App extends Component {
		  
		      constructor(){
		          super() // 这里一定不要忘了加上这个, 因为是继承必须要加上这个
		          this.state = {
		              favoriteState: false,
		          }
		      }
		      render() {
		          return (
		              <div> 
		                  <h1> react 天下第一</h1>
		                  <button onClick={()=>{
		                      this.setState({
		                          favoriteState:!this.state.favoriteState
		                      })
		                      if (this.state.favoriteState) {
		                          console.log('取消收藏后的逻辑');
		                      } else {
		                          console.log('收藏后的逻辑');
		                      }
		                  }}>{this.state.favoriteState?'取消收藏':'收藏'}</button>
		              </div>
		          )
		      }
		  }
		  
		  ```
	- #+BEGIN_TIP
	  setState是可以设置更改多个状态的, react会把当前更改的值与老值进行合并
	  #+END_TIP
	- setState处于同步的逻辑中, 会异步更新状态, 更新dom
	- setState处于异步的逻辑中, 同步更新状态, 同步更新dom
	- setState 接收第二个参数为回调函数, 状态dom更新完后会被执行
	-
-
- 列表循环:
	- 在vue中使用v-for来循环列表, 在react中没有这些, 是通过jsx语法配合原生js方法进行循环
	- 例子:
	  collapsed:: true
		- ```jsx
		  import React, { Component } from 'react'
		  
		  export default class App extends Component {
		      state = {
		          list: ['吃饭', '睡觉', '打豆豆']
		      }
		      render() {
		          return (
		              <div>
		                  <ul>
		                      {
		                          this.state.list.map((item)=><li key={item}>{item}</li>)
		                      }
		                  </ul>
		              </div>
		          )
		      }
		  }
		  ```
		- jsx中 `{}`是可以嵌套的, 里面写法跟在处理原生js渲染到页面是一样的做法, 只是这里是使用jsx语法, 不用模板字符串
		- 这里如果里面渲染太复杂, 可以将渲染那一部分提出来:
		  collapsed:: true
			- ```jsx
			  import React, { Component } from 'react'
			  
			  export default class App extends Component {
			      state = {
			          list: ['吃饭', '睡觉', '打豆豆']
			      }
			      render() {
			          const concatList = this.state.list.map((item) => <li key={item}>{item}</li>)
			          return (
			              <div>
			                  <ul>
			                      {concatList}
			                  </ul>
			              </div>
			          )
			      }
			  }
			  ```
	- *在上面例子中 ,循环每一个item中必须要加上一个key属性值, 跟vue中的:key是一样的道理, 必须是唯一的*
- todo案例:
  collapsed:: true
	- ```jsx
	  import React, { Component } from 'react'
	  
	  export default class App extends Component {
	      iptText = React.createRef()
	      state = {
	          list: [{
	              id: 1,
	              name: '吃饭'
	          },
	          {
	              id: 2,
	              name: '睡觉'
	          }],
	  
	      }
	      render() {
	          return (
	              <div>
	                  <input type='text' ref={this.iptText}></input>
	                  <button onClick={() => {
	                      this.addTodo({
	                          id: Date.now(),
	                          name: this.iptText.current.value
	                      })
	                      this.iptText.current.value = ''
	                  }}>增加</button>
	                  <ul>
	                      {
	                          this.state.list.map(item => (
	                              <li key={item.id}>
	                                  {item.name}
	                                  <button onClick={() => {
	                                      this.delTodo(item.id)
	                                  }}>删除</button>
	                              </li>
	                          ))
	                      }
	                  </ul>
	                  {
	                      // this.state.list.length<=0?<div>暂无代办事项</div>:''
	                  } 
	                  {
	                      this.state.list.length<=0 && <div>暂无代办事项</div>
	                  }
	              </div>
	          )
	      }
	      addTodo(item) {
	          const handleList = [...this.state.list]
	  
	          handleList.unshift(item)
	  
	          this.setState({
	              list: handleList
	          })
	      }
	      delTodo(id) {
	          const handleList = [...this.state.list]
	  
	          const list = handleList.filter(item => item.id !== id)
	  
	          this.setState({ list })
	      }
	  }
	  
	  ```
	- 在jsx中可以充分使用`{}`语法, 里面任何地方都可以使用, 里面完全可以使用js语法, 包括一些逻辑运算等
	- 那里面的条件运算显示的dom是条件成立动态的生成在页面, 而不是一来就生成到页面, 这种如果dom较多性能可以不好, 可以通过改变css样式display进行操作
- react富文本支持:
  collapsed:: true
	- react不像vue可以用v-html, react用 `dangerouslySetInnerHTML`属性来接收一个html富文本, 里面必须跟一个对象 属性为`__html`值为富文本内容
	- ```jsx
	  <span dangerouslySetInnerHTML={
	  {
	  __html:item.name // 这里固定属性__html
	                                     }
	  }></span>
	  ```
-
- todo案例升级:
	- ```jsx
	  import React, { Component } from 'react'
	  
	  export default class App extends Component {
	      iptText = React.createRef()
	      state = {
	          list: [{
	              id: 1,
	              name: '吃饭',
	              checked: false
	          },
	          {
	              id: 2,
	              name: '睡觉',
	              checked: true
	          }],
	          iptValue: ''
	  
	      }
	      render() {
	          return (
	              <div>
	                  <input value={this.state.iptValue} type='text' onChange={(e) => {
	                      this.setState({ iptValue: e.target.value })
	                  }} onKeyUp={(e) => {
	                      if (e.key === 'Enter') {
	                          this.addTodo({
	                              id: Date.now(),
	                              name: this.state.iptValue,
	                              checked: false
	                          })
	                      }
	                  }} ></input>
	  
	                  <button onClick={() => {
	                      this.addTodo({
	                          id: Date.now(),
	                          name: this.state.iptValue,
	                          checked: false
	                      })
	                  }}>增加</button>
	                  <ul>
	                      {
	                          this.state.list.map(item => (
	                              <li key={item.id}>
	  
	                                  <input type='checkbox' checked={item.checked} onChange={(e) => {
	                                      this.changeTodoCheack(item.id)
	                                  }}></input>
	  
	                                  <span style={item.checked ? { textDecoration: 'line-through' } : null} dangerouslySetInnerHTML={
	                                      {
	                                          __html: item.name // 这里固定属性__html
	                                      }
	                                  }></span>
	  
	                                  <button onClick={() => {
	                                      this.delTodo(item.id)
	                                  }}>删除</button>
	  
	                              </li>
	                          ))
	                      }
	                  </ul>
	                  {
	                      this.state.list.length <= 0 && <div>暂无代办事项</div>
	                  }
	              </div>
	          )
	      }
	      addTodo(item) {
	  
	          const handleList = [...this.state.list]
	          handleList.unshift(item)
	          this.setState({
	              list: handleList,
	              iptValue: ''
	          })
	  
	      }
	      delTodo(id) {
	          const handleList = [...this.state.list]
	  
	          const list = handleList.filter(item => item.id !== id)
	  
	          this.setState({ list })
	      }
	      changeTodoCheack(id) {
	          const handleList = [...this.state.list]
	  
	          const resultItem = handleList.find(item => item.id === id)
	          resultItem.checked = !resultItem.checked
	  
	          this.setState({
	              list: handleList
	          })
	  
	      }
	  }
	  
	  ```
- 总结:
	- 用state的组件叫做受控制组件, 用ref组件叫做非受控制组件, 我们一般多用state管理, 只要用setState成功更新state值后就会重新刷新页面, 而ref不会, 所以以后表单用setstate和onChange配合使用
	- ((63c3d731-ed2a-4727-8b7a-80d6762a9984))
-