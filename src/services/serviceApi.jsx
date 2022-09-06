export function ImagesAPI(searchQuery, page = 1) {
  return fetch(
    `https://pixabay.com/api/?key=26652166-68919f4336d4ff6c386516ecc&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error());
  });
}
