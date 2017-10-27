/**
 * Created by candice on 17/4/6.
 */
export default{
    isDescendant(parent, child){
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) return true;
            node = node.parentNode;
        }
        return false;
    }
}