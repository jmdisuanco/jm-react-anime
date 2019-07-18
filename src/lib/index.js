import React,{useLayoutEffect,useState} from 'react'
import anime from 'animejs';

const Anime = (props)=>{
    let {id,className, style, type, children, explodeOptions,control, setMeta} = props 
    const [state,setState] = useState('')
    const [lastControl, setLastControl] = useState('')
    const [player, setPLayer] = useState({})
    let TL
    let words = []
    let chars = []
    let explodedChildren = []
    if (props.explode){
        React.Children.map(children, child => {
                if (typeof child === 'string') {
                    words = child.split(' ')
                    chars = child.split('')
                }
            }
        )

        let options = {className: explodeOptions.name, style:{display:'inline-block'} }
       if(props.explode === 'characters'){
        chars.map( char => {

            explodedChildren.push(React.createElement("span", options, char === " " ? '\u00A0' :char))
          
        })
       }else if(props.explode === 'words') {
        words.map( word =>{
            explodedChildren.push(React.createElement("span", options, word))
            explodedChildren.push(React.createElement("span", options, '\u00A0'))
        })
       }
       
        
    }
   
    

    const Play = (event)=>{
      
        let mode = props[event]
        let {animeConfig} = props
        if((mode === undefined) || (mode === null)) return
        if(mode.length > 1){
         let config =    animeConfig?  animeConfig : {easing: 'easeOutExpo', duration: 750}
         if(setMeta){
           config.update =  ()=> setMeta({
                                            progress: tl.progress,
                                            currentTime: tl.currentTime,
                                            duration: tl.duration,
                                        })
         }
            let tl = anime.timeline(              
                config
              );

              mode.map( anim => tl.add(anim))
           return tl
              
        }else{
            mode.map( anim => anime(anim))
        }

       
    }
      
    useLayoutEffect(()=>{
        setPLayer(Play('initial'))
    },[])

    useLayoutEffect(()=>{
     
        if(props[state] === undefined) {
            if(props['_onUpdate']) {
                Play('_onUpdate')
                return
            }
            if(control){
                if(lastControl != control){
                    if (typeof control != 'object'){
                        setLastControl(control)
                        player[control]()
                    }else{
                        setLastControl(control)
                        player[control[0]](player.duration * (control[1] / 100) )
                    }
                   
                }
               
         
            }
        }else{
            Play(state)
        }
        
        setState('')
    })

    const options = {
        id,
        style,
        className,
       onClick: (e)=>{setState('_onClick'); try{props.onClick(e)}catch(e){} },
       onContextMenu: (e)=>{setState('_onContextMenu'); try{props.onContextMenu(e)}catch(e){} },
       onDoubleClick : (e)=>{setState('_onDoubleClick'); try{props.onDoubleClick(e)}catch(e){} },
       onDrag: (e)=>{setState('_onDrag'); try{props.onDrag(e)}catch(e){} },
       onDragEnd: (e)=>{setState('_onDragEnd'); try{props.onDragEnd(e)}catch(e){} },
       onDragEnter: (e)=>{setState('_onDragEnter'); try{props.onDragEnter(e)}catch(e){} },
       onDragExit: (e)=>{setState('_onDragExit'); try{props.onDragExit(e)}catch(e){} },
       onDragLeave: (e)=>{setState('_onDragLeave'); try{props.onDragLeave(e)}catch(e){} },
       onDragOver: (e)=>{setState('_onDragOver'); try{props.onDragOver(e)}catch(e){} },
       onDragStart: (e)=>{setState('_onDragStart'); try{props.onDragStart(e)}catch(e){} },
       onDrop: (e)=>{setState('_onDrop'); try{props.onDrop(e)}catch(e){} },
       onMouseDown: (e)=>{setState('_onMouseDown'); try{props.onMouseDown(e)}catch(e){} },
       onMouseEnter: (e)=>{setState('_onMouseEnter'); try{props.onMouseEnter(e)}catch(e){} },
       onMouseLeave: (e)=>{setState('_onMouseLeave'); try{props.onMouseLeave(e)}catch(e){} },
       onMouseMove: (e)=>{setState('_onMouseMove'); try{props.onMouseMove(e)}catch(e){} },
       onMouseOut: (e)=>{setState('_onMouseOut'); try{props.onMouseOut(e)}catch(e){} },
       onMouseOver: (e)=>{setState('_onMouseOver'); try{props.onMouseOver(e)}catch(e){} },
       onMouseUp: (e)=>{setState('_onMouseUp'); try{props.onMouseUp(e)}catch(e){} }
    }
    return React.createElement(type || "div", options, props.explode === undefined ? children : explodedChildren);
}

const ReactAnime = 
  {
    Anime: Anime,
    stagger: anime.stagger,
}

export default ReactAnime
