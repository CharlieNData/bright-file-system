export default function Folder(props) {
    return (
        <tr className='file-system__file-list__item file-system__folder' onClick={props.onClick}>
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.added}</td>
        </tr>
    )
}