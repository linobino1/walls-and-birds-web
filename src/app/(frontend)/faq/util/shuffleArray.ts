export function shuffleArray(array: unknown[]) {
  let currentIndex = array.length
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}
