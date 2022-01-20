build:
	mkdir public
	mkdir "public/img"
	mkdir "public/fonts"
	mkdir "public/loc"
	npm i browserify
	browserify loc\en-US.js -o loc\en-US-bundled.js
	cp *.* public
	cp img/*.* public/img
	cp fonts/*.* public/fonts