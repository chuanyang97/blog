---
title: 'style与clss'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
---
- #js进价-原生DOM
- JavaScript 既可以修改类，也可以修改 `style` 属性。相较于将样式写入 `style` 属性，我们应该首选通过 CSS 类的方式来添加样式。仅当类“无法处理”时，才应选择使用 `style` 属性的方式。
  collapsed:: true
	- ```js
	  let top = /* 复杂的计算 */;
	  let left = /* 复杂的计算 */;
	  
	  elem.style.left = left; // 例如 '123px'，在运行时计算出的
	  elem.style.top = top; // 例如 '456px'
	  ```
- 元素样式:
	- `elem.style` 属性是一个对象，它对应于 `"style"` 特性（attribute）中所写的内容。`elem.style.width="100px"` 的效果等价于我们在 `style` 特性中有一个 `width:100px` 字符串。
	- 例子:
	  collapsed:: true
		- ```css
		  background-color  => elem.style.backgroundColor
		  z-index           => elem.style.zIndex
		  border-left-width => elem.style.borderLeftWidth
		  ```
	- 对于多词（multi-word）属性，使用驼峰式 camelCase
	- collapsed:: true
	  #+BEGIN_NOTE
	  *前缀属性*
	  像 -moz-border-radius 和 -webkit-border-radius 这样的浏览器前缀属性，也遵循同样的规则：连字符 - 表示大写。
	  #+END_NOTE
		- ```js
		  button.style.MozBorderRadius = '5px';
		  button.style.WebkitBorderRadius = '5px';
		  ```
	- #+BEGIN_NOTE
	  *注意单位*
	  不要忘记将 CSS 单位添加到值上
	  #+END_NOTE
		- 我们不应该将 `elem.style.top` 设置为 `10`，而应将其设置为 `10px`。否则设置会无效：
		  collapsed:: true
			- ```js
			  <body>
			    <script>
			      // 无效！
			      document.body.style.margin = 20;
			      alert(document.body.style.margin); // ''（空字符串，赋值被忽略了）
			  
			      // 现在添加了 CSS 单位（px）—— 生效了
			      document.body.style.margin = '20px';
			      alert(document.body.style.margin); // 20px
			  
			      alert(document.body.style.marginTop); // 20px
			      alert(document.body.style.marginLeft); // 20px
			    </script>
			  </body>
			  ```
		-
- 重置样式属性:
	- 我们可能想要移除 `style.display`，就像它没有被设置一样。这里不应该使用 `delete elem.style.display`，而应该使用 `elem.style.display = ""` 将其赋值为空
	  collapsed:: true
		- ```js
		  // 如果我们运行这段代码，<body> 将会闪烁
		  document.body.style.display = "none"; // 隐藏
		  
		  setTimeout(() => document.body.style.display = "", 1000); // 恢复正常
		  ```
		- 我们将 `style.display` 设置为空字符串，那么浏览器通常会应用 CSS 类以及内建样式，就好像根本没有这样的 `style.display` 属性一样
	- 有一个特殊的方法 `elem.style.removeProperty('style property')`:
	  collapsed:: true
		- ```js
		  document.body.style.background = 'red'; //将 background 设置为红色
		  
		  setTimeout(() => document.body.style.removeProperty('background'), 1000); // 1 秒后移除 background
		  ```
		- 我们可以像这样删除一个属性
	- 还可以用`style.cssText`进行完全的重写:
	  collapsed:: true
		- ```js
		  <div id="div">Button</div>
		  
		  <script>
		    // 我们可以在这里设置特殊的样式标记，例如 "important"
		    div.style.cssText=`color: red !important;
		      background-color: yellow;
		      width: 100px;
		      text-align: center;
		    `;
		  
		    alert(div.style.cssText);
		  </script>
		  ```
		- 我们使用 `style.*` 来对各个样式属性进行赋值。我们不能像这样的 `div.style="color: red; width: 100px"` 设置完整的属性，因为 `div.style` 是一个对象，并且它是只读的
		- 我们很少使用这个属性，因为这样的赋值会删除所有现有样式：它不是进行添加，而是替换它们。有时可能会删除所需的内容。但是，当我们知道我们不会删除现有样式时，可以安全地将其用于新元素。
	- 可以通过设置一个特性（attribute）来实现同样的完全重置效果：`div.setAttribute('style', 'color: red...')`
