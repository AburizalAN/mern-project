import './register.scss';
import {Input, Button} from '../../components';

const Register = () => {
    return (
        <section className="container-fluid wrapper register">
            <div className="row h-100">
                <div className="ilustrasi col-lg-8"></div>
                <div className="form-register col-lg-4 px-5 d-flex justify-content-center flex-column">
                    <h3 className="mb-4"><b>Form Register</b></h3>
                    <Input 
                        label="full name"
                        type="text" className="form-control" id="full_name"
                    />
                    <Input 
                        label="email" 
                        text="We'll never share your email with anyone else." 
                        type="email" className="form-control" id="email" 
                        aria-describedby="emailHelp"
                    />
                    <Input 
                        label="password"
                        type="password" className="form-control" id="password"
                    />
                    <Button title="Register" type="submit" className="btn btn-primary mt-5" />
                    <div className="text-grey mt-3 text-center">Kembali ke Login</div>
                </div>
            </div>
        </section>
    )
}

export default Register;