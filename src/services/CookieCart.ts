export interface CartItem {
  id: number,
  imgSrc: string,
  price: number,
  title: string,
  authorId: number,
  qtd: number
}

const limitDate = new Date();
limitDate.setDate(limitDate.getDate() + 7);

export function setCartData(cartData: CartItem[]): void {
  const cookie = getCartData();
  const updatedCart = [...cookie, ...cartData];
  const updatedCartString = JSON.stringify(updatedCart);

  document.cookie = `cart=${encodeURIComponent(updatedCartString)}; expires=${limitDate.toUTCString()}; path=/`;
}

export function getCartData(): CartItem[] {
  const cookieData = document.cookie
    .split('; ')
    .find((row) => row.startsWith('cart='))
    ?.split('=')[1];

  if (cookieData) {
    try {
      const decodeCart = decodeURIComponent(cookieData);
      return JSON.parse(decodeCart) as CartItem[];
    } catch (error) {
      console.log('Erro:' + error);
      return [];
    }
  }

  return [];
}

export function deleteProduct(id: number): void {
  const productsList: CartItem[] = getCartData();
  const filteredList: CartItem[] = productsList.filter(
    (product) => product.id !== id
  );
  const updatedList = JSON.stringify(filteredList);

  document.cookie = `cart=${encodeURIComponent(updatedList)}; expires=${limitDate.toUTCString()}; path=/`;
}

export function updateQtd(meth: string, id: number): void {
  const productsList: CartItem[] = getCartData();

  const productIndex = productsList.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    console.error('Produto não encontrado no carrinho.');
    return;
  }

  if (meth === 'sum') {
    productsList[productIndex].qtd += 1;
  } else if (meth === 'subtraction') {
    productsList[productIndex].qtd -= 1;
  }

  const updatedList = JSON.stringify(productsList);
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + 7);
  document.cookie = `cart=${encodeURIComponent(updatedList)}; expires=${limitDate.toUTCString()}; path=/`;
}