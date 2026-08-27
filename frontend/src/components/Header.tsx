import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCartStore } from "../stores/cartStore";

export function Header() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const totalQuantity = useCartStore((state) =>
    state.getTotalQuantity(),
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-[#F39399]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-white"
        >
          Le Bon Groin
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="rounded px-4 py-2 transition hover:bg-[#F6D8BD] hover:cursor-pointer"
          >
            Produits
          </Link>

          <Link
            to="/cart"
            className="bg-white rounded border px-4 py-2 transition hover:bg-[#F6D8BD] hover:cursor-pointer"
          >
            Panier ({totalQuantity})
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/users/login"
                className="rounded bg-[#CF4173] text-white px-4 py-2 transition hover:bg-[#F6D8BD] hover:cursor-pointer hover:text-black"
              >
                Se connecter
              </Link>

              <Link
                to="/users/signup"
                className="rounded bg-[#5D3140] px-4 py-2 text-white transition hover:bg-[#CF4173] hover:cursor-pointer"
              >
                Créer un compte
              </Link>
            </>
          ) : (
            <>
              {user?.admin && (
                <Link
                  to="/admin"
                  className="rounded bg-[#F6D8BD] border border-red-500 px-4 py-2 text-red-600 transition hover:bg-[#CF4173] hover:text-white hover:cursor-pointer"
                >
                  Admin
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-[#5D3140] px-4 py-2 text-white transition hover:bg-[#CF4173] hover:cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}