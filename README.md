# React  Context Menu
A Context Menu made with ReactJS
# Table of contents
- [Installation](#installation)
- [Usage](#usage)
# Installation
using npm
```
npm install --save context-menu-reactjs
```
using yarn
```
yarn add context-menu-reactjs
```
# Usage
Simple Example
```javascript
import React from 'react';
import {ContextMenuManager, ContextMenuWorker} from 'context-menu-reactjs';

class App extends React.Component {
    renderMainContextMenu() {
        return (
            <div>
                <div>Setting 1</div>
                <div>Setting 2</div>
                <div>Setting 3</div>
            </div>
        );
    }

    renderSubContextMenu() {
        return (
            <div>
                <div>Setting 1</div>
                <div>Setting 2</div>
                <div>Setting 3</div>
                <div>Setting 4</div>
                <div>Setting 5</div>
            </div>
        );
    }

    render() {
        return (
            <ContextMenuManager>
                <ContextMenuWorker
                    contextMenu={this.renderMainContextMenu()}
                    contextMenuStyle={{width: 300, height: 300}}
                >
                    <div style={{height: 500, border: "1px solid red"}}>
                        Hello World
                    </div>
                    <ContextMenuWorker
                        contextMenu={this.renderSubContextMenu()}
                    >
                        <div>
                            Math World
                        </div>
                    </ContextMenuWorker>
                </ContextMenuWorker>
                default context manager
            </ContextMenuManager>
        );
    }
}

export default App;

```
