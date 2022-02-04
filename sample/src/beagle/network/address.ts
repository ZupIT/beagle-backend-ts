import { Expression } from "@zup-it/beagle-backend-core";
import { sendRequest, SendRequestParams } from "@zup-it/beagle-backend-core/actions";

interface Address {
  logradouro: string,
  localidade: string,
  uf: string,
}
export const getAddresByCep = (cep: Expression<string>, options: Omit<SendRequestParams<Address>, 'url' | 'method'>) => (
  sendRequest({ url: `https://viacep.com.br/ws/${cep}/json/`, ...options })
)
