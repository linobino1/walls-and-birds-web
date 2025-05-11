const roots = [
  'A',
  'A',
  'A#',
  'Bb',
  'B',
  'B',
  'C',
  'C',
  'C#',
  'Db',
  'D',
  'D',
  'D#',
  'Eb',
  'E',
  'E',
  'F',
  'F',
  'F#',
  'Gb',
  'G',
  'G',
  'G#',
  'Ab',
]

const qualities = [
  ' ',
  '&nbsp;',
  '\n',
  'maj',
  'm',
  'maj7',
  '7',
  'min7',
  'dim',
  'm7b5',
  '7b5',
  '7#5',
  '7b9',
  '6',
  '6/9',
  'sus2',
  'sus4',
  '/',
]

/**
 * returns an array of all combinations of the elements of arrayA and arrayB
 */
function combineAll(arrayA: Array<string>, arrayB: Array<string>) {
  const result = new Array(arrayA.length * arrayB.length)
  for (let a = 0; a < arrayA.length; a++) {
    for (let b = 0; b < arrayB.length; b++) {
      result[a * arrayB.length + b] = arrayA[a]?.concat(arrayB[b] || '')
    }
  }

  return result
}

/**
 * contains all possible chords
 */
const allChords: Array<string> = combineAll(roots, qualities)

/**
 * used to navigate the allChords array
 * if you want to transpose by 1 halfstep, you have to go to index (shift + 1) % allChords.length
 */
const shift = (roots.length / 12) * qualities.length

/**
 * contains all possible chords and their equivalent transposed by 1 halfstep
 */
export const transposeMap: Record<string, string> = allChords.reduce(
  (res: Record<string, string>, chord: string, i: number) => {
    res[chord] = allChords[(i + shift) % allChords.length] as string
    return res
  },
  {},
)

export function transposeChord(chord: string, steps: number) {
  steps = (steps + 12) % 12
  while (steps > 0) {
    if (!(chord in transposeMap)) throw new Error(`chord ${chord} not found`)
    chord = transposeMap[chord] as string
    steps--
  }
  return chord
}
