/**
 * 初衷:编写谷歌插件模拟浏览器和各种设备,配合插件编写的一套算法,注入后可以模拟各种浏览器包括手机和平板
 * 
 * 根据分析得出ua 5.0为比较新的版本,有规律的生成一些ua,真实有效,也可以适用于python请求爬虫,nodejs,只不过没有写py版本的
 * 
 * use: run nodejs 
 * 可以直接使用 nodejs 直接执行这个脚本
 * var randomUA =userAgent()
 * 
 */


var randomUA=userAgent();
console.log("当前模拟的浏览器的ua为",randomUA)

/**
 * 根据模拟 ua 出现
 *  prob() 为权重出现的概率
 * 
 */
function userAgent() {
	let lang = "zh-CN";
  
	let [uA1WinNT, uA1WOW64, uA1language, uA1builddata, uA1Firefox] = [
	  prob(["6.1", "6.2", "6.3", "10.0"], [3, 2, 2, 3]),//windowsNT
	  prob(["", " WOW64;", " Win64;", " x64;"], [3, 4, 2, 1]),//WOW64
	  prob(["", `${lang};`], [6, 4]),//language
	  prob([`201${rNum(0, 6)}0${rNum(1, 9)}${rNum(10, 28)}`]),//builddata
	  prob([
		`50.0.${rNum(1, 2)}`, "50.0", `50.0.${rNum(0, 10)}`,
		`51.0${rNum(0, 1)}`, `51.0${rNum(10, 14)}`, `51.0${rNum(2, 7)}`,
		"52.0", `52.0${rNum(1, 9)}`, `52.${rNum(0, 4)}.${rNum(0, 3)}`,
		"53.0", `53.0${rNum(1, 10)}`, "54.0.1", "54.0", `54.0${rNum(10, 13)}`, `54.0${rNum(2, 9)}`,
		`55.0.${rNum(1, 3)}`, "55.0", "55.01", `55.0${rNum(10, 13)}`, `55.0${rNum(2, 9)}`,
		`56.0${rNum(2, 9)}`, `57.0${rNum(3, 6)}`]
	  ),//Firefox
	]
  
	let [uA2WindowsNT, uA2WOW64, uA2language, uA2Safari, uA2Chrome] = [
	  prob(["6.1", "6.2", "6.3", "10"], [3, 2, 2, 3]),
	  prob(["", " WOW64;", " Win64;", " x64;"], [3, 4, 2, 1]),
	  prob(["",` ${lang};`],[6,4]),
	  prob([`${rNum(100,500)}.${0,99}`]),
	  prob([`${rNum(50, 70)}.${rNum(0, 9)}.${rNum(1000, 9999)},${rNum(10, 99)}`]) ]
  
  
	  let [compatible,Trident,ie,Gecko]=[
		prob(["","compatible; "]), 
		rNum(5, 7),
		rNum(10, 11),
		prob([""," like Gecko;"]), 
	  ]
  
	   
	  
	let [uA1, uA2, uA3, uA4] = [
	  `Mozilla/5.0 (Windows NT ${uA1WinNT};${uA1WOW64}${uA1language} rv:${uA1Firefox}) Gecko/${uA1builddata} Firefox/${uA1Firefox}`,
  
	  `Mozilla/5.0 (Windows NT ${uA2WindowsNT};${uA2WOW64}${uA2language}) AppleWebKit/${uA2Safari} (KHTML, like Gecko) Chrome/${uA2Chrome} Safari/${uA2Safari}`,
  
	  `Mozilla/5.0 (${compatible}Windows NT ${uA1WinNT};${uA1WOW64} MSIE ${ie}.0; Trident/${Trident}.0;)${Gecko}`,
  
	  `Mozilla/5.0 (Windows NT ${uA1WinNT}; MSIE 9.0;) Opera ${rNum(10, 12)}.${rNum(10, 99)}`
	]
	let uaList = [uA1, uA2, uA3, uA4];
  
	return prob(uaList, [4, 4, 1, 1])//权重
  }
  
  //概率   prob(["我", "break", "1"], [3, 2, 2]) prob 如果不输入就p2 就随机p1 其中一个
  function prob(p1, p2) {
	// arguments.length
	let pNub;
	if (p2) {
	  let [Sum, arrOne] = [0, []];     //完整
	  for (let i = 0; i < p2.length; i++) { Sum += +p2[i] }
	  for (let i = 0; i < p1.length; i++) {
		for (let j = 0; j < p2[i]; j++) { arrOne.push(p1[i]); }
	  }
	  pNub = rNum(0, Sum - 1);
	  return arrOne[pNub];
	} else {
	  pNub = rNum(0, p1.length - 1) //单个
	  return p1[pNub]
	}
  
	} 
	
	// 随机生成 randomNum(n, m)  的整数
	function rNum(minNum, maxNum) {
		switch (arguments.length) {
			case 1: return Number.parseInt(Math.random() * minNum + 1, 10); break;
			case 2: return Number.parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10); break;
			default: return 0; break;
		}
	}
	
