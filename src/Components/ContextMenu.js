import React from 'react';
import PropTypes from 'prop-types';
import OutsideAlerter from './OutsideAlerter';

export class ContextMenuManager extends React.Component {
    static childContextTypes = {
        changeContextMenu: PropTypes.func,
    };

    state = {
        event: null,
        contextMenu: null,
        contextMenuReference: null,
        contextMenuClassName: null,
        contextMenuStyle: null,
    };

    contextMenuUpdated = false;

    changeContextMenu = ({event, contextMenu, contextMenuClassName, contextMenuStyle}) => {
        this.setState({
            event,
            contextMenu,
            contextMenuClassName,
            contextMenuStyle,
        });
    };

    changeContextMenuPosition = () => {
        if (this.state.event && this.state.contextMenuReference && !this.contextMenuUpdated) {
            let cm = this.state.contextMenuReference;
            let {top, left} = this.state.event;
            if (top + cm.clientHeight > window.innerHeight) {
                top = top - cm.clientHeight;
            }
            if (left + cm.clientWidth > window.innerWidth) {
                left = window.innerWidth - cm.clientWidth;
            }
            let event = {...this.state.event, top, left};
            this.setState({
                event,
            });
            this.contextMenuUpdated = true;
        } else if (!this.state.event || !this.state.contextMenuReference) {
            this.contextMenuUpdated = false;
        }
    };

    componentDidUpdate() {
        this.changeContextMenuPosition();
    }

    getChildContext() {
        return {
            changeContextMenu: this.changeContextMenu,
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
                {
                    this.state.event &&
                    <ContextMenu
                        reference={(cm) => {
                            this.setState({
                                contextMenuReference: cm,
                            });
                        }}
                        event={this.state.event}
                        contextMenu={this.state.contextMenu}
                        clearContext={() => {
                            this.changeContextMenu({
                                event: null,
                                contextMenu: null,
                                contextMenuClassName: null,
                                contextMenuStyle: null,
                            });
                        }}
                        contextMenuStyle={this.state.contextMenuStyle}
                        contextMenuClassName={this.state.contextMenuClassName}
                    />
                }
            </div>
        );
    }
}

export class ContextMenuWorker extends React.Component {
    static contextTypes = {
        changeContextMenu: PropTypes.func,
    };

    setWrapperRef = (node) => {
        this.worker = node;
    };

    contextRenderer = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let {clientX, clientY} = event;
        this.context.changeContextMenu({
            event: {left: clientX, top: clientY},
            contextMenu: this.props.contextMenu,
            contextMenuStyle: this.props.contextMenuStyle,
            contextMenuClassName: this.props.contextMenuClassName,
        });
    };

    componentDidMount() {
        this.worker.addEventListener("contextmenu", this.contextRenderer);
    }

    componentWillUnmount() {
        this.worker.removeEventListener("contextmenu", this.contextRenderer);
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className={this.props.className}
                style={this.props.style}
            >
                {this.props.children}
            </div>
        );
    }
}

export class ContextMenu extends React.Component {
    static defaultProps = {
        contextMenu: "This is default Context Menu"
    };

    defaultContextMenuStyle = {
        color: "white",
        background: "black",
        top: 0,
        left: 0,
        padding: 5,
        borderRadius: 5,
    };

    setWrapperRef = (node) => {
        this.menu = node;
        this.props.reference(this.menu);
    };

    // componentDidUpdate() {
    //     console.log(this.menu.offsetWidth, this.menu.offsetHeight);
    // }

    render() {
        let {left, top} = this.props.event;
        return (
            <OutsideAlerter onOutsideClick={() => {
                this.props.clearContext();
            }}>
                <div
                    ref={this.setWrapperRef}
                    className={this.props.contextMenuClassName}
                    style={{
                        ...this.defaultContextMenuStyle, ...this.props.contextMenuStyle,
                        top,
                        left,
                        position: "absolute",
                    }}
                    onContextMenu={(event) => {
                        event.preventDefault();
                    }}
                >
                    {this.props.contextMenu}
                </div>
            </OutsideAlerter>
        );
    }
}

export default {
    ContextMenuManager,
    ContextMenu,
    ContextMenuWorker
}
