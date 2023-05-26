import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import CreateProduct from "../CreateProduct";
import "./style.scss";
function ProductList() {
    const [Data, SetData] = useState([]);
    const getApi = async () => {
        var res = await fetch("http://localhost:3002/products");
        var result = await res.json();
        SetData(result.reverse());
    }
    useEffect(() => {
        getApi();
    }, [])
    const handleReload=()=>{
        getApi();
    }
    return (
        <>
            <div className="product__head">
                <h4>
                    Danh Sách Sản Phẩm
                </h4>
                <CreateProduct handleReload={handleReload}/>
            </div>
            {Data.length > 0 && (<>
                <div className="product__list">
                    {Data.map(item => (
                        <ProductItem handleReload={handleReload} key={item.id} item={item} />
                    ))}
                </div>
            </>)}
        </>
    );
}
export default ProductList;