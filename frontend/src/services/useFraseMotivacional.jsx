export default function useFraseMotivacional() {

  const getFrase = async () => {
    const res = await fetch("https://api.quotable.io/random")

    const response = await res.json()

    return response.content ?? null
  }

  return { getFrase }
}
