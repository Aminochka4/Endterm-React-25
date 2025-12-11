export async function fetchCharactersService(page = 1, query = "") {
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;
  if (query) {
    url += `&name=${encodeURIComponent(query)}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Characters not found");
  const data = await response.json();

  return {
    results: data.results || [],
    info: data.info || { next: null },
  };
}


export async function getCharacterById(id) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) throw new Error("Character not found");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

