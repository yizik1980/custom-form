import Select from "../shared/Select";

function UserSelect({selectUser, users}) {
    const selectionUser = (value) => {
        console.log("Selected user ID:", value);
        selectUser(value);
    }
  return (
    <div>
      <Select value={'users List'} list={users} onChange={selectionUser} >
      </Select>
    </div>
  )
}


export default UserSelect


