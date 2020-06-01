import React, { Component } from 'react';
import Widget from './Widget'
import './Grid.css'

class Grid extends Component {


    render() {
        let arr = ['First', 'Second', 'Third', 'Fourth','Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
        let elements = [];
        arr.map((e) => {
            return(
                elements.push(
                    <div className='grid-style'>
                        {/* {e} */}
                        <Widget />
                    </div>
                )
            )
        })
        elements.push(
            <div className='grid-style add-new'>
                Add New
            </div>
        )
        return(
            <div className='grid-container'>
                {elements}
            </div>
        );
    }
}

export default Grid;
