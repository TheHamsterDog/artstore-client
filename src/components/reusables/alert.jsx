import Alert from '@mui/material/Alert';

const AlertComponent = (props) => {
    return (<Alert severity={props.type} style={{
        fontSize:"1.6rem", 
        display:"flex",
        alignItems:"center",
        marginBottom:'1rem'
    }}onClose={props.onClose}>{props.message}</Alert>)
}

export default AlertComponent