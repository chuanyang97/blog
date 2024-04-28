---
title: 'Rest参数'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
---
- #js高级
- 在js进价中, 我们可以使用`...`来表示内建函数支持传入任意数量的参数:
	- {{query  ...技巧}}
	  query-table:: true
	  query-properties:: [:block]
	- 例如：
	  collapsed:: true
		- `Math.max(arg1, arg2, ..., argN)`  —— 返回参数中的最大值。
		- `Object.assign(dest, src1, ..., srcN)`  —— 依次将属性从  `src1..N`  复制到  `dest` 。
- `Rest`参数:
	- 在 JavaScript 中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。
	  collapsed:: true
		- ```js
		  function sum(a, b) {
		    return a + b;
		  }
		  
		  alert( sum(1, 2, 3, 4, 5) );
		  ```
	- 我们可以在函数定义中声明一个数组来收集参数。语法是这样的： `...变量名` ，这将会声明一个数组并指定其名称，其中存有剩余的参数。这三个点的语义就是“收集剩余的参数并存进指定数组中”:
	  collapsed:: true
		- ```js
		  function sumAll(...args) { // 数组名为 args
		    let sum = 0;
		  
		    for (let arg of args) sum += arg;
		  
		    return sum;
		  }
		  
		  alert( sumAll(1) ); // 1
		  alert( sumAll(1, 2) ); // 3
		  alert( sumAll(1, 2, 3) ); // 6
		  ```
	- 我们也可以选择将第一个参数获取为变量，并将剩余的参数收集起来:
	  collapsed:: true
		- ```js
		  function showName(firstName, lastName, ...titles) {
		    alert( firstName + ' ' + lastName ); // Julius Caesar
		  
		    // 剩余的参数被放入 titles 数组中
		    // i.e. titles = ["Consul", "Imperator"]
		    alert( titles[0] ); // Consul
		    alert( titles[1] ); // Imperator
		    alert( titles.length ); // 2
		  }
		  
		  showName("Julius", "Caesar", "Consul", "Imperator");
		  ```
	- collapsed:: true
	  #+BEGIN_NOTE
	  *Rest 参数必须放到参数列表的末尾*
	  Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误
	  #+END_NOTE
		- ```js
		  function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
		    // error
		  }
		  ```
		- `...rest`  必须写在参数列表最后。
		-
- `arguments`变量:
	- 有一个名为  `arguments`  的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。
	  collapsed:: true
		- ```js
		  function showName() {
		    alert( arguments.length );
		    alert( arguments[0] );
		    alert( arguments[1] );
		  
		    // 它是可遍历的
		    // for(let arg of arguments) alert(arg);
		  }
		  
		  // 依次显示：2，Julius，Caesar
		  showName("Julius", "Caesar");
		  
		  // 依次显示：1，Ilya，undefined（没有第二个参数）
		  showName("Ilya");
		  ```
		- 在过去，JavaScript 中不支持 rest 参数语法，而使用  `arguments`  是获取函数所有参数的唯一方法。现在它仍然有效，我们可以在一些老代码里找到它。
		- 但缺点是，尽管  `arguments`  是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用  `arguments.map(...)`  等方法。
		- 因此，当我们需要这些功能时，最好使用 rest 参数。
	- collapsed:: true
	  #+BEGIN_NOTE
	  箭头函数没有`"arguments"` 
	  如果我们在箭头函数中访问 arguments，访问到的 arguments 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。
	  #+END_NOTE
		- ```js
		  function f() {
		    let showArg = () => alert(arguments[0]);
		    showArg();
		  }
		  
		  f(1); // 1
		  ```
		- 箭头函数没有自身的  `this` 。现在我们知道了它们也没有特殊的  `arguments`  对象。
- `Spread`语法:
	- 它看起来和 rest 参数很像，也使用  `...` ，但是二者的用途完全相反。
	- 使用例子:
	  collapsed:: true
		- 以  `Math.max`  为例：
			- ```js
			  let arr = [3, 5, 1];
			  	
			  alert( Math.max(...arr) ); // 5（spread 语法把数组转换为参数列表）
			  ```
		- 传入多个可迭代对象：
			- ```js
			  let arr1 = [1, -2, 3, 4];
			  let arr2 = [8, 3, -8, 1];
			  
			  alert( Math.max(...arr1, ...arr2) ); // 8
			  ```
		- 还可以将 spread 语法与常规值结合使用：
			- ```js
			  let arr1 = [1, -2, 3, 4];
			  let arr2 = [8, 3, -8, 1];
			  
			  alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
			  ```
		- 使用 spread 语法来合并数组：
			- ```js
			  let arr = [3, 5, 1];
			  let arr2 = [8, 9, 15];
			  
			  let merged = [0, ...arr, 2, ...arr2];
			  
			  ```
		- 使用 spread 语法将字符串转换为字符数组：
			- ```js
			  let str = "Hello";
			  
			  alert( [...str] ); // H,e,l,l,o
			  ```
			- 我们还可以使用  `Array.from`  来实现，因为该方法会将一个可迭代对象（如字符串）转换为数组：
			  collapsed:: true
				- ```js
				  let str = "Hello";
				  
				  // Array.from 将可迭代对象转换为数组
				  alert( Array.from(str) ); // H,e,l,l,o
				  ```
				- `Array.from(obj)`  和  `[...obj]`  存在一个细微的差别：
					- `Array.from`  适用于类数组对象也适用于可迭代对象。
					- Spread 语法只适用于可迭代对象。
	-
	- #+BEGIN_TIP
	  *Spread 语法内部使用了迭代器来收集元素，与 for..of 的方式相同。*
	  #+END_TIP
- 复制数组(`array`)/对象(`object`):
	- js进价中有: ((63789bb4-7ad1-4511-8fbc-7abd4f8953ce)) 来进行复制
	- 使用 spread 语法也可以做同样的事情（译注：也就是进行浅拷贝）。
	  collapsed:: true
		- ```js
		  let arr = [1, 2, 3];
		  
		  let arrCopy = [...arr]; // 将数组 spread 到参数列表中
		                          // 然后将结果放到一个新数组
		  
		  // 两个数组中的内容相同吗？
		  alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true
		  
		  // 两个数组相等吗？
		  alert(arr === arrCopy); // false（它们的引用是不同的）
		  
		  // 修改我们初始的数组不会修改副本：
		  arr.push(4);
		  alert(arr); // 1, 2, 3, 4
		  alert(arrCopy); // 1, 2, 3
		  ```
		- 也可以通过相同的方式来复制一个对象：
			- ```js
			  let obj = { a: 1, b: 2, c: 3 };
			  
			  let objCopy = { ...obj }; // 将对象 spread 到参数列表中
			                            // 然后将结果返回到一个新对象
			  
			  // 两个对象中的内容相同吗？
			  alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true
			  
			  // 两个对象相等吗？
			  alert(obj === objCopy); // false (not same reference)
			  
			  // 修改我们初始的对象不会修改副本：
			  obj.d = 4;
			  alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
			  alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
			  ```
	- 这种方式比使用  `let arrCopy = Object.assign([], arr)`  复制数组，或使用  `let objCopy = Object.assign({}, obj)`  复制对象来说更为简便。因此，只要情况允许，我们倾向于使用它。
-
-