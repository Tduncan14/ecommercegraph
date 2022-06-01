import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import {useQuery,gql} from '@apollo/client';
import { usePrice } from '../../utils/hooks';
import ProductItem from '../../components/ProductItem';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import CartButton from '../../components/CartButton';


const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;


const GET_CART = gql `
  query getCart {

       cart {
         products{
           id
           title
           price
           thumbnail
      }
    }
  }
`;

function Cart() {

  const {loading,data} = useQuery(GET_CART);




  return (
    <>
      <SubHeader title='Cart' />
{
  loading ? (<span> Loading...</span>):(
      <CartWrapper>
        <CartItemsWrapper>
          {data && data.cart.products && data.cart.products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </CartItemsWrapper>
            {
              data && data.cart.products.length > 0 && (
                <Button backgroundColor='royalBlue'>
                  Checkout
                </Button>
              )
            }
      </CartWrapper>
  )
}
    </>
  );
};

export default Cart;
