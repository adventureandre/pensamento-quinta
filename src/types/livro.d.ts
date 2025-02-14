export interface Livro {
  id: number;
  title: string;
  price: number;
  imgSrc: string;
  sinopse: string;
  editora: string;
  paginas: number;
  ano: number;
  edicao: string;
  authorId?: number;
  thumbnailImages?: string[];
  launch: boolean,
  highlight: boolean,
  eBook: boolean
}
