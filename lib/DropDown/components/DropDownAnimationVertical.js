/**
 * Created by candice on 17/4/11.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames'

import propTypes from '../../utils/propTypes';

import styles from '../sass/DropDownAnimationVertical.scss'


class DropDownAnimationVertical extends Component {
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

        let rootCls;
        if (open) {
            rootCls = classNames(className, styles.dropDownAnimation, styles.open);
        } else {
            rootCls = classNames(className, styles.dropDownAnimation);
        }


        return (
            <div
                className={rootCls} style={rootStyle}
            >
                {children}
            </div>
        );
    }
}

export default DropDownAnimationVertical;