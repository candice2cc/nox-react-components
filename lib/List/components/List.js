/**
 * Created by candice on 17/3/30.
 */
import React, {Component, PropTypes, Children} from 'react';
import classNames from 'classnames'

import styles from '../sass/List.scss'

class List extends Component {
    static propTypes = {
        /**
         * 一般是ListItem
         */
        children: PropTypes.node,
        /**
         * 通过className覆盖默认样式
         */
        className: PropTypes.string,
    };

    render() {
        const {children, className, ...other} = this.props;
        const cls = classNames(className, styles.list);

        return (
            <div className={cls} {...other}>{children}</div>
        )

    }
}
export default List;