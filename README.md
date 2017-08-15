# todo

## 创建项目
```bash
create-react-app todo --scripts-version=react-scripts-ts
```
> https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter

## React Helmet
> 修改document head  
  [github](https://github.com/nfl/react-helmet)

``` jsx
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.PureComponent {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```

## prettier
> 格式化代码，自动修改代码，commit前修改
  [github](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically)

## storybook
> UI组件调试开发
  [github](https://github.com/storybooks/storybook)
  [文档](https://storybook.js.org/basics/introduction/)

## React.PureComponent
```jsx

class MyComponent extends React.PureComponent {
  // ...
}
```