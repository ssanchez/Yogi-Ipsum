/*!
* EASING, from jqueryui 1.10
* http://jqueryui.com/
* based on easing equations from Robert Penner
* http://www.robertpenner.com/easing
*/
(function(){var a={};$.each(["Quad","Cubic","Quart","Quint","Expo"],function(c,b){a[b]=function(d){return Math.pow(d,c+2);};});$.extend(a,{Sine:function(b){return 1-Math.cos(b*Math.PI/2);},Circ:function(b){return 1-Math.sqrt(1-b*b);},Elastic:function(b){return b===0||b===1?b:-Math.pow(2,8*(b-1))*Math.sin(((b-1)*80-7.5)*Math.PI/15);},Back:function(b){return b*b*(3*b-2);},Bounce:function(d){var b,c=4;while(d<((b=Math.pow(2,--c))-1)/11){}return 1/Math.pow(4,3-c)-7.5625*Math.pow((b*3-2)/22-d,2);}});$.each(a,function(c,b){$.easing["easeIn"+c]=b;$.easing["easeOut"+c]=function(d){return 1-b(1-d);};$.easing["easeInOut"+c]=function(d){return d<0.5?b(d*2)/2:1-b(d*-2+2)/2;};});})();
