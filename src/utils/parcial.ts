export interface Parcial {
  nombre: string
  porcentaje: number
  nota100: number
  nota9: number
  total: number
}

export interface Note {
  note: number
  required: number
  required9: number
  missingNote: number
  hasReached: boolean
  outOfRange: boolean
}
