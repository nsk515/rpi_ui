import React, { Component } from 'react';
import './Table.css'
import { TablePagination } from 'react-pagination-table';

class METable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText : ''
        }
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidUpdate()
    {
    }

    onSearchChange(e) {
        this.setState({searchText: e.target.value});
    }

    render() {
        let tempdata = []
        if(this.state.searchText === '' || this.props.searchColumns === undefined) {
            tempdata = this.props.data;
        }
        else {
            if(this.props.searchColumns) {
                this.props.data.map((d) => {
                    let contains = false;
                    this.props.searchColumns.map((e) => {
                        if(typeof d[e] === 'string' || d[e] instanceof String) {
                            if(d[e].includes(this.state.searchText)) {
                                contains = true;
                            }
                        }
                        return e;
                    })
                    if(contains === true) {
                        tempdata.push(d);
                    }
                    return d;
                });
            }
        }
        
        return(
            <div style={{margin:'10px 20px', padding:'5px 10px'}}>
                {this.props.searchColumns && this.props.data ? 
                    <input 
                        type='text' 
                        placeholder='Search' 
                        name='searchtext' 
                        onChange={this.onSearchChange} 
                        value={this.state.searchText} 
                        className='searchBox'
                    /> : ''}

                {this.props.data ?
                    <div>  
                        <TablePagination
                            title={this.props.title ? this.props.title : null}
                            subTitle={this.props.subTitle ? this.props.subTitle : null}
                            headers={ this.props.headers }
                            data={ tempdata }
                            columns={this.props.columns}
                            perPageItemCount={this.props.perPageItemCount }
                            totalCount={ tempdata ? tempdata.length : 0 }
                            arrayOption={ [["size", 'all', ' ']] }
                            className="meTable"       
                            nextPageText="Next"
                            prePageText="Prev"
                            paginationClassName="meTablePagination"
                        />
                    </div> : 
                ''}
            </div>
        )
    }
}

export default METable;