# react-sw-updater
> A react pwa updater based on sw-runtime.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-sw-updater
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-sw-updater/dist/style.css";

  // or use sass
  @import "~@jswork/react-sw-updater/dist/style.scss";
  ```
2. import js
  ```js
  import ReactSwUpdater from '@jswork/react-sw-updater';
  import '@jswork/react-sw-updater/dist/style.scss';

  function App() {
    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">
          Build Time: {BUILD_TIME}
        </div>
        <ReactSwUpdater
          onChange={({ execute }) => {
            const confirmed = confirm('New version available, do you want to update?');
            execute(confirmed);
          }}
        />
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-sw-updater/

## license
Code released under [the MIT license](https://github.com/afeiship/react-sw-updater/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-sw-updater
[version-url]: https://npmjs.org/package/@jswork/react-sw-updater

[license-image]: https://img.shields.io/npm/l/@jswork/react-sw-updater
[license-url]: https://github.com/afeiship/react-sw-updater/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-sw-updater
[size-url]: https://github.com/afeiship/react-sw-updater/blob/master/dist/react-sw-updater.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-sw-updater
[download-url]: https://www.npmjs.com/package/@jswork/react-sw-updater
