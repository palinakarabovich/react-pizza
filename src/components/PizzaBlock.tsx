import plus from '../img/plus.svg';
import React from 'react';
import { addToCart } from '../redux/slices/cartSlice';
import { Pizza, PizzaInCart } from '../@types/types';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';

const PizzaBlock: React.FC<Pizza> = ({ imageUrl, title, types, sizes, price, id }) => {
  const typesArr = ['american crust', 'italian crust'];
  const [selectedDough, setSelectedDough] = React.useState<number>(0);
  const [selectedSize, setSelectedSize] = React.useState<number>(0);
  const [selectedSizeCm, SetSelectedSizeCm] = React.useState<string>(sizes[0]);
  const [selectedDoughType, setSelectedDoughType] = React.useState<string>(typesArr[types[0]]);
  const [quantity, setQuantity] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  const { items } = useAppSelector(state => state.cart);

  React.useEffect(() => {
    countQuantity();
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const onClickAddToCart = () => {
    dispatch(addToCart({
      id,
      imageUrl,
      title,
      price: Number(price),
      dough: selectedDoughType,
      size: selectedSizeCm,
      selectedDough,
      selectedSize
    }));
  }

  const onClickDough = (index: number, type: number) => {
    setSelectedDoughType(typesArr[type]);
    setSelectedDough(index);
  }

  const onClickSize = (index: number, size: string) => {
    setSelectedSize(index);
    SetSelectedSizeCm(size);
  }

  const countQuantity = () => {
    setQuantity(state => state = 0)
    const filtretedPizzas = items.filter((i: PizzaInCart) => i.id === id);
    filtretedPizzas.forEach((f: PizzaInCart) => {
      setQuantity(state => state + f.quantity)
    })
  }


  return (
    <div className="pizza-block">
      <img src={imageUrl} alt={title} className="pizza-block__image" />
      <h4 className="pizza-block__title"> {title} </h4>
      <div className="pizza-block__selector">
        <ul className="pizza-block__selector_type_dough pizza-dough">
          {types.map((type, index) => (
            <li className={`pizza-dough__parameter ${selectedDough === index ? 'pizza-dough__parameter_active' : ''}`} onClick={() => onClickDough(index, type)} key={index}> {typesArr[type]} </li>
          ))}
        </ul>
        <ul className="pizza-block__selector_type_size pizza-size">
          {sizes.map((size, index) => (
            <li className={`pizza-size__parameter ${selectedSize === index ? 'pizza-size__parameter_active' : ''}`} onClick={() => onClickSize(index, size)} key={index}> {size} cm </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__checkout">
        <p className="pizza-block__checkout-price">from {price}$</p>
        <div className="pizza-block__checkout-button" onClick={onClickAddToCart}>
          <img src={plus} alt="plus" className="pizza-block__checkout-button-image" />
          Add to cart
          {quantity !== 0
            && <div className='pizza-block__checkout-button-quantity'>
              {quantity}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;