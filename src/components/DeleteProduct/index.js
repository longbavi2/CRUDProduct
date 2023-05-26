import Swal from 'sweetalert2'
function DeleteProduct(props) {
    const { item, handleReload } = props;
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3002/products/${item.id}`, {
                    method: "DELETE",
                })
                    .then(data => {
                        handleReload();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
            }
        })
    }

    return (
        <>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
}
export default DeleteProduct;