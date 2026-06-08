import { useEffect, useState } from "react";
import {
  getAdminUsers,
  getAdminUserDetail,
  updateAdminUser,
  deleteAdminUser,
  type AdminUser,
} from "../../api/adminApi";

import MemberToolbar from "./member/MemberToolbar";
import MemberTable from "./member/MemberTable";
import MemberPagination from "./member/MemberPagination";
import MemberEditModal from "./member/MemberEditModal";

export default function MemberManagement() {
  const [memberList, setMemberList] = useState<AdminUser[]>([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchMembers = async () => {
      await Promise.resolve();

      try {
        setLoading(true);

        const response = await getAdminUsers(page, 20);

        if (!ignore) {
          setMemberList(response.content);
          setTotalPages(response.totalPages);
        }
      } catch (e) {
        console.error("회원 목록 조회 에러:", e);

        if (!ignore) {
          alert("회원 목록 조회 실패");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      ignore = true;
    };
  }, [page]);

  const loadMembers = async () => {
    try {
      const response = await getAdminUsers(page, 20);
      setMemberList(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      console.error("회원 목록 조회 에러:", e);
      alert("회원 목록 조회 실패");
    }
  };

  const filteredMembers = memberList.filter((member) => {
    const searchText = `${member.id} ${member.name} ${member.email}`;
    return searchText.toLowerCase().includes(keyword.toLowerCase());
  });

  const openEditModal = async (userId: string) => {
    try {
      const userDetail = await getAdminUserDetail(userId);
      setSelectedUser(userDetail);
      setIsEditModalOpen(true);
    } catch (e) {
      console.error(e);
      alert("회원 상세 조회 실패");
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (data: {
    name: string;
    phone: string;
    affiliation: string;
  }) => {
    if (!selectedUser) return;

    try {
      await updateAdminUser(selectedUser.id, {
        name: data.name,
        phone: data.phone,
        affiliation: data.affiliation,
      });

      alert("회원 정보가 수정되었습니다.");

      closeEditModal();

      await loadMembers();
    } catch (e) {
      console.error(e);
      alert("회원 정보 수정 실패");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const result = window.confirm("정말 삭제하시겠습니까?");

    if (!result) return;

    try {
      await deleteAdminUser(userId);

      alert("회원이 삭제되었습니다.");

      await loadMembers();
    } catch (e) {
      console.error(e);
      alert("회원 삭제 실패");
    }
  };

  if (loading) {
    return <div className="member-page">회원 목록 불러오는 중...</div>;
  }

  return (
    <section className="member-page">
      <div className="member-card">
        <MemberToolbar keyword={keyword} onKeywordChange={setKeyword} />

        <MemberTable
          members={filteredMembers}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />

        <MemberPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {isEditModalOpen && selectedUser && (
        <MemberEditModal
          user={selectedUser}
          onClose={closeEditModal}
          onSave={handleUpdateUser}
        />
      )}
    </section>
  );
}
