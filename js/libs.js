/*!
* Twitter widget
*/
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

/*!
* Google +1 button
*/
window.___gcfg = {
	lang: 'en-US'
};
(function() {
	var s, po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();
