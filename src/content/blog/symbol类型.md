---
title: 'symbo类型'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
---
- #js进阶
- 根据规范，只有两种原始类型可以用作对象属性键：
	- 字符串类型
	- symbol 类型
- > “symbol” 值表示唯一的标识符。
- 可以使用  `Symbol()`  来创建这种类型的值：
  collapsed:: true
	- ```js
	  let id = Symbol();
	  ```
- 我们可以给 symbol 一个描述（也称为 symbol 名），这在代码调试时非常有用：
  collapsed:: true
	- ```js
	  // id 是描述为 "id" 的 symbol
	  let id = Symbol("id");
	  ```
- collapsed:: true
  #+BEGIN_TIP
  *symbol 保证是唯一的*
  即使我们创建了许多具有相同描述的 symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。
  #+END_TIP
	- ```js
	  let id1 = Symbol("id");
	  let id2 = Symbol("id");
	  
	  alert(id1 == id2); // false
	  ```
- collapsed:: true
  #+BEGIN_WARNING
  *symbol 不会被自动转换为字符串*
  JavaScript 中的大多数值都支持字符串的隐式转换。例如，我们可以 alert 任何值，都可以生效。symbol 比较特殊，它不会被自动转换。
  #+END_WARNING
	- ```js
	  let id = Symbol("id");
	  alert(id); // 类型错误：无法将 symbol 值转换为字符串。
	  ```
	- 这是一种防止混乱的“语言保护”，因为字符串和 symbol 有本质上的不同，不应该意外地将它们转换成另一个。
	- 如果我们真的想显示一个 symbol，我们需要在它上面调用  `.toString()`:
	  collapsed:: true
		- ```js
		  let id = Symbol("id");
		  alert(id.toString()); // Symbol(id)，现在它有效了
		  ```
	- 或者获取  `symbol.description`  属性，只显示描述（description）：
	  collapsed:: true
		- ```js
		  let id = Symbol("id");
		  alert(id.description); // id
		  ```
- '隐蔽'属性:
	- *symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性*
	  collapsed:: true
		- ```js
		  let user = { // 属于另一个代码
		    name: "John"
		  };
		  
		  let id = Symbol("id");
		  
		  user[id] = 1;
		  
		  alert( user[id] ); //1  我们可以使用 symbol 作为键来访问数据
		  ```
		- 使用  `Symbol("id")`  作为键，比起用字符串  `"id"`  来有什么好处呢？:
			- 由于  `user`  对象属于另一个代码库，所以向它们添加字段是不安全的，因为我们可能会影响代码库中的其他预定义行为。但 symbol 属性不会被意外访问到。第三方代码不会知道新定义的 symbol，因此将 symbol 添加到  `user`  对象是安全的。
			  collapsed:: true
				- ```js
				  let user = { name: "John" };
				  
				  // 我们的脚本使用了 "id" 属性。
				  user.id = "Our id value";
				  
				  // ……另一个脚本也想将 "id" 用于它的目的……
				  
				  user.id = "Their id value"
				  // 砰！无意中被另一个脚本重写了 id！
				  ```
			- 另外，假设另一个脚本希望在  `user`  中有自己的标识符，以实现自己的目的。
			  collapsed:: true
				- ```js
				  // ...
				  let id = Symbol("id");
				  
				  user[id] = "Their id value";
				  ```
	- 如果我们要在对象字面量  `{...}`  中使用 symbol，则需要使用方括号把它括起来。
	  collapsed:: true
		- ```js
		  let id = Symbol("id");
		  
		  let user = {
		    name: "John",
		    [id]: 123 // 而不是 "id"：123
		  };
		  ```
		- 这是因为我们需要变量  `id`  的值作为键，而不是字符串 “id”。
	- symbol 属性不参与  `for..in`  循环:
	  collapsed:: true
		- ```js
		  let id = Symbol("id");
		  let user = {
		    name: "John",
		    age: 30,
		    [id]: 123
		  };
		  
		  for (let key in user) alert(key); // name, age（没有 symbol）
		  
		  // 使用 symbol 任务直接访问
		  alert("Direct: " + user[id]); // Direct: 123
		  ```
		- `Object.keys(user)` 也会忽略它们。这是一般“隐藏符号属性”原则的一部分。如果另一个脚本或库遍历我们的对象，它不会意外地访问到符号属性。
	- `Object.assign` 会同时复制字符串和 symbol 属性：
	  collapsed:: true
		- ```js
		  let id = Symbol("id");
		  let user = {
		    [id]: 123
		  };
		  
		  let clone = Object.assign({}, user);
		  
		  alert( clone[id] ); // 123
		  ```
		- 这里并不矛盾，就是这样设计的。这里的想法是当我们克隆或者合并一个 object 时，通常希望 **所有** 属性被复制（包括像  `id`  这样的 symbol）。
-
- 全局`symbol`:
	- > 我们可以在其中创建 symbol 并在稍后访问它们，它可以确保每次访问相同名字的 symbol 时，返回的都是相同的 symbol。
	- 要从注册表中读取（不存在则创建）symbol，请使用  `Symbol.for(key)` 。
	- 该调用会检查全局注册表，如果有一个描述为  `key`  的 symbol，则返回该 symbol，否则将创建一个新 symbol（ `Symbol(key)` ），并通过给定的  `key`  将其存储在注册表中
	  collapsed:: true
		- ```js
		  // 从全局注册表中读取
		  let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它
		  
		  // 再次读取（可能是在代码中的另一个位置）
		  let idAgain = Symbol.for("id");
		  
		  // 相同的 symbol
		  alert( id === idAgain ); // true
		  ```
		- 注册表内的 symbol 被称为 **全局 symbol**。如果我们想要一个应用程序范围内的 symbol，可以在代码中随处访问 —— 这就是它们的用途。
	- `Symbol.keyFor`  内部使用全局 symbol 注册表来查找 symbol 的键
	  collapsed:: true
		- ```js
		  // 通过 name 获取 symbol
		  let sym = Symbol.for("name");
		  let sym2 = Symbol.for("id");
		  
		  // 通过 symbol 获取 name
		  alert( Symbol.keyFor(sym) ); // name
		  alert( Symbol.keyFor(sym2) ); // id
		  ```
		- 不适用于非全局 symbol。如果 symbol 不是全局的，它将无法找到它并返回  `undefined`
			- ```js
			  let globalSymbol = Symbol.for("name");
			  let localSymbol = Symbol("name");
			  
			  alert( Symbol.keyFor(globalSymbol) ); // name，全局 symbol
			  alert( Symbol.keyFor(localSymbol) ); // undefined，非全局
			  
			  alert( localSymbol.description ); // name
			  ```
			- *但所有 symbol 都具有  `description`  属性。*
- 系统`symbol`:
	- 它们都被列在了 [众所周知的 symbol](https://tc39.github.io/ecma262/#sec-well-known-symbols) 表的规范中：
	  collapsed:: true
		- `Symbol.hasInstance`
		- `Symbol.isConcatSpreadable`
		- `Symbol.iterator`
		- `Symbol.toPrimitive`
		- ……等等。
	- 例如: `Symbol.toPrimitive`  允许我们将对象描述为原始值转换
-