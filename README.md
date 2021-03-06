![Bediz Logo](https://ilgilenio.github.io/Bediz/bediz.png)
# Bediz Photo Grid
Bediz is a simple lightweight JavaScript grid layout library. 
It places pictures vertically without ruining pictures ratio and your bandwith

![Bediz Sample](https://ilgilenio.github.io/Bediz/sample.png)

## Demo
[Bediz Demo](https://ilgilenio.github.io/Bediz/sample.html)

## Installation
**Bediz** can be used with **Otag Framework** or **standalone**

[**Bediz.standalone.js**](https://ilgilenio.github.io/Bediz/Bediz.standalone.min.js) (*1.8 kb minified*)
[**Otag.Module.Bediz.js**](https://ilgilenio.github.io/Bediz/Otag.Module.Bediz.min.js) (*1.6 kb minified*)

## Usage
### 1 ) initialize Bediz element

##### with Otag Framework
	let gridElement = Otag.Module.Bediz.create(5,1) //5 photo each line with %1 padding

##### standalone
	let gridElement = Bediz.create(5,1) //5 photo each line with %1 padding

##### or just getElement
    let gridElement= document.getElementById('gridElementID');
    gridElement.Bediz(5,1)

### 2) set content
	gridElement.set(imageElementsArray)
