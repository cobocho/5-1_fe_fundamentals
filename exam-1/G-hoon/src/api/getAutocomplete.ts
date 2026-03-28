import { api } from './client';

interface GetAutocompleteResponse {
  suggestions: string[];
}

export async function getAutocomplete(keyword: string): Promise<GetAutocompleteResponse> {
  return api.get('autocomplete', { searchParams: { keyword } }).json<GetAutocompleteResponse>();
}
