import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useLayoutEffect, useState } from 'react';
import anime from 'animejs';

var Anime = function Anime(props) {
  var id = props.id,
      className = props.className,
      style = props.style,
      type = props.type,
      children = props.children,
      explodeOptions = props.explodeOptions,
      control = props.control,
      setMeta = props.setMeta;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      lastControl = _useState4[0],
      setLastControl = _useState4[1];

  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      player = _useState6[0],
      setPLayer = _useState6[1];

  var TL;
  var words = [];
  var chars = [];
  var explodedChildren = [];

  if (props.explode) {
    React.Children.map(children, function (child) {
      if (typeof child === 'string') {
        words = child.split(' ');
        chars = child.split('');
      }
    });
    var _options = {
      className: explodeOptions.name,
      style: {
        display: 'inline-block'
      }
    };

    if (props.explode === 'characters') {
      chars.map(function (_char) {
        explodedChildren.push(React.createElement("span", _options, _char === " " ? "\xA0" : _char));
      });
    } else if (props.explode === 'words') {
      words.map(function (word) {
        explodedChildren.push(React.createElement("span", _options, word));
        explodedChildren.push(React.createElement("span", _options, "\xA0"));
      });
    }
  }

  var Play = function Play(event) {
    var mode = props[event];
    var animeConfig = props.animeConfig;
    if (mode === undefined || mode === null) return;

    if (mode.length > 1) {
      var config = animeConfig ? animeConfig : {
        easing: 'easeOutExpo',
        duration: 750
      };

      if (setMeta) {
        config.update = function () {
          return setMeta({
            progress: tl.progress,
            currentTime: tl.currentTime,
            duration: tl.duration
          });
        };
      }

      var tl = anime.timeline(config);
      mode.map(function (anim) {
        return tl.add(anim);
      });
      return tl;
    } else {
      mode.map(function (anim) {
        return anime(anim);
      });
    }
  };

  useLayoutEffect(function () {
    setPLayer(Play('initial'));
  }, []);
  useLayoutEffect(function () {
    if (props[state] === undefined) {
      if (props['_onUpdate']) {
        Play('_onUpdate');
        return;
      }

      if (control) {
        if (lastControl != control) {
          if (typeof control != 'object') {
            setLastControl(control);
            player[control]();
          } else {
            setLastControl(control);
            player[control[0]](player.duration * (control[1] / 100));
          }
        }
      }
    } else {
      Play(state);
    }

    setState('');
  });
  var options = {
    id: id,
    style: style,
    className: className,
    onClick: function onClick(e) {
      setState('_onClick');

      try {
        props.onClick(e);
      } catch (e) {}
    },
    onContextMenu: function onContextMenu(e) {
      setState('_onContextMenu');

      try {
        props.onContextMenu(e);
      } catch (e) {}
    },
    onDoubleClick: function onDoubleClick(e) {
      setState('_onDoubleClick');

      try {
        props.onDoubleClick(e);
      } catch (e) {}
    },
    onDrag: function onDrag(e) {
      setState('_onDrag');

      try {
        props.onDrag(e);
      } catch (e) {}
    },
    onDragEnd: function onDragEnd(e) {
      setState('_onDragEnd');

      try {
        props.onDragEnd(e);
      } catch (e) {}
    },
    onDragEnter: function onDragEnter(e) {
      setState('_onDragEnter');

      try {
        props.onDragEnter(e);
      } catch (e) {}
    },
    onDragExit: function onDragExit(e) {
      setState('_onDragExit');

      try {
        props.onDragExit(e);
      } catch (e) {}
    },
    onDragLeave: function onDragLeave(e) {
      setState('_onDragLeave');

      try {
        props.onDragLeave(e);
      } catch (e) {}
    },
    onDragOver: function onDragOver(e) {
      setState('_onDragOver');

      try {
        props.onDragOver(e);
      } catch (e) {}
    },
    onDragStart: function onDragStart(e) {
      setState('_onDragStart');

      try {
        props.onDragStart(e);
      } catch (e) {}
    },
    onDrop: function onDrop(e) {
      setState('_onDrop');

      try {
        props.onDrop(e);
      } catch (e) {}
    },
    onMouseDown: function onMouseDown(e) {
      setState('_onMouseDown');

      try {
        props.onMouseDown(e);
      } catch (e) {}
    },
    onMouseEnter: function onMouseEnter(e) {
      setState('_onMouseEnter');

      try {
        props.onMouseEnter(e);
      } catch (e) {}
    },
    onMouseLeave: function onMouseLeave(e) {
      setState('_onMouseLeave');

      try {
        props.onMouseLeave(e);
      } catch (e) {}
    },
    onMouseMove: function onMouseMove(e) {
      setState('_onMouseMove');

      try {
        props.onMouseMove(e);
      } catch (e) {}
    },
    onMouseOut: function onMouseOut(e) {
      setState('_onMouseOut');

      try {
        props.onMouseOut(e);
      } catch (e) {}
    },
    onMouseOver: function onMouseOver(e) {
      setState('_onMouseOver');

      try {
        props.onMouseOver(e);
      } catch (e) {}
    },
    onMouseUp: function onMouseUp(e) {
      setState('_onMouseUp');

      try {
        props.onMouseUp(e);
      } catch (e) {}
    }
  };
  return React.createElement(type || "div", options, props.explode === undefined ? children : explodedChildren);
};

var ReactAnime = {
  Anime: Anime,
  stagger: anime.stagger
};
export default ReactAnime;