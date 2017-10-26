/**
 * 选择列表,支持单选和多选
 * Created by candice on 17/4/6.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import {DropDown} from '../../DropDown'
import {Menu} from '../../Menu'


import styles from '../sass/Select.scss'

class Select extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        controlClassName: PropTypes.string,

        /**
         * 选择项发生变化时
         */
        onChange: PropTypes.func,


        /**
         * 点击选择(反选)全选项(仅适用多选时)
         */
        onSelectAll: PropTypes.func,

        /**
         * 应用选择项时(仅适用多选时)
         */
        onApply: PropTypes.func,

        /**
         * 选择取消时(仅适用多选时)
         */
        onCancel: PropTypes.func,

        /**
         * 点击背景关闭选择框
         */
        onRequestClose: PropTypes.func,

        /**
         * 选择框的值
         */
        value: PropTypes.any,

        /**
         * 是否全选
         */
        allSelected: PropTypes.bool,

        /**
         * value的显示文案内容(仅适用多选时)
         */
        multipleDisplayValue: PropTypes.string,

        /**
         * 是否支持多选
         */
        multiple: PropTypes.bool,

        /**
         * 错误提示文案(仅适用多选时)
         */
        errorText: PropTypes.string,

        /**
         * 提示文案(仅适用多选时)
         */
        hintText: PropTypes.string,

        /**
         * dropdown动画
         */
        animation: PropTypes.func,

        /**
         * 禁用态
         */
        disabled: PropTypes.bool,

        displayValueMap: PropTypes.func, //应对与displayValue展示与列表中的文案形式不一致的情况,如分页组件中的pageSize选择


    };


    state = {
        open: false,
        anchorEl: null
    };
    handleTouchTapControl = (event)=> {
        event.preventDefault();
        if (this.props.disabled) {

        } else {
            if (!this.state.open) {
                this.setState({
                    open: true,
                    anchorEl: event.currentTarget
                })
            }
        }


    };

    handleRequestClose = () => {
        this.setState({
            open: false,
            anchorEl: null
        }, ()=> {
            if (this.props.onRequestClose) {
                this.props.onRequestClose();
            }
        });
    };

    handleItemTouchTap = (event, child, index)=> {
        if (this.props.multiple) {

        } else {
            this.setState({
                open: false,
            })
        }


    };

    handleChange = (event, selectedValue)=> {
        if (this.props.onChange) {
            this.props.onChange(event, selectedValue);
        }

    };
    handleApply = (event)=> {
        if (this.props.onApply) {
            this.props.onApply(event);
        }
        setTimeout(()=> {
            if (!this.props.errorText) {
                this.setState({
                    open: false,
                    anchorEl: null
                });
            }
        }, 0);


    };

    handleCancel = (event)=> {
        this.setState({
            open: false,
            anchorEl: null
        });
        if (this.props.onCancel) {
            this.props.onCancel(event);
        }

    };

    handleSelectAll = (event)=> {
        if (this.props.onSelectAll) {
            this.props.onSelectAll(event);
        }
    };


    render() {
        const {children, multiple, multipleDisplayValue, value, allSelected, hintText, errorText, className, controlClassName, animation, displayValueMap} = this.props;
        const {open, anchorEl} = this.state;
        const cls = classNames(className, styles.select);
        const controlCls = open ? classNames(controlClassName, styles.control, styles.openedControl) : classNames(controlClassName, styles.control);
        const menuCls = multiple ? styles.multipleMenu : styles.singleMenu;


        let arrowIcon = open ? <span className="icon-arrow-up"/> :
            <span className="icon-arrow-down"/>;

        let displayValue = '';
        if (!multiple) {
            React.Children.forEach(children, (child) => {
                if (child && value === child.props.value) {
                    if (displayValueMap) {
                        displayValue = displayValueMap(value);
                    } else {
                        displayValue = child.props.children;
                    }
                    return;
                }
            });
        } else {
            displayValue = multipleDisplayValue;
        }
        let footer, footerText, footerTextCls, allCheckIcon;
        if (multiple) {
            if (allSelected) {
                allCheckIcon = <span className="icon-checked"/>
            } else {
                allCheckIcon = <span className="icon-check"/>
            }

            footerText = errorText || hintText;
            footerTextCls = errorText ? styles.error : styles.hint;

            footer =
                <div className={styles.footer}>

                    <span className={styles.checkAll} onTouchTap={this.handleSelectAll}>{allCheckIcon}全选</span>
                    <span className={footerTextCls}>{footerText}</span>
                    <button className={styles.btnApply} onTouchTap={this.handleApply}>筛选</button>
                    <span className={styles.sep}/>
                    <button className={styles.btnCancel} onTouchTap={this.handleCancel}>取消</button>

                    <span className="clearfix"/>
                </div>;
        }


        return (
            <div className={cls}>
                <div className={controlCls} onTouchTap={this.handleTouchTapControl}>
                    {displayValue}{arrowIcon}
                </div>
                <DropDown
                    animation={animation}
                    useLayerForClickAway={false}
                    className={styles.dropdown}
                    open={open}
                    anchorEl={anchorEl}
                    onRequestClose={this.handleRequestClose}>
                    <Menu
                        ref="menu"
                        className={menuCls}
                        menuItemCls={styles.menuItem}
                        itemWrapperClassName={styles.itemWrapper}
                        selectedMenuItemCls={styles.selectedMenuItem}
                        value={value}
                        onItemTouchTap={this.handleItemTouchTap}
                        onChange={this.handleChange}
                        multiple={multiple}
                    >
                        {children}
                    </Menu>
                    {footer}

                </DropDown>
            </div>
        )
    }


}

export default Select;