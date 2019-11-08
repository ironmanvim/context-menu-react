import React from 'react';
import './Assets/css/App.css';

import {ContextMenuManager, ContextMenuWorker} from './Components/ContextMenu';

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
                <div style={{border: "1px solid blue"}}>
                    <ContextMenuWorker
                        contextMenu={this.renderMainContextMenu()}
                        contextMenuStyle={{width: 300, height: 300}}
                    >
                        <div style={{height: 500, border: "1px solid green"}}>
                            Hello World
                        </div>
                        <ContextMenuWorker
                            contextMenu={this.renderSubContextMenu()}
                        >
                            <div style={{border: "1px solid red"}}>
                                Math World
                            </div>
                        </ContextMenuWorker>
                    </ContextMenuWorker>
                    default context manager
                </div>
            </ContextMenuManager>
        );
    }
}

export default App;
