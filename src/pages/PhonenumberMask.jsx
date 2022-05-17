import React, { useState } from 'react'

// export const Mask = (number,command="generatemask")=>{
//    var purenumber =  number.replace(/[^\d]/g, "").slice(0,10);
//    console.log("purenumber",purenumber);

//    if(purenumber.length === 3)
//     {
//         //const x = number.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
//         const maskedNumber = '(' + purenumber + ')';
//         return maskedNumber
//     }else if(purenumber.length === 4)
//     {
//         const str = purenumber.substring(0, purenumber.length - 1);

//         const ddd = '(' + str + ')-'+purenumber[purenumber.length - 1];
//         return ddd
//     }else if(purenumber.length === 6)
//     {
//          const str2 = purenumber.substring(0, purenumber.length - 3);

//         const ddd2 = '(' + str2 + ')-'+purenumber.slice(3)+'-';
//         return ddd2
//     }else if(purenumber.length === 10)
//     {
//          const str2 = purenumber.substring(0, purenumber.length - 7);

//         const ddd3 = '(' + str2 + ')-'+purenumber.slice(3,6)+'-'+purenumber.slice(6);
//         return ddd3
//     }
//     else if(purenumber.length > 10)
//     {
//          const str3 = purenumber.substring(0, purenumber.length - 7);

//         const ddd4 = '(' + str3 + ')-'+purenumber.slice(3,6)+'-'+purenumber.slice(6);
//         return ddd4
//     }
//     return number
//     // if(command === "generatemask")
//     // {
//     //     const x = number.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
//     //     const maskedNumber = '(' + x[1] + ') ' + x[2] + '-' + x[3];
//     //     return maskedNumber
//     // }else if(command === "removemask")
//     // {
//     //      const hhh =  number.replace(/[^\d]/g, "")
//     //       return hhh
//     // }

// }

// export const Mask = (number, command = "generatemask") => {
//     let purenumber = number.replace(/[^\d]/g, "").slice(0, 10);
//     console.log("purenumber", purenumber);
//     if (command === "generatemask" && purenumber.length === 10) {
//         const x = purenumber.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
//         const maskedNumber = '(' + x[1] + ') ' + x[2] + '-' + x[3];
//         return maskedNumber
//     }
//     else {
//         return purenumber
//     }
// }

/////////////////////////////////////////////
export const Mask = (number, command = 'generatemask') => {
  if (command === 'generatemask') {
    var x = number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    return number

  } else {
    let purenumber = number.replace(/[^\d]/g, '').slice(0, 10)
    return purenumber
  }
}

const PhonenumberMask = () => {
  const [number, setNumber] = useState('')
  const handleClick = (e) => {
    e.preventDefault()
    const mm = Mask('(123)456-7890', 'removemask')
    // const mm = Mask('12345656756756', 'generatemask')
    //setNumber(mm)
    console.log(mm)
  }

  const changeNum = (e) => {
    const maskednum = Mask(e.target.value, 'generatemask')

    setNumber(maskednum)
  }
  return (
    <div>
      <input
        type="text"
        value={number}
        onChange={(e) => changeNum(e)}
        placeholder="asdfsa"
      />
      <button onClick={(e) => handleClick(e)}>submit</button>
    </div>
  )
}

export default PhonenumberMask
