export type VeiculoStatus = 'DISPONIVEL' | 'EM_NEGOCIACAO' | 'VENDIDO';
export type TipoVeiculo = 'CARRO' | 'MOTO' | 'BICICLETA' | 'CAMINHAO';
export type Propulsao = 'COMBUSTAO' | 'ELETRICO' | 'HIBRIDO' | 'HUMANA';
export type OrigemLeilao = 'NENHUM' | 'SINISTRO_PEQUENA_MONTA' | 'SINISTRO_MEDIA_MONTA' | 'FINANCEIRA';

export interface Veiculo {
  id?: string;
  placa?: string;
  finalPlaca?: string;
  placaMascarada?: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  km: number;
  preco: number;
  descricao?: string;
  fotos?: string[];
  status: VeiculoStatus;
  tipoVeiculo: TipoVeiculo;
  propulsao: Propulsao;
  temLeilao: boolean;
  origemLeilao?: OrigemLeilao;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface Filtros {
  tipoVeiculo: string;
  propulsao: string;
  status: string;
  temLeilao: string;
  busca: string;
}

export const DEFAULT_FILTROS: Filtros = {
  tipoVeiculo: 'todos',
  propulsao: 'todas',
  status: 'todos',
  temLeilao: 'todos',
  busca: '',
};

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  pages: number[];
}
