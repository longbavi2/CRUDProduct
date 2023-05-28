import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
function EditProduct(props) {
    const { item, handleReload } = props;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState(item);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getApi = () => {
            fetch("https://api-json-eta.vercel.app/category")
                .then(res => res.json())
                .then(data => {
                    setCategory(data);
                })
        }
        getApi();
    }, [])
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleChange = (e) => {
        let e_name = e.target.name;
        let e_value = e.target.value;
        setValues(values => {
            return {
                ...values,
                [e_name]: e_value
            };
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api-json-eta.vercel.app/products/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsOpen(false);
                    handleReload();

                    Swal.fire({
                        icon: 'success',
                        title: 'Bạn đã cập nhật thành công.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                setIsOpen(false);
                handleReload();
            });

    }
    return (
        <>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <form onSubmit={handleSubmit} action="">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="title">Tên sản phẩm</label>
                                </td>
                                <td>
                                    <input value={values.title} name='title' type="text" id='title' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="category">Danh Mục</label>
                                </td>
                                <td>
                                    <select onChange={handleChange} name="category" id="category">
                                        {category.length > 0 && (
                                            category.map((item, index) => (
                                                <option name="category" key={index} value={item} >{item}</option>
                                            ))
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="price">Giá</label>
                                </td>
                                <td>
                                    <input value={values.price} name='price' min={1} type="number" id='price' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="discountPercentage">Giảm giá</label>
                                </td>
                                <td>
                                    <input value={values.discountPercentage} name='discountPercentage' type="number" id='discountPercentage' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="stock">Số lượng còn lại</label>
                                </td>
                                <td>
                                    <input value={values.stock} name='stock' type="number" min={0} id='stock' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="thumbnail">Đường dẫn ảnh</label>
                                </td>
                                <td>
                                    <input value={values.thumbnail} name='thumbnail' type="text"  id='thumbnail' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="description">Mô tả</label>
                                </td>
                                <td>
                                    <textarea value={values.description} name='description' type="text" id='description' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>Đóng</button>
                                </td>
                                <td>
                                    <button type='submit' >Cập Nhật</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    );
}
export default EditProduct;