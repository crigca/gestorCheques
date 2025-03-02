export default function Home() {
  return (
    <div className="p-12 flex flex-col items-center justify-start min-h-screen bg-gray-50">
      <h1 className="text-5xl font-extrabold text-blue-700 text-center mt-12">
        Bienvenido a Gestor de Cheques
      </h1>

      <p className="mt-4 text-xl text-center text-gray-700 max-w-2xl">
        Gestiona hasta <span className="font-bold text-blue-600">30 cheques</span> de manera 
        <span className="font-semibold"> rápida, eficiente y segura</span>.  
        Simplifica el control de tus ingresos y egresos con nuestra plataforma intuitiva.
      </p>

      <p className="mt-4 text-lg text-center text-gray-600 max-w-xl">
        Automatiza el registro, visualización y organización de tus cheques sin complicaciones.  
        Ahorra tiempo y lleva un mejor control de tus finanzas con una solución confiable y fácil de usar.
      </p>
    </div>
  );
}
