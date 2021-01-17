build:
	mkdir public
	mkdir "public/img"
	mkdir "public/fonts"
	mkdir "public/loc" 
	cp *.* public
	cp img/*.* public/img
	cp fonts/*.* public/fonts
	npm i javascript-obfuscator
	javascript-obfuscator hideout-vis.js --options-preset medium-obfuscation --output public/hideout-vis.js
	javascript-obfuscator loc/en-US.js --options-preset medium-obfuscation --output public/loc/en-US.js
	javascript-obfuscator loc/ru-RU.js --options-preset medium-obfuscation --output public/loc/ru-RU.js