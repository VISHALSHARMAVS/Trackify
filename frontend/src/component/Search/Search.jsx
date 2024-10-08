/* eslint-disable react/prop-types */

import  "./Search.css";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={'search'}>
      <BiSearch size={18} className={'icon'} />
      <input
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;