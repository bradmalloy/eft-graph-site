build:
	mkdir public 
	cp *.* public
	npm i javascript-obfuscate
	javascript-obfuscator hideout-vis.js --options-preset medium-obfuscation --output public/hideout-vis.js
	javascript-obfuscator loc/en-US.js --options-preset medium-obfuscation --output public/loc/en-US.js
	javascript-obfuscator loc/ru-RU.js --options-preset medium-obfuscation --output public/loc/ru-RU.js