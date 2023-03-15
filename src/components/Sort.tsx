import React from "react";
import { Category } from "../@types/types";
import { useAppDispatch } from "../hooks/useDispatch";
import { useAppSelector } from "../hooks/useSelector";
import { setSortType } from "../redux/slices/filterSlice";

const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(state => state.filter.sortType);
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const sort: Category[] = [
    { name: 'most popular', sortProperty: 'raiting' },
    { name: 'price', sortProperty: 'price' },
    { name: 'A-Z', sortProperty: 'title' }
  ];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<number>(0);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickCategory = (index: number, category: Category) => {
    setSelectedCategoryIndex(index);
    setPopupOpen(false);
    dispatch(setSortType(category))
  }

  React.useEffect(() => {
    const handleClickOutsidePopup = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setPopupOpen(false);
      }
    }
    document.body.addEventListener('click', handleClickOutsidePopup)
    return () => document.body.removeEventListener('click', handleClickOutsidePopup)
  }, [])

  return (
    <div className="sort" ref={sortRef}>
      <p className="sort__title">
        Sort by:
      </p>
      <p className="sort__parameter" onClick={() => setPopupOpen(true)}>
        {sortType.name}
      </p>
      {popupOpen && (
        <div className="sort__popup">
          <ul className="sort__popup-list">
            {sort.map((category, index) => (
              <li className={`sort__popup-category ${index === selectedCategoryIndex ? 'sort__popup-category_aclive' : ''}`} onClick={() => onClickCategory(index, category)} key={index}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;