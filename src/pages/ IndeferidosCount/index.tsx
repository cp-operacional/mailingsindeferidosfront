import { useEffect, useState } from 'react'
import { FormControl, TextField, Autocomplete } from '@mui/material'
import IndeferidosCountForm from '../../components/IndeferidosCountForm'

const IndeferidosCount = () => {
  return (
    <section className="container">
      <IndeferidosCountForm />
    </section>
  )
}

export default IndeferidosCount
