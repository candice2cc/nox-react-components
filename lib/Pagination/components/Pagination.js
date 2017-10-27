/**
 * Created by candice on 17/4/19.
 */
import React, {Component, PropTypes, Children} from 'react';
import classNames from 'classnames'

import {Select} from '../../Select'
import {MenuItem} from '../../Menu'


import styles from '../sass/Pagination.scss'

const PAGE_SIZE_ARRAY = [
    10, 20, 30, 40, 50, 100
];

class Pagination extends Component {
    static propTypes = {

        /**
         * 通过className覆盖默认样式
         */
        className: PropTypes.string,

        pageSize: PropTypes.number,
        pageNum: PropTypes.number,
        totalPage: PropTypes.number,

        onChangePageSize: PropTypes.func,
        onChangePageNum: PropTypes.func
    };

    static defaultProps = {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    };

    handleClickPage = (pageNum)=> {
        if (pageNum >= 1 && pageNum <= this.props.totalPage && this.props.onChangePageNum) {
            this.props.onChangePageNum(pageNum);
        }
    };


    render() {
        const {className, pageSize, pageNum, totalPage, onChangePageSize, onChangePageNum, ...other} = this.props;
        const cls = classNames(className, styles.root);

        const pageSizeNodes = PAGE_SIZE_ARRAY.map((item, index)=> {
            return ( <MenuItem value={item} key={index}>{item}条</MenuItem>);
        });

        let pageNodes = [], startP, endP;
        if (totalPage <= 5) {
            startP = 1;
            endP = totalPage;
        } else {
            startP = pageNum - 2;
            if (pageNum < 3) { //pageNum小于3时
                startP = 1;
            } else if (pageNum >= totalPage - 2) {  //pageNum大于(totalPage - 2)时
                startP = totalPage - 4;
            }

            endP = (startP + 4) > totalPage ? totalPage : startP + 4;
        }

        for (let p = startP; p <= endP; p++) {
            let pageCls = styles.page;
            if (p === pageNum) {
                pageCls = classNames(styles.pageActive, styles.page);
            }
            pageNodes.push(
                <span className={pageCls} onTouchTap={this.handleClickPage.bind(this, p)} key={p}>{p}</span>
            );
        }

        let prevPCls, nextPCls, pageWrapperCls, pageNoneCls;
        if (totalPage === 0) {
            pageWrapperCls = classNames('hide', styles.pageWrapper);
            pageNoneCls = styles.pageNone;
        } else {
            pageWrapperCls = styles.pageWrapper;
            pageNoneCls = classNames('hide', styles.pageNone)

            if (pageNum === 1) {
                prevPCls = classNames(styles.pageDisabled, styles.page);
            } else {
                prevPCls = styles.page;
            }

            if (pageNum === totalPage) {
                nextPCls = classNames(styles.pageDisabled, styles.page);
            } else {
                nextPCls = styles.page;
            }
        }


        return (
            <div className={cls} {...other}>
                <Select
                    className={styles.select}
                    controlClassName={styles.selectControl}
                    value={pageSize}
                    displayValueMap={(value)=> {
                        return `${value}条/每页`;
                    }}
                    onChange={onChangePageSize}
                >
                    {pageSizeNodes}

                </Select>
                <span className={styles.totalPage}>{`共${totalPage}页`}</span>

                <div className={pageWrapperCls}>
                    <span className={styles.page}
                          onTouchTap={this.handleClickPage.bind(this, 1)}>首页</span>
                    <span className={prevPCls}
                          onTouchTap={this.handleClickPage.bind(this, pageNum - 1)}>上一页</span>
                    {pageNodes}
                    <span className={nextPCls}
                          onTouchTap={this.handleClickPage.bind(this, pageNum + 1)}>下一页</span>
                    <span className={styles.page}
                          onTouchTap={this.handleClickPage.bind(this, totalPage)}>末页</span>


                </div>
                <div className={pageNoneCls}>暂无数据</div>
                <span className="clearfix"/>

            </div>
        )

    }
}
export default Pagination;