import {Input, Button} from '../../components';

const Login = () => {
    return (
        <section className="container-fluid wrapper login">
            <div className="row h-100">
                <div className="ilustrasi col-lg-8"></div>
                <div className="form-register col-lg-4 px-5 d-flex justify-content-center flex-column">
                    <h3 className="mb-4"><b>Form Login</b></h3>
                    <Input 
                        label="email"   
                        type="email" className="form-control" id="email" 
                        aria-describedby="emailHelp"
                    />
                    <Input 
                        label="password"
                        type="password" className="form-control" id="password"
                    />
                    <Button title="Login" type="submit" className="btn btn-primary mt-5" />
                    <div className="text-grey mt-3 text-center">Belum punya akun? Silahkan mendaftar</div>
                </div>
            </div>
        </section>
    )
}

export default Login;