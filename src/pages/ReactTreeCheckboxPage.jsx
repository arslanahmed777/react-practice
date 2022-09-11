import React, { useState } from 'react'
import TreeView from "../components/TreeView/TreeView"
import nodes from '../components/TreeView/nodes';
import { FaTrash, FaRegPlusSquare } from "react-icons/fa"
const ReactTreeCheckboxPage = () => {
    const [Nodes, setNodes] = useState(nodes);
    const [expanded, setExpanded] = useState([]);
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
    return (
        <div>ReactTreeCheckboxPage
            <div style={{ border: '1px solid red', padding: 12 }}>
                <TreeView
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
                    addText={"Add new right"}
                    allowDelete={true}
                    allowAdd={true}
                />
            </div>
        </div>
    )
}

export default ReactTreeCheckboxPage