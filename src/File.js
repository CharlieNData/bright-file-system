export default function File(props) {
    return (
        <tr className='file-system__file-list__item file-system__file'>
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.added}</td>
        </tr>
    );
}