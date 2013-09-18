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

			$('input[type="submit"]').click(function(event){
				event.preventDefault();
				return false;
			});
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

			/* send off an event when generate is clicked including current vals */
			$('#generate').click(function(){
				var vals = [];
				$('input').filter(':checked').add('#numParagraphs').each(function(){
					vals.push('|', this.name, '=', this.value);
				});
				that.trackEvent('User Action', 'generate ipsum ' + vals.join(''));
			});

			/* the next two fire events when changing options */
			$('input').filter('[type="radio"]').each(function(){
				$(this).click(function(){
					that.trackEvent('User Action', this.name + ': ' + this.value);
				});
			});
			$('#numParagraphs').change(function(){
				that.trackEvent('User Action', 'num paragraphs: ' + this.value);
			});
		},


		/* generic function to send and event to GA */
		trackEvent: function ( eventname, action ) {
			if ( window._gaq !== undefined ) {
				window._gaq.push( ['_trackEvent', eventname, action] );
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
