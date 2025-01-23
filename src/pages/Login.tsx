import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="text-xl font-bold text-primary">EbookCreator</Link>
      </div>

      <div className="auth-tabs">
        <button className="tab-btn active" data-tab="login">Logowanie</button>
        <button className="tab-btn" data-tab="register">Rejestracja</button>
      </div>

      {/* Logowanie */}
      <form id="loginForm" className="auth-form active">
        <h2>Logowanie</h2>
        <div className="form-group">
          <input type="email" id="loginEmail" required placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" id="loginPassword" required placeholder="Hasło" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Zaloguj się</button>
        </div>
        <div className="social-login">
          <button type="button" className="btn btn-google">
            Zaloguj przez Google
          </button>
          <button type="button" className="btn btn-facebook">
            Zaloguj przez Facebook
          </button>
        </div>
        <div className="auth-links">
          <a href="#" id="forgotPassword">Zapomniałem hasła</a>
        </div>
      </form>

      {/* Rejestracja */}
      <form id="registerForm" className="auth-form">
        <h2>Rejestracja</h2>
        <div className="form-group">
          <input type="email" id="registerEmail" required placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" id="registerPassword" required placeholder="Hasło" />
        </div>
        <div className="form-group">
          <input type="password" id="registerPasswordConfirm" required placeholder="Potwierdź hasło" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Zarejestruj się</button>
        </div>
      </form>

      {/* Reset hasła */}
      <form id="resetPasswordForm" className="auth-form">
        <h2>Reset hasła</h2>
        <div className="form-group">
          <input type="email" id="resetEmail" required placeholder="Email" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Wyślij link resetujący</button>
        </div>
        <div className="auth-links">
          <a href="#" className="back-to-login">Powrót do logowania</a>
        </div>
      </form>
    </div>
  );
};

export default Login;