import React, { useState, useEffect, useRef } from 'react'
import "./ReactGridComponent.css"
const ReactGridComponent = (props) => {
    let gridref = useRef(null)
    let allRows = props.rows
    const [showRows, setshowRows] = useState([])
    const [rowperpage, setrowperpage] = useState(0)
    useEffect(() => {
        setshowRows(props.rows.slice(0, 10))
        setrowperpage(props.rowsPerpage)
        gridref.current.style = `grid-template-rows:30px repeat(${props.rowsPerpage}, 30px);`
    }, [props.rows, props.rowsPerpage])

    useEffect(() => {
        const gridfunc = gridref.current.addEventListener("scroll", (event) => {
            var scrollTop = gridref.current.scrollTop;
            var scrollheight = gridref.current.scrollHeight;
            var docHeight = gridref.current.clientHeight;
            // var trackLength = docHeight - winHeight;
            var ggg = scrollheight - docHeight - scrollTop
            var pctScrolled = `${Math.floor(((scrollheight + scrollTop) / scrollheight) * 100)}%`;
            console.log('ggg  ', ggg);
            console.log('scrollheight  ', scrollheight);
            console.log('docHeight  ', docHeight);
            console.log('scrollTop  ', scrollTop);
            console.log('scrolling  ', pctScrolled, "/n =====");
        })
        return () => {
            gridref.current.removeEventListener("scroll", gridfunc)
        }
    }, [])
    return (
        <>
            <div ref={gridref} className='gridWrapper' style={{ display: "grid", }}>
                <div className='gridrow-header'>HEADER</div>
                {showRows.map((m, i) => {
                    return (
                        <div className='gridrow'>{i + 1}</div>
                    )
                })}


            </div>
            <div>Total Rows :{allRows.length} </div>
        </>

    )
}

export default ReactGridComponent