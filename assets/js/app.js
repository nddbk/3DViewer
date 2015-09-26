/**
 * app.js
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

;(function(_parent){

  APP_STATE = 1;

  var canvas, viewer, initState = {};

  var clicks = [], resizes = [];

  function onclick(e, tg){
    clicks.forEach(function(f){
      f(e, tg);
    });
  }
  function onresize(w, h){
    resizes.forEach(function(f){
      f(w, h);
    });
  }

  function render(a){

  }

  /*
   * load loadTexture
   */
  function loadTexture(path, callback){
    var texture = new JSC3D.Texture(bj.createId(16));
    texture.onready = function(){
      var scene = viewer.getScene();
      var mesh = scene.getChildren()[0];
      mesh.init();
      mesh.setTexture(this);
      console.log(mesh);
      mesh.setMaterial(mesh.aterial);
      viewer.update();
      if(callback){
        callback();
      }
    }
    texture.createFromUrl(path, true);
  }

  /*
   * load object data and render it
   */
  function loadObject(file, opts){
    var op = opts || {};
    var x = op.x || 0;
    var y = op.y || 0;
    var z = op.z || 0;
    var modelColor = op.modelColor || '#ff0000';
    var bgColorTop = op.bgColorTop || '#ffffaa';
    var bgColorBottom = op.bgColorBottom || '#666633';
    var renderMode = op.renderMode || 'smooth';
    var textures = opts.textures || [];

    viewer.setParameter('SceneUrl', '');
    viewer.setParameter('InitRotationX', x);
    viewer.setParameter('InitRotationY', y);
    viewer.setParameter('InitRotationZ', z);
    viewer.setParameter('BackgroundColor1', bgColorTop);
    viewer.setParameter('BackgroundColor2', bgColorBottom);
    viewer.setParameter('RenderMode', renderMode);
    viewer.setParameter('MipMapping', 'on');
    viewer.setParameter('enableDefaultInputHandle', true);
    viewer.setMouseUsage('rotate');
    viewer.init();
    viewer.update();

    var oLoader = new JSC3D.ObjLoader(function(scene){
      //viewer.setDefinition('high');
      viewer.replaceScene(scene);
      if(textures.length>0){
        for(var i=0;i<textures.length;i++){
          loadTexture(textures[i], function(){
            if(!!textures[i+1]){
              loadTexture(textures[i+1]);
            }
          });
        }
      }
      app.panel.View.onloaded();
      viewer.update();
    });
    oLoader.loadFromUrl(file);

    initState.renderMode = renderMode;
    initState.modelColor = modelColor;
  }

  var app = _parent['app'] = {
    getState : function(){
      return APP_STATE;
    },
    setState : function(k){
      APP_STATE = k;
      return k;
    },
    init : function(){
      canvas = document.getElementById('cv');
      viewer = new JSC3D.Viewer(canvas);
      app.viewer = viewer;
      app.panel.View.start();
    },
    loadObj : function(file, opts){
      return loadObject(file, opts);
    },
    storage : {
      cacheTime : 1800,
      selectDB : function(){
        bj.storage.selectDB('context');
      },
      save : function(key, data){
        bj.selectDB();
        bj.storage.set(key, data);
      },
      query : function(key){
        bj.selectDB();
        return bj.storage.get(key, 'toJSON');
      }
    },
    send : function(target, data, callback, errorCallback){
      var ajax = bj.transactor.create();
      ajax.onerror = errorCallback || function(){};
      ajax.send({data: data, target: target}, callback);
      return ajax;
    },
    retrieve : function(target, callback, errorCallback){
      var ajax = bj.transactor.create();
      ajax.onerror = errorCallback || function(){};
      ajax.send(target, callback);
      return ajax;
    },
    animate : function(el, props, time, callback){
      el = bj.element(el);
      if(!window['jQuery']){
        anim(el, props, time/1000, 'linear').anim(function(){
          if(callback){callback()}
        });
      }
    },
    date: function(t, pattern){
      return bj.date.make(pattern, bj.date.gmtToLocal(t));
    },
    onclick : onclick,
    onresize : onresize,
    registerClick : function(f){
      clicks.push(f);
    },
    registerResize : function(f){
      resizes.push(f);
    },
  }
})(window);
