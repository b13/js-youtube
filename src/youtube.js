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
	},
	youTubeAPIIsReady = $.Deferred();

	//Check if the youTube iframe API is ready
	if(typeof YT.Player !== 'function'){
		//Setup the onYouTubeIframeAPIReady function globally
		//This function will be called by the youtube API if it is ready
		//The deferred will be resolved if the API is ready
		window.onYouTubeIframeAPIReady = function(){
			youTubeAPIIsReady.resolve();
		}
	} else {
		//Resolve the youTubeAPIIsReady deferred if the API is ready
		youTubeAPIIsReady.resolve();
	}

	var youTube = function(opts) {
		var
			me       = this
			, player = {}
			, s      = $.extend(options, opts);

		me.youTubeAPIIsReady = youTubeAPIIsReady;

		function initialize() {

			//Wait with the creation of the player till the youTube API is ready
			youTubeAPIIsReady.done(function(){
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

			});

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

		return initialize();
	};

	return youTube;
});