-
- 读取计算样式:
	- collapsed:: true
	  >**`style` 属性仅对 `"style"` 特性（attribute）值起作用，而没有任何 CSS 级联（cascade）。**因此我们无法使用 `elem.style` 读取来自 CSS 类的任何内容。
		- 例如，这里的 `style` 看不到 margin：
			- ```js
			  <head>
			    <style> body { color: red; margin: 5px } </style>
			  </head>
			  <body>
			  
			    The red text
			    <script>
			      alert(document.body.style.color); // 空的
			      alert(document.body.style.marginTop); // 空的
			    </script>
			  </body>
			  ```
	- 但可以通过其他方法实现读取css样式: `getComputedStyle`:
		- 语法:
			- ```js
			  getComputedStyle(element, [pseudo])
			  ```
			- `element`: 需要被读取样式值的元素。
			- `pseudo`: 伪元素（如果需要），例如 `::before`。空字符串或无参数则意味着元素本身。
		- 例子:
		  collapsed:: true
			- ```js
			  <head>
			    <style> body { color: red; margin: 5px } </style>
			  </head>
			  <body>
			  
			    <script>
			      let computedStyle = getComputedStyle(document.body);
			  
			      // 现在我们可以读取它的 margin 和 color 了
			  
			      alert( computedStyle.marginTop ); // 5px
			      alert( computedStyle.color ); // rgb(255, 0, 0)
			    </script>
			  
			  </body>
			  ```
		- collapsed:: true
		  #+BEGIN_WARNING
		  `getComputedStyle` 需要完整的属性名
		  我们应该总是使用我们想要的确切的属性，例如 paddingLeft、marginTop 或 borderTopWidth。否则，就不能保证正确的结果。
		  #+END_WARNING
			- 例如，如果有 `paddingLeft/paddingTop` 属性，那么对于 `getComputedStyle(elem).padding`，我们会得到什么？什么都没有，或者是从已知的 padding 中“生成”的值？这里没有标准的规则。
			- 还有其他不一致的地方。例如，在下面这个例子中，某些浏览器（Chrome）会显示 `10px`，而某些浏览器（Firefox）则没有：
			  collapsed:: true
				- ```js
				  <style>
				    body {
				      margin: 10px;
				    }
				  </style>
				  <script>
				    let style = getComputedStyle(document.body);
				    alert(style.margin); // 在 Firefox 中是空字符串
				  </script>
				  ```
		- collapsed:: true
		  #+BEGIN_NOTE
		  `:visited`链接的样式被隐藏
		  getComputedStyle 没有给出访问该颜色的方式，因为如果允许的话，任意页面都可以通过在页面上创建它，并通过检查样式来确定用户是否访问了某链接。
		  #+END_NOTE
			- JavaScript 看不到 `:visited` 所应用的样式。此外，CSS 中也有一个限制，即禁止在 `:visited` 中应用更改几何形状的样式。这是为了确保一个不好的页面无法检测链接是否被访问，进而窥探隐私。
		- collapsed:: true
		  #+BEGIN_WARNING
		  *不要从 CSS 中获取 width/height*
		  #+END_WARNING
			- 首先，CSS `width/height` 取决于另一个属性：`box-sizing`，它定义了“什么是” CSS 宽度和高度。出于 CSS 的目的而对 `box-sizing` 进行的更改可能会破坏此类 JavaScript 操作。
			- collapsed:: true
			  
			  其次，CSS 的 `width/height` 可能是 `auto`，例如内联（inline）元素：
				- ```js
				  <span id="elem">Hello!</span>
				  
				  <script>
				    alert( getComputedStyle(elem).width ); // auto
				  </script>
				  ```
			- 如果要获取一个元素的高宽可以用: ((6394847f-a77e-4d1b-a008-10ab0b0071e4))
- ---
- `className 与 classList`:
	- JavaScript 中有一个限制：像 `"class"` 这样的保留字不能用作对象的属性。这一限制现在已经不存在了，但当时就不能存在像 `elem.class` 这样的 `"class"` 属性。
	- 因此，对于类，引入了看起来类似的属性 `"className"`：`elem.className` 对应于 `"class"` 特性（attribute）
		- ```js
		  <body class="main page">
		    <script>
		      alert(document.body.className); // main page
		    </script>
		  </body>
		  ```
		- 如果我们对 `elem.className` 进行赋值，它将替换类中的整个字符串。有时，这正是我们所需要的，但通常我们希望添加/删除单个类。
	- `elem.classList` 是一个特殊的对象，它具有 `add/remove/toggle` 单个类的方法
		- `elem.classList.add/remove(class)` —— 添加/移除类。
		- `elem.classList.toggle(class)` —— 如果类不存在就添加类，存在就移除它。
		- `elem.classList.contains(class)` —— 检查给定类，返回 `true/false`。
		- 例子:
		  collapsed:: true
			- ```js
			  <body class="main page">
			    <script>
			      // 添加一个 class
			      document.body.classList.add('article');
			  
			      alert(document.body.className); // main page article
			    </script>
			  </body>
			  ```
		- `classList` 是可迭代的:
		  collapsed:: true
			- ```js
			  <body class="main page">
			    <script>
			      for (let name of document.body.classList) {
			        alert(name); // main，然后是 page
			      }
			    </script>
			  </body>
			  ```
		-
-
-