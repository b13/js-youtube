/**!
 *  Module to load youtube iFrame API with requireJS and init the youtube player.
 *
 *  Author: Daniel Sattler
 *  © 2014 b:dreizehn GmbH, Stuttgart
 */

define([
	"jquery"
	, "youTubeIFrameAPI"
], function($, YT) {

		/**
		 * plugin default options
		 */
	var options = {
		height      : 400
		, width     : 600
		, youTubeId : 'C0DPdy98e4c'
		, id        : 'bJS_youTube'

			// add your own functions which are called on player state changes
		, onPlaying : null
		, onPaused  : null
		, onEnded   : null
	};


	var youTube = function(opts) {
		var
			me       = this
			, player = {}
			, s      = $.extend(options, opts);

		function initialize() {

				// init youTube Player
			player = new YT.Player(s.id, {
				height    : s.height
				, widget  : s.width
				, videoId : s.youTubeId
				, events  : {
					'onStateChange' : function(evt) {

						switch (evt.data) {
							case YT.PlayerState.PLAYING:
								if ($.isFunction(s.onPlaying)) {
									s.onPlaying();
								}
							break;
							case YT.PlayerState.PAUSED:
								if ($.isFunction(s.onPaused)) {
									s.onPaused();
								}
							break;
							case YT.PlayerState.ENDED:
								if ($.isFunction(s.onEnded)) {
									s.onEnded();
								}
							break;
						}
					}
				}
			});

			me.youTubeId = s.youTubeId;

			return me;
		}


			/**
			 * play video
			 */
		me.play = function() {
			player.playVideo();
		};


			/**
			 * pause video
			 */
		me.pause = function() {
			player.pauseVideo();
		};


			/**
			 * stop video
			 */
		me.stop = function() {
			player.stopVideo();
		};


			/**
			 * get iFrame DOM reference
			 * @returns {*|HTMLElement}
			 */
		me.getElem = function() {
			return $("#" + s.id);
		};

			/**
			 * return youtube player instance
			 * @returns {{}}
			 */
		me.getYouTubePlayer = function() {
			return player;
		};

		return YT.ready(function() {
			return initialize();
		});
	};

	return youTube;
});