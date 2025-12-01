
function UserSelect({selectUser, users}) {
    const selectionUser = (e) => {
        const selectedUserId = e.target.value;
        console.log("Selected user ID:", selectedUserId);
        selectUser(selectedUserId);
    }
  return (
    <div>
      <select name="selectUser" id="select-user" onChange={selectionUser} >
        <option value="">-- Select User --</option>
        {users.map((user)=>
            <option key={user._id} value={user._id}>{user.name}</option>
        )}
      </select>
    </div>
  )
}


export default UserSelect


