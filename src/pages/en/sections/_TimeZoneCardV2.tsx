// import React, { useState, useEffect } from 'react'
// import moment from 'moment-timezone'

// const Timezone = ({ timezone }: any) => {
//   const [dateTime, setDateTime] = useState('')

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = moment().tz(timezone)
//       setDateTime(now.format('dddd, DD MMMM YYYY [at] h:mm:ss A'))
//     }, 1)

//     return () => clearInterval(interval)
//   }, [timezone])

//   return (
//     <div>
//       <div className="mb-2 flex w-full items-start justify-between">
//         <div className="flex flex-col">
//           <span className="text-xs text-gray-500">
//             Alicante, Spain&#x1F1EA;&#x1F1F8;
//           </span>
//         </div>
//       </div>
//       <br></br>
//       <p className="text-sm">{dateTime}</p>
//     </div>
//   )
// }

// export default Timezone
