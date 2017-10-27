/**
 * Created by candice on 17/3/30.
 */
import React, {Component, Children, PropTypes} from 'react';
import classNames from 'classnames'

export const makeSelectable = (OriginComponent)=> {
    return class extends Component {
        static propTypes = {
            children: PropTypes.node,

            /**
             * 选择项发生变化时,回调
             */
            onChange: PropTypes.func,

            /**
             * 选中的选项的样式class
             */
            selectedItemClassName: PropTypes.string,
            neighborItemClassName: PropTypes.string,
            parentItemClassName: PropTypes.string,


            /**
             * 当前选择值
             */
            value: PropTypes.any,
        };

        extendChild(child, className, selectedItemClassName, neighborItemClassName, parentItemClassName, isCurrentLevelSelected) {
            this.keyIndex += 1;
            const selected = this.isChildSelected(child, this.props);


            //检查子节点是否有选中,同时递归树结构
            let nestedItems;
            let isInnerChildLevelSelected = false;
            if (isCurrentLevelSelected) {
                nestedItems = child.props.nestedItems;
            } else {
                isInnerChildLevelSelected = this.isChildLevelSelected(child.props.nestedItems, this.props);
                nestedItems = child.props.nestedItems.map((innerChild)=> {
                    return this.extendChild(innerChild, innerChild.props.className, selectedItemClassName, neighborItemClassName,
                        parentItemClassName, isInnerChildLevelSelected);
                })
            }

            //当该节点选中时,使用选中时的样式;
            //当兄弟节点选中时,使用选中兄弟时的样式
            //当孩子节点选中时,使用选中孩子时的样式
            let mergedChildrenCls;
            if (selected) {
                mergedChildrenCls = classNames(selectedItemClassName, className);
            } else if (isCurrentLevelSelected) {
                mergedChildrenCls = classNames(neighborItemClassName, className)
            } else if (isInnerChildLevelSelected) {
                mergedChildrenCls = classNames(parentItemClassName, className);
            } else {
                mergedChildrenCls = className;
            }


            return React.cloneElement(child, {
                //重新修改onTouchTap
                onTouchTap: (event)=> {
                    this.handleItemTouchTap(event, child);

                    if (child.props.onTouchTap) {
                        child.props.onTouchTap(event);
                    }
                },
                key: this.keyIndex,
                className: mergedChildrenCls,
                nestedItems: nestedItems,
                open: this.hasSelectedDescendant(false, child)
            });
        }

        isChildSelected(child, props) {
            return props.value === child.props.value;
        }

        isChildLevelSelected(children, props) {
            let isCurrentLevelSelected = false;
            Children.map(children, (child)=> {
                if (this.isChildSelected(child, props)) {
                    isCurrentLevelSelected = true;
                    return true;
                }
            });
            return isCurrentLevelSelected;
        }

        hasSelectedDescendant = (previousValue, child) => {
            //判断child是否有被选中的后代节点
            if (React.isValidElement(child) && child.props.nestedItems && child.props.nestedItems.length > 0) {
                return child.props.nestedItems.reduce(this.hasSelectedDescendant, previousValue);
            }
            return previousValue || this.isChildSelected(child, this.props);
        };

        handleItemTouchTap = (event, item)=> {
            const itemValue = item.props.value;
            if (itemValue !== this.props.value) {
                if (this.props.onChange) {
                    this.props.onChange(event, itemValue);
                }
            }
        };

        render() {
            this.keyIndex = 0;
            const {children, selectedItemClassName, neighborItemClassName, parentItemClassName, ...other} = this.props;


            return (
                <OriginComponent   {...other}>
                    {Children.map(children, (child)=> {
                        return this.extendChild(child, child.props.className, selectedItemClassName, neighborItemClassName, parentItemClassName, false)
                    })}
                </OriginComponent>
            )
        }

    }
};

export default makeSelectable;