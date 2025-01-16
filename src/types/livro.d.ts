export interface Livro {
  id: number;
  title: string;
  price: number;
  imgSrc: string;
  sinopse: string;
  editora: string;
  isbn: string;
  paginas: number;
  ano: number;
  edicao: string;
  authorId?: number;
  author?: string;
}
