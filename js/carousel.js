//获取图片容器父级容器
var imgcontent = document.getElementsByClassName("imgContent")[0];
console.log(imgcontent.offsetHeight);
//创建图片资源数组
var imgSources =["img/a.png","img/b.jpg","img/c.jpg","img/d.jpg","img/e.jpg","img/f.jpg","img/g.jpg","img/h.jpg","img/i.jpg","img/j.jpg","img/k.jpg","img/l.jpg","img/m.jpg","img/n.jpg","img/o.png","img/p.jpg","img/q.jpg","img/r.jpg"];
var img= new Array();
var imgDiv=new Array();
//初始化容器内图片,在此按例子中的38张图片为创建个数
function initElement(){
	for(var i = 0;i<38;i++){
	imgDiv[i] = document.createElement('div');
	imgDiv[i].className = 'img';
	imgcontent.appendChild(imgDiv[i]);
	img[i] = document.createElement('img');
	img[i].src = imgSources[(i%imgSources.length)];
	imgDiv[i].appendChild(img[i]);
//	console.log(document.body.clientHeight+"--"+(imgDiv[i].offsetTop+imgDiv[i].offsetHeight));
	//判断图片的位置
	var widthDiv = (i%6)*imgDiv[i].offsetWidth + "px";
	var heightDiv = Math.floor(i/6)*imgDiv[i].offsetHeight +"px";
//	console.log(widthDiv +"---"+heightDiv);
	//当图片个数超过容器大小时，就将图片排列到容器右侧
	if(i>23){
		imgDiv[i].style.top = (Math.floor((i-24)/6)*imgDiv[i].offsetHeight) +"px";
		imgDiv[i].style.left = parseInt(widthDiv)+6*imgDiv[i].offsetWidth+1 +"px";
	}else{
		imgDiv[i].style.left = widthDiv;
		imgDiv[i].style.top = heightDiv;
	}
	};
//循环轮播
	IntervalScroll = setInterval(function(){
		initScroll();
	},3000);
}

//点击左侧按钮
function leftClick(){
	//清除定时器
	clearTimeout();
	clearInterval(IntervalScroll);
	//获取到页面上class为img的div数组
	var first = document.getElementsByClassName('img');
	//随机化轮播效果
	var randomScroll =Math.floor(Math.random()*4);
	var scroll;
	//判断当前可见的图片是第一轮播页面还是第二轮播页面
			if(parseInt(first[0].style.left) ==0 ){
				//如果是第一轮播页面，此时应该讲第二轮播页面的位置放在第一轮播页面的左侧；
				for(var i = 24;i<38;i++){
					first[i].style.transition ='left 0s linear';
					//如果随机得到的轮播效果是交叉轮播，那么需要针对不同行，设置不同的位置，在这里设置的是，奇数行在右侧，偶数行在左侧
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
					first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";	
					}
				}
				//设置轮播动画及位置
				for(var i = 0;i<38;i++){
					//设置过渡效果
					first[i].style.transition ='left 1s ease-in-out'; 
					//下面对于第一轮播页面和第二轮播页面进行了不同过渡延迟的设置，第二页面延迟要多0.1s；
					if(i<24){
						//根据随机轮播效果设置不同延迟效果
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						//第二页面也根据不同轮播效果设置不同延迟时间，比第一页面多0.1s
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
				
			}
				
			}else if(parseInt(first[24].style.left) ==0 ){//如果处于可见区域是第二屏，那么将第一屏放于第二屏左侧
				//其他操作和上面类似，不再赘述
				for(var i = 0;i<24;i++){
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
						first[i].style.transition ='left 0s linear';
					first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";	
					}
				}
				for(var i = 0;i<38;i++){
					first[i].style.transition ='left 1s ease-in-out'; 
					if(i<24){
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
				
			}
			}
			//点击按钮后，在3s的延迟后断定用户不再点击按钮，继续循环轮播，如果用户3s内点击了，那么就会调用第一行的清除定时器；
	setTimeout(function(){
	IntervalScroll =setInterval(function(){
		initScroll();
	},3000);
	return false;
	},3000)
}
//点击右侧按钮
//点击右侧按钮实现的原理和点击左侧按钮一样，不过位置需要进行变化；
function rightClick(){
	clearTimeout();
	clearInterval(IntervalScroll);
	
	var first = document.getElementsByClassName('img');
	var randomScroll =Math.floor(Math.random()*4);
	var scroll;
			if(parseInt(first[24].style.left) ==0 ){
				for(var i = 0;i<24;i++){
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
						
						first[i].style.transition ='left 0s linear';
					first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";	
					}
				}
				for(var i = 0;i<38;i++){
					first[i].style.transition ='left 1s ease-in-out'; 
					if(i<24){
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
				
			}
			}else if(parseInt(first[0].style.left) ==0 ){
				for(var i = 24;i<38;i++){
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
						first[i].style.transition ='left 0s linear';
					first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";	
					}
				}
				for(var i = 0;i<38;i++){
					first[i].style.transition ='left 1s ease-in-out'; 
					if(i<24){
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
			}
			}
			//同样进行循环轮播
	setTimeout(function(){
	IntervalScroll =setInterval(function(){
		initScroll();
	},3000);
	return false;
	},3000)
}
//随机效果--第一行先滑动，随后每一行比前一行多0.1s的延迟时间
function randomTopFaster(i){
	if(i<24){
		var randomOne = Math.floor(i/6);
	}else{
		var randomOne = Math.floor((i-24)/6);
	}
	return randomOne;
}
//随机效果--最后一行先滑动，随后千=前一行比后一行多0.1s的延迟时间
function randomBottomFaster(i){
	if(i<24){
		var randomOne = 4-Math.floor(i/6);
	}else{
		var randomOne = 4-Math.floor((i-24)/6);
	}
	return randomOne;
}
//随机效果--正常滑动，每一行都是0.1s延迟
function normalScroll(){
	return 0;
}
//随机效果--交叉滑动，奇数行从左到右，偶数行从右到左
function crossScroll(i){
	if(Math.floor(i/6)%2==0){
		return 1;
	}else{
		return 0;
	}
}
//控制循环轮播，效果和点击右侧按钮一样，不过少了定时器和清除定时器
function initScroll(){
		var first = document.getElementsByClassName('img');
	var randomScroll =Math.floor(Math.random()*4);
	var scroll;
			if(parseInt(first[24].style.left) ==0 ){
				for(var i = 0;i<24;i++){
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
						
						first[i].style.transition ='left 0s linear';
					first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";	
					}
				}
				for(var i = 0;i<38;i++){
					first[i].style.transition ='left 1s ease-in-out'; 
					if(i<24){
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
				
			}
			}else if(parseInt(first[0].style.left) ==0 ){
				for(var i = 24;i<38;i++){
					if(randomScroll==3){
						scroll = crossScroll(i);
						if(scroll==0){
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";
						}else{
							first[i].style.transition ='left 0s linear';
							first[i].style.left = ((i%6)*first[i].offsetWidth-6*first[i].offsetWidth-1) +"px";
						}
					}else{
						first[i].style.transition ='left 0s linear';
					first[i].style.left = ((i%6)*first[i].offsetWidth+6*first[i].offsetWidth+1) +"px";	
					}
				}
				for(var i = 0;i<38;i++){
					first[i].style.transition ='left 1s ease-in-out'; 
					if(i<24){
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}else{
						if(randomScroll==0){
							scroll = randomTopFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==1){
							scroll = randomBottomFaster(i);
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==2){
							scroll = normalScroll();
							first[i].style.transitionDelay=scroll*0.1+0.1+'s';
							first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
						}else if(randomScroll==3){
							scroll = crossScroll(i);
							if(scroll==0){
								first[i].style.left = (parseInt(first[i].style.left)- first[i].offsetWidth*6-1)+"px";
							}else{
								first[i].style.left = (parseInt(first[i].style.left)+ first[i].offsetWidth*6+1)+"px";
							}
						}
					}
			}
			}

}
	

