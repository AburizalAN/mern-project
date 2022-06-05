import image from '../images/register_image.jpg';

const RegisterImage = ({...props}) => {
    return (
        <img src={image} alt="register image" {...props} />
    )
}

export default RegisterImage;