import * as Yup from 'yup'


export const addProductValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("Quantity is required"),
    condition: Yup.string().required("Condition is required"),
    makes_model_year: Yup.string().required("makes,model,year is required"),
    brand: Yup.string().required("Brand is required"),
    category_name: Yup.string().required("Category is required"),
    subcategory_name: Yup.string().required("Sub Category is required"),
    images: Yup.mixed().required('Image is required')
    .test('fileCount', 'You can only upload up to 5 images', value => {
      if (value) {
        return value.length <= 5;
      }
      return true;
    })

 })