# JM's react-animejs Component

A React animation library for creating amazing React App.

[JM's react-animejs](docs/assets/react-animejs-hero-demo.gif "JM's react-animejs")

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
React 16.8 and above
```

### Installing

On your React project directory run

Say what the step will be

```
npm i react-animejs
```

or

```
yarn add react-animejs
```

## Usage

- Import ReactAnime

```
import ReactAnime from 'react-animejs'
const {Anime, stagger} = ReactAnime
```

- Basic Usage

```
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
            <div id ='Box' style={{height:50, width:50, background:'#d3d'}}></div>
  </Anime>
```

- Working with Keyframe

```
<Anime
      initial={[
        {
          targets: "#Box",
          keyframes: [
            {
              translateX: 50
            },
            {
              translateY: 50
            },
            {
              translateX: 0
            },
            {
              translateY: 0
            }
          ],
          // easing:'spring',
          duration: 3500,
          loop: true
        }
      ]}
    >
      <Box />
</Anime>
```

- Working with timeline

```
<Anime
      initial={[
        { //1st segment
          targets: ".tl_square",
          translateX: 250
        },
        { //2nd
          targets: ".tl_circle",
          translateX: 250
        },
        { //3rd
          targets: ".tl_triangle",
          translateX: 250
        }
      ]}
    >

```

- With Controller Scrubber

[JM's react-animejs](docs/assets/react-animejs-scrubber-demo.gif "JM's react-animejs")

important: use `setMeta` to `<Anime>` compontent like `<Anime setMeta={setMea} ...`

```
const ControlledDemo = () => {
  const [control, setControl] = useState(null); //controller state

  const [meta, setMeta] = useState({ //meta state of the player
    control: control,
    progress: 0,
    currentTime: 0,
    duration: 0
  });

  return (
    <div>
      <Anime
        control={control}
        setMeta={setMeta} // important to pull state of the player
        animeConfig={{
          autoplay: false,
          duration: 1500,
          easing: "easeInOutSine"
        }}
        initial={[
          {
            targets: ".tl_square",
            translateX: 250
          },
          {
            targets: ".tl_circle",
            translateX: 250
          },
          {
            targets: ".tl_triangle",
            translateX: 250
          }
        ]}
      >
        <div className="tl_square" style={{ height: 50, width: 50, background: "#d3f454" }}></div>
        <div
          className="tl_circle"
          style={{ height: 50, width: 50, background: "#d3f454", borderRadius: "50%" }}
        ></div>
        <div
          className="tl_triangle"
          style={{
            height: 50,
            width: 50,
            background: "#d3f454",
            clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
          }}
        ></div>
      </Anime>
      <div
        className="button"
        onClick={() => {
          setControl("play");
        }}
      >
        Play
      </div>
      <div
        className="button"
        onClick={() => {
          setControl("pause");
        }}
      >
        Pause
      </div>
      <div
        className="button"
        onClick={() => {
          setControl("restart");
        }}
      >
        Restart
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={meta.progress || 0}
        className="slider"
        id="myRange"
        onChange={e => console.log(setControl(["seek", e.currentTarget.value]))}
      ></input>
    </div>
  );
};


```

- Events
  remember to place `_` in front of event like `_onClick` to call anime on click event

```
 <Anime
      style={{ width: 100 }}
      _onMouseEnter={[
        {
          targets: "#Box",
          backgroundColor: `rgba(255,0,22,0.5)`,
          easing: "linear"
        }
      ]}
      _onMouseLeave={[
        {
          targets: "#Box",
          backgroundColor: "#d3d",
          easing: "linear"
        }
      ]}
    >
      <Box />
    </Anime>

```

- Component type
  by default Anime Components are `<div>` but you can declare the type for the component like `button`

```
<Anime
      type="button" // <------ Like this
      id="self"
      onClick={() => {
        console.log("clicked");
      }}
      style={{ position: "absolute", width: 50, height: 80, background: "#d5d5d5" }}
      initial={[
        {
          targets: "#self",
          height: "150px",
          width: "150px",
          translateX: 100,
          translateY: 300,
          easing: "spring"
        }
      ]}
      _onClick={[
        {
          targets: "#self",
          scale: 0.5,
          easing: "easeInOutSine",
          duration: 2000
        }
      ]}
      _onMouseEnter={[
        {
          targets: "#self",
          background: "#d3d",
          easing: "easeInOutSine",
          direction: "alternate",
          duration: 2000
        }
      ]}
      _onMouseLeave={[
        {
          targets: "#self",
          background: "#d5d5d5",
          easing: "easeInOutSine",
          duration: 2000
        }
      ]}
    >
      Default Button
    </Anime>

```

## Properties

| Property       | Description                                                       | Type                               | Optional |
| -------------- | ----------------------------------------------------------------- | ---------------------------------- | -------- |
| setMeta        | use this to pull in progress of the Anime Component               | state object                       | true     |
| iniital        | animation that will run on the initial rendering of the component | anime object                       | true     |
| \_onUpdate     | animation that will run on every update of the Anime Component    | anime object                       | true     |
| animeConfig    | configuration of the Anime of component                           | object                             | true     |
| explode        | chop the string into words or characters                          | string `'characters'` or `'words'` |          |
| explodeOptions | options for the exloded elements                                  | object `{{name:'atomic'}}`         |          |

## Currently supported events

|             |               |               |              |             |
| ----------- | ------------- | ------------- | ------------ | ----------- |
| onClick     | onContextMenu | onDoubleClick | onDrag       | onDragEnd   |
| onDragEnter | onDragExit    | onDragLeave   | onDragOver   | onDragStart |
| onDrop      | onMouseDown   | onMouseEnter  | onMouseLeave | onMouseMove |
| onMouseOut  | onMouseOver   | onMouseUp     |

## Contributing

- star this repo
- contribute to the code just `fork` and issue a `pull request`
- share to your fellow devs

## Authors

- **JM Disuanco** - _React-AnimeJS component_ - [JM Disuanco](https://jm.disuan.co)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Julian Garnier for his amazing AnimeJS library
