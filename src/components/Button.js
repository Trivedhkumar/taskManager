import PropTypes from 'prop-types'


const Button = ({title,color,onClick}) => {
    return (
        <button
        style={{
            backgroundColor:color
        }}
        className = 'btn'
        onClick={onClick}
        >{title}</button>
    )
}


Button.defaultProps = {
    title:"Add",
    color:"steeleblue"
}

Button.propsTypes = {
    title : PropTypes.string.isRequired,
    color : PropTypes.string,
    onClick:PropTypes.func,
}
export default Button;
