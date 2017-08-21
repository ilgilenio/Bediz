/* 
	Bediz v1.0 Standalone (https://github.com/ilgilenio/Bediz)
	Copyright (c) 2017 ilgilenio®, Alper Kürşat Ünver

	Free to use under the MIT License.
*/
"use strict";
var Bediz=window['Bediz']={
	//calculate ilgiWeight based on heights and widths of images
	ilgiWeight:function(w,h){
		let weight=h.map(function(i){
			return this/i;
		},h.reduce(Math.lcm));

		return weight.map(function(w){return w/this;},
			weight.map(function(i,j){
				return w[j]*i;
			}).reduce(Math.sum)
		);
	},
	create:function(n,p){
		return document.createElement('div').Bediz(n,p);
	}
};
Image.prototype.ready=function(i){
	let scope=i||this;
	return new Promise(function(res,rej){
		(scope.width+scope.height)?res(scope):
		scope.onload=function(){
			res(this)
		}
	});
};
Math.gcd=function(a,b){
	var temp = 0;
	while(a !== 0){
		temp = a;
		a = b % a;
		b = temp; 
	}
	return b;
};
Math.lcm=function(a,b){
	return (a * b / Math.gcd(a,b));
};
Math.sum=function(a,b){
	return a+b;
};
Element.prototype.Bediz=function(divide,padding){
	this.style.display='flex'
	this.style['flex-flow']='wrap';
	this._bedizN=divide;
	this._bedizP=padding||0;
	this.set=function(elems,dontContain){

		//scope locally for performance
		let B=Bediz,
		//define ES6 filter function
		p=function(prop){
			return function(elem){
				return elem[prop];
			}
		},
		n=this._bedizN,
		size=function (group,padding){
			Promise.all(group)
			.then(function(v){
				B.ilgiWeight( v.map(p('width')),v.map(p('height')) )
				.forEach(function(i,j){
					v[j].style.width='100%'
					v[j].style.display='block';
					v[j].parent.style.width=((v[j].width*i*1e2)-padding)+'%';
				});
			});
		};
		var g=[];
		elems.forEach(function(i){
			let e=document.createElement('div');
			e.className='i';
			e.style.padding=(this._bedizP/2)+'%';
			e.appendChild(i);
			i.parent=e;
			i.style.display="none";
			this.appendChild(e);

			g.push(i);
			if(g.length==n){
				size(g.map(Image.prototype.ready),this._bedizP);
				g=[];
			}
		},this);
		if(g.length){
			size(g.map(Image.prototype.ready),this._bedizP);
		}
	};
	//if element already contains images
	if(this.children.length){
		var list=[];
		for(var i=0,c=this.children,l=c.length;i<l;i++){
			list.push(c[i]);
		}
		this.set(list);
	}
	return this;
}
