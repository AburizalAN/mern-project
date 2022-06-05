const Input = ({label, text, ...rest}) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input {...rest} />
            <div id="emailHelp" className="form-text">{text}</div>
        </div>
    )
}

export default Input;