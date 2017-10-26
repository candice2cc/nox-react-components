/**
 * Created by candice on 17/3/29.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import styles from '../sass/Header.scss'

class Header extends Component {

    render() {
        const {className, children, ...others} = this.props;

        const cls = classNames(className, styles.header);
        return (
            <div className={cls} {...others}>{children}</div>
        )
    }


}

export default Header