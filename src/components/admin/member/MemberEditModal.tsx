import { useState } from "react";
import { X } from "lucide-react";
import type { AdminUser } from "../../../api/adminApi";

type Props = {
  user: AdminUser;
  onClose: () => void;
  onSave: (data: { name: string; phone: string; affiliation: string }) => void;
};

export default function MemberEditModal({ user, onClose, onSave }: Props) {
  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [affiliation, setAffiliation] = useState(user.affiliation ?? "");

  const handleSave = () => {
    onSave({
      name,
      phone,
      affiliation,
    });
  };

  return (
    <div className="member-modal-overlay">
      <div className="member-modal">
        <div className="member-modal-header">
          <h3>회원 정보 수정</h3>

          <button
            type="button"
            className="member-modal-close-button"
            onClick={onClose}
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className="member-modal-body">
          <div className="member-form-group">
            <label>아이디</label>
            <input value={user.id} disabled />
          </div>

          <div className="member-form-group">
            <label>이메일</label>
            <input value={user.email} disabled />
          </div>

          <div className="member-form-group">
            <label>이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="member-form-group">
            <label>전화번호</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
            />
          </div>

          <div className="member-form-group">
            <label>소속</label>
            <input
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="소속을 입력하세요"
            />
          </div>
        </div>

        <div className="member-modal-footer">
          <button className="member-modal-cancel" onClick={onClose}>
            취소
          </button>

          <button className="member-modal-save" onClick={handleSave}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
