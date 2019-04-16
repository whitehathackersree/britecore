;function isDict(v){return typeof v==='object'&&v!==null&&!(v instanceof Array)&&!(v instanceof Date);}
function isArray(v){return typeof v==='object'&&v!==null&&(v instanceof Array)&&!(v instanceof Date);}
function getCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function post_request(type,url,data,callback){var xhttp=new XMLHttpRequest();if(!window.XMLHttpRequest)xhttp=new ActiveXObject("Microsoft.XMLHTTP");xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){callback(this.responseText);}};xhttp.open(type,url,true);xhttp.setRequestHeader('X-Requested-With','XMLHttpRequest');xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');xhttp.setRequestHeader("X-CSRFToken",getCookie('csrftoken'));type=="GET"?xhttp.send():xhttp.send(JSON.stringify(data));}
function scrollBottom(elm){elm.scrollTop=elm.scrollHeight;}
function getRandomNumber(min,max){return Math.random()*(max-min)+min;}
function Sound(){this.el=document.getElementById("sound");if(typeof(this.el)=='undefined'||this.el==null){var div=document.createElement("div");div.setAttribute("id","sound");document.body.appendChild(div);}}
Sound.prototype.notification=function(){var file_name="/static/mp3/to-the-point";document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="'+file_name+'.mp3" type="audio/mpeg" /><source src="'+file_name+'.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="'+file_name+'.mp3" /></audio>';}
var sound;window.addEventListener("load",function(){sound=new Sound();},false);Array.prototype.shuffle=function(){var input=this;for(var i=input.length-1;i>=0;i--){var randomIndex=Math.floor(Math.random()*(i+1));var itemAtIndex=input[randomIndex];input[randomIndex]=input[i];input[i]=itemAtIndex;}
return input;}
function dictToURI(dict){var str=[];for(var p in dict){str.push(encodeURIComponent(p)+"="+encodeURIComponent(dict[p]));}
return str.join("&");}