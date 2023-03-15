import iconCart from '../img/cart-grey.png'
import iconTrash from '../img/small-cart.png'
import { clearCart, countMinus, countPlus, removeItem } from '../redux/slices/cartSlice';
import { PizzaInCart } from '../@types/types';
import { useAppSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../hooks/useDispatch';
import React from 'react';

const Cart: React.FC = () => {

  const { items, totalPrice, totalQuantity } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if(items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, totalPrice, totalQuantity])

  const onClickMinus = (item: PizzaInCart) => {
    dispatch(countMinus(item));
  }

  const onClickPlus = (item: PizzaInCart) => {
    dispatch(countPlus(item));
  }

  const onClickDeleteItem = (item: PizzaInCart) => {
    dispatch(removeItem(item))
  }

  const onClickResetCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="cart">
      <div className='cart__header'>
        <h2 className="car__header-title"><img className="cart__header-icon" src={iconCart} alt="cart icon" />Корзина</h2>
        <button className='cart__header-reset-button' onClick={onClickResetCart}><img src={iconTrash} alt="trash icon" className='cart__header-reset-button-icon' />Очистить корзину</button>
      </div>
      <ul className='cart__content'>
        {
          items.length !== 0
            ? items.map((pizza: PizzaInCart, index: number) => (
              <li className='car__content-row row' key={index}>
                <div className='row__text'>
                  <img src={pizza.imageUrl} className="row__img" alt="pizza" />
                  <h3 className='row__text-title'>{pizza.title}</h3>
                  <p className='row__text-description'>{pizza.dough} тесто, {pizza.size} см.</p>
                </div>
                <div className='row__quantity'>
                  <button className='row__quantity-minus-button' onClick={() => onClickMinus(pizza)} />
                  <p className='row__quantity-number'>{pizza.quantity}</p>
                  <button className='row__quantity-plus-button' onClick={() => onClickPlus(pizza)} />
                </div>
                <p className='row__price'>{pizza.price} ₽</p>
                <button className='row__delete-button' onClick={() => onClickDeleteItem(pizza)} />
              </li>
            ))
            : <p>Вы еще не выбрали ни одной пиццы.</p>
        }

      </ul>
      <div className='cart__total'>
        <p className='cart__total-text'>Всего пицц: <span className="cart__total-text-number">{totalQuantity} шт.</span></p>
        <p className='cart__total-text'>Сумма заказа:  <span className="cart__total-text-price">{totalPrice} ₽</span></p>
      </div>
      <div className='cart__buttons'>
        <button className='cart__buttons-back'>Вернуться назад</button>
        <button className='cart__buttons-pay'>Оплатить заказ</button>
      </div>
    </div>
  )
}
export default Cart;