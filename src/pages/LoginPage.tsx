import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveAuth } from "../utils/auth";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setSaveId(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await login({
        email,
        password,
      });

      saveAuth({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      });

      if (saveId) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      navigate("/home", { replace: true });
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-box">
          <div className="logo-icon">🏛️</div>
          <h1>UNIV SITDOWN</h1>
          <p>관리자 로그인</p>
        </div>

        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              👁
            </button>
          </div>
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        <div className="login-option">
          <label className="save-id">
            <input
              type="checkbox"
              checked={saveId}
              onChange={() => setSaveId(!saveId)}
            />
            이메일 저장
          </label>

          <button
            type="button"
            className="find-password"
            onClick={() => alert("비밀번호 찾기 기능 준비중입니다.")}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>

      <p className="copyright">© 2024 UNIV SITDOWN. All rights reserved.</p>
    </div>
  );
}

export default LoginPage;
