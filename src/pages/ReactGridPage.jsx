import React, { useState } from 'react'
import ReactGridComponent from '../components/ReactGridComponent/ReactGridComponent'

const ReactGridPage = () => {
    const [rowsperpage, setrowsperpage] = useState(11)
    const handleChange = (e) => {
        setrowsperpage(+e.target.value)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <ReactGridComponent rows={Array.from(Array(400).keys())} rowsPerpage={rowsperpage} />
                </div>
                <div className='col-12'>
                    <select value={rowsperpage} onChange={handleChange}>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>20</option>
                        <option>30</option>
                        <option>50</option>
                        <option>60</option>
                        <option>80</option>
                        <option>200</option>
                        <option>210</option>
                        <option>230</option>
                        <option>250</option>
                        <option>280</option>
                        <option>3000</option>

                    </select>
                </div>
            </div>
        </div>

    )
}

export default ReactGridPage