export const conversion: { nota9: number; nota100: number }[] = [
  { nota9: 1.0, nota100: 1 },
  { nota9: 1.1, nota100: 8 },
  { nota9: 1.2, nota100: 9 },
  { nota9: 1.3, nota100: 10 },
  { nota9: 1.4, nota100: 11 },
  { nota9: 1.5, nota100: 12 },
  { nota9: 1.6, nota100: 13 },
  { nota9: 1.7, nota100: 14 },
  { nota9: 1.8, nota100: 15 },
  { nota9: 1.9, nota100: 16 },
  { nota9: 2.0, nota100: 17 },
  { nota9: 2.0, nota100: 18 },
  { nota9: 2.1, nota100: 19 },
  { nota9: 2.2, nota100: 20 },
  { nota9: 2.3, nota100: 21 },
  { nota9: 2.4, nota100: 22 },
  { nota9: 2.5, nota100: 23 },
  { nota9: 2.6, nota100: 24 },
  { nota9: 2.7, nota100: 25 },
  { nota9: 2.8, nota100: 26 },
  { nota9: 2.9, nota100: 27 },
  { nota9: 3.0, nota100: 28 },
  { nota9: 3.0, nota100: 29 },
  { nota9: 3.1, nota100: 30 },
  { nota9: 3.2, nota100: 31 },
  { nota9: 3.3, nota100: 32 },
  { nota9: 3.4, nota100: 33 },
  { nota9: 3.5, nota100: 34 },
  { nota9: 3.6, nota100: 35 },
  { nota9: 3.7, nota100: 36 },
  { nota9: 3.8, nota100: 37 },
  { nota9: 3.9, nota100: 38 },
  { nota9: 4.0, nota100: 39 },
  { nota9: 4.0, nota100: 40 },
  { nota9: 4.1, nota100: 41 },
  { nota9: 4.2, nota100: 42 },
  { nota9: 4.3, nota100: 43 },
  { nota9: 4.4, nota100: 44 },
  { nota9: 4.5, nota100: 45 },
  { nota9: 4.6, nota100: 46 },
  { nota9: 4.7, nota100: 47 },
  { nota9: 4.8, nota100: 48 },
  { nota9: 4.8, nota100: 49 },
  { nota9: 4.9, nota100: 50 },
  { nota9: 5.0, nota100: 51 },
  { nota9: 5.1, nota100: 52 },
  { nota9: 5.2, nota100: 53 },
  { nota9: 5.3, nota100: 54 },
  { nota9: 5.3, nota100: 55 },
  { nota9: 5.4, nota100: 56 },
  { nota9: 5.5, nota100: 57 },
  { nota9: 5.6, nota100: 58 },
  { nota9: 5.7, nota100: 59 },
  { nota9: 5.8, nota100: 60 },
  { nota9: 5.9, nota100: 61 },
  { nota9: 6.0, nota100: 63 },
  { nota9: 6.0, nota100: 62 },
  { nota9: 6.1, nota100: 64 },
  { nota9: 6.2, nota100: 65 },
  { nota9: 6.3, nota100: 66 },
  { nota9: 6.4, nota100: 67 },
  { nota9: 6.5, nota100: 68 },
  { nota9: 6.6, nota100: 69 },
  { nota9: 6.7, nota100: 70 },
  { nota9: 6.8, nota100: 71 },
  { nota9: 6.9, nota100: 72 },
  { nota9: 7.0, nota100: 74 },
  { nota9: 7.0, nota100: 73 },
  { nota9: 7.1, nota100: 75 },
  { nota9: 7.2, nota100: 76 },
  { nota9: 7.3, nota100: 77 },
  { nota9: 7.4, nota100: 78 },
  { nota9: 7.5, nota100: 79 },
  { nota9: 7.6, nota100: 80 },
  { nota9: 7.7, nota100: 81 },
  { nota9: 7.8, nota100: 82 },
  { nota9: 7.9, nota100: 83 },
  { nota9: 8.0, nota100: 84 },
  { nota9: 8.0, nota100: 85 },
  { nota9: 8.1, nota100: 86 },
  { nota9: 8.2, nota100: 87 },
  { nota9: 8.3, nota100: 88 },
  { nota9: 8.4, nota100: 89 },
  { nota9: 8.5, nota100: 90 },
  { nota9: 8.6, nota100: 91 },
  { nota9: 8.7, nota100: 92 },
  { nota9: 8.8, nota100: 93 },
  { nota9: 8.9, nota100: 94 },
  { nota9: 9.0, nota100: 95 },
]

export const notesRequired = [
  {
    note: 4,
    required: 3.5,
  },
  {
    note: 5,
    required: 4.5,
  },
  {
    note: 6,
    required: 5.5,
  },
  {
    note: 7,
    required: 6.5,
  },
  {
    note: 8,
    required: 7.5,
  },
  {
    note: 9,
    required: 8.5,
  },
]

export function convertirNota(nota: number, escala: '100' | '9'): number | null {
  const notaToSearch = nota

  if (
    notaToSearch < 0 ||
    (escala === '100' && notaToSearch > 100) ||
    (escala === '9' && notaToSearch > 9)
  ) {
    return null
  }

  if (escala === '100' && notaToSearch >= 95) return 9.0
  if (escala === '100' && notaToSearch <= 7) return 1

  if (escala === '100') {
    const match = conversion.find((item) => item.nota100 === notaToSearch)
    return match ? match.nota9 : null
  } else {
    const match = conversion.find((item) => item.nota9 === notaToSearch)
    return match ? match.nota100 : null
  }
}

export const roundNote = (note: number) => {
  return Math.round(note * 100) / 100
}
