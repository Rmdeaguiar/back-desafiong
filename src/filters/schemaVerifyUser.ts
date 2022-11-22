import yup from './settings'

const validateUser = yup.object().shape({
    username: yup.string().required().min(3),
    password: yup.string().required().min(8)
})

export default validateUser