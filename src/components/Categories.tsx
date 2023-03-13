import React from "react";
import { useAppDispatch } from "../hooks/useDispatch";
import { useAppSelector } from "../hooks/useSelector";
import { setCategory } from "../redux/slices/filterSlice";

const categories: string[] = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Остые', 'Закрытые']

const Categories: React.FC = () => { 

  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.filter.category);

  return (
    <>
    {categories.map((c, index) => (
          <div onClick={() => dispatch(setCategory(index))} className={`category-block ${category === index ? 'category-block_active' : ''}`} key={index}>
          <p className="category-block__title"> {c}</p>
        </div>
    ))}
    </>
  );
}

export default Categories;