import '../css/Search.css';
import closeButton from '../img/close-button.svg'
import React from 'react';
import debounce from 'lodash.debounce';
import { setSearch } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../hooks/useDispatch';

const Search: React.FC = () => {

  const dispatch = useAppDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>('');

  const onClickClear = () => {
    setValue('');
    dispatch(setSearch(''));
    inputRef.current?.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((v) => {
      dispatch(setSearch(v));
    }, 1000),
    [],
  )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase());
    updateSearchValue(e.target.value.toLowerCase());
  }

  return (
    <div className="search">
      <input placeholder="Type to search..." className="search__input" value={value} onChange={onChangeInput} ref={inputRef} />
      {value && <img src={closeButton} className='search__close-button' alt='close-button' onClick={onClickClear} />}
    </div>
  )
}

export default Search;