build:
	mkdir public
	mkdir "public/img"
	mkdir "public/fonts"
	mkdir "public/loc"
	npm i browserify
	browserify hideout-vis.js -o hideout-vis-bundled.js
	cp *.* public
	cp img/*.* public/img
	cp fonts/*.* public/fonts