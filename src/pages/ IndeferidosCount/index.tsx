import React, { useState } from 'react'
import { Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material'

const IndeferidosCount = () => {
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([])

  const cidades = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Salvador',
    'Brasília'
    // ... adicione mais cidades conforme necessário
  ]

  const handleChange = (event: any) => {
    setCidadesSelecionadas(event.target.value)
  }

  return (
    <FormControl
      className="container"
      fullWidth
      style={{ margin: '110px 32px' }}
    >
      <InputLabel id="cidades-select-label">Cidades</InputLabel>
      <Select
        labelId="cidades-select-label"
        multiple
        value={cidadesSelecionadas}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {cidades.map((cidade) => (
          <MenuItem key={cidade} value={cidade}>
            {cidade}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default IndeferidosCount
