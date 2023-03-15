import PizzaLoaderSkeleton from "./PizzaLoaderSkeleton";
import PizzaBlock from "./PizzaBlock";
import Categories from "./Categories";
import Sort from "./Sort";
import React from "react";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { Pizza } from "../@types/types";
import { useAppSelector } from "../hooks/useSelector";
import { useAppDispatch } from "../hooks/useDispatch";

const MainPage: React.FC = () => {
  
  const category = useAppSelector(state => state.filter.category);
  const sortType = useAppSelector(state => state.filter.sortType);
  const search = useAppSelector(state => state.filter.search);
  const { loading, items } = useAppSelector(state => state.pizzas);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  React.useEffect(() => {
    const params = {
      category, sortType, search
    }
    dispatch(fetchPizzas(params));
  }, [category, sortType, search, dispatch])

  React.useEffect(() => {
    if(cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems])

  return (
    <div className="main-page">
      <div className="main-page__top">
        <div className="main-page__top-categories">
          <Categories />
        </div>
        <Sort />
      </div>
      <h2 className="main-page__title">All pizzas</h2>
      <div className="main-page__items">
        {loading && items.length === 0
          ? [...new Array(8)].map((_, index) => <PizzaLoaderSkeleton key={index} />)
          :
          items.length !== 0 ?
            items.map((pizza: Pizza, index: number) => <PizzaBlock {...pizza} key={index} />)
            : <p>We can not find '{search}' pizza fo you.</p>}
      </div>
    </div>
  )
}

export default MainPage;