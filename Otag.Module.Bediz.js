/* 
	Bediz v1.0 Standalone (https://github.com/ilgilenio/Bediz)
	Copyright (c) 2017 ilgilenio®, Alper Kürşat Ünver

	Free to use under the MIT License.
*/
"use strict";
if(!window.Otag){
	throw new Error('Otag Framework didn\'t loaded,\nUse Bediz standalone( http://bit.ly/2vYoGyF ) or load Otag( http://bit.ly/2v8UteQ ) correctly')
}
Otag.Module.Bediz={
	ilgiWeight:function(w,h){
		
		let weight=h.map(function(i){
			return this/i
		},h.reduce(Math.lcm));

		return weight.map(function(w){return w/this;},weight.map(function(i,j){
			return w[j]*i
		}).reduce(Math.sum));
	},
	create:function(n){
		''.dom().Bediz(n);
	}
}
Image.prototype.ready=function(i){
	let scope=i||this;
	return new Promise(function(res,rej){
		(scope.width+scope.height)?res(scope):
		scope.onload=function(){
			res(this.prop({ratio:this.width/this.height}))
		}
	});
	
}
Element.prototype.Bediz=function(divide,padding){
	Otag.combine(this.style,{display:'flex','flex-flow':'wrap'});
	this.prop({
	_bedizN:divide,
	_bedizP:padding||0,
	set:function(elems){
		let s=this,
		B=Otag.Module.Bediz,
		p=Otag.Filter.prop,
		n=this._bedizN,
		size=function (g){
			Promise.all(g)
			.then(function(v){
				B.ilgiWeight( v.map(p('width')),v.map(p('height')) )
				.forEach(function(i,j){
					v[j].style.width='100%';
					v[j].disp(1).parent.style.width=((v[j].width*i*1e2)-s._bedizP)+'%';
				});
			});
		};

		var g=[];
		this.contains(elems.map(function(i){
			g.push(i.disp());
			if(g.length==n){
				size(g.map(Image.prototype.ready));
				g=[];
			}
			return 'i'.contains([i]).prop('style','padding:'+(s._bedizP/2)+'%');
		}));
		if(g.length){
			size(g.map(Image.prototype.ready));
		}
	}});
	if(this.children.length){
		var list=[];
		for(var i=0,c=this.children,l=c.length;i<l;i++){
			list.push(c[i]);
		}
		this.set(list);
	}
	return this;
}
