/**
 * Created by candice on 17/3/30.
 */
import React, {
    Children,
    PropTypes,
    isValidElement,
    cloneElement,
    Component
} from 'react';
import List from './List';

class NestedList extends Component {
    static propTypes = {
        children: PropTypes.node,
        nestedLevel: PropTypes.number.isRequired,
        open: PropTypes.bool.isRequired,
        className:PropTypes.string
    };

    render() {
        const {children, open, nestedLevel,className} = this.props;

        if (!open) {
            return null;
        } else {
            return (
                <List className={className}>
                    {Children.map(children, (child,index)=> {
                        return isValidElement(child) ? (
                            cloneElement(child, {nestedLevel: nestedLevel + 1})
                        ) : child
                    })}
                </List>
            )
        }


    }

}
export default NestedList;