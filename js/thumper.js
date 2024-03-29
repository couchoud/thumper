couchoud = couchoud || {};

/**
    Class: couchoud.thumper
    
    completely useless DOM animator that uses
    sound spectrum analysis from flash to strobe
    dom elements
*/
couchoud.thumper = (function($) {
    
    var _window = {
            width:0,
            height:0,
            area:0
        },
        elementCache = {},
        elements = null;
    
    var _self = {
        
        sizeCache: null,
        
        init : function() {
            this.updateWindowMeasurements();
            // get all the divs
            elements = $("body div");
            
            this.sizeCache = {};
            
            var i=0, l = elements.length;
            for(i;i<l;i++) {
                var e = $(elements[i]),
                    w = e.width(),
                    h = e.height(),
                    area = w*h;
                if(area) {
                   var d = Math.min(area/_window.area*10,9);
                   //console.log("d: " + d);
                   var param = (9-Math.floor(d))+"";
                   if(!(param in this.sizeCache)) {
                       this.sizeCache[param]=[];
                   }
                   this.sizeCache[param].push(e);
                }
            }
        },
        
        /**
            Method: thump
            
            find an element to animate based on pitch
            byteArray values passed in by flash
        */
        thump : function(pitch) {
            var p = Math.floor(Math.abs(pitch*10)),
                list = this.sizeCache[p+""];
                //console.log("pitch: " + pitch + ", p: " + p);
                if(pitch) {
                    if(list && list.length) {
                        var element = list[Math.floor(Math.random()*list.length)];
                        this.beat(element);
                    }
                    else {
                        //grab something random
                        this.beat(elements[Math.floor(Math.random()*elements.length)]);
                    }
                }
        },
        
        /**
            Method: beat
            
            do some background animations on a target element
        */
        beat : function(element) {
            var e = $(element),
                bgcolor = e.data("bgColor") || e.css("background-color"),
                color = "rgb("+ Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
                e.data("bgColor", bgcolor);
            e.animate({backgroundColor:color},"fast");
            
            setTimeout(function(){
                    e.stop().animate({backgroundColor:bgcolor},"fast");
                },250);
        },
        
        updateWindowMeasurements : function() {
            _window.width = $(window).width();
            _window.height = $(window).height();
            _window.area = _window.width * _window.height;
        },
        
        onWindowResize : function(event) {}
    };
    
    return _self;
    
})(jQuery);

$(document).ready(function(){
    couchoud.thumper.init();
 });