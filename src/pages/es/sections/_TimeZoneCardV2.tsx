// import React, { useState, useEffect } from 'react'
// import moment from 'moment-timezone'

// const Timezone = ({ timezone }: any) => {
//   const [dateTime, setDateTime] = useState('')

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // const now = moment().tz(timezone)
//       // setDateTime(now.format('dddd, DD MMMM YYYY [at] h:mm:ss A'))
//       // Configura el idioma de moment.js a español
//       moment.locale('es')
//       const now = moment().tz(timezone, true)

//       const days = [
//         'Domingo',
//         'Lunes',
//         'Martes',
//         'Miércoles',
//         'Jueves',
//         'Viernes',
//         'Sábado',
//       ]
//       const months = [
//         'Enero',
//         'Febrero',
//         'Marzo',
//         'Abril',
//         'Mayo',
//         'Junio',
//         'Julio',
//         'Agosto',
//         'Septiembre',
//         'Octubre',
//         'Noviembre',
//         'Diciembre',
//       ]
//       const dayName = days[now.day()]
//       const monthName = months[now.month()]
//       const formattedDateTime = `${dayName}, ${now.date()} de ${monthName} ${now.year()} a las ${now.format('HH:mm:ss')}`

//       setDateTime(formattedDateTime)
//     }, 1)

//     return () => clearInterval(interval)
//   }, [timezone])

//   return (
//     <div>
//       <div className="mb-2 flex w-full items-start justify-between">
//         <div className="flex flex-col">
//           <span className="text-xs text-gray-500">
//             Alicante, España&#x1F1EA;&#x1F1F8;
//           </span>
//         </div>
//       </div>
//       <br></br>
//       <p className="text-sm">{dateTime}</p>
//     </div>
//   )
// }

// export default Timezone
