/**
 * Created by candice on 17/3/29.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import styles from '../sass/Layout.scss'

class Layout extends Component {
    render() {
        const {className, hasSider, children, ...others} = this.props;
        const cls = classNames(className, styles.layout, {[styles.layoutHasSider]: hasSider});
        return (
            <div className={cls} {...others}>{children}</div>
        )
    }


}

export default Layout