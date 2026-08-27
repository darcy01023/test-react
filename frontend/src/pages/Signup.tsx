import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type SignupState = {
  error: string | null;
};

const initialState: SignupState = {
  error: null,
};

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_previousState: SignupState, formData: FormData) => {
      const username = String(formData.get("username") ?? "");
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

      if (!username || !email || !password) {
        return {
          error: "Tous les champs sont obligatoires.",
        };
      }

      try {
        await signup(username, email, password);
        navigate("/");
        return { error: null };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Une erreur est survenue.",
        };
      }
    },
    initialState,
  );

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-bold">Créer un compte</h1>

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium">
            Nom d'utilisateur
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="SnoopyDu93"
            required
            className="mt-1 w-full rounded border px-4 py-2 bg-white/30 backdrop-blur"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Adresse e-mail
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="snoopdoggybag@msn.com"
            required
            className="mt-1 w-full rounded border px-4 py-2 bg-white/30 backdrop-blur"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Mot de passe
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="12345"
            required
            className="mt-1 w-full rounded border px-4 py-2 bg-white/30 backdrop-blur"
          />
        </div>

        {state.error && (
          <p className="text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded px-4 py-2 text-white disabled:opacity-50 bg-[#5D3140] transition hover:bg-[#CF4173] hover:cursor-pointer"
        >
          {isPending ? "Création..." : "Créer mon compte"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-200">
        Déjà un compte ?{" "}
        <Link to="/users/login" className="underline hover:text-white">
          Se connecter
        </Link>
      </p>
    </main>
  );
}