
/** Crawl wikipedia and download all images recursively **/

var huntsman = require('../index');
var spider = huntsman.spider();

spider.extensions = [
  huntsman.extension( 'recurse' ), // load recurse extension & follow anchor links
  huntsman.extension( 'recurse', {  // also recurse image links
    pattern: {
      search: /img\ssrc\s?=\s?['"]([^"']+)/gi, // extract img tags
      filter: /\.jpg|\.gif|\.png/ // filter file types
    }
  })
];

// follow pages which match these uri regex
spider.on( /http:\/\/en\.wikipedia\.org\/wiki\/File/ );

// print mime type and uri for each image found
spider.on(/^http:\/\/upload\.wikimedia\.org(.*)(\.jpg|\.gif|\.png)$/, function ( err, res ){

  console.log( res.headers['content-type'], '\t', Math.round( res.body.length / 1024 ) + 'kb', '\t', res.uri );

});

spider.queue.add( 'http://en.wikipedia.org/wiki/Huntsman_spider' );
spider.start();