import { Link } from "react-router-dom";

export function Home() {
  return (
    <main>
      <section className="bg-[url(/dist/landing-bg.jpg)] bg-fixed px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Bienvenue au Bon Groin !
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Des prix claqués au sol tellement c'est tombé du camion.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white">
            Zyeute le catalogue. Il y a forcément un truc qui te plaît.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded bg-[#CF4173] px-6 py-3 font-medium text-white transition hover:bg-[#F39399]"
          >
            Découvre les bons plans
          </Link>
        </div>
      </section>

      <section className="bg-[#F39399]/60 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Pourquoi nous ?</h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <article className="bg-white p-6 rounded-xl transition hover:scale-105">
              <h3 className="text-xl font-semibold">Bah déjà pourquoi pas ?</h3>
              <p className="mt-3 text-gray-600">
                Genre t'as trouvé plus intéressant ailleurs ? Go y aller hein.
              </p>
            </article>

            <article className="bg-white p-6 rounded-xl transition hover:scale-105">
              <h3 className="text-xl font-semibold">C'est du bon</h3>
              <p className="mt-3 text-gray-600">
                Qualité allemande, ma caille ! Même chez Lidl tu trouves pas ça !
              </p>
            </article>

            <article className="bg-white p-6 rounded-xl transition hover:scale-105">
              <h3 className="text-xl font-semibold">Satisfait ou go pleurer</h3>
              <p className="mt-3 text-gray-600">
                On rembourse pas. Viens pas dire que le produit est pas bon. Et si t'es pas content c'est la même.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#5D3140] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            Bon t'es juste venu chercher de la lecture ou quoi ?
          </h2>

          <p className="mt-4 max-w-2xl text-gray-300">
            Va voir le catalogue et achète un truc. Tout de suite.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded bg-[#F39399] px-6 py-3 font-medium text-black transition hover:bg-gray-200 hover:bg-[#F6D8BD]"
          >
            Voir les produits
          </Link>
        </div>
      </section>
    </main>
  );
}