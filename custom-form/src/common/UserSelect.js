import Select from "../shared/Select";
import { useI18n } from "../i18n/I18nContext.js";

function UserSelect({selectUser, users}) {
    const { t } = useI18n();
    const selectionUser = (value) => {
        console.log("Selected user ID:", value);
        selectUser(value);
    }
  return (
    <div>
      <Select value={t('userSelect.placeholder')} list={users} onChange={selectionUser} >
      </Select>
    </div>
  )
}

export default UserSelect


