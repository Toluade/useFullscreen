# useFullscreen

A React hook that allows toggling between fullscreen mode and normal mode in a web application. The useFullscreen hook returns an object containing the following:

- toggleFullscreen
- exitFullscreen
- isFullscreen

> _Note: When screen lock is supported, the screen stays awake when in fullscreen mode._

### Props

- `containerId: string`
  - This is the `id` of the element you want to set as fullscreen. Please note that the `containerId` is required.

## toggleFullscreen

```js
const { toggleFullscreen } = useFullscreen(containerId);
```

- `toggleFullscreen(e: MouseEvent | null) => void`
  - This function toggles the element whose `id` is passed to the `useFullscreen` hook between fullscreen mode and normal mode.

## exitFullscreen

```js
const { exitFullscreen } = useFullscreen(containerId);
```

- `exitFullscreen() => void`
  - This function exits fullscreen mode.

## isFullscreen

```js
const { isFullscreen } = useFullscreen(containerId);
```

- `isFullscreen: boolean`
  - Returns `true` when in fullscreen mode and `false` when in normal mode

## Install

npm

```sh npm
npm i @toluade/use-fullscreen --save
```

yarn

```sh yarn
yarn add @toluade/use-fullscreen
```

## Example Usage

```js
import useFullScreen from "use-fullscreen";

const containerId = "container";

function App() {
  const { toggleFullScreen, isFullScreen, exitFullscreen } =
    useFullScreen(containerId);

  return (
    <div id={containerId}>
      <button onClick={toggleFullScreen}>Toggle Fullscreen</button>
      {isFullScreen ? <p>Fullscreen mode</p> : <p>Normal mode</p>}
      <button onClick={exitFullscreen}>Exit Fullscreen</button>
    </div>
  );
}
```

```js
import useFullScreen from "use-fullscreen";

const containerId = "container";

function App() {
  const { toggleFullScreen, isFullScreen, exitFullscreen } =
    useFullScreen(containerId);

  return (
    <div id={containerId} onDoubleClick={(e) => toggleFullscreen(e)}>
      <p>{isFullscreen ? "Fullscreen Mode" : "Normal mode"}</p>
    </div>
  );
}
```

### Props

| Prop        | Description                                    | Type   |
| ----------- | ---------------------------------------------- | ------ |
| containerId | The id of the element to be set to fullscreen. | string |
