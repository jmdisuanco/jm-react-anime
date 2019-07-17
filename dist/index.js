import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useLayoutEffect, useState } from 'react';
import anime from 'animejs';

var Anime = function Anime(props) {
  var id = props.id,
      className = props.className,
      style = props.style,
      type = props.type,
      children = props.children,
      explodeOptions = props.explodeOptions;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

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

    if (props.explode == 'characters') {
      chars.map(function (_char) {
        explodedChildren.push(React.createElement("span", _options, _char == " " ? "\xA0" : _char));
      });
    } else if (props.explode == 'words') {
      words.map(function (word) {
        explodedChildren.push(React.createElement("span", _options, word));
        explodedChildren.push(React.createElement("span", _options, "\xA0"));
      });
    }
  }

  var Play = function Play(event) {
    var mode = props[event];
    if (mode === undefined || mode === null) return;

    if (mode.length > 1) {
      var tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
      });
      mode.map(function (anim) {
        return tl.add(anim);
      });
    } else {
      mode.map(function (anim) {
        return anime(anim);
      });
    }
  };

  useLayoutEffect(function () {
    Play('initial');
  }, []);
  useLayoutEffect(function () {
    Play(state);
  });
  var options = {
    id: id,
    style: style,
    className: className,
    onClick: function onClick() {
      return setState('_onClick');
    },
    onContextMenu: function onContextMenu() {
      return setState('_onContextMenu');
    },
    onDoubleClick: function onDoubleClick() {
      return setState('_onDoubleClick');
    },
    onDrag: function onDrag() {
      return setState('_onDrag');
    },
    onDragEnd: function onDragEnd() {
      return setState('_onDragEnd');
    },
    onDragEnter: function onDragEnter() {
      return setState('_onDragEnter');
    },
    onDragExit: function onDragExit() {
      return setState('_onDragExit');
    },
    onDragLeave: function onDragLeave() {
      return setState('_onDragLeave');
    },
    onDragOver: function onDragOver() {
      return setState('_onDragOver');
    },
    onDragStart: function onDragStart() {
      return setState('_onDragStart');
    },
    onDrop: function onDrop() {
      return setState('_onDrop');
    },
    onMouseDown: function onMouseDown() {
      return setState('_onMouseDown');
    },
    onMouseEnter: function onMouseEnter() {
      return setState('_onMouseEnter');
    },
    onMouseLeave: function onMouseLeave() {
      return setState('_onMouseLeave');
    },
    onMouseMove: function onMouseMove() {
      return setState('_onMouseMove');
    },
    onMouseOut: function onMouseOut() {
      return setState('_onMouseOut');
    },
    onMouseOver: function onMouseOver() {
      return setState('_onMouseOver');
    },
    onMouseUp: function onMouseUp() {
      return setState('_onMouseUp');
    }
  };
  return React.createElement(type || "div", options, props.explode === undefined ? children : explodedChildren);
};

var ReactAnime = {
  Anime: Anime,
  stagger: anime.stagger
};
export default ReactAnime;