/**
 * Created by candice on 17/4/7.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames'

import propTypes from '../../utils/propTypes';

import styles from '../sass/DropDownAnimation.scss'


class DropDownAnimation extends Component {
    static propTypes = {
        children: PropTypes.node,
        /**
         * The css class name of the root element.
         */
        className: PropTypes.string,
        open: PropTypes.bool.isRequired,
        targetOrigin: propTypes.origin.isRequired,
    };

    static defaultProps = {};


    state = {
        open: false,
    };

    componentDidMount() {
        this.setState({open: true}); // eslint-disable-line react/no-did-mount-set-state
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
        });
    }

    render() {
        const {
            children,
            className,
            targetOrigin
        } = this.props;
        const {open} = this.state;


        const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');


        let rootStyle = {
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
        };
        let horizontalStyle = {
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,

        };
        let verticalStyle = {
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
        };

        let rootCls, horizontalCls, verticalCls;
        if (open) {
            rootCls = classNames(className, styles.dropDownAnimation, styles.open);
            horizontalCls = classNames(styles.horizontal, styles.open);
            verticalCls = classNames(styles.vertical, styles.open);
        } else {
            rootCls = classNames(className, styles.dropDownAnimation);
            horizontalCls = styles.horizontal;
            verticalCls = styles.vertical;
        }


        return (
            <div
                className={rootCls} style={rootStyle}
            >
                <div className={horizontalCls} style={horizontalStyle}>
                    <div className={verticalCls} style={verticalStyle}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default DropDownAnimation;
