import React,{useState,useRef} from 'react';
import { storiesOf } from '@storybook/react';
import ReactAnime from '../src/lib'
const {Anime, stagger} = ReactAnime
import './style.css'
const Box = ({children})=>{
  return <div id ='Box' style={{height:50, width:50, background:'#d3d'}}>{children}</div>
}

const Self = ()=>{
  const mySelf =  useRef(0)
  mySelf.current = mySelf.current + 1;
    return (<Anime
    type= 'div'
    id={`me_${mySelf.current}`}
    style={{width:50,height:80,background:'blue'}}
    initial={[{
      targets:`#me_${mySelf.current}`,
      height:'50px',
      easing:'spring',
      duration:500
    }]}
    >
    </Anime>  )
}
const SuperDiv= ({children}) =>{
  const random = (x) =>  {return Math.random() * x}
  const animation = [{
    targets:'.atomic',
    color: '#d3d',
    easing: 'easeInOutSine',
    delay:stagger(50)
  }]
  const scatter =[{
    targets:'.atomic',
    translateX: ()=>{return random(10)},
    translateY:() => {return random(10)},
    scale:1.2,
    rotate: ()=> {return random(60)},
    loop:2,
    direction:'alternate',
    easing:'easeInOutSine',
    duration:810
  }]

  return(
  <Anime
  style={{fontSize:'4em',color:'#d3d3d3'}}
  explode='characters'
  explodeOptions={{name:'atomic'}}
  id="self"
  _onUpdate = {animation}
  _onClick = {scatter}

  >
  {children}</Anime>  
  )
}

const Ghost = ({children})=>{
  const prev = useRef([])
  let style = Object.assign({position:'absolute',zIndex:-1,top:0},children.props.style)
  style.left = 0
   let history = prev.current
   history.push(React.cloneElement(children,{id:'Ghost',style}))
   let ghost = history[0]
   if(history.length > 1) history.splice(0,1)
   return(
     ghost || {}
   )
}


const OnUnmountAnime = ({children,count}) =>{
  
  const animation = [
    {
    targets:'#BoxSlide',
    translateX:-100,
    duration:0
  },
  {
    targets:'#BoxSlide',
    translateX:100,
    easing:'easeInOutSine',
    duration:1000
  }]


  const unmountAnimation =[{
    targets:'#Ghost',
    translateX:100,
    duration:0
  },
  {
    targets:'#Ghost',
    translateX:0,
    opacity:0,
    easing:'easeInOutSine',
    duration:1000
  },
  {
    targets:'#Ghost',
    zIndex:-1,
    opacity:1,
    duration:0,
    delay:1000
  }
]

  return(
  <Anime
  style={{fontSize:'2em',color:'#d3d3d3'}}
  id="self"
  initial={[{targets:'#BoxSlide', translateX:-100}]}
  _onUpdate = {animation}
  _onUnmount = {unmountAnimation}

  >
  {children}<Ghost>{children}</Ghost></Anime>  
  )
}

const OnUnmountDemo = ()=>{
  let [count,setCount] = useState(0)
  const handleClick = (method)=>{
    method === 'inc' ? setCount(count+1) : setCount(count-1) 
  }

  return (<div style={{position:'relative'}}>
    <OnUnmountAnime count={count}>
      <div id='BoxSlide' style={{textAlign:'center',left:0,height:50, width:50, background:'#d3d'}}>{count}</div>
    </OnUnmountAnime>
  <div style={{position:'absolute',top:55,left:95}}>
  <div className='button' onClick={()=> handleClick('dec')}>-</div>
  <div className='button' onClick={()=> handleClick('inc')}>+</div>
  </div>
  
</div>)
}

const InteractiveDemo = ()=>{
  const [text,setText] = useState('Type Here')
  const HandleInput = (e)=>{
    setText(e.currentTarget.value)
}

  return (<div>
  <input value={text} onChange={HandleInput} />
    <SuperDiv>{text}</SuperDiv>
</div>
)
}


