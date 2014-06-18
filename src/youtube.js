/**!
 *  little plugin to load youtube iFrame API with
 *  requireJS and init the youtube player.
 *
 *  The following requireJS config is needed
 *
 *  	var require = {
 *  		paths: {
 *  			'youTubeIFrameAPI' : 'https://www.youtube.com/iframe_api?noext'
 * 	 		}
 *  		, shim: {
 *  			"youTubeIFrameAPI": {
 *  				exports: 'YT'
 *  			}
 *  		}
 * 		};
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

			return me;
		}


			/**
			 * play video
			 */
		me.play = function() {
			me.player.playVideo();
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
			 * return youtube player instance
			 * @returns {{}}
			 */
		me.getYouTubePlayer = function() {
			return player;
		};

		return initialize();
	};

	return youTube;
});