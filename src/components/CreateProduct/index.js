import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./style.scss";
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
function CreateProduct(props) {
    const { handleReload } = props;
    const [category, setCategory] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        const getApi = () => {
            fetch("http://localhost:3002/category")
                .then(res => res.json())
                .then(data => {
                    setCategory(data);
                })
        }
        getApi();
    }, [])
    const handleChange = (e) => {
        let e_name = e.target.name;
        let e_value = e.target.value;
        console.log(e_name)
        setValues(values => {
            return {
                ...values,
                [e_name]: e_value
            };
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let valuesFinal = {
            ...values,
            rating: 0
        };
        console.log("khi gửi", values);
        fetch("http://localhost:3002/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valuesFinal)
        })
            .then(res => res.json())
            .then(data => {
                console.log("khi nhận", data);
                if (data) {
                    setIsOpen(false);
                    setValues({});
                    handleReload();

                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <>
            <div className='button'>
                <button onClick={openModal}>Create Product</button>
            </div>
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
                                    <label htmlFor="title">Tên sản phẩm </label>
                                </td>
                                <td>
                                    <input name='title' type="text" id='title' onChange={handleChange} />
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
                                    <input name='price' type="number" min={1} id='price' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="discountPercentage">Giảm giá</label>
                                </td>
                                <td>
                                    <input name='discountPercentage' type="text" id='discountPercentage' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="stock">Số lượng còn lại</label>
                                </td>
                                <td>
                                    <input name='stock' type="text" id='stock' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="thumbnail">Đường dẫn ảnh</label>
                                </td>
                                <td>
                                    <input name='thumbnail' type="text" id='thumbnail' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="description">Mô tả</label>
                                </td>
                                <td>
                                    <textarea name='description' type="text" id='description' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>Đóng</button>
                                </td>
                                <td>
                                    <button type='submit' >Tạo Mới</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    );
}
export default CreateProduct;