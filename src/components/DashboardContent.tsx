import { useState } from "react";
import type { MenuType } from "../pages/HomePage";
import { stats, recentMembers, seatList, noticeList } from "../data/dummyData";

type Props = {
  selectedMenu: MenuType;
};

type Member = {
  id: string;
  name: string;
  email: string;
  date: string;
};

type Notice = {
  title: string;
  type: string;
  date: string;
};

function DashboardContent({ selectedMenu }: Props) {
  const [members, setMembers] = useState<Member[]>(recentMembers);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [notices, setNotices] = useState<Notice[]>(noticeList);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState<Notice>({
    title: "",
    type: "공지",
    date: "",
  });

  const handleSaveMember = () => {
    if (!selectedMember) return;

    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id ? selectedMember : member,
      ),
    );

    setSelectedMember(null);
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.date) {
      alert("제목과 등록일을 입력해주세요.");
      return;
    }

    setNotices((prev) => [newNotice, ...prev]);

    setNewNotice({
      title: "",
      type: "공지",
      date: "",
    });

    setIsNoticeModalOpen(false);
  };

  if (selectedMenu === "member") {
    return (
      <>
        <section className="content-box member-page-box">
          <div className="member-header">
            <h3>회원 관리</h3>

            <button className="add-member-button">+ 회원 추가</button>
          </div>

          <div className="member-search-box">
            <span>🔍</span>
            <input placeholder="아이디, 이름, 이메일 검색" />
          </div>

          <table className="admin-table member-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member, index) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.date}</td>
                  <td>
                    <span
                      className={`member-status ${
                        index === members.length - 1 ? "inactive" : "active"
                      }`}
                    >
                      {index === members.length - 1 ? "비활성" : "활성"}
                    </span>
                  </td>
                  <td>
                    <div className="member-action">
                      <button
                        className="member-edit-button"
                        onClick={() => setSelectedMember(member)}
                      >
                        수정
                      </button>

                      <button className="member-delete-button">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button">4</button>
            <button className="page-button">5</button>
            <button className="page-button">〉</button>
          </div>
        </section>

        {selectedMember && (
          <div className="modal-backdrop">
            <div className="edit-modal">
              <div className="modal-header">
                <h3>회원정보 수정</h3>
                <button onClick={() => setSelectedMember(null)}>×</button>
              </div>

              <div className="modal-body">
                <label>아이디</label>
                <input value={selectedMember.id} disabled />

                <label>이름</label>
                <input
                  value={selectedMember.name}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      name: e.target.value,
                    })
                  }
                />

                <label>이메일</label>
                <input
                  value={selectedMember.email}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      email: e.target.value,
                    })
                  }
                />

                <label>가입일</label>
                <input
                  value={selectedMember.date}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="cancel-button"
                  onClick={() => setSelectedMember(null)}
                >
                  취소
                </button>
                <button className="save-button" onClick={handleSaveMember}>
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (selectedMenu === "seat") {
    return (
      <section className="content-box seat-page-box">
        <div className="seat-header">
          <h3>좌석 관리</h3>
          <button className="add-seat-button">+ 좌석 추가</button>
        </div>

        <table className="admin-table seat-table">
          <thead>
            <tr>
              <th>좌석 코드</th>
              <th>구역</th>
              <th>행</th>
              <th>열</th>
              <th>유형</th>
              <th>특징</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {seatList.map((seat) => (
              <tr key={seat.code}>
                <td>{seat.code}</td>
                <td>{seat.area}</td>
                <td>{seat.row}</td>
                <td>{seat.col}</td>
                <td>{seat.type}</td>
                <td>{seat.feature}</td>
                <td>
                  <span className="status-badge">{seat.status}</span>
                </td>
                <td>
                  <div className="seat-action">
                    <button className="seat-edit-button">수정</button>
                    <button className="seat-delete-button">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <button className="page-button">4</button>
          <button className="page-button">5</button>
          <button className="page-button">〉</button>
        </div>
      </section>
    );
  }

  if (selectedMenu === "notice") {
    return (
      <>
        <section className="content-box notice-page-box">
          <div className="notice-header">
            <h3>공지사항</h3>

            <button
              className="add-notice-button"
              onClick={() => setIsNoticeModalOpen(true)}
            >
              + 공지사항 추가
            </button>
          </div>

          <div className="notice-search-box">
            <span>🔍</span>
            <input placeholder="제목, 분류 검색" />
          </div>

          <table className="admin-table notice-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>분류</th>
                <th>등록일</th>
                <th>관리</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((notice, index) => (
                <tr key={`${notice.title}-${index}`}>
                  <td>{notice.title}</td>
                  <td>
                    <span className="notice-type-badge">{notice.type}</span>
                  </td>
                  <td>{notice.date}</td>
                  <td>
                    <div className="notice-action">
                      <button className="notice-edit-button">수정</button>
                      <button className="notice-delete-button">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button">4</button>
            <button className="page-button">5</button>
            <button className="page-button">〉</button>
          </div>
        </section>

        {isNoticeModalOpen && (
          <div className="modal-backdrop">
            <div className="edit-modal">
              <div className="modal-header">
                <h3>공지사항 등록</h3>
                <button onClick={() => setIsNoticeModalOpen(false)}>×</button>
              </div>

              <div className="modal-body">
                <label>제목</label>
                <input
                  value={newNotice.title}
                  placeholder="공지사항 제목을 입력하세요"
                  onChange={(e) =>
                    setNewNotice({
                      ...newNotice,
                      title: e.target.value,
                    })
                  }
                />

                <label>분류</label>
                <select
                  className="modal-select"
                  value={newNotice.type}
                  onChange={(e) =>
                    setNewNotice({
                      ...newNotice,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="공지">공지</option>
                  <option value="안내">안내</option>
                  <option value="점검">점검</option>
                  <option value="이벤트">이벤트</option>
                </select>

                <label>등록일</label>
                <input
                  value={newNotice.date}
                  placeholder="2024.05.22"
                  onChange={(e) =>
                    setNewNotice({
                      ...newNotice,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="cancel-button"
                  onClick={() => setIsNoticeModalOpen(false)}
                >
                  취소
                </button>
                <button className="save-button" onClick={handleAddNotice}>
                  등록
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (selectedMenu === "setting") {
    return (
      <section className="content-box member-page-box">
        <h3>설정</h3>

        <div className="setting-list">
          <div>관리자 이름: 관리자</div>
          <div>알림 설정: ON</div>
          <div>예약 가능 시간: 09:00 ~ 22:00</div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-content">
      <div className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.title}>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <section className="content-box member-page-box">
        <div className="box-header">
          <h3>최근 가입 회원</h3>
          <button>더보기 〉</button>
        </div>

        <Table
          headers={["아이디", "이름", "이메일", "가입일"]}
          rows={members.map((m) => [m.id, m.name, m.email, m.date])}
        />
      </section>
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table className="admin-table member-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardContent;
