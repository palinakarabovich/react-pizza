import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";
import Search from "./Search";

const Header:React.FC = () => {

  const { totalPrice, totalQuantity } = useAppSelector(state => state.cart);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to='/' className="header__link"><div className="header__logo-block">
          <div className="header__logo-image"></div>
          <div className="header__moto-block">
            <p className="header__moto-block__first-line">react pizza</p>
            <p className="header__moto-block__second-line">самая вкусная пицца во вселенной</p>
          </div>
        </div>
        </Link>
        <Search />
        <Link to='/cart' className="header__cart-block header__cart">
          <p className="header__cart-price">{totalPrice} $</p>
          <div className="header__cart-image"></div>
          <p className="header__cart-quantity">{totalQuantity}</p>
        </Link>
      </div>
    </header >
  )
}

export default Header;