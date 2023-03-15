import iconCart from '../img/cart-grey.png'
import iconTrash from '../img/small-cart.png'
import { clearCart, countMinus, countPlus, removeItem } from '../redux/slices/cartSlice';
import { PizzaInCart } from '../@types/types';
import { useAppSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../hooks/useDispatch';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {

  const { items, totalPrice, totalQuantity } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const onClickMinus = (item: PizzaInCart) => {
    dispatch(countMinus(item));
  }

  const onClickPlus = (item: PizzaInCart) => {
    dispatch(countPlus(item));
  }

  const onClickDeleteItem = (item: PizzaInCart) => {
    dispatch(removeItem(item));
  }

  const onClickResetCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className="cart">
      <div className='cart__header'>
        <h2 className="car__header-title"><img className="cart__header-icon" src={iconCart} alt="cart icon" />Cart</h2>
        {
          items.length !== 0
          && <button className='cart__header-reset-button' onClick={onClickResetCart}><img src={iconTrash} alt="trash icon" className='cart__header-reset-button-icon' />Clear all</button>
        }
      </div>
      <ul className='cart__content'>
        {
          items.length !== 0
            ? items.map((pizza: PizzaInCart, index: number) => (
              <li className='car__content-row row' key={index}>
                <div className='row__text'>
                  <img src={pizza.imageUrl} className="row__img" alt="pizza" />
                  <h3 className='row__text-title'>{pizza.title}</h3>
                  <p className='row__text-description'>{pizza.dough}, {pizza.size} сm</p>
                </div>
                <div className='row__quantity'>
                  <button className='row__quantity-minus-button' onClick={() => onClickMinus(pizza)} />
                  <p className='row__quantity-number'>{pizza.quantity}</p>
                  <button className='row__quantity-plus-button' onClick={() => onClickPlus(pizza)} />
                </div>
                <p className='row__price'>{pizza.price}$</p>
                <button className='row__delete-button' onClick={() => onClickDeleteItem(pizza)} />
              </li>
            ))
            : <p>The cart is empty. Choose your favourite pizza <Link to='react-pizza/' className="cart__link">here</Link></p>
        }
      </ul>
      {
        items.length !== 0
        &&
        <div className='cart__total'>
          <p className='cart__total-text'>Total pizzas: <span className="cart__total-text-number">{totalQuantity} </span></p>
          <p className='cart__total-text'>Total price:  <span className="cart__total-text-price">{totalPrice}$</span></p>
        </div>
      }
      <div className='cart__buttons'>
        <button className='cart__buttons-back' onClick={() => navigate(-1)}>Back</button>
        <button className={`cart__buttons-pay ${items.length === 0 ? 'cart__buttons-pay_inactive' : ''}`} >Pay and order</button>
      </div>
    </div>
  )
}
export default Cart;