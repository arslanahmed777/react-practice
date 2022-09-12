import React, { useState, useRef } from 'react'
import TreeView from "../components/TreeView/TreeView"
import nodes from '../components/TreeView/nodes';
import { FaTrash, FaRegPlusSquare } from "react-icons/fa"
const ReactTreeCheckboxPage = () => {
    let myref = useRef(null)
    const [Nodes, setNodes] = useState(nodes);
    const [expanded, setExpanded] = useState([]);
    const [addNode, setaddNode] = useState(false);
    const [formobj, setformobj] = useState({
        text: '',
        value: '',
        status: false,
        nodes: [],
        id: null,
    })
    const handleExpand = (newArray) => {
        console.log('handleExpand', newArray);
        setExpanded([...newArray]);
    };
    const handleCheck = (treeNodes) => {
        console.log('handleCheck', treeNodes);
        setNodes([...treeNodes]);
    };

    const handeleSave = (chklist) => {
        console.log('handeleSave', chklist);
    };
    const allowAdd = (obj) => {
        setaddNode(true)
    }
    const closeAllowAdd = () => {
        setaddNode(false)
    }
    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "status") {
            setformobj((prevobj) => ({
                ...prevobj,
                [name]: e.target.checked
            }))
        } else if (name === "id") {
            setformobj((prevobj) => ({
                ...prevobj,
                [name]: parseInt(value)
            }))
        }
        else {
            setformobj((prevobj) => ({
                ...prevobj,
                [name]: value
            }))
        }
    }
    const onSaveNode = (e, func) => {
        console.log(func)
        func(formobj)
        // console.log(myref.current.addPNode);
        // myref.current.addPNode(formobj)

    }
    return (
        <div>ReactTreeCheckboxPage
            <div style={{ border: '1px solid red', padding: 12 }}>
                <TreeView
                    customRef={onSaveNode}
                    filternodes={Nodes}
                    expanded={expanded}
                    handleExpand={handleExpand}
                    changeState={handleCheck}
                    //saveTree={handeleSave}
                    column={12}
                    // savebtnClass={'btn'}
                    //expandIcon={<i className="fas fa-folder-open" style={{ color: '#e6c300' }}></i> }
                    // compressIcon={ <i className="fas fa-folder" style={{ color: '#e6c300' }}></i>}
                    // deleteIcon={<FaTrash size={18} style={{ color: 'red' }} />}
                    // addIcon={<FaRegPlusSquare size={18} style={{ color: 'blue' }} />}
                    // customStyling={{
                    //     fontSize: "18px",
                    //      fontWeight:"600",
                    //     color: "red",
                    //     backgroundColor: "lightblue"
                    // }}
                    // horizontalSpacing={'14px'}
                    // verticalSpacing={'5px'}
                    // borderLeft={'1px dotted red'}
                    // allowCheck={false}
                    // addText={"Add new right"}
                    onAllowAdd={allowAdd}
                    allowDelete={true}
                    allowAdd={true}
                />
            </div>
            {addNode ? (
                <div style={{ border: '1px solid red', padding: 12 }}>
                    <div className='row'>
                        <div className='col-lg-2'>
                            <div className="mb-3">
                                <label className="form-label">Enter text</label>
                                <input value={formobj.text} name="text" onChange={handleChange} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className="mb-3">
                                <label className="form-label">Enter Value</label>
                                <input value={formobj.value} name="value" onChange={handleChange} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className="mb-3">
                                <label className="form-label">Enter uniqueid</label>
                                <input value={formobj.id} name="id" onChange={handleChange} type="number" className="form-control" />
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className="mb-3">
                                <label className="form-label">Enter default status</label>
                                <input value={formobj.status} name="status" checked={formobj.status} onChange={handleChange} class="form-check-input" type="checkbox" />
                            </div>
                        </div>
                    </div>

                    <button onClick={onSaveNode} className='btn btn-success me-4'>Save</button>
                    <button onClick={closeAllowAdd} className='btn btn-danger'>Cancel</button>
                </div>
            ) : null}

        </div>
    )
}

export default ReactTreeCheckboxPage