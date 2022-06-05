import { LoginImage } from '../../../assets';

import "./upload.scss";

const Upload = ({img, ...props}) => {
    return (
        <div className="d-flex align-items-end mb-3">
            {img && <img src={img} className="preview me-3" alt="preview"/>}
            <input type="file" {...props}/>
        </div>
    )
}

export default Upload;