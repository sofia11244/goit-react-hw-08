import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../redux/filters/slice.js';  // Redux slice'ını import edelim

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filters.nameFilter); // Redux store'dan mevcut filter değerini alıyoruz

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));  // input değeri değiştiğinde Redux'a dispatch ediyoruz
  };

  return (
    <div>
      <label htmlFor="filter">Filter contacts by name:</label>
      <input
        id="filter"
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default Filter;
