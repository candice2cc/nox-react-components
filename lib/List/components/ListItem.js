/**
 * Created by candice on 17/3/30.
 */
import React, {Component, PropTypes, Children} from 'react';
import classNames from 'classnames'

import NestedList from './NestedList'

import styles from '../sass/ListItem.scss'

class ListItem extends Component {
    static propTypes = {
        /**
         * ListItem的children
         */
        children: PropTypes.node,

        /**
         * 该属性自动计算
         */
        nestedLevel: PropTypes.number,

        nestedItems: PropTypes.arrayOf(PropTypes.element),

        /**
         * 控制nested list的toggle状态
         */
        open: PropTypes.bool,


        /**
         * 通过className覆盖默认样式,root容器
         */
        className: PropTypes.string,
        /**
         * item容器
         */
        itemWrapperClassName: PropTypes.string,


        nestedListClassName: PropTypes.string,

        /**
         * If true, clicking or tapping the primary text of the `ListItem`
         * toggles the nested list.
         */
        primaryTogglesNestedList: PropTypes.bool,

        onNestedListToggle: PropTypes.func,
        onTouchTap: PropTypes.func,

    };

    static defaultProps = {
        nestedLevel: 0,
        nestedItems: [],
        primaryTogglesNestedList: false,
        onNestedListToggle: ()=> {
        },
        onTouchTap: ()=> {
        },
        open: false
    };


    state = {
        open: false,
    };

    componentWillMount() {
        this.setState({
            open: this.props.open
        })
    }

    componentWillReceiveProps(nextProps) {
        // update the state when the component is controlled.
        this.setState({open: nextProps.open});
    }

    handleNestedListToggle = (event) => {
        this.setState({open: !this.state.open}, () => {
            this.props.onNestedListToggle();
        });
    };

    handleTouchTap = (event) => {
        event.stopPropagation();
        if (this.props.primaryTogglesNestedList) {
            this.handleNestedListToggle(event)
        } else {
            this.props.onTouchTap(event);
        }
    };


    render() {
        const {children, nestedLevel, nestedItems, className, itemWrapperClassName, nestedListClassName, primaryTogglesNestedList, onTouchTap, onNestedListToggle, ...other} = this.props;
        const cls = classNames(className, styles.listItem);
        const itemWrapperCls = classNames(itemWrapperClassName, styles.itemWrapper);
        const nestedList = nestedItems.length ?
            <NestedList nestedLevel={nestedLevel} open={this.state.open} className={nestedListClassName}>
                {nestedItems}
            </NestedList> : undefined;
        let rightIconButtonElement;
        const hasNextListItems = nestedItems.length;
        if (hasNextListItems) {
            rightIconButtonElement = this.state.open ? <span className="icon-arrow-up"/> :
                <span className="icon-arrow-down"/>;
        }

        let innerDivStyle = {
            marginLeft: nestedLevel * 16 + 'px'
        };


        return (
            <div className={cls} {...other}>
                <div className={itemWrapperCls} style={innerDivStyle}
                     onTouchTap={this.handleTouchTap}>{children}{rightIconButtonElement}</div>
                {nestedList}
            </div>
        )

    }
}
export default ListItem