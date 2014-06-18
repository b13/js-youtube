requirejs-youtube
=================

load youtube iFrame API with requireJS and init the youtube player.

# needed requireJS config

```js
var require = {
	paths: {
		'jquery'             : 'path/to/jquery'
		, 'youTube'          : 'path/to/youtube'
		, 'youTubeIFrameAPI' : 'https://www.youtube.com/iframe_api?noext'
	}
	, shim: {
		"youTubeIFrameAPI": {
			exports: 'YT'
		}
	}
};
```

# Basic usage

```js
require(['youTube'], function(youTube) {

		// do youtube setup and init player
	var player = new youTube({
		id          : id
		, youTubeId : youTubeId
		, height    : 400
		, width     : 600
		, onPlaying : function() {}
		, onPaused  : function() {}
		, onEnded   : function() {}
	});

		// start video
	player.play();

		// pause video
	player.pause();

		// stop video
	player.stop();

		// get youtube player object
	player.getYouTubePlayer()
});
```