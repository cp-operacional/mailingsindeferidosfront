import { useEffect, useState } from 'react'
import {
  FormControl,
  TextField,
  Autocomplete,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel
} from '@mui/material'

type RegiaoType = {
  uf: string
  cidades: string[]
}

type UfType = {
  codigo_uf: number
  uf: string
}

const IndeferidosCountForm = () => {
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState<
    string[]
  >([])
  const [ufSelecionada, setUfSelecionada] = useState<UfType | null>(null)
  const [municipios, setMunicipios] = useState<string[]>([])
  const [ufs, setUfs] = useState<UfType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [regioes, setRegioes] = useState<RegiaoType[]>([])
  const [todasAsRegioes, setTodasAsRegioes] = useState(false) // Estado para o checkbox "TODAS AS REGIÕES"

  useEffect(() => {
    const fetchUfs = async () => {
      const response = await fetch('http://127.0.0.1:8000/ufs/')
      const data = await response.json()
      setUfs(data)
    }

    fetchUfs()
  }, [])

  const adicionarRegiao = () => {
    if (todasAsRegioes) {
      setRegioes([
        ...regioes,
        { uf: 'Todas as Regiões', cidades: ['Todos os municípios'] }
      ])
      setTodasAsRegioes(false) // Reseta o checkbox
    } else if (ufSelecionada) {
      const ufNome = ufSelecionada.uf
      const cidadesParaRegiao =
        municipiosSelecionados.length > 0
          ? municipiosSelecionados
          : ['Todos os municípios']
      setRegioes([...regioes, { uf: ufNome, cidades: cidadesParaRegiao }])
      setMunicipiosSelecionados([])
      setUfSelecionada(null)
    }
  }

  const isDisabled = () => {
    return regioes.some((regiao) => regiao.uf === 'Todas as Regiões')
  }

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (ufSelecionada?.codigo_uf) {
        const response = await fetch(
          'http://127.0.0.1:8000/municipios/filtrar/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo_uf: ufSelecionada.codigo_uf })
          }
        )
        const data = await response.json()
        setMunicipios(data.municipios)
      } else {
        setMunicipios([])
        setMunicipiosSelecionados([])
      }
    }

    fetchMunicipios()
  }, [ufSelecionada?.codigo_uf])

  const finalQuery = {
    filtros: [
      {
        ...(regioes.some((regiao) => regiao.uf !== 'Todas as Regiões')
          ? {
              uf_municipio: regioes.reduce(
                (acc: { [key: string]: string[] }, { uf, cidades }) => {
                  if (!acc[uf]) {
                    acc[uf] = []
                  }
                  acc[uf] = acc[uf].concat(cidades)
                  return acc
                },
                {}
              )
            }
          : {})
      }
    ]
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/count/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalQuery)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Response data:', data)
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  return (
    <>
      <FormControl
        sx={{
          width: 300,
          display: 'block',
          margin: '0 auto',
          mt: 5,
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Título do Formulário
        </Typography>
        <Autocomplete
          options={ufs}
          getOptionLabel={(option) => option.uf}
          value={ufSelecionada}
          onChange={(event, newValue) => {
            setUfSelecionada(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          id="ufs-autocomplete"
          renderInput={(params) => (
            <TextField {...params} label="Selecione o Estado" />
          )}
          sx={{ mb: 2, mt: 5 }}
          disabled={isDisabled()} // Desabilita se já existir o card "Todas as Regiões"
        />
        <Autocomplete
          multiple
          id="cidades"
          options={municipios}
          getOptionLabel={(option) => option}
          value={municipiosSelecionados}
          onChange={(event, newValue) => {
            setMunicipiosSelecionados(newValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Cidades"
              placeholder="Selecione as cidades"
            />
          )}
          disabled={isDisabled()} // Desabilita se já existir o card "Todas as Regiões"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={todasAsRegioes}
              onChange={(event) => setTodasAsRegioes(event.target.checked)}
              disabled={isDisabled()} // Desabilita se já existir o card "Todas as Regiões"
            />
          }
          label="TODAS AS REGIÕES"
        />
        <Button
          variant="contained"
          onClick={adicionarRegiao}
          sx={{ mb: 2, mt: 2 }}
          disabled={isDisabled()}
        >
          Adicionar Região
        </Button>
        {regioes.map((regiao, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{regiao.uf}</Typography>
              <Typography variant="body2">
                {regiao.cidades.join(', ')}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="contained"
          onClick={handleSubmit} // Chama handleSubmit ao clicar
          sx={{ mb: 2, mt: 2 }}
          // disabled={isDisabled()}
        >
          Procurar
        </Button>
      </FormControl>
    </>
  )
}

export default IndeferidosCountForm
