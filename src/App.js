import React from 'react';
import './Assets/css/App.css';

import {ContextMenuManager, ContextMenuWorker} from './Components/ContextMenu';

class App extends React.Component {
    render() {
        return (
            <ContextMenuManager>
                <ContextMenuWorker
                    contextMenuClassName="context-menu"
                    contextMenuStyle={{height: 300, width: 300}}
                >
                    <div style={{height: 500, border: "1px solid red"}}>
                        Hello World
                    </div>
                    <ContextMenuWorker
                        contextMenu={"sub-context-menu"}
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
