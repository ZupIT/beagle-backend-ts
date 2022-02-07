import { Expression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'

interface CepApiResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
}

export const fetchCepAddress = (
  { cep, ...options }: { cep: Expression<string> } & Omit<SendRequestParams<CepApiResponse>, 'url' | 'method'>,
) => sendRequest<CepApiResponse>({ url: `https://viacep.com.br/ws/${cep}/json`, ...options })
