import React from 'react'

function MessageBox(data) {
    const mes = data.data;
    
  return (
      <div className='p-4 m-2 rounded bg-secondary'>
          <h1>{`Name: ${mes.fullName}`}</h1>
          <h2>{`Email: ${mes.email}`}</h2>
          <h2>{`Subject: ${mes.subject}`}</h2>
          <h2>{`Number: ${mes.phoneNumber}`}</h2>
          <p>{`Message: ${mes.message}`}</p>
    </div>
  )
}

export default MessageBox