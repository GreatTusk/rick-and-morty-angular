export interface SearchFilters {
  name: string;
  status: string;
  gender: string;
}

export const emptySearchFilters: SearchFilters = {
  name: '',
  status: '',
  gender: ''
}
