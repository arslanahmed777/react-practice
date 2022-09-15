import React, { useState, useRef } from 'react'
import TreeView from "../components/TreeView/TreeView"
import nodes from '../components/TreeView/nodes';
import { FaTrash, FaRegPlusSquare, FaChevronRight, FaChevronDown, FaFolder, FaFolderOpen, } from "react-icons/fa"
const ReactTreeCheckboxPage = () => {
    const treeRef = useRef(null);
    const [Nodes, setNodes] = useState(nodes);
    const [expanded, setExpanded] = useState([]);
    const [addNode, setaddNode] = useState(false);
    const [nodeid, setnodeid] = useState(null)
    const [formobj, setformobj] = useState({
        text: '',
        value: '',
        status: false,
        nodes: [],
        id: "",
    })
    const [path, setpath] = useState("")
    const handleExpand = (newArray) => {
        console.log('handleExpand', newArray);
        setExpanded([...newArray]);
    };
    const handleCheck = (treeNodes) => {
        console.log('handleCheck', treeNodes);
        setNodes([...treeNodes]);
    };

    const handeleSave = () => {
        console.log('handeleSave', Nodes);
    };
    const allowAdd = (nodeid) => {
        console.log(nodeid);
        setnodeid(nodeid)
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
    const onSaveNode = () => {
        treeRef.current.addNewNode(nodeid, formobj)
        setaddNode(false)
        setformobj({
            text: '',
            value: '',
            status: false,
            nodes: [],
            id: "",
        })
    }
    const handleNodeClick = (nodeobj) => {
        console.log(nodeobj);
        setpath(nodeobj.path)
    }
    return (
        <div>ReactTreeCheckboxPage
            <h6>{path}</h6>
            <div style={{ border: '1px solid red', padding: 12 }}>
                <TreeView
                    ref={treeRef}
                    filternodes={Nodes}
                    expanded={expanded}
                    handleExpand={handleExpand}
                    changeState={handleCheck}
                    column={12}
                    //  onNodeClick={handleNodeClick}
                    // onNodeClickOptions={{
                    //     allowExpand: false,
                    //     key: "text",
                    //     delimiter: "/"
                    // }}
                    // customStyling={{
                    //     fontSize: "12px",
                    //     // fontWeight: "500",
                    //     // color: "red",
                    //     // backgroundColor: "lightblue"
                    // }}
                    // horizontalSpacing={'12px'}
                    verticalSpacing={'0px'}
                    // borderLeft={'1px dotted red'}
                    // allowCheck={false}
                    // addText={"Add new right"}
                    handleAddNode={allowAdd}
                    allowDelete={true}
                    allowAdd={true}
                    icons={{
                        compressIcon: <FaChevronRight style={{ color: '#7c7c7c' }} />,
                        expandIcon: < FaChevronDown style={{ color: '#7c7c7c' }} />,
                        nodeCompressIcon: <FaFolder style={{ color: '#8a59ff' }} />,
                        nodeExpandIcon: < FaFolderOpen style={{ color: '#8a59ff' }} />,
                        deleteIcon: <FaTrash size={18} style={{ color: '#ff4b4b' }} />,
                        addIcon: <FaRegPlusSquare size={18} style={{ color: 'blue' }} />,
                    }}
                />
            </div>
            <div>
                <button onClick={handeleSave} className='btn btn-success'>Save Node</button>
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
                                <input value={formobj.status} name="status" checked={formobj.status} onChange={handleChange} className="form-check-input" type="checkbox" />
                                <label className="form-label">Enter default status</label>
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