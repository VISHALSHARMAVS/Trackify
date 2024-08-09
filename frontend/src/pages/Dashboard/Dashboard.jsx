import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../component/Product/ProductList/ProductList";
import ProductSummary from "../../component/Product/ProductSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../CustomHooks/UseRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../Redux/Feature/Auth/AuthSlice";
import { getProducts } from "../../Redux/Feature/Product/ProductSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;