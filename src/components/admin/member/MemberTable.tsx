import type { AdminUser } from "../../../api/adminApi";

type Props = {
  members: AdminUser[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
};

export default function MemberTable({ members, onEdit, onDelete }: Props) {
  return (
    <div className="member-table-wrap">
      <table className="member-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.createdAt}</td>
              <td>
                <div className="member-actions">
                  <button
                    className="member-edit-button"
                    onClick={() => onEdit(member.id)}
                  >
                    수정
                  </button>

                  <button
                    className="member-delete-button"
                    onClick={() => onDelete(member.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
