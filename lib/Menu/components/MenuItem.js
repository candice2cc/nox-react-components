/**
 * Created by candice on 17/4/6.
 */
import React, {Component, PropTypes, Children} from 'react';
import classNames from 'classnames'

import {ListItem} from '../../List'

import styles from '../sass/MenuItem.scss'


class MenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        onTouchTap: PropTypes.func,
        value: PropTypes.any,
        checkIcon: PropTypes.node,
    };

    static defaultProps = {};

    render() {

        const {children, className, checkIcon, ...other} = this.props;
        const cls = classNames(className, styles.menuItem);

        return (
            <ListItem className={cls}   {...other}>
                {checkIcon}{children}
            </ListItem>
        )
    }


}
export default MenuItem