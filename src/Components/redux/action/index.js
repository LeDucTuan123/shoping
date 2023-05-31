// Add product

const addProduct = (product) => {
    return {
        type: 'ADD-PRODUCT',
        payload: product
    }
}

//Delete product
const  deleteProduct = (product) => {
    return {
        type: 'DELETE-PRODUCT',
        payload: product
    }
}

export {addProduct, deleteProduct}