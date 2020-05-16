import React, { Component } from 'react';
import './Table.css'
import { TablePagination } from 'react-pagination-table';

class METable extends Component {

    componentDidUpdate()
    {
    }

    render() {
        return(
            <div>
                {this.props.data ?  
                <TablePagination
                    title={this.props.title ? this.props.title : null}
                    subTitle={this.props.subTitle ? this.props.subTitle : null}
                    headers={ this.props.headers }
                    data={ this.props.data }
                    columns={this.props.columns}
                    perPageItemCount={ this.props.perPageItemCount }
                    totalCount={ this.props.data?this.props.data.length:0 }
                    arrayOption={ [["size", 'all', ' ']] }
                    className="meTable"       
                    nextPageText="Next"
                    prePageText="Prev"
                    paginationClassName="meTablePagination"
                /> : ''}
            </div>
        )
    }
}

export default METable;