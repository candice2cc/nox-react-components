/**
 * Sider暂时不支持响应式
 * Created by candice on 17/3/29.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import styles from '../sass/Sider.scss'

class Sider extends Component {
    render() {
        const {className, children, ...others} = this.props;

        const cls = classNames(className, styles.sider);
        return (
            <div className={cls} {...others}>{children}

            </div>
        )
    }


}

export default Sider