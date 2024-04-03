const Message = ({msg, type}) => {
    return (
        <div className={`w-full p-5 text-center border rounded mt-2 ${type}`}>
            <p>{msg}</p>
        </div>
    )
}

export default Message;