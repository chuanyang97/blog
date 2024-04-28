---
title: 'switch语句'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
---
- #js基础
- > `switch`  语句可以替代多个  `if`  判断。`switch`  语句为多分支选择的情况提供了一个更具描述性的方式
- 语法:
	- ```js
	  switch(x) {
	    case 'value1':  // if (x === 'value1')
	      ...
	      [break]
	  
	    case 'value2':  // if (x === 'value2')
	      ...
	      [break]
	  
	    default:
	      ...
	      [break]
	  }
	  ```
	- `switch`  语句有至少一个  `case`  代码块和一个可选的  `default`  代码块。
	- 比较  `x`  值与第一个  `case` （也就是  `value1` ）是否严格相等，然后比较第二个  `case` （ `value2` ）以此类推。
	- 如果相等， `switch`  语句就执行相应  `case`  下的代码块，直到遇到最靠近的  `break`  语句（或者直到  `switch`  语句末尾）。
	- 如果没有符合的 case，则执行  `default`  代码块（如果  `default`  存在）
- 栗子:
  collapsed:: true
	- ```js
	  let a = 2 + 2;
	  
	  switch (a) {
	    case 3:
	      alert( 'Too small' );
	      break;
	    case 4:
	      alert( 'Exactly!' );
	      break;
	    case 5:
	      alert( 'Too big' );
	      break;
	    default:
	      alert( "I don't know such values" );
	  }
	  ```
	- 这里的  `switch`  从第一个  `case`  分支开始将  `a`  的值与  `case`  后的值进行比较，第一个  `case`  后的值为  `3`  匹配失败。
	- 然后比较  `4` 。匹配，所以从  `case 4`  开始执行直到遇到最近的  `break` 。
	- **如果没有  `break` ，程序将不经过任何检查就会继续执行下一个  `case` 。**
	- 无  `break`  的例子：
	  collapsed:: true
		- ```js
		  let a = 2 + 2;
		  
		  switch (a) {
		    case 3:
		      alert( 'Too small' );
		    case 4:
		      alert( 'Exactly!' );
		    case 5:
		      alert( 'Too big' );
		    default:
		      alert( "I don't know such values" );
		  }
		  ```
		- 在上面的例子中我们会看到连续执行的三个  `alert` ：
			- ```js
			  alert( 'Exactly!' );
			  alert( 'Too big' );
			  alert( "I don't know such values" );
			  ```
- #+BEGIN_TIP
  任何表达式都可以成为`switch/case`  的参数
  `switch 和 case` 都允许任意表达式。
  ```js
  let a = "1";
  let b = 0;
  
  switch (+a) {
    case b + 1:
      alert("this runs, because +a is 1, exactly equals b+1");
      break;
  
    default:
      alert("this doesn't run");
  }
  ```
  #+END_TIP
- `case`分组:
  collapsed:: true
	- 共享同一段代码的几个  `case`  分支可以被分为一组：
	- 例如:
		- ```js
		  let a = 3;
		  
		  switch (a) {
		    case 4:
		      alert('Right!');
		      break;
		  
		    case 3: // (*) 下面这两个 case 被分在一组
		    case 5:
		      alert('Wrong!');
		      alert("Why don't you take a math class?");
		      break;
		  
		    default:
		      alert('The result is strange. Really.');
		  }
		  ```
		- `switch/case`  有通过 case 进行“分组”的能力，其实是 switch 语句没有  `break`  时的副作用。因为没有  `break` ， `case 3`  会从  `(*)`  行执行到  `case 5` 。
- #+BEGIN_NOTE
  `switch(x)` 里面x，这里的相等是严格相等。被比较的值必须是相同的类型才能进行匹配。
  ```js
  let arg = prompt("Enter a value?")
  switch (arg) {
    case '0':
    case '1':
      alert( 'One or zero' );
      break;
  
    case '2':
      alert( 'Two' );
      break;
  
    case 3:
      alert( 'Never executes!' );
      break;
    default:
      alert( 'An unknown value' )
  }
  ```
  case 3 不会执行！因此 case 3 部分是一段无效代码。所以会执行 default 分支。
  #+END_NOTE
-
-