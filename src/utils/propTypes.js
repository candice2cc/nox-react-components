/**
 * Created by candice on 17/4/6.
 */
import {PropTypes} from 'react';

const horizontal = PropTypes.oneOf(['left', 'middle', 'right']);
const vertical = PropTypes.oneOf(['top', 'center', 'bottom']);

export default {
    horizontal: horizontal,
    vertical: vertical,
    origin: PropTypes.shape({
        horizontal: horizontal,
        vertical: vertical
    })
}