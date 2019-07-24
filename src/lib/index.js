import React, { useLayoutEffect, useState } from "react";
import anime from "animejs";

const Anime = props => {
  let {
    id,
    className,
    style,
    type,
    children,
    explodeOptions,
    control,
    setMeta
  } = props;
  const [state, setState] = useState("");
  const [lastControl, setLastControl] = useState("");
  const [player, setPLayer] = useState({});
  let words = [];
  let chars = [];
  let explodedChildren = [];
  if (props.explode) {
    React.Children.map(children, child => {
      if (typeof child === "string") {
        words = child.split(" ");
        chars = child.split("");
      }
    });

    let options = {
      className: explodeOptions.name,
      style: { display: "inline-block" }
    };
    if (props.explode === "characters") {
      chars.map(char => {
        explodedChildren.push(
          React.createElement("span", options, char === " " ? "\u00A0" : char)
        );
      });
    } else if (props.explode === "words") {
      words.map(word => {
        explodedChildren.push(React.createElement("span", options, word));
        explodedChildren.push(React.createElement("span", options, "\u00A0"));
      });
    }
  }

  const Play = event => {
    let mode = props[event];
    let { animeConfig } = props;
    if (mode === undefined || mode === null) return;
    if (mode.length > 1) {
      let config = animeConfig
        ? animeConfig
        : { easing: "easeOutExpo", duration: 750 };
      if (setMeta) {
        config.update = () =>
          setMeta({
            progress: tl.progress,
            currentTime: tl.currentTime,
            duration: tl.duration
          });
      }
      let tl = anime.timeline(config);

      mode.map(anim => tl.add(anim));
      return tl;
    } else {
      mode.map(anim => anime(anim));
    }
  };

  useLayoutEffect(() => {
    setPLayer(Play("initial"));
  }, []);

  useLayoutEffect(() => {
    if (props[state] === undefined) {
      if (props["_onUpdate"]) {
        Play("_onUpdate");
      }
      if (control) {
        if (lastControl !== control) {
          if (typeof control !== "object") {
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
    setState("");
    return () => {
      if (props["_onUnmount"]) {
        Play("_onUnmount");
      }
    };
  });

  const options = {
    id,
    style,
    className,
    onClick: e => {
      if (props["_onClick"]) setState("_onClick");
      try {
        props.onClick(e);
      } catch (e) {}
    },
    onContextMenu: e => {
      if (props["_onContextMenu"]) setState("_onContextMenu");
      try {
        props.onContextMenu(e);
      } catch (e) {}
    },
    onDoubleClick: e => {
      if (props["_onDoubleClick"]) setState("_onDoubleClick");
      try {
        props.onDoubleClick(e);
      } catch (e) {}
    },
    onDrag: e => {
      if (props["_onDrag"]) setState("_onDrag");
      try {
        props.onDrag(e);
      } catch (e) {}
    },
    onDragEnd: e => {
      if (props["_onDragEnd"]) setState("_onDragEnd");
      try {
        props.onDragEnd(e);
      } catch (e) {}
    },
    onDragEnter: e => {
      if (props["_onDragEnter"]) setState("_onDragEnter");
      try {
        props.onDragEnter(e);
      } catch (e) {}
    },
    onDragExit: e => {
      if (props["_onDragExit"]) setState("_onDragExit");
      try {
        props.onDragExit(e);
      } catch (e) {}
    },
    onDragLeave: e => {
      if (props["_onDragLeave"]) setState("_onDragLeave");
      try {
        props.onDragLeave(e);
      } catch (e) {}
    },
    onDragOver: e => {
      if (props["_onDragOver"]) setState("_onDragOver");
      try {
        props.onDragOver(e);
      } catch (e) {}
    },
    onDragStart: e => {
      if (props["_onDragStart"]) setState("_onDragStart");
      try {
        props.onDragStart(e);
      } catch (e) {}
    },
    onDrop: e => {
      if (props["_onDrop"]) setState("_onDrop");
      try {
        props.onDrop(e);
      } catch (e) {}
    },
    onMouseDown: e => {
      if (props["_onMouseDown"]) setState("_onMouseDown");
      try {
        props.onMouseDown(e);
      } catch (e) {}
    },
    onMouseEnter: e => {
      if (props["_onMouseEnter"]) setState("_onMouseEnter");
      try {
        props.onMouseEnter(e);
      } catch (e) {}
    },
    onMouseLeave: e => {
      if (props["_onMouseLeave"]) setState("_onMouseLeave");
      try {
        props.onMouseLeave(e);
      } catch (e) {}
    },
    onMouseMove: e => {
      if (props["_onMouseMove"]) setState("_onMouseMove");
      try {
        props.onMouseMove(e);
      } catch (e) {}
    },
    onMouseOut: e => {
      if (props["_onMouseOut"]) setState("_onMouseOut");
      try {
        props.onMouseOut(e);
      } catch (e) {}
    },
    onMouseOver: e => {
      if (props["_onMouseOver"]) setState("_onMouseOver");
      try {
        props.onMouseOver(e);
      } catch (e) {}
    },
    onMouseUp: e => {
      if (props["_onMouseUp"]) setState("_onMouseUp");
      try {
        props.onMouseUp(e);
      } catch (e) {}
    }
  };
  return React.createElement(
    type || "div",
    options,
    props.explode === undefined ? children : explodedChildren
  );
};
const ReactAnime = {
  Anime: Anime,
  stagger: anime.stagger
};

export default ReactAnime;
