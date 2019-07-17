import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select  } from '@storybook/addon-knobs';
import ReactAnime from '../src/lib'
const {Anime, stagger} = ReactAnime

const Box = ()=>{
  return <div id ='Box' style={{height:50, width:50, background:'#d3d'}}></div>
}
  storiesOf('Anime', module)
    .add('Anime Basic', ()=> (
                              <Anime initial={[{
                                targets: '#Box',
                                translateX: 50,
                                easing: 'linear'
                              },
                             ]}>
                                <Box/>
                              </Anime>

                          ) )
    .add('Anime Timeline', ()=> (
                              <Anime 
                             
                              initial={[{
                                targets: '#Box',
                                translateX: 50,
                                easing: 'linear'
                              },
                              {
                                targets: '#Box',
                                translateX: 0,
                                easing: 'linear'
                              },
                             ]}>
                                <Box/>
                              </Anime>

                          ) )
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
.add('Self', ()=>(
  <Anime
   type= 'div'
   id="self" 
   style={{width:50,height:80,background:'blue'}}
   initial={[{
     targets:'#self',
     height:'50px',
     easing:'spring'
   }]}
   >
   Self</Anime>  
) )

.add('Button', ()=>(
  <Anime
   type= 'button'
   id="self" 
   style={{width:50,height:80,background:'blue'}}
   initial={[{
     targets:'#self',
     height:'50px',
     easing:'spring'
   }]}
   >
   Self</Anime>  
) )


.add('Explode Characters', ()=>(
  <Anime
   type= 'p'
   explode='characters'
   explodeOptions={{name:'atomic'}}
   id="self"
   _onClick={[{
     targets:'.atomic',
     fontSize:'+=22px',
     easing: 'spring',
     delay:stagger(100)
   }]}
   _onContextMenu={[{
    targets:'.atomic',
    fontSize:'-=22px',
    easing: 'spring',
    delay:stagger(100)
  }]}
   >
   This is a Sentence</Anime>  
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
     easing: 'spring',
     delay:stagger(100)
   }]}
   _onContextMenu={[{
    targets:'.atomic',
    fontSize:'-=22px',
    easing: 'spring',
    delay:stagger(100)
  }]}
   >
   This is a Sentence</Anime>  
) )

.add('Explode Fun', ()=>(
  <Anime
   type= 'p'
   style={{fontSize:'4em'}}
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
   This is a Sentence</Anime>  
) )