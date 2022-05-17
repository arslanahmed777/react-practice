import React, { Component, useState } from 'react';



const Rendering = ({ name, age }) => {

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
                <h1>{name}</h1>
            </div>
            <div style={{ width: "50%" }}>
                {age}
            </div>
        </div>
    )
}

export default React.memo(Rendering, chartsPropsAreEqual)


// class Rendering extends Component {
//     constructor(props) {
//         super(props);
//         this.myRef = React.createRef();

//     }
//     render() {
//         const { name, age } = this.props;
//         // console.log(this.myRef.current++)
//         console.log("I am rendered");
//         return (
//             <div style={{ display: "flex" }}>
//                 <div style={{ width: "50%" }}>
//                     <h1>{name}</h1>
//                 </div>
//                 <div style={{ width: "50%" }}>
//                     {age}
//                 </div>
//             </div>
//         )
//     }
// }
// 
// export default React.memo(Rendering, chartsPropsAreEqual)


function chartsPropsAreEqual(prevProps, nextProps) {
    console.log(prevProps)
    console.log(nextProps)
    // const ggg = prevProps.age === nextProps.age
    // console.log("gdg", ggg)
    // return ggg
}