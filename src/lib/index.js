import React,{useLayoutEffect,useState} from 'react'
import anime from 'animejs';

const Anime = (props)=>{
    let {id,className, style, type, children, explodeOptions} = props 
    const [state,setState] = useState('')
    
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
       if(props.explode =='characters'){
        chars.map( char =>{
           
            explodedChildren.push(React.createElement("span", options, char == " " ? '\u00A0' :char))
          
        })
       }else if(props.explode == 'words') {
        words.map( word =>{
            explodedChildren.push(React.createElement("span", options, word))
            explodedChildren.push(React.createElement("span", options, '\u00A0'))
        })
       }
       
        
    }
   
    

    const Play = (event)=>{
        let mode = props[event]
        if((mode === undefined) || (mode === null)) return
        if(mode.length > 1){
            
            let tl = anime.timeline({
                easing: 'easeOutExpo',
                duration: 750
              });

              mode.map( anim => tl.add(anim))
        }else{
            mode.map( anim => anime(anim))
        }
    }
      
    useLayoutEffect(()=>{
        Play('initial')
    },[])

    useLayoutEffect(()=>{
        Play(state)
    })
   
    const options = {
        id,
        style,
        className,
       onClick: ()=>setState('_onClick'),
       onContextMenu: ()=>setState('_onContextMenu'),
       onDoubleClick : ()=>setState('_onDoubleClick'),
       onDrag: ()=>setState('_onDrag'),
       onDragEnd: ()=>setState('_onDragEnd'),
       onDragEnter: ()=>setState('_onDragEnter'),
       onDragExit: ()=>setState('_onDragExit'),
       onDragLeave: ()=>setState('_onDragLeave'),
       onDragOver: ()=>setState('_onDragOver'),
       onDragStart: ()=>setState('_onDragStart'),
       onDrop: ()=>setState('_onDrop'),
       onMouseDown: ()=>setState('_onMouseDown'),
       onMouseEnter: ()=>setState('_onMouseEnter'),
       onMouseLeave: ()=>setState('_onMouseLeave'),
       onMouseMove: ()=>setState('_onMouseMove'),
       onMouseOut: ()=>setState('_onMouseOut'),
       onMouseOver: ()=>setState('_onMouseOver'),
       onMouseUp: ()=>setState('_onMouseUp')
    }
    return React.createElement(type || "div", options, props.explode === undefined ? children : explodedChildren);
}

const ReactAnime = 
  {
    Anime: Anime,
    stagger: anime.stagger
}

export default ReactAnime