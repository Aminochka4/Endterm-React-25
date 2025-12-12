const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page = 1, query = "") {
  let url = `${BASE_URL}/character?page=${page}`;
  if (query) {
    url += `&name=${encodeURIComponent(query)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Characters not found");
  return res.json();
}

export async function fetchCharacterById(id) {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}

