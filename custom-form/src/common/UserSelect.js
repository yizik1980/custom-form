import Select from "../shared/Select";
import { useI18n } from "../i18n/I18nContext.js";

function UserSelect({selectUser, users, selectedUserId}) {
    const { t } = useI18n();
    
    const selectionUser = (value) => {
        selectUser(value);
    }
  
    // Find the currently selected user's label
    const selectedUserLabel = selectedUserId && users?.length > 0 
        ? users.find(u => u._id === selectedUserId)?.label || users.find(u => u._id === selectedUserId)?.name || t('userSelect.placeholder')
        : t('userSelect.placeholder');
 
  return (
    <div>
      <Select label={selectedUserLabel} list={users} onChange={selectionUser} >
      </Select>
    </div>
  )
}

export default UserSelect


