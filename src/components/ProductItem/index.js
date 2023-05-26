import DeleteProduct from "../DeleteProduct";
import EditProduct from "../EditProduct";

function ProductItem(props) {
    const { item,handleReload } = props;
    return (
        <>
            <div key={item.id} className="product__item">
                <div className="product__box">
                    <div className="product__image">
                        <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="product_content">
                        <h2 className="product__title">
                            {item.title}
                        </h2>
                        <div className="product__discountPercentage">
                                {item.discountPercentage}%
                            </div>
                        <div className="product__meta">
                            <div className="product__price">
                                {item.price}$
                            </div>
                            <div className="product__stock">
                                Còn lại : {item.stock}SP
                            </div>
                        </div>
                    </div>
                    <div className="product__button">
                        <EditProduct handleReload={handleReload} item={item}/>
                        <DeleteProduct handleReload={handleReload} item={item}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductItem;