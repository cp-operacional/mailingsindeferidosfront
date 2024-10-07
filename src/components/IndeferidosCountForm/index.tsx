import { useEffect, useState } from 'react'
import { FormControl, TextField, Autocomplete } from '@mui/material'

const IndeferidosCountForm = () => {
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState<string[]>([])
  const [codigoUf, setCodigoUf] = useState<number | null>(null)
  const [municipios, setMunicipios] = useState<string[]>([])
  const [ufs, setUfs] = useState<UfType[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  type UfType = {
    codigo_uf: number
    uf: string
  }

  useEffect(() => {
    const fetchUfs = async () => {
      const response = await fetch('http://127.0.0.1:8000/ufs/')
      const data = await response.json()
      setUfs(data)
    }

    fetchUfs()
  }, [])

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (codigoUf) {
        const response = await fetch(
          'http://127.0.0.1:8000/municipios/filtrar/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo_uf: codigoUf })
          }
        )
        const data = await response.json()
        setMunicipios(data.municipios)
      } else {
        setMunicipios([])
        setCidadesSelecionadas([])
      }
    }

    fetchMunicipios()
  }, [codigoUf])

  return (
    <section className="container">
      <FormControl sx={{ width: 300 }}>
        <Autocomplete
          options={ufs}
          getOptionLabel={(option) => option.uf}
          onChange={(event, newValue) => {
            setCodigoUf(newValue ? newValue.codigo_uf : null)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          id="ufs-autocomplete"
          renderInput={(params) => (
            <TextField {...params} label="Selecione o Estado" />
          )}
          sx={{ mb: 2, mt: 5 }} // Adicionando margem inferior de 2 unidades
        />
        <Autocomplete
          multiple
          id="cidades"
          options={municipios}
          getOptionLabel={(option) => option}
          value={cidadesSelecionadas}
          onChange={(event, newValue) => {
            setCidadesSelecionadas(newValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Cidades"
              placeholder="Selecione as cidades"
            />
          )}
        />
      </FormControl>
    </section>
  )
}

export default IndeferidosCountForm
