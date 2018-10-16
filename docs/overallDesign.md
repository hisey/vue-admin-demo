
## 需求概述
部目前是基于门店系统的模块进行操作，但是由于原版不是按照他们需求定制，在获取字段的时候效率比较低（新增字段）
不利于权限控制，兼有业务模块的权限（新增角色，经理）
模式不同，目前的团队是以一个订单号作为一个数据单元进行，而系统这是以账单进行
后续对于权限、、的需求还有深入的规划
 独立系统建议：
平台账单一直没有独立的系统支持，目前核心系统和普惠系统都带着的功能，造成了数据显示分散
与业务在同一个系统的话，会造成迭代绑定，和相互影响
权限会更加的复杂
需求针对用户：
部门（不同组织架构）
门店的业务员

## 软件结构
<img src="./img/soft.png">

## 核心功能流程图
<img src="./img/process.png">

## 设计模式
**mvvm** </br>
<img src="./img/mvvm.png">


 