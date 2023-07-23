export const getSearchParam = (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  return id;
};
