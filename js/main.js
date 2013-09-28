/**
 * General description of what this file does
 * window.yogiipsum
 *
 * Created by Spencer Sanchez
 * 2013-09-01
 *
 * JS dependencies:
 *		jQuery
 *		Zurb Foundation 4
 *
 * internals:
 *		yogiipsum.global
 *		yogiipsum.analytics
 *		yogiipsum.phrases
 *
 */

(function(ns, window, $, undefined){
	/** @exports ns as window.yogiipsum */
	"use strict";


	/**
	 *
	 * yogiipsum.global
	 *
	 * Actions and event bindings not spcific to any larger component
	 *
	 */
	ns.global = {

		_bindEvents: function () {
			var that = this;

			// control external links to new windows tagged with class 'external'
			$('a').filter('.external').click(function(event){
				event.preventDefault();
				that.openWindow( this.href );
			});
		},


		// Opens a new window with passed url. Width and height are optionally
		// passed in. Menubar and toolbar are explicitly set to off.
		openWindow: function (url, width, height) {
			width = typeof width === 'undefined' ? 550 : width;
			height = typeof height === 'undefined' ? 400 : height;
			window.open(url, 'kid', 'width='+ width +',height='+ height +',menubar=no,toolbar=no');
		},


		init: function () {
			this._bindEvents();
		}
	};




	/**
	 *
	 * yogiipsum.analytics
	 *
	 * handles most of the google analytics functionality for the site
	 *
	 */
	ns.analytics = {
		_bindEvents: function () {
			var that = this;

			// send off an event when generate is clicked including current vals
			$('#generate').click(function(){
				that.trackEvent('User Action', 'generate ipsum');
			});

			// the next two fire events when changing options
			$('input').filter('[type="radio"]').each(function(){
				$(this).click(function(){
					that.trackEvent('User Action', this.name + ' to: ' + this.value);
				});
			});
			$('#numParagraphs').change(function(){
				that.trackEvent('User Action', 'num paragraphs to: ' + this.value);
			});
		},


		// returns a pipe-delimeted string of name/val pairs for the user-changable controls
		_serialize: function () {
			var vals = [];
			$('input').filter(':checked').add('#numParagraphs').each(function(){
				vals.push('|', this.name, '=', this.value);
			});
			return vals.join('');
		},



		// Generic function to send and event to GA. Label is always form config.
		trackEvent: function ( eventname, action ) {
			if ( window._gaq !== undefined ) {
				window._gaq.push( ['_trackEvent', eventname, action, this._serialize()] );
			}
		},


		init: function () {
			this._bindEvents();
		}
	};




	/**
	 *
	 * yogiipsum.phrases
	 *
	 * Load and set up action for generating ipsum text
	 *
	 */
	ns.phrases = {
		phrases: [],

		_bindEvents: function () {
			var that = this;
			$('#generate').click(function(){
				that._setPhrases( that._getPhrases() );
				$(this).blur();
			});
		},


		_getPhrases: function () {
			var i, j, x, y, z,
				jumbled = !document.getElementById('jumble').checked,
				num = document.getElementById('numParagraphs').value,
				wrappers = document.getElementById('wrappers').checked,
				str = document.getElementById('itAintOver').checked? "It ain't over 'til it's over. ": "";

			for (i=0; i<num; i++) {
				// random number of phrases for this paragraph
				z = Math.floor( Math.random() * this.phrases.length/4) + 1;

				for (j=0; j<z; j++) {
					x = Math.floor( Math.random() * this.phrases.length);
					y = jumbled? x: Math.floor( Math.random() * this.phrases.length);
					str += this.phrases[x].a + this.phrases[y].b;
				}
				str += "\n\n";
			}
			str = str.substr(0, str.length - 2);

			if (wrappers) {
				str = "<p>" + str.replace(/\n\n/g, "</p>\n\n<p>") + "</p>";
			}

			return str;
		},


		_loadPhrases: function () {
			var that = this;
			$.getJSON('phrases.json', function(json, textStatus) {
				var x = Math.floor( Math.random() * json.phrases.length);
				that.phrases = json.phrases;
				that._setPhrases( json.phrases[x].a + json.phrases[x].b );
			});
		},


		_setPhrases: function (str) {
			$('#ipsum').val( str );
		},


		init: function () {
			this._loadPhrases();
			this._bindEvents();
		}
	};



	/**
	 *
	 * yogiipsum.init
	 *
	 * Start the app, calling the init's of any sub-namespaces and
	 * kicking off the main Foundation script
	 *
	 */
	ns.init = function () {
		ns.global.init();
		ns.phrases.init();
		ns.analytics.init();
		$(document).foundation();
	};


	$(function(){
		ns.init();
	});


})(this.yogiipsum = this.yogiipsum || {}, this, jQuery, undefined);
