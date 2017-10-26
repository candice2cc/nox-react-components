/**
 * Created by candice on 17/4/6.
 */
import React, {Component, PropTypes, Children} from 'react';
import classNames from 'classnames'

import {List} from '../../List'

import styles from '../sass/Menu.scss'

class MenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        menuItemCls: PropTypes.string,
        itemWrapperClassName: PropTypes.string,
        selectedMenuItemCls: PropTypes.string,
        onChange: PropTypes.func,
        onItemTouchTap: PropTypes.func,
        value: PropTypes.any,
        multiple: PropTypes.bool,

    };

    static defaultProps = {
        multiple: false,
        onChange: () => {
        },
        onItemTouchTap: () => {
        },
    };

    extendChild(child, index) {
        this.keyIndex += 1;
        const selected = this.isChildSelected(child, this.props);
        let mergedChildrenCls, checkIcon;
        if (selected) {
            mergedChildrenCls = classNames(this.props.selectedMenuItemCls, this.props.menuItemCls, child.props.className);
        } else {
            mergedChildrenCls = classNames(this.props.menuItemCls, child.props.className);
        }

        if (this.props.multiple) {
            if (selected) {
                checkIcon = <span className="icon-checked"/>
            } else {
                checkIcon = <span className="icon-check"/>
            }
        }

        return React.cloneElement(child, {
            onTouchTap: (event)=> {
                this.handleMenuItemTouchTap(event, child, index);
                if (child.props.onTouchTap) {
                    child.props.onTouchTap(event);
                }

            },
            className: mergedChildrenCls,
            key: this.keyIndex,
            checkIcon: checkIcon,
            itemWrapperClassName: classNames(this.props.itemWrapperClassName, child.props.itemWrapperClassName)
        });

    }

    isChildSelected(child, props) {
        const menuValue = this.props.value;
        const childValue = child.props.value;
        if (props.multiple) {
            return menuValue.length && menuValue.indexOf(childValue) !== -1;
        } else {
            return child.props.hasOwnProperty('value') && menuValue === childValue;
        }
    }

    handleMenuItemTouchTap = (event, child, index)=> {
        const {multiple} = this.props;

        const menuValue = this.props.value;
        const childValue = child.props.value;

        if (multiple) {
            const itemIndex = menuValue.indexOf(childValue);
            const [...newMenuValue] = menuValue;

            if (itemIndex === -1) {
                newMenuValue.push(childValue);
            } else {
                newMenuValue.splice(itemIndex, 1);
            }

            this.props.onChange(event, newMenuValue);

        } else if (!multiple && menuValue !== childValue) {
            this.props.onChange(event, childValue);
        }

        this.props.onItemTouchTap(event, child, index);
    };

    render() {
        const {children, className} = this.props;
        const cls = classNames(className, styles.menu);
        this.keyIndex = 0;


        return (
            <List className={cls}>
                {children.map((child, index)=> {
                    return this.extendChild(child, index);
                })}
            </List>
        )
    }


}
export default MenuItem