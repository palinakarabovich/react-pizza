import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PizzaInCart } from "../@types/types";
import { useAppDispatch } from "../hooks/useDispatch";
import { useAppSelector } from "../hooks/useSelector";
import { addToCartFromStorage } from "../redux/slices/cartSlice";
import Search from "./Search";

const Header: React.FC = () => {

  const { totalPrice, totalQuantity, storage } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const location = useLocation();

  React.useEffect(() => {
    const pizzas = localStorage.getItem('cart');
    if (pizzas && !storage) {
      JSON.parse(pizzas).forEach((p: PizzaInCart) => {
        dispatch(addToCartFromStorage(p));
      })
    }
  }, [])

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to='/' className="header__link"><div className="header__logo-block">
          <div className="header__logo-image"></div>
          <div className="header__moto-block">
            <p className="header__moto-block__first-line">react pizza</p>
            <p className="header__moto-block__second-line">The most delicious pizza in the universe!</p>
          </div>
        </div>
        </Link>
        {
          location.pathname !== '/cart'
          && <>< Search />
            <Link to='/cart' className="header__cart-block header__cart">
              <p className="header__cart-price">{totalPrice} $</p>
              <div className="header__cart-image"></div>
              <p className="header__cart-quantity">{totalQuantity}</p>
            </Link>
          </>
        }
      </div>
    </header >
  )
}

export default Header;