type Ioptions = {
  page?: number;
  limit?: number;
};
type IoptionsResults = {
  page: number;
  limit: number;
  skip: number;
};

const calculatePagination = (options: Ioptions): IoptionsResults => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
export const paginationHelpers = {
  calculatePagination,
};
