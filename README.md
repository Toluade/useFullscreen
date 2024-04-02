# useFullscreen

A React hook that allows toggling between fullscreen mode and normal mode in a web application. The useFullscreen hook returns an object containing the following:

- toggleFullscreen
- exitFullscreen
- isFullscreen

When screen lock is supported, the screen stays awake when in fullscreen mode.

## Install

```sh
yarn add @toluade/use-fullscreen
# or
npm i @toluade/use-fullscreen --save
```

## Example Usage

```js
import useFullScreen from "use-fullscreen";

const container_id = "container";

function App() {
  const { toggleFullScreen, isFullScreen, exitFullscreen } =
    useFullScreen(container_id);

  return (
    <div id={container_id}>
      <button onClick={toggleFullScreen}>Toggle Fullscreen</button>
      {isFullScreen ? <p>Fullscreen mode</p> : <p>Normal mode</p>}
      <button onClick={exitFullscreen}>Exit Fullscreen</button>
    </div>
  );
}
```

```js
import useFullScreen from "use-fullscreen";

const container_id = "container";

function App() {
  const { toggleFullScreen, isFullScreen, exitFullscreen } =
    useFullScreen(container_id);

  return (
    <div id={container_id} onDoubleClick={(e) => toggleFullscreen(e)}>
      <p>{isFullscreen ? "Fullscreen Mode" : "Normal mode"}</p>
    </div>
  );
}
```

### Props

| Prop        | Description                                    | Type   |
| ----------- | ---------------------------------------------- | ------ |
| containerId | The id of the element to be set to fullscreen. | string |
