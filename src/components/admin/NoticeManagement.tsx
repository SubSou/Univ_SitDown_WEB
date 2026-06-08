import { useEffect, useState } from "react";
import {
  createAdminNotice,
  updateAdminNotice,
  deleteAdminNotice,
  type NoticeCategory,
} from "../../api/adminApi";
import {
  getNoticeDetail,
  getNotices,
  type NoticeDetail,
  type NoticeListCategory,
  type NoticeListItem,
} from "../../api/noticeApi";

import NoticeToolbar from "./notice/NoticeToolbar";
import NoticeTable from "./notice/NoticeTable";
import NoticePagination from "./notice/NoticePagination";
import NoticeCreateModal from "./notice/NoticeCreateModal";
import NoticeEditModal from "./notice/NoticeEditModal";

export type NoticeForm = {
  title: string;
  content: string;
  category: NoticeCategory;
};

const initialNoticeForm: NoticeForm = {
  title: "",
  content: "",
  category: "INFO",
};

function NoticeManagement() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [category, setCategory] = useState<NoticeListCategory>("ALL");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(
    null,
  );

  const [newNotice, setNewNotice] = useState<NoticeForm>(initialNoticeForm);

  const [editNotice, setEditNotice] = useState<NoticeForm>(initialNoticeForm);

  const loadNotices = async () => {
    try {
      const response = await getNotices(category, page, 20);
      setNotices(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      console.error("공지사항 목록 조회 에러:", e);
      alert("공지사항 목록 조회 실패");
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchNotices = async () => {
      await Promise.resolve();

      try {
        const response = await getNotices(category, page, 20);

        if (!ignore) {
          setNotices(response.content);
          setTotalPages(response.totalPages);
        }
      } catch (e) {
        console.error("공지사항 목록 조회 에러:", e);

        if (!ignore) {
          alert("공지사항 목록 조회 실패");
        }
      }
    };

    fetchNotices();

    return () => {
      ignore = true;
    };
  }, [category, page]);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const openCreateModal = () => {
    setNewNotice(initialNoticeForm);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setNewNotice(initialNoticeForm);
    setIsCreateModalOpen(false);
  };

  const handleCreateNotice = async () => {
    if (!newNotice.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!newNotice.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      await createAdminNotice(newNotice);

      alert("공지사항이 등록되었습니다.");

      closeCreateModal();
      setPage(0);
      await loadNotices();
    } catch (e) {
      console.error("공지사항 등록 에러:", e);
      alert("공지사항 등록 실패");
    }
  };

  const openEditModal = async (noticeId: string) => {
    try {
      const detail = await getNoticeDetail(noticeId);

      setSelectedNotice(detail);
      setEditNotice({
        title: detail.title,
        content: detail.content,
        category: detail.category,
      });

      setIsEditModalOpen(true);
    } catch (e) {
      console.error("공지사항 상세 조회 에러:", e);
      alert("공지사항 상세 조회 실패");
    }
  };

  const closeEditModal = () => {
    setSelectedNotice(null);
    setEditNotice(initialNoticeForm);
    setIsEditModalOpen(false);
  };

  const handleUpdateNotice = async () => {
    if (!selectedNotice) return;

    if (!editNotice.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!editNotice.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      await updateAdminNotice(selectedNotice.id, editNotice);

      alert("공지사항이 수정되었습니다.");

      closeEditModal();
      await loadNotices();
    } catch (e) {
      console.error("공지사항 수정 에러:", e);
      alert("공지사항 수정 실패");
    }
  };

  const handleDeleteNotice = async (noticeId: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteAdminNotice(noticeId);

      alert("공지사항이 삭제되었습니다.");

      await loadNotices();
    } catch (e) {
      console.error("공지사항 삭제 에러:", e);
      alert("공지사항 삭제 실패");
    }
  };

  const handleCategoryChange = (value: NoticeListCategory) => {
    setCategory(value);
    setPage(0);
  };

  return (
    <>
      <section className="content-box notice-page-box">
        <NoticeToolbar
          keyword={keyword}
          category={category}
          onKeywordChange={setKeyword}
          onCategoryChange={handleCategoryChange}
          onCreateClick={openCreateModal}
        />

        <NoticeTable
          notices={filteredNotices}
          onEdit={openEditModal}
          onDelete={handleDeleteNotice}
        />

        <NoticePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>

      {isCreateModalOpen && (
        <NoticeCreateModal
          notice={newNotice}
          onChange={setNewNotice}
          onClose={closeCreateModal}
          onSave={handleCreateNotice}
        />
      )}

      {isEditModalOpen && selectedNotice && (
        <NoticeEditModal
          notice={editNotice}
          onChange={setEditNotice}
          onClose={closeEditModal}
          onSave={handleUpdateNotice}
        />
      )}
    </>
  );
}

export default NoticeManagement;