const ControlledDemo = () =>{
  const [control, setControl] = useState(null)
  const [meta, setMeta] = useState({
    control:control,
    progress: 0,
    currentTime: 0,
    duration: 0
})
  return (
  <div>
                      <Anime 
                      control={control}     
                      setMeta={setMeta}                 
                      animeConfig={{
                      autoplay:false,
                      duration: 1500,
                      easing: 'easeInOutSine'
                        }}
                      initial={
                          [
                           
                            {
                              targets: '.tl_square',
                              translateX: 250,
                            },
                            {
                              targets: '.tl_circle',
                              translateX: 250,
                            },
                            {
                              targets: '.tl_triangle',
                              translateX: 250,
                            }
                          ]
                          
                      }>
                        <div className="tl_square" style={{ height: 50,  width:50, background:'#d3f454'}}  ></div>
                        <div className="tl_circle" style={{ height: 50, width:50, background:'#d3f454', borderRadius: '50%'}}></div>
                        <div className="tl_triangle" style={{height: 50,  width:50, background:'#d3f454', clipPath: 'polygon(50% 0, 0 100%, 100% 100%)'}}></div>
                      </Anime>
                      <div className='button' onClick={()=>{setControl('play')}}>Play</div><div  className='button' onClick={()=>{setControl('pause')}}>Pause</div><div  className='button' onClick={()=>{setControl('restart')}}>Restart</div>
                      <input type="range" min="1" max="100" value={meta.progress || 0} className="slider" id="myRange" onChange={(e)=>console.log(setControl(['seek',e.currentTarget.value]))}></input>
                      
                
 </div>
  )
}

  storiesOf('Anime', module)
    .add('Anime Basic', ()=> (
                            <Anime initial={
                              [
                                {
                                  targets: '#Box',
                                  translateX: 50,
                                  easing: 'linear'
                              }
                              ]
                            }
                        >
                            <Box/>
                          </Anime>                          

                          ) )

    .add('Keyframe', ()=> (
                              <Anime 
                             
                              initial={
                                  [
                                    {
                                      targets: '#Box',
                                      keyframes:[
                                        { 
                                          translateX: 50,
                                        },
                                        { 
                                          translateY: 50,
                                        },
                                        { 
                                          translateX: 0,                                          
                                        },
                                        { 
                                          translateY: 0,                                         
                                        }
                                      ],
                                      // easing:'spring',
                                      duration: 3500,                                          
                                      loop:true                                     
                                  } 
                                  ]
                              }>
                                <Box/>
                              </Anime>

                          ) )
    .add('Keyframe Properties', ()=> (
                              <Anime 
                             
                              initial={
                                  [
                                    {
                                      targets: '#circle',
                                      translateX: [
                                        { value: 250, duration: 1000, delay: 500 },
                                        { value: 0, duration: 1000, delay: 500 }
                                      ],
                                      translateY: [
                                        { value: 0, duration: 500 },
                                        { value: 80, duration: 500, delay: 1000 },
                                        { value: 40, duration: 500, delay: 1000 }
                                      ],
                                      scaleX: [
                                        { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                                        { value: 1, duration: 900 },
                                        { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                                        { value: 1, duration: 900 }
                                      ],
                                      scaleY: [
                                        { value: [1.75, 1], duration: 500 },
                                        { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                                        { value: 1, duration: 450 },
                                        { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                                        { value: 1, duration: 450 }
                                      ],
                                      easing: 'easeOutElastic(1, .8)',
                                      loop: true                    
                                  } 
                                  ]
                              }>
                              <div id="circle"  style={{ height: 50, width:50, background:'#d3d', borderRadius: '50%'}}></div>

                              </Anime>

                          ) )
                          .add('Staggered', ()=> (
                            <Anime 
                            style={{width:300, background:'#d4d4d4'}}
                            _onMouseEnter={[{
                              targets: '#Box',
                              backgroundColor:`rgba(255,0,22,0.5)`,
                              translateX: 100,
                              easing: 'spring',
                              delay:stagger(80)
                            }]}
                            _onMouseLeave={[{
                              targets: '#Box',
                              backgroundColor:'#d3d',
                              translateX: 0,
                              easing: 'spring',
                              delay:stagger(80)
                            }]}
                           
                            
                            >
                              <Box
                             
                              /> <Box/> <Box/> <Box/> <Box/> <Box/> <Box/> <Box/> <Box/> <Box/>
                            </Anime>
                    
                        ) )
storiesOf('Timeline', module)
 .add('AutoPlay', ()=> (
                              <Anime 
                             
                              initial={
                                  [
                                    {
                                      targets: '.tl_square',
                                      translateX: 250,
                                    },
                                    {
                                      targets: '.tl_circle',
                                      translateX: 250,
                                    },
                                    {
                                      targets: '.tl_triangle',
                                      translateX: 250,
                                    }
                                  ]
                              }>
                                <div className="tl_square" style={{ height: 50,  width:50, background:'#d3d'}}  ></div>
                                <div className="tl_circle" style={{ height: 50, width:50, background:'#d3d', borderRadius: '50%'}}></div>
                                <div className="tl_triangle" style={{height: 50,  width:50, background:'#d3d', clipPath: 'polygon(50% 0, 0 100%, 100% 100%)'}}></div>
                              </Anime>

                          ) )
      .add('Controlled', ()=> ( <ControlledDemo/> ) )
     
 storiesOf('Events', module)
    .add('on Click', ()=> (
                              <Anime _onClick={[{
                                targets: '#Box',
                                translateX: 100,
                                easing: 'linear'
                              }
                              
                             ]}>
                                <Box/>
                              </Anime>

                          )
          )


    .add('on MouseEnter', ()=> (
                              <Anime 
                               style={{width:100}}
                              _onMouseEnter={[{
                                targets: '#Box',
                                backgroundColor:`rgba(255,0,22,0.5)`,
                                easing: 'linear'
                              }]
                            }

                            _onMouseLeave={[{
                              targets: '#Box',
                              backgroundColor:'#d3d',
                              easing: 'linear'
                            }
                           ]}
                              >
                                <Box/>
                              </Anime>

                          ) )
.add('On Unmount', ()=>(<OnUnmountDemo/>)  )

storiesOf('Target', module)
  .add('Self', ()=>(
     <Self/>
  ) )
  .add('Children', ()=>(
    <Anime
    type= 'div'
    initial={[{
      targets:'.children',
      height:'50px',
      easing:'spring',
      duration:500
    }]}
    >
    <div className='children'>Children 1</div>
    <div className='children'>Children 2</div>
    <div className='children'>Children 3</div>

    </Anime>  
  ) )
  .add('External', ()=>(
    <div>
      <Anime
      type= 'div'
      initial={[{
        targets:'.external',
        fontSize:'40px',
        easing:'spring',
        duration:500
      }]}
      >
      <div className='children'>Children 1</div>
      <div className='children'>Children 2</div>
      <div className='children'>Children 3</div>
      </Anime>  
      <div className='external'>Outside Component</div>
    </div>
    
  ) )

  storiesOf('Characters', module)
  .add('Explode Characters', ()=>(
    <Anime
     type= 'p'
     explode='characters'
     explodeOptions={{name:'atomic'}}
     id="self"
     _onClick={[{
       targets:'.atomic',
       fontSize:'+=22px',
       delay:stagger(100)
     }]}
     _onContextMenu={[{
      targets:'.atomic',
      fontSize:'-=22px',
      delay:stagger(100)
    }]}
     >
     Create animation letter by letter. Go on click and right-click this to see it in action!</Anime>  
  ) )
  
  
  .add('Explode Words', ()=>(
    <Anime
     type= 'p'
     explode='words'
     explodeOptions={{name:'atomic'}}
     id="self"
     _onClick={[{
       targets:'.atomic',
       fontSize:'+=22px',
       delay:stagger(100)
     }]}
     _onContextMenu={[{
      targets:'.atomic',
      fontSize:'-=22px',
      delay:stagger(100)
    }]}
     >
     Create animation word by word. Go on click and right-click this to see it in action!</Anime>  
  ) )
  
  .add('Another fun demo', ()=>(
    <Anime
     type= 'p'
     style={{fontSize:'2em'}}
     explode='characters'
     explodeOptions={{name:'atomic'}}
     id="self"
     _onMouseEnter={[{
       targets:'.atomic',
       color: '#d3d',
       direction:'alternate',
      easing: 'easeInOutSine',
       delay:stagger(50)
     }]}
    
     >
     Coloring each character one at a time. Hover on me</Anime>  
  ) )

  storiesOf('Components', module)
  .add('Button', ()=>(
    <React.Fragment>
      <Anime
      type= 'button'
      id="self" 
      onClick= {()=>{console.log('clicked')}}
      style={{position:'absolute',width:50,height:80,background:'#d5d5d5'}}
      initial={[{
        targets:'#self',
        height:'150px',
        width:'150px',
        translateX: 100,
        translateY: 300,
        easing:'spring'
      }]}
      _onClick= {
        [{
          targets:'#self',
          scale:0.5,
          easing: 'easeInOutSine',
          duration:2000,
        }]
      }
      _onMouseEnter={[{
        targets:'#self',
        background:'#d3d',
        easing: 'easeInOutSine',
        direction:'alternate',
        duration:2000,
      }]}
      _onMouseLeave={[{
        targets:'#self',
        background:'#d5d5d5',
        easing: 'easeInOutSine',
        duration:2000,
      }]}
      >
      Default Button</Anime>  
      <button
        onClick= {()=>{console.log('clicked')}}
      > No super Powers</button>
     </React.Fragment>
  ) )

  storiesOf('Interactive', module)
  .add('User Input', ()=>(<InteractiveDemo/>)  )
